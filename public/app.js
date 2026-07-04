const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const $ = (id) => document.getElementById(id);

const factorText = [
  ["Businesslike records", "Complete books, receipts, separate accounts, budgets, and changes meant to improve profit."],
  ["Expertise", "Study, advisor input, training, or expert help used to run the activity as a business."],
  ["Time and effort", "Substantial, continuous, and regular involvement, or qualified people hired to operate the activity."],
  ["Asset appreciation", "Expectation that inventory, property, IP, crypto, or other assets may increase in value."],
  ["Success in other activities", "Prior success turning similar or different ventures into profitable operations."],
  ["Income and loss history", "Profit pattern or business explanations for losses, startup costs, or unusual setbacks."],
  ["Occasional profits", "Substantial profits when profits occur, or a realistic chance of meaningful profit."],
  ["Financial status", "Whether activity is operated for income rather than mainly sheltering other income."],
  ["Personal pleasure", "Whether the activity is run primarily for economic profit rather than personal enjoyment."]
];

const scheduleCLines = [
  ["income", "Income - Schedule C line 1, gross receipts or sales"],
  ["8", "Line 8 - Advertising"],
  ["9", "Line 9 - Car and truck expenses"],
  ["10", "Line 10 - Commissions and fees"],
  ["11", "Line 11 - Contract labor"],
  ["12", "Line 12 - Depletion"],
  ["13", "Line 13 - Depreciation and section 179"],
  ["14", "Line 14 - Employee benefit programs"],
  ["15", "Line 15 - Insurance, other than health"],
  ["16a", "Line 16a - Mortgage interest paid to banks"],
  ["16b", "Line 16b - Other interest"],
  ["17", "Line 17 - Legal and professional services"],
  ["18", "Line 18 - Office expense"],
  ["19", "Line 19 - Pension and profit-sharing plans"],
  ["20a", "Line 20a - Rent or lease: vehicles, machinery, equipment"],
  ["20b", "Line 20b - Rent or lease: other business property"],
  ["21", "Line 21 - Repairs and maintenance"],
  ["22", "Line 22 - Supplies"],
  ["23", "Line 23 - Taxes and licenses"],
  ["24a", "Line 24a - Travel"],
  ["24b", "Line 24b - Deductible meals"],
  ["25", "Line 25 - Utilities"],
  ["26", "Line 26 - Wages"],
  ["27a", "Line 27a - Energy efficient commercial buildings deduction"],
  ["27b", "Line 27b - Other expenses"],
  ["30", "Line 30 - Business use of home"]
];

const rules = [
  ["20b", ["studio", "studio time", "studio rental", "recording studio", "stuidio", "stuido", "workspace", "coworking", "office rent", "rent", "booth rental"]],
  ["20a", ["equipment rental", "camera rental", "gear rental", "machinery rental", "vehicle rental"]],
  ["8", ["advertising", "ads", "marketing", "promotion", "sponsored", "boosted", "google ads", "facebook ads"]],
  ["9", ["mileage", "gas", "parking", "toll", "car", "truck", "vehicle", "rideshare"]],
  ["10", ["commission", "merchant fee", "processing fee", "stripe", "paypal", "square fee", "platform fee"]],
  ["11", ["contractor", "freelancer", "assistant", "editor", "designer", "1099", "contract labor"]],
  ["13", ["depreciation", "section 179", "camera", "computer", "laptop", "equipment purchase"]],
  ["15", ["insurance", "liability policy", "business policy"]],
  ["16b", ["loan interest", "credit card interest", "interest"]],
  ["17", ["legal", "attorney", "lawyer", "accountant", "cpa", "tax prep", "professional service"]],
  ["18", ["software", "subscription", "office", "postage", "printing", "apps", "hosting", "domain"]],
  ["21", ["repair", "maintenance", "fix", "service call"]],
  ["22", ["supplies", "materials", "props", "packaging", "shipping supplies"]],
  ["23", ["license", "permit", "registration", "business tax", "state fee"]],
  ["24a", ["hotel", "flight", "airfare", "travel", "lodging", "train", "conference travel"]],
  ["24b", ["meal", "restaurant", "coffee meeting", "client lunch", "business lunch"]],
  ["25", ["utilities", "electric", "internet", "phone", "water", "wifi"]],
  ["26", ["wages", "payroll", "employee pay", "salary"]],
  ["30", ["home office", "business use of home"]]
];

let state = { settings: {}, businesses: [], entries: [], factors: [], audit: [] };
let evidenceFilePayload = { name: "", type: "", data: "" };
let profitReviewUnlocked = false;
let portalMode = "client";
const hobbyTreatmentNote = "If this activity is not engaged in for profit, income may still need to be reported, but ordinary hobby expenses may be limited or unavailable as deductions under current federal rules. Inventory or cost-of-goods-sold questions should be reviewed separately with a qualified tax professional. Educational only.";
const fmvEvidenceText = "FMV support: save retail listing, comparable sale, invoice, contract, exchange price, appraised value, or other contemporaneous proof. Educational only; confer with a qualified tax professional.";

function lineLabel(line) {
  return (scheduleCLines.find(([value]) => value === line) || ["27b", "Line 27b - Other expenses"])[1];
}

function inferLine() {
  return inferLineFrom($("recordType").value, $("recordCategory").value, $("description").value);
}

function inferLineFrom(type, category, description) {
  if (type.includes("income")) return "income";
  const text = `${category || ""} ${description || ""}`.toLowerCase();
  if (!text.trim()) return "";
  const match = rules.find(([, words]) => words.some(word => text.includes(word)));
  return match ? match[0] : "27b";
}

function updateLineSuggestion(force = false) {
  const inferred = inferLine();
  if (force || !$("scheduleLine").dataset.manual) $("scheduleLine").value = inferred;
  if (!inferred && !$("recordType").value.includes("income")) {
    $("scheduleHint").textContent = "Type the category or description first; the app will suggest a Schedule C organizer line.";
    return;
  }
  $("scheduleHint").textContent = $("recordType").value === "noncash_income"
    ? "Non-cash items received for services, reviews, posts, or brand work may be income at FMV. Document why it was received and how FMV was determined."
    : $("recordType").value.includes("income")
      ? "Suggested income treatment: gross receipts or other income review."
      : `Suggested: ${lineLabel(inferred)}. Change it if your facts are different.`;
}

