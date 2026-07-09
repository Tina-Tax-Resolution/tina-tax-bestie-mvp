# Tina Your Tax Bestie Profit Motive MVP

This is a local-first MVP for an educational recordkeeping and tax-readiness app for creators, freelancers, side-business owners, and self-employed taxpayers.

It is designed for educational and record-organization purposes only. It is not legal, tax, accounting, or Circular 230 written tax advice. Users should consult a qualified tax professional before filing, claiming deductions, taking a tax position, or responding to the IRS.

## Run Locally

From this folder:

```bash
python3 server.py
```

Then open:

```text
http://127.0.0.1:8765
```

## Phone Use

This MVP is now mobile-ready and PWA-ready for the owner to use as the first real client.

For local testing on a phone, the computer running the server and the phone must be on the same network. Start the server on the computer, then use the computer's local network address from the phone. For real use away from home, deploy the app to a secure hosted environment with proper user accounts and backups.

Phone-focused features:

- Save-to-home-screen metadata
- Mobile layout and bottom navigation
- Quick-add buttons for income, expense, gift/barter, and crypto
- Camera/file capture field for receipts, screenshots, contracts, and FMV proof
- Evidence file stored locally with the record in the SQLite database

## Host Online For Phone Access

Recommended first host: Render.

Why Render first:

- It can run this Python backend.
- It supports a persistent disk for the SQLite database.
- It gives you a phone-accessible HTTPS URL.
- It can be opened without a demo password sign-on for incubator presentation and early walkthrough use.

Important: this no-password MVP is for demonstration and controlled testing. Do not enter sensitive taxpayer/client records until a real account/login system is added.

Detailed deployment steps are in `DEPLOY_TO_RENDER.md`.

### Render Setup

1. Create or sign in to a Render account.
2. Create a new Web Service from this folder/repository.
3. Use these settings:
   - Runtime: Python
   - Build command: `PYTHONPYCACHEPREFIX=/tmp python3 -m py_compile server.py`
   - Start command: `PYTHONPYCACHEPREFIX=/tmp HOST=0.0.0.0 python3 server.py`
4. Add a persistent disk:
   - Mount path: `/var/data`
   - Size: 1 GB to start
5. Add environment variables:
   - `DATA_DIR=/var/data`
6. Deploy, then open the Render URL from your phone.

The deployment files included for this are:

- `render.yaml`
- `Procfile`
- `requirements.txt`
- `.gitignore`
- `DEPLOY_TO_RENDER.md`

The app creates a local SQLite database at:

```text
data/tytb_profit_motive.sqlite3
```

## MVP Features

- Local SQLite backend for stronger retention than browser-only storage
- No password pop-up for incubator/demo walkthroughs
- Clean first-user experience with no preloaded demo income, expenses, or business activity
- Business/activity typeahead suggestions for common work such as rideshare, delivery, trucking, creator, beauty, music, tax, and freelance services
- Client Portal mode for novice users to quickly add income, expenses, brand gifts/barter, crypto, and proof
- Tax Pro Review mode for seeing review flags, FMV items, evidence gaps, profit path, and export readiness
- Multiple business/activity tracking so records are not mixed across activities
- Per-business profit path review and Bestie Alert when losses reach 3 out of 5 years
- Shared expense allocation fields for computers, microphones, cameras, software, and other mixed-use items
- Equipment/asset review flags for items that may need depreciation, Section 179, or tax professional review
- Income, expense, non-cash income, brand gift, barter, crypto income, and crypto expense records
- Fair market value tracking for non-cash compensation
- Crypto token amount, wallet/exchange, and transaction hash fields
- Schedule C line mapping after the user types an item; studio/studio time maps to line 20b rent or lease: other business property
- Records screen defaults to the selected tax year only, with an optional show-all-years toggle
- Current tax year is labeled as live year-to-date, while prior years remain separate
- Profit motive questions stay hidden until the 3-out-of-5 loss pattern appears
- Gift/barter review question for items received in exchange for a post, review, service, or promotion
- Expense-side promo gift review only when the user appears to be giving a product/sample/gift/giveaway for promotion, content, or business services
- FMV evidence helper with IRS publication links and prompts for screenshots, comparable sales, invoices, contracts, exchange prices, or appraisals
- Hobby treatment note explaining that income may still need reporting and ordinary hobby expenses may be limited or unavailable, with COGS/inventory reviewed by a qualified tax professional
- Tooltips for complex tax words
- Edit records with required edit reason
- Soft delete and restore
- Recordkeeping history for creates, edits, deletes, restores, and imports
- CSV export and batch CSV import
- White-label brand name, advisor name, contact, color, and disclaimer settings

## Educational Tax Principles Reflected

- Section 183 profit-motive review uses the nine-factor framework as an educational organizer.
- The app explains that no single factor is determinative and that the totality of facts and circumstances matters.
- The Section 183 review prompts for continuity, regularity, and primary income/profit purpose.
- The app warns that sporadic activity, amusement, or diversion may not qualify as a trade or business.
- The record form includes a substantiation reminder for Section 274-style records: amount, date/time/place, business purpose, and business relationship or recipient.
- The app tracks gifts, barter, brand products, trips, crypto, and other items received in exchange for services/content at fair market value for review.

Case-learning references the user requested for educational content review include Gaston v. Commissioner, T.C. Memo. 2021-107, and Stewart v. Commissioner, T.C. Summary Opinion 2024-3. The app does not provide legal conclusions from those cases; it uses the recordkeeping and substantiation concepts as educational prompts only.

## White-Label Positioning

Suggested positioning:

> A tax-readiness and contemporaneous recordkeeping platform that helps creators, freelancers, and side-business owners separate business activities, organize business evidence, track income and expenses, document FMV and crypto, and understand Section 183 profit-motive factors before tax season.

## Client Portal / Tax Pro Workflow

The incubator MVP is structured around two jobs:

- The client captures records in real time: money received, money spent, brand products, barter, crypto, screenshots, receipts, contracts, and business-purpose notes.
- The tax pro reviews the record packet: Schedule C organizer lines, FMV support, review-needed flags, missing evidence, soft-delete history, and the profit path before tax season.

This makes the product different from a plain bookkeeping tracker. The product is not only asking "did you make a profit or loss?" It is watching whether the taxpayer has a contemporaneous business story: separate activities, improving income, narrowing losses, FMV documentation, substantiation, and profit-motive readiness when a 3-out-of-5 loss pattern appears.

## Next Build Layer

- User accounts and client/advisor roles
- Multi-client firm dashboard
- Secure evidence uploads
- Bank/platform/wallet integrations
- PDF tax-professional review packet
- Admin white-label tenant management
- Cloud deployment option
# tina-tax-bestie-mvp
