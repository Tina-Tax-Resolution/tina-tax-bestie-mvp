#!/usr/bin/env python3
import csv
import base64
import hmac
import io
import json
import os
import sqlite3
import sys
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
DATA = Path(os.environ.get("DATA_DIR", ROOT / "data"))
DB_PATH = DATA / "tytb_profit_motive.sqlite3"
APP_USER = os.environ.get("APP_USER", "tina")
APP_PASSWORD = os.environ.get("APP_PASSWORD", "")


def now_iso():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def prepare_data_dir():
    global DATA, DB_PATH
    try:
        DATA.mkdir(parents=True, exist_ok=True)
    except PermissionError:
        fallback = Path("/tmp/tytb-profit-motive-data")
        print(
            f"WARNING: DATA_DIR '{DATA}' is not writable. Falling back to temporary storage at '{fallback}'. "
            "Records saved there may reset when the service restarts. Add a Render persistent disk mounted at "
            "DATA_DIR for durable storage.",
            file=sys.stderr,
        )
        DATA = fallback
        DB_PATH = DATA / "tytb_profit_motive.sqlite3"
        DATA.mkdir(parents=True, exist_ok=True)


def init_db():
    prepare_data_dir()
    with connect() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS settings (
              key TEXT PRIMARY KEY,
              value TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS businesses (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              entity_type TEXT NOT NULL DEFAULT '',
              description TEXT NOT NULL DEFAULT '',
              active INTEGER NOT NULL DEFAULT 1,
              created_at TEXT NOT NULL,
              updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS entries (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              business_id INTEGER,
              record_type TEXT NOT NULL,
              tax_year INTEGER NOT NULL,
              event_date TEXT NOT NULL,
              amount_usd REAL NOT NULL DEFAULT 0,
              allocation_percent REAL NOT NULL DEFAULT 100,
              asset_review TEXT NOT NULL DEFAULT 'not_needed',
              shared_use_note TEXT NOT NULL DEFAULT '',
              category TEXT NOT NULL DEFAULT '',
              description TEXT NOT NULL DEFAULT '',
              schedule_line TEXT NOT NULL DEFAULT '27b',
              counterparty TEXT NOT NULL DEFAULT '',
              fmv_method TEXT NOT NULL DEFAULT '',
              crypto_asset TEXT NOT NULL DEFAULT '',
              crypto_amount REAL,
              crypto_wallet TEXT NOT NULL DEFAULT '',
              transaction_hash TEXT NOT NULL DEFAULT '',
              evidence_note TEXT NOT NULL DEFAULT '',
              evidence_file_name TEXT NOT NULL DEFAULT '',
              evidence_file_type TEXT NOT NULL DEFAULT '',
              evidence_file_data TEXT NOT NULL DEFAULT '',
              source TEXT NOT NULL DEFAULT 'manual',
              created_at TEXT NOT NULL,
              updated_at TEXT NOT NULL,
              deleted_at TEXT,
              FOREIGN KEY (business_id) REFERENCES businesses(id)
            );

            CREATE TABLE IF NOT EXISTS factor_answers (
              factor_no INTEGER PRIMARY KEY,
              answer TEXT NOT NULL DEFAULT 'mixed',
              note TEXT NOT NULL DEFAULT '',
              updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS business_factor_answers (
              business_id INTEGER NOT NULL,
              factor_no INTEGER NOT NULL,
              answer TEXT NOT NULL DEFAULT 'mixed',
              note TEXT NOT NULL DEFAULT '',
              updated_at TEXT NOT NULL,
              PRIMARY KEY (business_id, factor_no),
              FOREIGN KEY (business_id) REFERENCES businesses(id)
            );

            CREATE TABLE IF NOT EXISTS audit_events (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              entry_id INTEGER,
              action TEXT NOT NULL,
              reason TEXT NOT NULL DEFAULT '',
              before_json TEXT,
              after_json TEXT,
              created_at TEXT NOT NULL
            );
            """
        )
        defaults = {
            "brand_name": "Tina Your Tax Bestie LLC",
            "advisor_name": "Tina Your Tax Bestie",
            "advisor_contact": "",
            "accent_color": "#227c73",
            "current_tax_year": str(datetime.now().year),
            "disclaimer": (
                "Educational and record-organization purposes only. Not legal, tax, accounting, "
                "or Circular 230 written tax advice. Consult a qualified tax professional before filing "
                "or taking any tax position."
            ),
        }
        for key, value in defaults.items():
            conn.execute(
                "INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",
                (key, value),
            )
        ensure_columns(conn)
        repair_orphan_entries(conn)
        normalize_legacy_suggestions(conn)
        for factor_no in range(1, 10):
            conn.execute(
                """
                INSERT OR IGNORE INTO factor_answers (factor_no, answer, note, updated_at)
                VALUES (?, 'mixed', '', ?)
                """,
                (factor_no, now_iso()),
            )
        sync_business_factors(conn)


def ensure_columns(conn):
    existing = {row["name"] for row in conn.execute("PRAGMA table_info(entries)")}
    columns = {
        "business_id": "INTEGER",
        "allocation_percent": "REAL NOT NULL DEFAULT 100",
        "asset_review": "TEXT NOT NULL DEFAULT 'not_needed'",
        "shared_use_note": "TEXT NOT NULL DEFAULT ''",
        "evidence_file_name": "TEXT NOT NULL DEFAULT ''",
        "evidence_file_type": "TEXT NOT NULL DEFAULT ''",
        "evidence_file_data": "TEXT NOT NULL DEFAULT ''",
    }
    for name, ddl in columns.items():
        if name not in existing:
            conn.execute(f"ALTER TABLE entries ADD COLUMN {name} {ddl}")


def repair_orphan_entries(conn):
    stamp = now_iso()
    has_orphan_entries = conn.execute("SELECT COUNT(*) AS c FROM entries WHERE business_id IS NULL").fetchone()["c"]
    if not has_orphan_entries:
        return
    row = conn.execute("SELECT id FROM businesses ORDER BY id LIMIT 1").fetchone()
    if row:
        default_id = row["id"]
    else:
        cursor = conn.execute(
            """
            INSERT INTO businesses (name, entity_type, description, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            ("New Business Activity", "", "Created to hold existing imported records.", stamp, stamp),
        )
        default_id = cursor.lastrowid
    conn.execute("UPDATE entries SET business_id = ? WHERE business_id IS NULL", (default_id,))


def normalize_legacy_suggestions(conn):
    conn.execute(
        """
        UPDATE businesses
        SET name = 'Content creator',
            entity_type = CASE WHEN entity_type IN ('', 'Creator') THEN 'Creator' ELSE entity_type END,
            updated_at = ?
        WHERE lower(name) IN ('youtube content creator', 'youtube content activity')
        """,
        (now_iso(),),
    )


def sync_business_factors(conn):
    stamp = now_iso()
    business_ids = [row["id"] for row in conn.execute("SELECT id FROM businesses")]
    for business_id in business_ids:
        for factor_no in range(1, 10):
            conn.execute(
                """
                INSERT OR IGNORE INTO business_factor_answers (business_id, factor_no, answer, note, updated_at)
                VALUES (?, ?, 'mixed', '', ?)
                """,
                (business_id, factor_no, stamp),
            )


def row_to_dict(row):
    return {key: row[key] for key in row.keys()}


def settings_dict(conn):
    return {row["key"]: row["value"] for row in conn.execute("SELECT key, value FROM settings")}


def read_json(handler):
    length = int(handler.headers.get("Content-Length", "0") or "0")
    if length == 0:
        return {}
    return json.loads(handler.rfile.read(length).decode("utf-8"))


def normalize_entry(payload):
    record_type = payload.get("record_type") or "cash_expense"
    tax_year = int(payload.get("tax_year") or datetime.now().year)
    event_date = payload.get("event_date", "").strip()
    amount = float(payload.get("amount_usd") or 0)
    schedule_line = payload.get("schedule_line") or ("income" if "income" in record_type else "27b")
    category = payload.get("category", "").strip()
    counterparty = payload.get("counterparty", "").strip()
    evidence_note = payload.get("evidence_note", "").strip()
    if not event_date:
        raise ValueError("Date is required before saving a contemporaneous record.")
    try:
        event_year = datetime.strptime(event_date, "%Y-%m-%d").year
    except ValueError as exc:
        raise ValueError("Date must be a valid calendar date.") from exc
    if event_year != tax_year:
        raise ValueError(f"The record date is in {event_year}, but the selected tax year is {tax_year}. Change the date or the tax year before saving.")
    if amount <= 0:
        raise ValueError("Amount must be greater than zero.")
    if not category:
        raise ValueError("What was it is required before saving.")
    if not counterparty:
        raise ValueError("Payer, payee, provider, or exchange is required before saving.")
    if not evidence_note:
        raise ValueError("Business purpose or evidence note is required before saving.")
    if "income" not in record_type and not payload.get("schedule_line"):
        raise ValueError("Schedule C organizer line is required for expenses after the item is described.")
    return {
        "business_id": int(payload.get("business_id") or 1),
        "record_type": record_type,
        "tax_year": tax_year,
        "event_date": event_date,
        "amount_usd": amount,
        "allocation_percent": float(payload.get("allocation_percent") or 100),
        "asset_review": payload.get("asset_review", "not_needed").strip() or "not_needed",
        "shared_use_note": payload.get("shared_use_note", "").strip(),
        "category": category,
        "description": payload.get("description", "").strip(),
        "schedule_line": schedule_line,
        "counterparty": counterparty,
        "fmv_method": payload.get("fmv_method", "").strip(),
        "crypto_asset": payload.get("crypto_asset", "").strip().upper(),
        "crypto_amount": float(payload["crypto_amount"]) if str(payload.get("crypto_amount", "")).strip() else None,
        "crypto_wallet": payload.get("crypto_wallet", "").strip(),
        "transaction_hash": payload.get("transaction_hash", "").strip(),
        "evidence_note": evidence_note,
        "evidence_file_name": payload.get("evidence_file_name", "").strip(),
        "evidence_file_type": payload.get("evidence_file_type", "").strip(),
        "evidence_file_data": payload.get("evidence_file_data", "").strip(),
        "source": payload.get("source", "manual").strip() or "manual",
    }


def get_entry(conn, entry_id):
    row = conn.execute("SELECT * FROM entries WHERE id = ?", (entry_id,)).fetchone()
    return row_to_dict(row) if row else None


def write_audit(conn, entry_id, action, reason="", before=None, after=None):
    conn.execute(
        """
        INSERT INTO audit_events (entry_id, action, reason, before_json, after_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            entry_id,
            action,
            reason,
            json.dumps(before, sort_keys=True) if before else None,
            json.dumps(after, sort_keys=True) if after else None,
            now_iso(),
        ),
    )


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC), **kwargs)

    def authenticate(self):
        if not APP_PASSWORD:
            return True
        header = self.headers.get("Authorization", "")
        prefix = "Basic "
        if not header.startswith(prefix):
            return False
        try:
            decoded = base64.b64decode(header[len(prefix):]).decode("utf-8")
            username, password = decoded.split(":", 1)
        except Exception:
            return False
        return hmac.compare_digest(username, APP_USER) and hmac.compare_digest(password, APP_PASSWORD)

    def require_auth(self):
        if self.authenticate():
            return True
        self.send_response(401)
        self.send_header("WWW-Authenticate", 'Basic realm="Tina Your Tax Bestie Records"')
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"Password required")
        return False

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def end_headers(self):
        path = urlparse(self.path).path
        if path in {"/", "/index.html", "/app.js", "/styles.css", "/sw.js"}:
            self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def send_json(self, data, status=200):
        body = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_error_json(self, message, status=400):
        self.send_json({"error": message}, status)

    def do_GET(self):
        if not self.require_auth():
            return
        parsed = urlparse(self.path)
        if parsed.path == "/api/bootstrap":
            with connect() as conn:
                self.send_json(
                    {
                        "settings": settings_dict(conn),
                        "businesses": [
                            row_to_dict(row)
                            for row in conn.execute("SELECT * FROM businesses ORDER BY active DESC, name")
                        ],
                        "entries": [
                            row_to_dict(row)
                            for row in conn.execute("SELECT * FROM entries ORDER BY event_date DESC, id DESC")
                        ],
                        "factors": [
                            row_to_dict(row)
                            for row in conn.execute("SELECT * FROM business_factor_answers ORDER BY business_id, factor_no")
                        ],
                        "audit": [
                            row_to_dict(row)
                            for row in conn.execute("SELECT * FROM audit_events ORDER BY id DESC LIMIT 200")
                        ],
                    }
                )
            return
        if parsed.path == "/api/export.csv":
            params = parse_qs(parsed.query)
            filters = []
            values = []
            if params.get("tax_year", [""])[0]:
                filters.append("tax_year = ?")
                values.append(int(params["tax_year"][0]))
            if params.get("business_id", [""])[0]:
                filters.append("business_id = ?")
                values.append(int(params["business_id"][0]))
            where = f"WHERE {' AND '.join(filters)}" if filters else ""
            with connect() as conn:
                rows = [
                    row_to_dict(row)
                    for row in conn.execute(
                        f"SELECT * FROM entries {where} ORDER BY tax_year DESC, event_date DESC",
                        values,
                    )
                ]
            output = io.StringIO()
            fieldnames = [
                "id", "business_id", "record_type", "tax_year", "event_date", "amount_usd",
                "allocation_percent", "asset_review", "shared_use_note", "category", "description",
                "schedule_line", "counterparty", "fmv_method", "crypto_asset", "crypto_amount",
                "crypto_wallet", "transaction_hash", "evidence_note", "evidence_file_name",
                "evidence_file_type", "evidence_file_data", "source", "created_at",
                "updated_at", "deleted_at"
            ]
            writer = csv.DictWriter(output, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
            body = output.getvalue().encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/csv; charset=utf-8")
            self.send_header("Content-Disposition", "attachment; filename=tytb-profit-motive-records.csv")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()

    def do_POST(self):
        if not self.require_auth():
            return
        parsed = urlparse(self.path)
        try:
            if parsed.path == "/api/entries":
                payload = read_json(self)
                entry = normalize_entry(payload)
                stamp = now_iso()
                with connect() as conn:
                    cursor = conn.execute(
                        """
                        INSERT INTO entries (
                          business_id, record_type, tax_year, event_date, amount_usd,
                          allocation_percent, asset_review, shared_use_note, category, description,
                          schedule_line, counterparty, fmv_method, crypto_asset, crypto_amount,
                          crypto_wallet, transaction_hash, evidence_note, evidence_file_name,
                          evidence_file_type, evidence_file_data, source, created_at, updated_at
                        )
                        VALUES (
                          :business_id, :record_type, :tax_year, :event_date, :amount_usd,
                          :allocation_percent, :asset_review, :shared_use_note, :category, :description,
                          :schedule_line, :counterparty, :fmv_method, :crypto_asset, :crypto_amount,
                          :crypto_wallet, :transaction_hash, :evidence_note, :evidence_file_name,
                          :evidence_file_type, :evidence_file_data, :source, :created_at, :updated_at
                        )
                        """,
                        {**entry, "created_at": stamp, "updated_at": stamp},
                    )
                    saved = get_entry(conn, cursor.lastrowid)
                    write_audit(conn, cursor.lastrowid, "create", payload.get("reason", ""), after=saved)
                    self.send_json(saved, 201)
                return
            if parsed.path == "/api/import.csv":
                payload = read_json(self)
                text = payload.get("csv", "")
                imported = 0
                with connect() as conn:
                    for row in csv.DictReader(io.StringIO(text)):
                        entry = normalize_entry(row)
                        stamp = now_iso()
                        cursor = conn.execute(
                            """
                            INSERT INTO entries (
                              business_id, record_type, tax_year, event_date, amount_usd,
                              allocation_percent, asset_review, shared_use_note, category, description,
                              schedule_line, counterparty, fmv_method, crypto_asset, crypto_amount,
                              crypto_wallet, transaction_hash, evidence_note, evidence_file_name,
                              evidence_file_type, evidence_file_data, source, created_at, updated_at
                            )
                            VALUES (
                              :business_id, :record_type, :tax_year, :event_date, :amount_usd,
                              :allocation_percent, :asset_review, :shared_use_note, :category, :description,
                              :schedule_line, :counterparty, :fmv_method, :crypto_asset, :crypto_amount,
                              :crypto_wallet, :transaction_hash, :evidence_note, :evidence_file_name,
                              :evidence_file_type, :evidence_file_data, 'csv_import', :created_at, :updated_at
                            )
                            """,
                            {**entry, "created_at": stamp, "updated_at": stamp},
                        )
                        write_audit(conn, cursor.lastrowid, "import", "CSV batch import", after=get_entry(conn, cursor.lastrowid))
                        imported += 1
                self.send_json({"imported": imported})
                return
            if parsed.path == "/api/businesses":
                payload = read_json(self)
                stamp = now_iso()
                with connect() as conn:
                    cursor = conn.execute(
                        """
                        INSERT INTO businesses (name, entity_type, description, active, created_at, updated_at)
                        VALUES (?, ?, ?, 1, ?, ?)
                        """,
                        (
                            payload.get("name", "").strip() or "New Business Activity",
                            payload.get("entity_type", "").strip(),
                            payload.get("description", "").strip(),
                            stamp,
                            stamp,
                        ),
                    )
                    sync_business_factors(conn)
                    self.send_json(row_to_dict(conn.execute("SELECT * FROM businesses WHERE id = ?", (cursor.lastrowid,)).fetchone()), 201)
                return
            if parsed.path == "/api/reset":
                payload = read_json(self)
                if payload.get("confirm") != "RESET":
                    self.send_error_json("Type RESET to clear the walkthrough data.", 400)
                    return
                with connect() as conn:
                    conn.execute("DELETE FROM audit_events")
                    conn.execute("DELETE FROM business_factor_answers")
                    conn.execute("DELETE FROM factor_answers")
                    conn.execute("DELETE FROM entries")
                    conn.execute("DELETE FROM businesses")
                    for factor_no in range(1, 10):
                        conn.execute(
                            """
                            INSERT OR IGNORE INTO factor_answers (factor_no, answer, note, updated_at)
                            VALUES (?, 'mixed', '', ?)
                            """,
                            (factor_no, now_iso()),
                        )
                self.send_json({"ok": True, "message": "Walkthrough data cleared."})
                return
            self.send_error_json("Unknown endpoint", 404)
        except ValueError as exc:
            self.send_error_json(str(exc), 400)
        except Exception as exc:
            self.send_error_json(str(exc), 500)

    def do_PUT(self):
        if not self.require_auth():
            return
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        try:
            if len(parts) == 3 and parts[:2] == ["api", "entries"]:
                entry_id = int(parts[2])
                payload = read_json(self)
                entry = normalize_entry(payload)
                with connect() as conn:
                    before = get_entry(conn, entry_id)
                    if not before:
                        self.send_error_json("Record not found", 404)
                        return
                    conn.execute(
                        """
                        UPDATE entries SET
                          business_id=:business_id, record_type=:record_type, tax_year=:tax_year, event_date=:event_date,
                          amount_usd=:amount_usd, allocation_percent=:allocation_percent,
                          asset_review=:asset_review, shared_use_note=:shared_use_note,
                          category=:category, description=:description,
                          schedule_line=:schedule_line, counterparty=:counterparty, fmv_method=:fmv_method,
                          crypto_asset=:crypto_asset, crypto_amount=:crypto_amount, crypto_wallet=:crypto_wallet,
                          transaction_hash=:transaction_hash, evidence_note=:evidence_note,
                          evidence_file_name=:evidence_file_name, evidence_file_type=:evidence_file_type,
                          evidence_file_data=:evidence_file_data, source=:source,
                          updated_at=:updated_at
                        WHERE id=:id
                        """,
                        {**entry, "updated_at": now_iso(), "id": entry_id},
                    )
                    after = get_entry(conn, entry_id)
                    write_audit(conn, entry_id, "edit", payload.get("reason", "Record edited"), before, after)
                    self.send_json(after)
                return
            if len(parts) == 3 and parts[:2] == ["api", "businesses"]:
                business_id = int(parts[2])
                payload = read_json(self)
                with connect() as conn:
                    conn.execute(
                        """
                        UPDATE businesses SET name = ?, entity_type = ?, description = ?,
                          active = ?, updated_at = ?
                        WHERE id = ?
                        """,
                        (
                            payload.get("name", "").strip() or "Business Activity",
                            payload.get("entity_type", "").strip(),
                            payload.get("description", "").strip(),
                            1 if payload.get("active", True) else 0,
                            now_iso(),
                            business_id,
                        ),
                    )
                    self.send_json(row_to_dict(conn.execute("SELECT * FROM businesses WHERE id = ?", (business_id,)).fetchone()))
                return
            if len(parts) == 4 and parts[:2] == ["api", "entries"] and parts[3] == "restore":
                entry_id = int(parts[2])
                with connect() as conn:
                    before = get_entry(conn, entry_id)
                    conn.execute("UPDATE entries SET deleted_at = NULL, updated_at = ? WHERE id = ?", (now_iso(), entry_id))
                    after = get_entry(conn, entry_id)
                    write_audit(conn, entry_id, "restore", "Record restored", before, after)
                    self.send_json(after)
                return
            if parsed.path == "/api/settings":
                payload = read_json(self)
                with connect() as conn:
                    for key, value in payload.items():
                        conn.execute(
                            "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
                            (key, str(value)),
                        )
                    self.send_json(settings_dict(conn))
                return
            if parsed.path == "/api/factors":
                payload = read_json(self)
                with connect() as conn:
                    business_id = int(payload.get("business_id") or 1)
                    for item in payload.get("factors", []):
                        conn.execute(
                            """
                            INSERT INTO business_factor_answers (business_id, factor_no, answer, note, updated_at)
                            VALUES (?, ?, ?, ?, ?)
                            ON CONFLICT(business_id, factor_no)
                            DO UPDATE SET answer=excluded.answer, note=excluded.note, updated_at=excluded.updated_at
                            """,
                            (business_id, int(item["factor_no"]), item.get("answer", "mixed"), item.get("note", ""), now_iso()),
                        )
                    self.send_json({"ok": True})
                return
            self.send_error_json("Unknown endpoint", 404)
        except ValueError as exc:
            self.send_error_json(str(exc), 400)
        except Exception as exc:
            self.send_error_json(str(exc), 500)

    def do_DELETE(self):
        if not self.require_auth():
            return
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        try:
            if len(parts) == 3 and parts[:2] == ["api", "entries"]:
                entry_id = int(parts[2])
                reason = parse_qs(parsed.query).get("reason", ["Soft deleted by user"])[0]
                with connect() as conn:
                    before = get_entry(conn, entry_id)
                    if not before:
                        self.send_error_json("Record not found", 404)
                        return
                    conn.execute("UPDATE entries SET deleted_at = ?, updated_at = ? WHERE id = ?", (now_iso(), now_iso(), entry_id))
                    after = get_entry(conn, entry_id)
                    write_audit(conn, entry_id, "soft_delete", reason, before, after)
                    self.send_json(after)
                return
            self.send_error_json("Unknown endpoint", 404)
        except Exception as exc:
            self.send_error_json(str(exc), 500)


def main():
    init_db()
    port = int(os.environ.get("PORT", "8765"))
    host = os.environ.get("HOST", "127.0.0.1")
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"Tina Your Tax Bestie MVP running at http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