function updateSimpleMappingPreview() {
  const type = $("simpleType").value;
  const what = $("simpleWhat").value.trim();
  const purpose = $("simplePurpose").value.trim();
  const line = inferLineFrom(type, what, purpose);
  const words = `${what} ${purpose}`.toLowerCase();
  updateSimpleEntryLabels(type);
  const giftContext = updateGiftReviewUI(type, words);
  const giftStatus = $("giftExchangeStatus")?.value || "";
  updateGiftReviewHint(giftContext);
  updateFmvHelp(type, giftContext, giftStatus);
  $("simpleSchedulePreview").classList.toggle("empty", !what && !purpose);
  if (!what && !purpose) {
    $("simpleSchedulePreview").textContent = type.includes("income")
      ? "Type the income, payout, gift, barter, or crypto item to see how it will be organized."
      : "Type the expense you paid to see the Schedule C mapping.";
    return;
  }
  if (type.includes("income")) {
    const giftNote = giftStatus === "yes" && giftContext.direction === "received"
      ? " Gift/product was marked as received for services/content, so FMV support is important."
      : giftStatus === "unsure"
        ? " Gift/product was marked not sure, so this will be saved as review-needed."
        : "";
    $("simpleSchedulePreview").textContent = `Maps as income. Review FMV if this is a product, gift, barter, or crypto.${giftNote}`;
    return;
  }
  const giftGivenNote = giftStatus === "yes" && giftContext.direction === "given"
    ? " Promo gift/giveaway was marked for business promotion, so keep recipient, purpose, cost/FMV, and proof."
    : giftStatus === "unsure" && giftContext.direction === "given"
      ? " Promo gift/giveaway is marked unsure and will be saved for tax pro review."
      : "";
  const reason = words.includes("studio")
    ? "Reason: studio/studio time looks like rented business space."
    : words.includes("rent")
      ? "Reason: rent/lease wording was detected."
      : "You can change this later in Advanced Fields.";
  $("simpleSchedulePreview").textContent = `Suggested Schedule C line: ${lineLabel(line || "27b")}. ${reason}${giftGivenNote ? ` ${giftGivenNote}` : ""}`;
}

function updateSimpleEntryLabels(type = $("simpleType").value) {
  const amountLabel = $("simpleAmountLabel");
  const whoLabel = $("simpleWhoLabel");
  if (!amountLabel || !whoLabel) return;
  if (type === "cash_expense" || type === "crypto_expense") {
    amountLabel.textContent = type === "crypto_expense" ? "USD value paid" : "Amount paid";
    whoLabel.textContent = "Who did you pay?";
  } else if (type === "noncash_income") {
    amountLabel.textContent = "Fair market value";
    whoLabel.textContent = "Brand / company / person";
  } else if (type === "crypto_income") {
    amountLabel.textContent = "USD value received";
    whoLabel.textContent = "Who paid you / exchange";
  } else {
    amountLabel.textContent = "Amount received";
    whoLabel.textContent = "Who paid you?";
  }
}

function updateGiftReviewUI(type, words = "") {
  const field = $("giftReviewField");
  const label = $("giftReviewLabel");
  const select = $("giftExchangeStatus");
  if (!field || !label || !select) return { visible: false, direction: "" };
  const previousValue = select.value;

  const giftReceivedWords = /gift|barter|brand|product|trip|prize|review|post|promo|promotion|sponsor|sponsorship/.test(words);
  const giftGivenWords = /gift|giveaway|sample|influencer|promo|promotion|post|review|sponsor|sponsored|brand ambassador|free product|swag/.test(words);
  const receivedContext = type === "noncash_income" || type === "crypto_income" || (type === "cash_income" && giftReceivedWords);
  const givenContext = (type === "cash_expense" || type === "crypto_expense") && giftGivenWords;
  const direction = givenContext ? "given" : receivedContext ? "received" : "";

  if (!direction) {
    field.classList.add("field-hidden");
    select.dataset.direction = "";
    select.innerHTML = `<option value="">Not a gift, barter, or promo item</option>`;
    return { visible: false, direction: "" };
  }

  field.classList.remove("field-hidden");
  select.dataset.direction = direction;
  if (direction === "given") {
    label.textContent = "Did you give a product, sample, gift, giveaway, or item for promotion/content?";
    select.innerHTML = `
      <option value="">Not a promo gift/giveaway</option>
      <option value="yes">Yes - I gave this for business promotion/content</option>
      <option value="no">No - ordinary expense only</option>
      <option value="unsure">Not sure - save for review</option>`;
  } else {
    label.textContent = "Was this gift/product received for a post, review, service, or promotion?";
    select.innerHTML = `
      <option value="">Not a gift/product entry</option>
      <option value="yes">Yes - received for services/content</option>
      <option value="no">No - not received for services/content</option>
      <option value="unsure">Not sure - save for review</option>`;
  }
  if ([...select.options].some(option => option.value === previousValue)) select.value = previousValue;
  return { visible: true, direction };
}

function updateGiftReviewHint(context = { direction: "" }) {
  const field = $("giftExchangeStatus");
  const hint = $("giftReviewHint");
  if (!field || !hint) return;
  const value = field.value;
  if (context.direction === "given" && value === "yes") {
    hint.textContent = "Save recipient, date, business purpose, item cost/FMV, and proof of the promotion or service expected.";
  } else if (context.direction === "given" && value === "unsure") {
    hint.textContent = "Bestie Review Needed: this may involve gift, advertising, or other limits. Save the facts for a qualified tax professional.";
  } else if (context.direction === "given" && value === "no") {
    hint.textContent = "This will be organized as the expense you paid, not as a gift/barter item.";
  } else if (value === "yes") {
    hint.textContent = "Save FMV, brand/company, proof, and what service/content was expected.";
  } else if (value === "unsure") {
    hint.textContent = "Bestie Review Needed: save the facts now and review with a qualified tax professional.";
  } else if (value === "no") {
    hint.textContent = "Save notes showing why it was not connected to services/content.";
  } else {
    hint.textContent = context.direction === "given"
      ? "Use only when you gave something to another person or creator for promotion, content, or business services."
      : "Use for brand gifts, barter, trips, products, crypto, or creator items received.";
  }
}

function updateFmvHelp(type, context, giftStatus) {
  const help = $("fmvHelp");
  if (!help) return;
  const show = type === "noncash_income" || type.includes("crypto") || giftStatus === "yes" || giftStatus === "unsure" || context.visible;
  help.classList.toggle("field-hidden", !show);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error((await response.json()).error || "Request failed");
  return response.json();
}

function activeEntries() {
  return state.entries.filter(entry => entryMatchesBusiness(entry) && (!$("showDeleted")?.checked ? !entry.deleted_at : true));
}

function entriesForYear(year = $("taxYear").value) {
  return state.entries.filter(entry => entryMatchesBusiness(entry) && !entry.deleted_at && String(entry.tax_year) === String(year));
}

function selectedBusinessId() {
  return Number($("businessFilter")?.value || state.businesses[0]?.id || 1);
}

function entryMatchesBusiness(entry) {
  return Number(entry.business_id || state.businesses[0]?.id || 1) === selectedBusinessId();
}

function businessName(id) {
  return state.businesses.find(business => Number(business.id) === Number(id))?.name || "Business Activity";
}

function factorsForBusiness() {
  const businessId = selectedBusinessId();
  return factorText.map((_, index) => {
    const factorNo = index + 1;
    return state.factors.find(factor => Number(factor.business_id) === businessId && Number(factor.factor_no) === factorNo)
      || { business_id: businessId, factor_no: factorNo, answer: "mixed", note: "" };
  });
}

function isIncome(entry) {
  return entry.record_type.includes("income");
}

function totals(year = $("taxYear").value) {
  const rows = entriesForYear(year);
  const income = rows.filter(isIncome).reduce((sum, e) => sum + Number(e.amount_usd || 0), 0);
  const expenses = rows.filter(e => !isIncome(e)).reduce((sum, e) => sum + Number(e.amount_usd || 0), 0);
  return { rows, income, expenses, net: income - expenses };
}

function yearResults() {
  const grouped = {};
  state.entries.filter(e => !e.deleted_at && entryMatchesBusiness(e)).forEach(entry => {
    grouped[entry.tax_year] ||= { income: 0, expenses: 0 };
    grouped[entry.tax_year][isIncome(entry) ? "income" : "expenses"] += Number(entry.amount_usd || 0);
  });
  return Object.entries(grouped)
    .map(([year, row]) => ({ year, ...row, net: row.income - row.expenses }))
    .sort((a, b) => Number(a.year) - Number(b.year));
}

function yearsWithRecords(rows) {
  return rows.filter(row => row.income > 0 || row.expenses > 0);
}

function recentFiveYearWindow() {
  const selected = Number($("taxYear").value || new Date().getFullYear());
  const years = [];
  for (let year = selected - 4; year <= selected; year++) years.push(year);
  const results = yearResults();
  return years.map(year => {
    const found = results.find(row => Number(row.year) === year);
    return found || { year: String(year), income: 0, expenses: 0, net: 0 };
  });
}

function profitPath(windowRows) {
  const recorded = yearsWithRecords(windowRows);
  const lossRows = recorded.filter(row => row.net < 0);
  const profitRows = recorded.filter(row => row.net > 0);
  const first = recorded[0];
  const last = recorded[recorded.length - 1];
  const incomeImproving = recorded.length >= 2 && last.income > first.income;
  const losses = recorded.filter(row => row.net < 0);
  const lossNarrowing = losses.length >= 2 && Math.abs(losses[losses.length - 1].net) < Math.abs(losses[0].net);
  const threeLossTrigger = lossRows.length >= 3;
  return {
    recorded,
    lossRows,
    profitRows,
    incomeImproving,
    lossNarrowing,
    threeLossTrigger,
  };
}

function readinessScore() {
  const factorPoints = factorsForBusiness().reduce((sum, f) => sum + (f.answer === "yes" ? 2 : f.answer === "mixed" ? 1 : 0) + (f.note ? .35 : 0), 0);
  const factorScore = factorPoints / (9 * 2.35);
  const path = profitPath(recentFiveYearWindow());
  const profitScore = path.profitRows.length / 3;
  const trajectoryBoost = (path.incomeImproving ? .12 : 0) + (path.lossNarrowing ? .12 : 0);
  return Math.min(100, Math.round(((factorScore * .65) + (Math.min(1, profitScore) * .23) + trajectoryBoost) * 100));
}

function renderTaxYears() {
  const current = Number(state.settings.current_tax_year || new Date().getFullYear());
  const years = new Set([...state.entries.map(e => Number(e.tax_year))]);
  for (let year = current - 6; year <= current + 4; year++) years.add(year);
  $("taxYear").innerHTML = [...years].filter(Boolean).sort((a, b) => b - a).map(year => `<option value="${year}">${year}</option>`).join("");
  $("taxYear").value = String(current);
  $("recordTaxYear").value = current;
}

function renderBusinessFilter() {
  const selected = String(selectedBusinessId());
  const options = state.businesses
    .filter(business => business.active || String(business.id) === selected)
    .map(business => `<option value="${business.id}">${escapeHtml(business.name)}</option>`)
    .join("");
  $("businessFilter").innerHTML = options;
  $("recordBusiness").innerHTML = options;
  $("simpleBusiness").innerHTML = options;
  $("businessFilter").value = state.businesses.some(b => String(b.id) === selected) ? selected : String(state.businesses[0]?.id || 1);
  $("recordBusiness").value = $("businessFilter").value;
  $("simpleBusiness").value = $("businessFilter").value;
}

function renderDashboard() {
  const t = totals();
  const windowRows = recentFiveYearWindow();
  const path = profitPath(windowRows);
  $("incomeTotal").textContent = money.format(t.income);
  $("expenseTotal").textContent = money.format(t.expenses);
  $("netTotal").textContent = money.format(t.net);
  $("profitYears").textContent = `${path.lossRows.length} losses`;
  const score = readinessScore();
  $("score").textContent = `${score}%`;
  $("scoreBar").style.width = `${score}%`;
  $("scoreText").textContent = score >= 75 ? "Strong educational record file. Keep evidence current." : score >= 50 ? "Moderate support. Add evidence, FMV support, and profit explanations." : "Needs stronger records, business-purpose notes, and profit path support.";
  renderProfitAlert(windowRows, path);
  updateProfitReviewAccess(path);
  renderChart(yearResults());
  renderScheduleSummary(t.rows);
  renderPortalSnapshot(t, path);
}

function updateProfitReviewAccess(path = profitPath(recentFiveYearWindow())) {
  profitReviewUnlocked = path.threeLossTrigger;
  const nav = document.querySelector('[data-view="factors"]');
  if (nav) nav.classList.toggle("locked", !profitReviewUnlocked);
}

function renderProfitAlert(rows, path) {
  const el = $("profitAlert");
  if (!path.recorded.length) {
    el.innerHTML = `<div class="alert"><strong>Start your business story:</strong> Add income, expenses, gifts/barter, crypto, and evidence. The app will watch the profit path as years are added.</div>`;
    return;
  }
  const trendBits = [
    path.incomeImproving ? "income is moving up" : "",
    path.lossNarrowing ? "losses are narrowing" : "",
  ].filter(Boolean);
  const trendText = trendBits.length ? ` The current trend shows ${trendBits.join(" and ")}.` : "";
  if (path.threeLossTrigger) {
    el.innerHTML = `<div class="alert risk"><strong>Bestie Alert:</strong> Your records show losses in ${path.lossRows.length} of the last 5 tax years for ${escapeHtml(businessName(selectedBusinessId()))}. That does not automatically mean it is a hobby, but the IRS may look more closely at whether you are operating with a profit motive.${trendText} If you are treating this as a business, answer the questions below and confer with a qualified tax professional when needed. <p class="muted">${hobbyTreatmentNote}</p><div class="actions" style="margin-top:10px"><button class="small primary" data-start-review="true">Review Profit Motive Factors</button><span class="muted">Not legal, tax, accounting, or Circular 230 written tax advice.</span></div></div>`;
    return;
  }
  if (path.profitRows.length >= 3) {
    el.innerHTML = `<div class="alert good"><strong>Profit pattern note:</strong> Your records show ${path.profitRows.length} profitable years in the selected five-year window. This may support a business pattern, but it is not a guarantee. Keep receipts, contracts, FMV proof, and business-purpose notes current.</div>`;
    return;
  }
  el.innerHTML = `<div class="alert"><strong>Profit Path Note:</strong> You have ${path.recorded.length} year${path.recorded.length === 1 ? "" : "s"} with records in this five-year window and ${path.lossRows.length} loss year${path.lossRows.length === 1 ? "" : "s"}.${trendText || " Keep documenting income growth, business changes, receipts, and why expenses help the activity make money."}</div>`;
}

function renderChart(rows) {
  const chart = $("yearChart");
  if (!rows.length) {
    chart.innerHTML = `<p class="muted">Add records to see year-by-year results.</p>`;
    return;
  }
  const max = Math.max(...rows.map(row => Math.abs(row.net)), 1);
  chart.innerHTML = rows.map(row => {
    const height = Math.max(6, Math.round(Math.abs(row.net) / max * 190));
    return `<div class="bar-wrap" title="${row.year}: ${money.format(row.net)}"><div class="bar ${row.net < 0 ? "loss" : ""}" style="height:${height}px"></div><div class="bar-label">${row.year}</div></div>`;
  }).join("");
}

function renderScheduleSummary(rows) {
  const grouped = {};
  rows.filter(e => !isIncome(e)).forEach(entry => {
    grouped[entry.schedule_line] = (grouped[entry.schedule_line] || 0) + Number(entry.amount_usd || 0);
  });
  const lines = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));
  $("scheduleSummary").innerHTML = lines.length
    ? `<table><thead><tr><th>Line</th><th>Total</th></tr></thead><tbody>${lines.map(([line, total]) => `<tr><td>${lineLabel(line)}</td><td><strong>${money.format(total)}</strong></td></tr>`).join("")}</tbody></table>`
    : `<p class="muted">No expenses for this tax year.</p>`;
}

function reviewCounts() {
  const rows = activeEntries().filter(entry => !entry.deleted_at);
  return {
    total: rows.length,
    needsReview: rows.filter(entry => entry.asset_review && entry.asset_review !== "not_needed").length,
    fmv: rows.filter(entry => entry.record_type === "noncash_income" || entry.record_type.includes("crypto") || /FMV support|Gift\/product|gift|barter|brand/i.test(`${entry.fmv_method} ${entry.evidence_note} ${entry.category}`)).length,
    missingEvidence: rows.filter(entry => !entry.evidence_note && !entry.evidence_file_data && !entry.fmv_method).length,
    deleted: state.entries.filter(entry => entryMatchesBusiness(entry) && entry.deleted_at).length,
  };
}

function renderPortalSnapshot(t = totals(), path = profitPath(recentFiveYearWindow())) {
  const el = $("portalSnapshot");
  if (!el) return;
  const counts = reviewCounts();
  const modeClient = portalMode === "client";
  const rows = modeClient ? [
    ["Add money received", "Record YouTube payouts, client payments, sponsorships, affiliate income, crypto, and platform deposits.", "Add Income", "cash_income"],
    ["Add money spent", "Record gear, studio time, software, contractors, ads, travel, and other business costs.", "Add Expense", "cash_expense"],
    ["Add brand gift or barter", "Track products, trips, services, or items received for posts, reviews, services, or promotions at FMV.", "Add Gift / Barter", "noncash_income"],
    ["Upload proof", "Attach receipts, screenshots, contracts, platform reports, FMV proof, and business-purpose notes.", "Add Proof", "cash_expense"],
  ] : [
    ["Review packet", `${counts.total} active records, ${counts.needsReview} tax-pro review flags, ${counts.fmv} FMV/crypto/gift items.`, "Open Records", "records"],
    ["Profit path", `${path.lossRows.length} loss year(s) in the five-year window. ${path.incomeImproving ? "Income is improving. " : ""}${path.lossNarrowing ? "Losses are narrowing." : ""}`, "Open Profit Review", "factors"],
    ["Evidence gaps", `${counts.missingEvidence} record(s) need stronger notes or proof before filing review.`, "Open Records", "records"],
    ["Export", "Download CSV for review, cleanup, or tax software workpapers.", "Export CSV", "export"],
  ];
  el.innerHTML = `
    <div class="portal-summary">
      <div><span>Selected activity</span><strong>${escapeHtml(businessName(selectedBusinessId()))}</strong></div>
      <div><span>Tax year net</span><strong>${money.format(t.net)}</strong></div>
      <div><span>Records</span><strong>${counts.total}</strong></div>
      <div><span>Review flags</span><strong>${counts.needsReview}</strong></div>
    </div>
    <div class="portal-cards">${rows.map(row => `<div class="portal-card">
      <h4>${escapeHtml(row[0])}</h4>
      <p>${escapeHtml(row[1])}</p>
      <button class="small ${modeClient ? "primary" : ""}" data-portal-action="${escapeHtml(row[3])}">${escapeHtml(row[2])}</button>
    </div>`).join("")}</div>`;
}

function renderRecords() {
  const rows = activeEntries();
  $("recordsTable").innerHTML = rows.length ? `<table><thead><tr><th>Business</th><th>Year</th><th>Date</th><th>Type</th><th>Amount</th><th>Use %</th><th>Schedule C</th><th>Category</th><th>Evidence</th><th>Actions</th></tr></thead><tbody>${rows.map(entry => `
    <tr class="${entry.deleted_at ? "deleted" : ""}">
      <td>${escapeHtml(businessName(entry.business_id))}</td>
      <td>${entry.tax_year}</td>
      <td>${entry.event_date}</td>
      <td><span class="chip ${isIncome(entry) ? "good" : "risk"}">${labelType(entry.record_type)}</span></td>
      <td><strong>${money.format(entry.amount_usd)}</strong></td>
      <td>${Number(entry.allocation_percent || 100)}%${entry.asset_review !== "not_needed" ? `<br><span class="chip warn">${escapeHtml(assetLabel(entry.asset_review))}</span>` : ""}</td>
      <td>${lineLabel(entry.schedule_line)}</td>
      <td>${escapeHtml(entry.category)}<br><span class="muted">${escapeHtml(entry.description)}</span></td>
      <td>${escapeHtml(entry.evidence_note || entry.fmv_method || entry.shared_use_note || "")}${entry.evidence_file_data ? `<br><a href="${entry.evidence_file_data}" target="_blank" rel="noreferrer">View evidence</a>` : ""}</td>
      <td><div class="row-actions">${entry.deleted_at ? `<button class="small" data-restore="${entry.id}">Restore</button>` : `<button class="small" data-edit="${entry.id}">Edit</button><button class="small" data-delete="${entry.id}">Delete</button>`}</div></td>
    </tr>`).join("")}</tbody></table>` : `<p class="muted">No records yet.</p>`;
}

function renderBusinesses() {
  $("businessTable").innerHTML = state.businesses.length ? `<table><thead><tr><th>Name</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead><tbody>${state.businesses.map(business => `<tr>
    <td><strong>${escapeHtml(business.name)}</strong><br><span class="muted">${escapeHtml(business.description)}</span></td>
    <td>${escapeHtml(business.entity_type || "")}</td>
    <td><span class="chip ${business.active ? "good" : "warn"}">${business.active ? "Active" : "Inactive"}</span></td>
    <td><button class="small" data-edit-business="${business.id}">Edit</button></td>
  </tr>`).join("")}</tbody></table>` : `<p class="muted">No businesses yet.</p>`;
}

function renderAudit() {
  $("auditTable").innerHTML = state.audit.length ? `<table><thead><tr><th>Time</th><th>Action</th><th>Record</th><th>Reason</th></tr></thead><tbody>${state.audit.slice(0, 80).map(event => `<tr><td>${event.created_at}</td><td>${event.action}</td><td>${event.entry_id || ""}</td><td>${escapeHtml(event.reason || "")}</td></tr>`).join("")}</tbody></table>` : `<p class="muted">No audit events yet.</p>`;
}

function renderFactors() {
  if (!profitReviewUnlocked) {
    $("factorList").innerHTML = `<div class="alert"><strong>Profit Motive Review locked for now:</strong> The full questions appear after the app detects losses in 3 of the last 5 tax years for this business/activity. Keep adding income, expenses, gifts/barter, crypto, and evidence so the app can watch the profit path.</div>`;
    return;
  }
  const factors = factorsForBusiness();
  $("factorList").innerHTML = factors.map((factor, index) => `<div class="factor">
    <div class="num">${factor.factor_no}</div>
    <div><h4>${factorText[index][0]} <button class="info" data-tip="${escapeHtml(factorText[index][1])}">i</button></h4><p class="muted">${factorText[index][1]}</p></div>
    <select data-factor-answer="${factor.factor_no}">
      <option value="yes" ${factor.answer === "yes" ? "selected" : ""}>Yes</option>
      <option value="mixed" ${factor.answer === "mixed" ? "selected" : ""}>Mixed</option>
      <option value="no" ${factor.answer === "no" ? "selected" : ""}>No</option>
    </select>
    <textarea data-factor-note="${factor.factor_no}" placeholder="Evidence notes, documents, business changes, advisor input">${escapeHtml(factor.note || "")}</textarea>
  </div>`).join("");
}

function renderSettings() {
  $("brandName").textContent = state.settings.brand_name;
  $("sideDisclaimer").textContent = state.settings.disclaimer;
  document.documentElement.style.setProperty("--accent", state.settings.accent_color || "#227c73");
  $("settingBrand").value = state.settings.brand_name || "";
  $("settingAdvisor").value = state.settings.advisor_name || "";
  $("settingContact").value = state.settings.advisor_contact || "";
  $("settingAccent").value = state.settings.accent_color || "#227c73";
  $("settingDisclaimer").value = state.settings.disclaimer || "";
}

function renderAll() {
  renderSettings();
  renderBusinesses();
  renderDashboard();
  renderRecords();
  renderAudit();
  renderFactors();
}

function labelType(type) {
  return {
    cash_income: "Cash income",
    cash_expense: "Cash expense",
    noncash_income: "Non-cash / FMV",
    crypto_income: "Crypto income",
    crypto_expense: "Crypto expense"
  }[type] || type;
}

function assetLabel(value) {
  return {
    not_needed: "No asset review",
    review_needed: "Review needed",
    equipment_asset: "Equipment/asset",
    possible_depreciation: "Depreciation review"
  }[value] || value;
}

async function readEvidenceFile() {
  const file = $("evidenceFile").files?.[0];
  if (!file) return evidenceFilePayload;
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  evidenceFilePayload = { name: file.name, type: file.type || "application/octet-stream", data };
  return evidenceFilePayload;
}

async function readFileInput(inputId) {
  const file = $(inputId).files?.[0];
  if (!file) return { name: "", type: "", data: "" };
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { name: file.name, type: file.type || "application/octet-stream", data };
}

async function formPayload() {
  const file = await readEvidenceFile();
  return {
    business_id: $("recordBusiness").value,
    record_type: $("recordType").value,
    tax_year: $("recordTaxYear").value,
    event_date: $("recordDate").value,
    amount_usd: $("recordAmount").value,
    allocation_percent: $("allocationPercent").value,
    asset_review: $("assetReview").value,
    shared_use_note: $("sharedUseNote").value,
    category: $("recordCategory").value,
    description: $("description").value,
    schedule_line: $("scheduleLine").value,
    counterparty: $("counterparty").value,
    fmv_method: $("fmvMethod").value,
    crypto_asset: $("cryptoAsset").value,
    crypto_amount: $("cryptoAmount").value,
    crypto_wallet: $("cryptoWallet").value,
    transaction_hash: $("transactionHash").value,
    evidence_note: $("evidenceNote").value,
    evidence_file_name: file.name,
    evidence_file_type: file.type,
    evidence_file_data: file.data,
    source: "manual",
    reason: $("editReason").value
  };
}

function editRecord(id) {
  const entry = state.entries.find(row => String(row.id) === String(id));
  if (!entry) return;
  $("formTitle").textContent = `Edit Record #${id}`;
  $("recordId").value = entry.id;
  $("recordBusiness").value = entry.business_id || selectedBusinessId();
  $("recordType").value = entry.record_type;
  $("recordTaxYear").value = entry.tax_year;
  $("recordDate").value = entry.event_date;
  $("recordAmount").value = entry.amount_usd;
  $("allocationPercent").value = entry.allocation_percent || 100;
  $("assetReview").value = entry.asset_review || "not_needed";
  $("sharedUseNote").value = entry.shared_use_note || "";
  $("recordCategory").value = entry.category;
  $("description").value = entry.description;
  $("scheduleLine").value = entry.schedule_line;
  $("counterparty").value = entry.counterparty;
  $("fmvMethod").value = entry.fmv_method;
  $("cryptoAsset").value = entry.crypto_asset;
  $("cryptoAmount").value = entry.crypto_amount || "";
  $("cryptoWallet").value = entry.crypto_wallet;
  $("transactionHash").value = entry.transaction_hash;
  $("evidenceNote").value = entry.evidence_note;
  evidenceFilePayload = {
    name: entry.evidence_file_name || "",
    type: entry.evidence_file_type || "",
    data: entry.evidence_file_data || ""
  };
  $("evidenceFileHint").textContent = evidenceFilePayload.name ? `Attached: ${evidenceFilePayload.name}` : "Optional receipt, screenshot, contract, or FMV proof.";
  $("editReason").value = "";
  $("scheduleLine").dataset.manual = "true";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  $("recordForm").reset();
  $("formTitle").textContent = "Add Record";
  $("recordId").value = "";
  $("recordDate").valueAsDate = new Date();
  $("recordTaxYear").value = $("taxYear").value;
  $("recordBusiness").value = $("businessFilter").value;
  $("allocationPercent").value = 100;
  $("assetReview").value = "not_needed";
  $("evidenceFile").value = "";
  evidenceFilePayload = { name: "", type: "", data: "" };
  $("evidenceFileHint").textContent = "Optional receipt, screenshot, contract, or FMV proof.";
  delete $("scheduleLine").dataset.manual;
  updateLineSuggestion(true);
}

function resetSimpleForm() {
  $("simpleEntryForm").reset();
  $("simpleDate").valueAsDate = new Date();
  $("simpleBusiness").value = $("businessFilter").value;
  $("simpleEvidenceHint").textContent = "Optional proof.";
  updateSimpleMappingPreview();
}

function editBusinessRecord(id) {
  const business = state.businesses.find(item => String(item.id) === String(id));
  if (!business) return;
  $("businessFormTitle").textContent = `Edit ${business.name}`;
  $("businessId").value = business.id;
  $("businessName").value = business.name;
  $("businessType").value = business.entity_type || "";
  $("businessDescription").value = business.description || "";
  $("businessActive").checked = Boolean(business.active);
  document.querySelector('[data-view="businesses"]').click();
}

function resetBusinessForm() {
  $("businessFormTitle").textContent = "Add Business / Activity";
  $("businessForm").reset();
  $("businessId").value = "";
  $("businessActive").checked = true;
}

async function refresh() {
  state = await api("/api/bootstrap");
  renderTaxYears();
  renderLineOptions();
  renderBusinessFilter();
  resetForm();
  resetSimpleForm();
  renderAll();
}

function renderLineOptions() {
  $("scheduleLine").innerHTML = `<option value="">Suggest after I type</option>` + scheduleCLines.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function escapeHtml(text) {
  return String(text ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function toast(text) {
  $("toast").textContent = text;
  $("toast").style.display = "block";
  setTimeout(() => $("toast").style.display = "none", 2400);
}

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    $(button.dataset.view).classList.add("active");
    const labels = {
      dashboard: ["Dashboard", "Track income, expenses, FMV, crypto, and business-purpose evidence."],
      businesses: ["Businesses", "Separate each business/activity so records and profit-motive analysis stay clean."],
      records: ["Records", "Create, edit, soft-delete, restore, and preserve change history."],
      factors: ["Profit Review", "Answer the profit motive factors after a 3-out-of-5 loss pattern appears."],
      imports: ["Batch Import", "Bring in rows from platforms, wallets, banks, or spreadsheets."],
      settings: ["White Label", "Customize the app for Tina Your Tax Bestie LLC or another partner."]
    };
    $("viewTitle").textContent = labels[button.dataset.view][0];
    $("viewSub").textContent = labels[button.dataset.view][1];
  });
});

["recordType", "recordCategory", "description"].forEach(id => {
  $(id).addEventListener("input", () => updateLineSuggestion(false));
  $(id).addEventListener("change", () => updateLineSuggestion(false));
});

["simpleType", "simpleWhat", "simplePurpose"].forEach(id => {
  $(id).addEventListener("input", updateSimpleMappingPreview);
  $(id).addEventListener("change", updateSimpleMappingPreview);
  $(id).addEventListener("keyup", updateSimpleMappingPreview);
  $(id).addEventListener("blur", updateSimpleMappingPreview);
});
$("giftExchangeStatus").addEventListener("change", updateSimpleMappingPreview);

$("scheduleLine").addEventListener("change", () => {
  $("scheduleLine").dataset.manual = "true";
  $("scheduleHint").textContent = `Selected: ${lineLabel($("scheduleLine").value)}.`;
});

$("evidenceFile").addEventListener("change", () => {
  const file = $("evidenceFile").files?.[0];
  $("evidenceFileHint").textContent = file ? `Ready to attach: ${file.name}` : "Optional receipt, screenshot, contract, or FMV proof.";
});

$("simpleEvidenceFile").addEventListener("change", () => {
  const file = $("simpleEvidenceFile").files?.[0];
  $("simpleEvidenceHint").textContent = file ? `Ready to attach: ${file.name}` : "Optional proof.";
});

$("openAdvancedForm").addEventListener("click", () => {
  $("recordForm").classList.toggle("advanced-hidden");
  $("openAdvancedForm").textContent = $("recordForm").classList.contains("advanced-hidden") ? "Use Advanced Fields" : "Hide Advanced Fields";
});

document.querySelectorAll("[data-allocation]").forEach(button => {
  button.addEventListener("click", () => {
    $("allocationPercent").value = button.dataset.allocation;
  });
});

document.querySelectorAll("[data-quick-type]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector('[data-view="records"]').click();
    resetSimpleForm();
    $("simpleType").value = button.dataset.quickType;
    updateSimpleMappingPreview();
    setTimeout(() => $("simpleAmount").focus(), 50);
  });
});

document.querySelectorAll("[data-portal-mode]").forEach(button => {
  button.addEventListener("click", () => {
    portalMode = button.dataset.portalMode;
    document.querySelectorAll("[data-portal-mode]").forEach(item => item.classList.toggle("active", item === button));
    renderDashboard();
  });
});

$("addRecordBtn").addEventListener("click", () => {
  document.querySelector('[data-view="records"]').click();
  resetSimpleForm();
  setTimeout(() => $("simpleAmount").focus(), 50);
});

$("taxYear").addEventListener("change", () => {
  $("recordTaxYear").value = $("taxYear").value;
  renderDashboard();
});

$("businessFilter").addEventListener("change", () => {
  $("recordBusiness").value = $("businessFilter").value;
  renderDashboard();
  renderRecords();
  renderFactors();
});

$("showDeleted").addEventListener("change", renderRecords);
$("resetForm").addEventListener("click", resetForm);

$("recordForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = $("recordId").value;
  if (id && !$("editReason").value.trim()) {
    toast("Add a reason for the edit.");
    return;
  }
  const payload = await formPayload();
  if (id) await api(`/api/entries/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  else await api("/api/entries", { method: "POST", body: JSON.stringify(payload) });
  await refresh();
  toast(id ? "Record edited and recordkeeping history updated." : "Record saved.");
});

$("simpleEntryForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const type = $("simpleType").value;
  const category = $("simpleWhat").value.trim();
  const description = $("simplePurpose").value.trim();
  const giftContext = updateGiftReviewUI(type, `${category} ${description}`.toLowerCase());
  const giftStatus = $("giftExchangeStatus").value;
  const giftStatusText = giftContext.direction === "given" ? {
    yes: "Promo gift/giveaway question: Yes, item was given for business promotion/content/services.",
    no: "Promo gift/giveaway question: No, ordinary expense only.",
    unsure: "Promo gift/giveaway question: Not sure; review needed with a qualified tax professional.",
  }[giftStatus] || "" : {
    yes: "Gift/product question: Yes, received for services/content.",
    no: "Gift/product question: No, not received for services/content.",
    unsure: "Gift/product question: Not sure; review needed with a qualified tax professional.",
  }[giftStatus] || "";
  const file = await readFileInput("simpleEvidenceFile");
  const needsAssetReview = giftStatus === "unsure" || category.toLowerCase().match(/computer|camera|mic|microphone|phone|equipment|laptop/);
  const fmvMethod = type === "noncash_income" || type.includes("crypto") || giftStatus === "yes" || giftStatus === "unsure"
    ? `${fmvEvidenceText} ${giftStatusText}`.trim()
    : "";
  const payload = {
    business_id: $("simpleBusiness").value,
    record_type: type,
    tax_year: $("taxYear").value,
    event_date: $("simpleDate").value,
    amount_usd: $("simpleAmount").value,
    allocation_percent: 100,
    asset_review: giftStatus === "unsure" ? "review_needed" : needsAssetReview ? "possible_depreciation" : "not_needed",
    shared_use_note: "",
    category,
    description,
    schedule_line: inferLineFrom(type, category, description),
    counterparty: $("simpleWho").value,
    fmv_method: fmvMethod,
    crypto_asset: "",
    crypto_amount: "",
    crypto_wallet: "",
    transaction_hash: "",
    evidence_note: [description, giftStatusText].filter(Boolean).join(" "),
    evidence_file_name: file.name,
    evidence_file_type: file.type,
    evidence_file_data: file.data,
    source: "simple_entry",
    reason: "Simple entry"
  };
  await api("/api/entries", { method: "POST", body: JSON.stringify(payload) });
  await refresh();
  toast("Saved simple entry.");
});

document.body.addEventListener("click", async (event) => {
  if (event.target.classList.contains("info")) {
    event.preventDefault();
    return;
  }
  const edit = event.target.dataset.edit;
  const editBusiness = event.target.dataset.editBusiness;
  const del = event.target.dataset.delete;
  const restore = event.target.dataset.restore;
  const startReview = event.target.dataset.startReview;
  const portalAction = event.target.dataset.portalAction;
  if (portalAction) {
    if (portalAction === "export") {
      window.location.href = "/api/export.csv";
      return;
    }
    if (["records", "factors"].includes(portalAction)) {
      document.querySelector(`[data-view="${portalAction}"]`).click();
      return;
    }
    document.querySelector('[data-view="records"]').click();
    resetSimpleForm();
    $("simpleType").value = portalAction === "cash_expense" || portalAction === "cash_income" || portalAction === "noncash_income" ? portalAction : "cash_expense";
    updateSimpleMappingPreview();
    setTimeout(() => $("simpleAmount").focus(), 50);
    return;
  }
  if (startReview) {
    profitReviewUnlocked = true;
    renderFactors();
    document.querySelector('[data-view="factors"]').click();
    toast("Showing the 9-factor educational review for this business.");
  }
  if (edit) editRecord(edit);
  if (editBusiness) editBusinessRecord(editBusiness);
  if (del) {
    const reason = prompt("Reason for deleting this record? This will be preserved in the recordkeeping history.");
    if (reason === null) return;
    await api(`/api/entries/${del}?reason=${encodeURIComponent(reason || "Soft deleted by user")}`, { method: "DELETE" });
    await refresh();
    toast("Record soft-deleted.");
  }
  if (restore) {
    await api(`/api/entries/${restore}/restore`, { method: "PUT", body: "{}" });
    await refresh();
    toast("Record restored.");
  }
});

$("saveFactors").addEventListener("click", async () => {
  if (!profitReviewUnlocked) {
    toast("Profit review appears after a 3-out-of-5 loss pattern.");
    return;
  }
  const factors = factorsForBusiness().map(factor => ({
    factor_no: factor.factor_no,
    answer: document.querySelector(`[data-factor-answer="${factor.factor_no}"]`).value,
    note: document.querySelector(`[data-factor-note="${factor.factor_no}"]`).value
  }));
  await api("/api/factors", { method: "PUT", body: JSON.stringify({ business_id: selectedBusinessId(), factors }) });
  await refresh();
  toast("Section 183 factors saved.");
});

$("businessForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = $("businessId").value;
  const payload = {
    name: $("businessName").value,
    entity_type: $("businessType").value,
    description: $("businessDescription").value,
    active: $("businessActive").checked
  };
  if (id) await api(`/api/businesses/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  else await api("/api/businesses", { method: "POST", body: JSON.stringify(payload) });
  await refresh();
  toast(id ? "Business updated." : "Business added.");
});

$("newBusiness").addEventListener("click", resetBusinessForm);

$("saveSettings").addEventListener("click", async () => {
  await api("/api/settings", {
    method: "PUT",
    body: JSON.stringify({
      brand_name: $("settingBrand").value,
      advisor_name: $("settingAdvisor").value,
      advisor_contact: $("settingContact").value,
      accent_color: $("settingAccent").value,
      disclaimer: $("settingDisclaimer").value,
      current_tax_year: $("taxYear").value
    })
  });
  await refresh();
  toast("White-label settings saved.");
});

$("importBtn").addEventListener("click", async () => {
  await api("/api/import.csv", { method: "POST", body: JSON.stringify({ csv: $("csvImport").value }) });
  $("csvImport").value = "";
  await refresh();
  toast("CSV imported.");
});

$("seedBtn").addEventListener("click", async () => {
  const year = Number($("taxYear").value || new Date().getFullYear());
  const findBusiness = (text) => state.businesses.find(business => business.name.toLowerCase().includes(text))?.id;
  const ensureDemoBusiness = async (name, entity_type, description) => {
    const found = state.businesses.find(business => business.name.toLowerCase() === name.toLowerCase());
    if (found) return found.id;
    const saved = await api("/api/businesses", { method: "POST", body: JSON.stringify({ name, entity_type, description }) });
    state.businesses.push(saved);
    return saved.id;
  };
  const youtube = findBusiness("youtube") || await ensureDemoBusiness("YouTube Content Activity", "Creator activity", "Content creation, sponsorships, platform income, brand gifts, and creator equipment.");
  const rapper = await ensureDemoBusiness("Rap Artist Activity", "Music artist", "Streaming royalties, shows, merch, studio work, licensing, and music content.");
  const demo = [
    [rapper, "cash_income", year - 4, `${year - 4}-01-15`, 9000, 100, "not_needed", "", "Streaming and shows", "Streaming royalties, features, and local show income", "income", "Music platforms / venues", "", "", "", "", "", "Demo: profitable rapper year"],
    [rapper, "cash_expense", year - 4, `${year - 4}-02-15`, 5200, 100, "not_needed", "", "Studio time", "Recording studio rental", "20b", "Recording studio", "", "", "", "", "", "Studio time maps to rent/lease other business property"],
    [rapper, "cash_income", year - 3, `${year - 3}-01-15`, 12500, 100, "not_needed", "", "Music income", "Streaming, merch, and paid performance income", "income", "Music platforms / venues", "", "", "", "", "", "Demo: income increasing"],
    [rapper, "cash_expense", year - 3, `${year - 3}-02-15`, 6400, 100, "not_needed", "", "Promotion", "Single release advertising campaign", "8", "Ad platform", "", "", "", "", "", "Business purpose: promote new music"],
    [rapper, "cash_income", year - 2, `${year - 2}-01-15`, 18800, 100, "not_needed", "", "Music income", "Streaming, merch, licensing, and show income", "income", "Music platforms / venues", "", "", "", "", "", "Demo: profitable music activity"],
    [rapper, "cash_expense", year - 2, `${year - 2}-02-15`, 8300, 100, "not_needed", "", "Contract labor", "Producer, engineer, and graphic designer", "11", "Contractors", "", "", "", "", "", "Contractor records should be reviewed before filing"],
    [youtube, "cash_income", year - 4, `${year - 4}-01-15`, 700, 100, "not_needed", "", "YouTube AdSense", "Early creator revenue", "income", "YouTube", "", "", "", "", "", "Demo: startup creator income"],
    [youtube, "cash_expense", year - 4, `${year - 4}-02-18`, 4200, 100, "possible_depreciation", "", "Camera and mic", "Creator equipment for filming", "13", "Electronics store", "", "", "", "", "", "Startup equipment review"],
    [youtube, "cash_income", year - 3, `${year - 3}-01-15`, 1500, 100, "not_needed", "", "Affiliate income", "Affiliate and platform income increased", "income", "Affiliate platform", "", "", "", "", "", "Demo: income improving but still loss"],
    [youtube, "cash_expense", year - 3, `${year - 3}-02-18`, 3900, 100, "not_needed", "", "Studio time", "Studio time for filming creator content", "20b", "Studio", "", "", "", "", "", "Studio time maps to Line 20b"],
    [youtube, "noncash_income", year - 2, `${year - 2}-02-03`, 600, 100, "review_needed", "", "Brand gift", "Camera accessory package received for a review post", "income", "Brand partner", "Retail product page screenshot saved. Gift/product question: Yes, received for services/content.", "", "", "", "", "FMV support needed before tax filing"],
    [youtube, "cash_income", year - 2, `${year - 2}-03-15`, 2800, 100, "not_needed", "", "Sponsorship", "Cash sponsorship for creator campaign", "income", "Brand partner", "", "", "", "", "", "Demo: income improving"],
    [youtube, "cash_expense", year - 2, `${year - 2}-04-04`, 4300, 100, "not_needed", "", "Software and editing", "Video editing software and contractor support", "18", "Software / editor", "", "", "", "", "", "Demo: third loss year triggers review"],
    [youtube, "cash_income", year - 1, `${year - 1}-01-15`, 6200, 100, "not_needed", "", "Creator income", "AdSense, affiliate, and sponsorship income", "income", "Platforms / brands", "", "", "", "", "", "Demo: income growing"],
    [youtube, "cash_expense", year - 1, `${year - 1}-04-04`, 5600, 100, "not_needed", "", "Operating expenses", "Editing, subscriptions, and production support", "18", "Vendors", "", "", "", "", "", "Demo: first profitable creator year"],
    [youtube, "cash_income", year, `${year}-01-15`, 8900, 100, "not_needed", "", "Creator income", "AdSense, affiliate, sponsorship, and product sales", "income", "Platforms / brands", "", "", "", "", "", "Demo: still growing"],
    [youtube, "crypto_income", year, `${year}-03-10`, 1250, 100, "review_needed", "", "Crypto sponsorship", "Paid in USDC for content campaign", "income", "Web3 brand", "Exchange USD value at receipt", "USDC", 1250, "Coinbase", "0x-demo", "Transaction hash and screenshot attached later"],
    [youtube, "cash_expense", year, `${year}-04-04`, 7800, 100, "possible_depreciation", "", "Computer", "Computer used for video editing and content production", "13", "Electronics store", "", "", "", "", "", "Demo: business still close to break-even with asset review"]
  ];
  for (const row of demo) {
    await api("/api/entries", {
      method: "POST",
      body: JSON.stringify({
        business_id: row[0], record_type: row[1], tax_year: row[2], event_date: row[3], amount_usd: row[4],
        allocation_percent: row[5], asset_review: row[6], shared_use_note: row[7],
        category: row[8], description: row[9], schedule_line: row[10], counterparty: row[11],
        fmv_method: row[12], crypto_asset: row[13], crypto_amount: row[14], crypto_wallet: row[15],
        transaction_hash: row[16], evidence_note: row[17], reason: "Demo seed"
      })
    });
  }
  await refresh();
  toast("Demo records loaded.");
});

refresh().catch(error => {
  document.body.innerHTML = `<main style="padding:24px"><h1>Backend not running</h1><p>Start the local MVP server first, then open the localhost URL.</p><pre>${escapeHtml(error.message)}</pre></main>`;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
