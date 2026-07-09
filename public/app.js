const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const $ = (id) => document.getElementById(id);

const factorText = [
  ["Do you keep records for this business?", "Examples: receipts, income reports, bank statements, invoices, mileage logs, calendars, screenshots, or notes saved when things happen."],
  ["Do you save proof when money goes out?", "Receipts, screenshots, bank/card records, invoices, or notes can help explain what was paid and why."],
  ["Do you track the money you make?", "Examples: platform payout reports, 1099s, cash logs, invoices, client payments, brand deal records, or bank deposits."],
  ["Have you changed anything to make more money or lower costs?", "Examples: raised prices, changed content strategy, reduced subscriptions, switched vendors, added marketing, or stopped something that was losing money."],
  ["Do you spend regular time working on this business?", "Examples: creating, editing, driving, selling, pitching, bookkeeping, planning, posting, or serving clients."],
  ["Have you learned skills or asked experts for help?", "Examples: courses, coaching, advisor meetings, industry research, books, webinars, or paid consulting."],
  ["Are any business assets expected to grow in value?", "Examples: brand name, website, inventory, equipment, domain, intellectual property, or other business assets."],
  ["Have you made money in this or another business before?", "Examples: profitable years, profitable months, prior business success, major deals, or similar work that made money."],
  ["Is this mainly being run like a business, not just for fun?", "Examples: planning, pricing, marketing, records, routines, client work, contracts, deadlines, and efforts to make a profit."]
];

const scheduleCLines = [
  ["income", "Income - Schedule C line 1, gross receipts or sales"],
  ["needs_info", "Needs info - add description for Schedule C mapping"],
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

const businessSuggestions = [
  { name: "Uber / rideshare driver", type: "Rideshare", words: ["ube", "uber", "rideshare", "ride share", "driver"] },
  { name: "Lyft / rideshare driver", type: "Rideshare", words: ["lyft", "rideshare"] },
  { name: "Instacart / delivery shopper", type: "Delivery", words: ["inst", "insta", "instacart", "shopper"] },
  { name: "DoorDash / delivery driver", type: "Delivery", words: ["door", "dash", "doordash", "delivery"] },
  { name: "Trucker / owner-operator", type: "Transportation", words: ["tru", "truck", "trucker", "owner operator", "freight"] },
  { name: "Content creator", type: "Creator", words: ["yt", "youtube", "youtuber", "creator", "content", "contentn", "contn", "content creator", "influencer", "tiktok", "podcast", "podcaster", "streamer"] },
  { name: "Rapper / music artist", type: "Music artist", words: ["rap", "rapper", "music", "artist", "streaming"] },
  { name: "Hair stylist / barber", type: "Beauty service", words: ["hair", "barber", "stylist", "beauty"] },
  { name: "Tax / bookkeeping service", type: "Professional service", words: ["tax", "book", "bookkeeping", "accounting"] },
  { name: "Freelance creative service", type: "Freelancer", words: ["free", "freelance", "designer", "editor", "writer"] },
];

const paymentTypeOptions = {
  cash_income: [
    ["", "How were you paid?"],
    ["cash", "Cash"],
    ["check", "Check"],
    ["bank_deposit", "Bank deposit / ACH"],
    ["card_processor", "Debit / credit card processor"],
    ["zelle_venmo", "Zelle / Venmo / Cash App"],
    ["platform_payout", "Platform payout"],
    ["brand_deal", "Brand deal / sponsorship"],
    ["affiliate", "Affiliate payout"],
    ["crypto_business", "Crypto"],
    ["product_gift_barter", "Product / gift / barter"],
    ["other_income", "Other income"]
  ],
  cash_expense: [
    ["", "Select payment method"],
    ["debit_credit", "Debit / credit card"],
    ["cash", "Cash"],
    ["bank_transfer", "Bank transfer"],
    ["zelle_venmo", "Zelle / Venmo / Cash App"],
    ["platform_fee", "Platform fee"],
    ["other_expense", "Other expense payment"]
  ],
  noncash_income: [
    ["", "Select non-cash type"],
    ["brand_product", "Brand product received"],
    ["barter", "Barter / trade"],
    ["trip_event", "Trip / event access"],
    ["service_received", "Service received"],
    ["other_noncash", "Other non-cash item"]
  ],
  crypto_income: [
    ["", "Select crypto income type"],
    ["crypto_payment", "Crypto payment received"],
    ["crypto_sponsorship", "Crypto sponsorship"],
    ["mining_staking", "Mining / staking / reward"],
    ["other_crypto_income", "Other crypto income"]
  ],
  crypto_expense: [
    ["", "Select crypto payment type"],
    ["crypto_paid", "Crypto paid"],
    ["gas_fee", "Gas/network fee"],
    ["exchange_fee", "Exchange fee"],
    ["other_crypto_expense", "Other crypto expense"]
  ]
};

let state = { settings: {}, businesses: [], entries: [], factors: [], audit: [] };
const localStoreKey = "taxBestieLocalDemoV1";
let localDemoMode = window.location.protocol === "file:";
let evidenceFilePayload = { name: "", type: "", data: "" };
let profitReviewUnlocked = false;
let profitReviewSubmitted = false;
let currentFactorIndex = 0;
let selectedTaxYearMemory = "";
let selectedBusinessMemory = "";
let recordWizard = {
  step: 0,
  businessId: "",
  businessName: "",
  type: "",
  payment: "",
  date: "",
  dateMonth: "",
  dateDay: "",
  amount: "",
  what: "",
  who: "",
  giftStatus: "",
  proofChoice: "",
  proofName: "",
  proofType: "",
  proofData: ""
};
const hobbyTreatmentNote = "If this activity is not engaged in for profit, income may still need to be reported, but ordinary hobby expenses may be limited or unavailable as deductions under current federal rules. Inventory or cost-of-goods-sold questions should be reviewed separately with a qualified tax professional. Educational only.";
const fmvEvidenceText = "FMV support: save retail listing, comparable sale, invoice, contract, exchange price, appraised value, or other contemporaneous proof. Educational only; confer with a qualified tax professional.";

function lineLabel(line) {
  if (!line) return "Needs info - add description for Schedule C mapping";
  if (line === "income_line_1") return "Schedule C Line 1 - Gross receipts or sales organizer";
  if (line === "review_needed") return "Review needed - not counted in profit/loss";
  return (scheduleCLines.find(([value]) => value === line) || ["27b", "Line 27b - Other expenses"])[1];
}

function selectedBusiness() {
  return state.businesses.find(business => Number(business.id) === selectedBusinessId());
}

function selectedBusinessTypeText() {
  const business = selectedBusiness();
  return `${business?.name || ""} ${business?.entity_type || ""} ${business?.description || ""}`.toLowerCase();
}

function isTransportationBusiness() {
  return /truck|trucker|transportation|owner operator|freight|dot|over the road|otr/.test(selectedBusinessTypeText());
}

function businessIsSelectedOrTyped() {
  return Boolean(selectedBusinessId() || String(recordWizard.businessName || "").trim());
}

function expenseWords() {
  return `${$("simpleWhat")?.value || ""} ${$("simplePurpose")?.value || ""} ${$("simplePaymentType")?.value || ""}`.toLowerCase();
}

function expenseReviewSignals(words = expenseWords()) {
  return {
    meal: /meal|restaurant|coffee|lunch|dinner|food|per diem|truck stop/.test(words),
    vehicle: /mileage|miles|gas|fuel|parking|toll|car|truck|vehicle|rideshare|delivery/.test(words),
    homeOffice: /home office|office at home|business use of home|home workspace|utilities|electric|internet|wifi|rent|mortgage/.test(words),
    travel: /hotel|flight|airfare|travel|lodging|conference|trip/.test(words),
    asset: /computer|laptop|camera|microphone|mic|equipment|gear|phone|printer|tablet/.test(words),
    studio: /studio|studio time|recording studio|workspace|coworking/.test(words),
  };
}

function simpleAmountNumber() {
  const value = normalizeMoneyValue($("simpleAmount")?.value || "");
  return value ? Number(value) : 0;
}

const standardMileageRates = {
  2021: [{ label: "2021", rate: 0.56 }],
  2022: [{ label: "Jan 1-Jun 30", rate: 0.585 }, { label: "Jul 1-Dec 31", rate: 0.625 }],
  2023: [{ label: "2023", rate: 0.655 }],
  2024: [{ label: "2024", rate: 0.67 }],
  2025: [{ label: "2025", rate: 0.70 }]
};

function mileageRateText(year = $("taxYear")?.value) {
  const rates = standardMileageRates[Number(year)];
  if (!rates) return `No hard-coded mileage rate is stored for TY ${year || "selected year"} yet; save mileage details and verify the IRS rate before filing.`;
  return `TY ${year} standard mileage organizer rate: ${rates.map(item => `${item.label} ${Math.round(item.rate * 1000) / 10} cents/mile`).join("; ")}.`;
}

function expenseReviewNote(signals, amount = 0, words = "") {
  const year = $("taxYear")?.value || "selected TY";
  const notes = [];
  if (signals.meal) {
    notes.push(isTransportationBusiness()
      ? `Meal review: transportation/DOT-style business selected, so Tax Bestie flags this for the 80% transportation meal review path for TY ${year}.`
      : `Meal review: general business meal path, commonly organized for 50% review for TY ${year}.`);
  }
  if (signals.vehicle) {
    notes.push(`Mileage/vehicle review: ${mileageRateText(year)} Do not include personal commuting miles.`);
  }
  if (signals.homeOffice) {
    notes.push(`Home office review: organize square footage, regular/exclusive business use, and simplified vs actual-expense support for TY ${year}.`);
  }
  if (signals.asset || (amount >= 2000 && !signals.studio && !signals.meal && !signals.vehicle && !signals.homeOffice)) {
    notes.push("Equipment/asset review: larger equipment may need depreciation or Section 179 review instead of a simple same-year expense.");
  }
  if (/truck|trucker|freight|owner operator/i.test(words) && !isTransportationBusiness()) {
    notes.push("Business type check: this sounds transportation-related, but the selected business is not marked as trucker/transportation.");
  }
  return notes;
}

function resultLabel(net) {
  if (net < 0) return `Net Loss ${money.format(net)}`;
  if (net > 0) return `Net Profit ${money.format(net)}`;
  return "Break even $0.00";
}

function wizardReset(type = "") {
  const selectedId = $("businessFilter")?.value || "";
  const selectedName = selectedId ? businessName(selectedId) : "";
  recordWizard = {
    step: 0,
    businessId: selectedId,
    businessName: selectedName,
    type,
    payment: "",
    date: "",
    dateMonth: "",
    dateDay: "",
    amount: "",
    what: "",
    who: "",
    giftStatus: "",
    proofChoice: "",
    proofName: "",
    proofType: "",
    proofData: ""
  };
  renderRecordWizard();
}

function startWizardType(type, options = {}) {
  const keepBusinessName = options.keepBusinessName ?? recordWizard.businessName;
  const keepBusinessId = options.keepBusinessId ?? recordWizard.businessId ?? $("businessFilter")?.value ?? "";
  wizardReset(type);
  if (keepBusinessId) recordWizard.businessId = String(keepBusinessId);
  if (keepBusinessName) recordWizard.businessName = keepBusinessName;
  recordWizard.step = type ? 1 : 0;
  renderRecordWizard();
}

function showGuidedEntry(type = "") {
  goToView("capture", "Add Record", "Answer one question at a time to save income, expenses, products, gifts, or barter.");
  document.querySelector(".record-wizard-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (type) startWizardType(type);
  else renderRecordWizard();
}

function parseWizardDate(value) {
  const raw = String(value || "").trim();
  const selectedYear = $("taxYear")?.value || "";
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const match = raw.match(/^(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?$/);
  if (!match) return "";
  const month = Number(match[1]);
  const day = Number(match[2]);
  let year = match[3] ? Number(match[3]) : Number(selectedYear);
  if (year < 100) year += 2000;
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return "";
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function displayWizardDate(value) {
  const parsed = parseWizardDate(value);
  if (!parsed) return value || "";
  const [year, month, day] = parsed.split("-");
  return `${month}/${day}/${year}`;
}

function wizardDateParts() {
  const parsed = parseWizardDate(recordWizard.date);
  if (parsed) {
    const [, month, day] = parsed.split("-");
    return { month, day };
  }
  return {
    month: recordWizard.dateMonth || "",
    day: recordWizard.dateDay || ""
  };
}

function syncWizardDateParts() {
  const year = $("taxYear")?.value || "";
  const month = String(recordWizard.dateMonth || "").trim();
  const day = String(recordWizard.dateDay || "").trim();
  if (!/^\d{4}$/.test(year) || !month || !day) {
    recordWizard.date = "";
    return "";
  }
  const parsed = parseWizardDate(`${month}/${day}/${year}`);
  recordWizard.date = parsed;
  return parsed;
}

function quarterFromDate(dateValue) {
  const parsed = String(dateValue || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(parsed)) return "";
  const month = Number(parsed.slice(5, 7));
  if (!month) return "";
  return `Q${Math.ceil(month / 3)}`;
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
  const text = `${$("recordCategory").value || ""} ${$("description").value || ""}`.toLowerCase();
  updateAdvancedCounterpartyLabel();
  if (force || !$("scheduleLine").dataset.manual) $("scheduleLine").value = inferred;
  if (!inferred && !$("recordType").value.includes("income")) {
    $("scheduleHint").textContent = "Type the category or description first; the app will suggest a Schedule C organizer line.";
    return;
  }
  if (!$("recordType").value.includes("income") && inferred === "24b") {
    const transportationMeal = /truck|trucker|transportation|dot|driver|over the road|otr|hours of service/.test(text);
    $("scheduleHint").textContent = transportationMeal
      ? "Suggested: Line 24b - Meals review. Transportation worker meals may follow a different review path than ordinary business meals; save trip details and confirm the tax-year rule with a qualified tax professional."
      : "Suggested: Line 24b - Meals review. The app stores the full receipt amount and flags the general meal review path. Confirm treatment with a qualified tax professional.";
    return;
  }
  if (!$("recordType").value.includes("income") && inferred === "9") {
    $("scheduleHint").textContent = "Suggested: Line 9 - Car and truck expenses. Mileage should use the IRS rate for the selected tax year, or actual expenses if that method applies. Do not include personal commuting miles.";
    return;
  }
  if (!$("recordType").value.includes("income") && inferred === "30") {
    $("scheduleHint").textContent = "Suggested: Line 30 - Business use of home. Home office can be organized using the simplified square-foot method or the actual expense method. The space usually needs regular and exclusive business use; review with a qualified tax professional.";
    return;
  }
  $("scheduleHint").textContent = $("recordType").value === "noncash_income"
    ? "Non-cash items received for services, reviews, posts, or brand work may be income at FMV. Document why it was received and how FMV was determined."
    : $("recordType").value.includes("income")
      ? "Suggested income treatment: gross receipts or other income review."
      : `Suggested: ${lineLabel(inferred)}. Change it if your facts are different.`;
}

function updateAdvancedCounterpartyLabel() {
  const label = $("counterpartyLabel");
  const input = $("counterparty");
  if (!label || !input) return;
  const type = $("recordType").value;
  if (type === "cash_expense" || type === "crypto_expense") {
    label.textContent = "Payee";
    input.placeholder = "Amazon, studio, contractor, software company, exchange";
  } else if (type === "noncash_income") {
    label.textContent = "Provider / brand";
    input.placeholder = "Brand, sponsor, PR agency, person";
  } else if (type === "crypto_income") {
    label.textContent = "Payer / exchange / wallet";
    input.placeholder = "Brand, client, Coinbase, wallet";
  } else {
    label.textContent = "Payer";
    input.placeholder = "YouTube, TikTok, Meta, brand, client, affiliate network";
  }
}

function updateSimpleMappingPreview() {
  const type = $("simpleType").value;
  const what = $("simpleWhat").value.trim();
  const purpose = $("simplePurpose").value.trim();
  const paymentValue = $("simplePaymentType")?.value || "";
  const line = inferLineFrom(type, what, purpose);
  const words = `${what} ${purpose} ${paymentValue}`.toLowerCase();
  updateSimpleEntryLabels(type);
  updatePaymentTypeOptions(type);
  updateSimplePresetButtons(type);
  const giftContext = updateGiftReviewUI(type, words);
  const giftStatus = $("giftExchangeStatus")?.value || "";
  updateGiftReviewHint(giftContext);
  updatePaymentContext();
  updateFmvHelp(type, giftContext, giftStatus);
  renderBestieQuickCheck(type, words, giftContext, giftStatus);
  const preview = $("simpleSchedulePreview");
  if (!preview) return;
  preview.classList.toggle("empty", !what && !purpose);
  if (type === "cash_income" && paymentValue === "crypto_business") {
    preview.textContent = "Crypto business payment: save the USD value at the time received. This app includes business crypto payments in income, but does not calculate later crypto gain/loss.";
    return;
  }
  if (type === "cash_income" && paymentValue === "product_gift_barter") {
    preview.textContent = "Product/gift/barter received: save the fair market value and answer whether it was received for content, review, service, or promotion.";
    return;
  }
  if (type === "cash_income") {
    preview.textContent = "Income can be saved with tax year, date, amount, and payment type. Payer and proof are optional.";
    return;
  }
  if (!what && !purpose) {
    preview.textContent = type.includes("income")
      ? "Add what was received if this was a gift, barter, product, or crypto item."
      : "Optional: add what you paid for to get a Schedule C organizer suggestion. Blank expenses save as Needs info.";
    return;
  }
  if (type.includes("income")) {
    const giftNote = giftStatus === "yes" && giftContext.direction === "received"
      ? " Gift/product was marked as received for services/content, so FMV support is important."
      : giftStatus === "unsure"
        ? " Gift/product was marked not sure, so this will be saved as review-needed."
        : "";
    preview.textContent = `Maps as income. Review FMV if this is a product, gift, barter, or crypto.${giftNote}`;
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
  preview.textContent = `Suggested Schedule C line: ${lineLabel(line || "needs_info")}. ${reason}${giftGivenNote ? ` ${giftGivenNote}` : ""}`;
}

function renderBestieQuickCheck(type = $("simpleType")?.value, words = expenseWords(), giftContext = { visible: false, direction: "" }, giftStatus = $("giftExchangeStatus")?.value || "") {
  const box = $("bestieQuickCheck");
  if (!box) return;
  const amount = simpleAmountNumber();
  const signals = expenseReviewSignals(words);
  const isExpense = type === "cash_expense" || type === "crypto_expense";
  const checks = [];

  if (isExpense && signals.meal) {
    if (isTransportationBusiness()) {
      checks.push({
        tone: "warn",
        title: "Transportation meal quick check",
        text: "This looks like a meal for a trucker/transportation business. Tax Bestie will organize it under the transportation meal review path only if the facts support it.",
        buttons: ["Business travel meal", "Not sure", "No"]
      });
    } else {
      checks.push({
        tone: "",
        title: "Meal quick check",
        text: "This looks like a meal. Tax Bestie will keep the full receipt amount and organize it for general meal review.",
        buttons: ["Business meal", "Not sure", "No"]
      });
    }
  }
  if (isExpense && signals.vehicle) {
    checks.push({
      tone: "",
      title: "Mileage / vehicle quick check",
      text: "This looks like mileage, gas, tolls, parking, or vehicle use. Save the receipt or mileage log if you have it.",
      buttons: ["Have proof", "Add later", "Not sure"]
    });
  }
  if (isExpense && signals.homeOffice) {
    checks.push({
      tone: "warn",
      title: "Home office quick check",
      text: "This may involve home office or mixed-use costs. Tax Bestie will mark it for review so square footage, business use, and proof can be checked later.",
      buttons: ["Mark for review", "Not now", "Not sure"]
    });
  }
  if (isExpense && (signals.asset || amount >= 2000)) {
    checks.push({
      tone: "warn",
      title: "Equipment / asset quick check",
      text: "This looks like a larger item or equipment. It may need asset review instead of being treated like a simple dollar-for-dollar expense.",
      buttons: ["Mark for review", "Add receipt", "Not sure"]
    });
  }
  if ((type === "noncash_income" || giftContext.direction === "received") && (giftStatus === "yes" || giftStatus === "unsure" || signals.asset || words)) {
    checks.push({
      tone: giftStatus === "unsure" ? "warn" : "",
      title: "Product / gift quick check",
      text: "Save the dollar value and proof for products, trips, services, or gifts received for content, reviews, promotion, or business activity.",
      buttons: ["Received for work", "Not sure", "No"]
    });
  }

  if (!checks.length) {
    box.classList.add("field-hidden");
    box.innerHTML = "";
    return;
  }

  box.classList.remove("field-hidden");
  box.innerHTML = `<div class="bestie-quick-grid">${checks.slice(0, 2).map(check => `
    <div class="bestie-quick-card ${check.tone}">
      <strong>Bestie Quick Check: ${escapeHtml(check.title)}</strong>
      <p>${escapeHtml(check.text)}</p>
      <div class="pill-row">${check.buttons.map(button => `<span class="pill">${escapeHtml(button)}</span>`).join("")}</div>
    </div>
  `).join("")}</div>`;
}

function wizardTypeChoices() {
  return [
    ["cash_income", "Add business income", "Money made from business activities: payments, payouts, cash, checks, platform income, and brand deals"],
    ["cash_expense", "Add business expense", "Money spent to run or operate the business or provide products/services"],
    ["noncash_income", "Add product, gift, or barter", "Non-cash items received for a service, review, promotion, post, or brand deal"]
  ];
}

function wizardSteps() {
  if (!recordWizard.type) return [{ key: "business" }, { key: "type" }];
  if (recordWizard.type === "cash_income") return [
    { key: "business" },
    { key: "type" },
    { key: "payment" },
    { key: "date" },
    { key: "amount" },
    { key: "who" },
    { key: "proofChoice" },
    ...(recordWizard.proofChoice === "yes" ? [{ key: "proof" }] : []),
    { key: "review" }
  ];
  if (recordWizard.type === "cash_expense") return [
    { key: "business" },
    { key: "type" },
    { key: "what" },
    { key: "date" },
    { key: "amount" },
    { key: "who" },
    { key: "proofChoice" },
    ...(recordWizard.proofChoice === "yes" ? [{ key: "proof" }] : []),
    { key: "review" }
  ];
  const steps = [
    { key: "business" },
    { key: "type" },
    { key: "giftStatus" },
    { key: "what" }
  ];
  if (recordWizard.giftStatus === "yes") steps.push({ key: "date" }, { key: "amount" });
  steps.push({ key: "who" }, { key: "proofChoice" });
  if (recordWizard.proofChoice === "yes") steps.push({ key: "proof" });
  steps.push({ key: "review" });
  return steps;
}

function currentWizardStep() {
  const steps = wizardSteps();
  recordWizard.step = Math.max(0, Math.min(recordWizard.step, steps.length - 1));
  return steps[recordWizard.step]?.key || "type";
}

function wizardStepLabel(key) {
  return {
    business: "Business",
    type: "Record type",
    payment: "Payment",
    giftStatus: "Gift check",
    what: "Details",
    date: "Date",
    amount: "Amount",
    who: "Payer/Payee",
    proofChoice: "Proof",
    proof: "Upload",
    review: "Review"
  }[key] || "Step";
}

function renderWizardProgressSteps(steps) {
  const el = $("recordWizardProgressSteps");
  if (!el) return;
  el.innerHTML = steps.map((item, index) => {
    const className = index < recordWizard.step ? "done" : index === recordWizard.step ? "active" : "";
    return `<span class="${className}"><b>${index + 1}</b>${escapeHtml(wizardStepLabel(item.key))}</span>`;
  }).join("");
}

function wizardChoiceButtons(choices, field) {
  return `<div class="wizard-choices">${choices.map(([value, title, helper]) => `
    <button type="button" class="wizard-choice ${recordWizard[field] === value ? "selected" : ""}" data-wizard-choice="${escapeHtml(field)}" data-value="${escapeHtml(value)}">
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(helper || "")}</small>
    </button>
  `).join("")}</div>`;
}

function wizardTextInput(field, label, placeholder, helper = "", inputmode = "text") {
  return `<label class="wizard-input">${escapeHtml(label)}
    <input id="wizardInput" data-wizard-input="${escapeHtml(field)}" inputmode="${escapeHtml(inputmode)}" value="${escapeHtml(field === "date" ? displayWizardDate(recordWizard[field]) : recordWizard[field] || "")}" placeholder="${escapeHtml(placeholder)}">
    ${helper ? `<span class="helper">${escapeHtml(helper)}</span>` : ""}
  </label>`;
}

function wizardImpactAmount() {
  const amount = Number(normalizeMoneyValue(recordWizard.amount || "0") || 0);
  if (!amount || amount <= 0) return { income: 0, expenses: 0, counts: false, amount: 0 };
  if (recordWizard.type === "cash_income") return { income: amount, expenses: 0, counts: true, amount };
  if (recordWizard.type === "cash_expense") return { income: 0, expenses: amount, counts: true, amount };
  if (recordWizard.type === "noncash_income" && recordWizard.giftStatus === "yes") {
    return { income: amount, expenses: 0, counts: true, amount };
  }
  return { income: 0, expenses: 0, counts: false, amount };
}

function currentRecordFileReady() {
  return Boolean($("taxYear")?.value && businessIsSelectedOrTyped());
}

function wizardBusinessIdForTotals() {
  const selected = selectedBusinessId();
  if (selected) return selected;
  if (recordWizard.businessId) return Number(recordWizard.businessId);
  const typed = String(recordWizard.businessName || "").trim().toLowerCase();
  if (!typed) return 0;
  const exact = state.businesses.find(business => business.name.toLowerCase() === typed);
  if (exact) {
    recordWizard.businessId = String(exact.id);
    if ($("businessFilter")) $("businessFilter").value = String(exact.id);
    return Number(exact.id);
  }
  return 0;
}

function selectedYearTotalsStrip(businessId = wizardBusinessIdForTotals()) {
  const year = $("taxYear")?.value || "";
  if (!year || !businessId) return "";
  const t = totals(year, businessId);
  const path = profitPath(recentFiveYearWindow(businessId));
  const highFlags = readinessFlags(t);
  const lossText = path.lossRows.length
    ? `${path.lossRows.length} completed loss year${path.lossRows.length === 1 ? "" : "s"} in the five-year lookback`
    : "No completed loss years in this five-year lookback yet";
  const alertText = path.threeLossTrigger
    ? `<div class="alert risk compact-alert"><strong>Bestie Alert:</strong> Losses appear in 3 of the last 5 completed tax years. The Business Check-In should be completed for educational record organization and discussion with a qualified tax professional.</div>`
    : highFlags.hasFlags && t.net < 0
      ? readinessAlertHtml(t)
      : "";
  return `<div class="year-total-strip">
    <div><span>Selected file</span><strong>TY ${escapeHtml(year)}</strong></div>
    <div><span>Saved completed income</span><strong>${money.format(t.income)}</strong></div>
    <div><span>Saved completed expenses</span><strong>${money.format(t.expenses)}</strong></div>
    <div><span>Current saved result</span><strong class="${t.net < 0 ? "loss-text" : t.net > 0 ? "profit-text" : ""}">${resultLabel(t.net)}</strong></div>
    <div><span>5-year watch</span><strong>${escapeHtml(lossText)}</strong></div>
  </div>${alertText}`;
}

function wizardLivePreviewHtml() {
  if (!businessIsSelectedOrTyped()) {
    return `<div class="alert"><strong>Choose business/activity:</strong> Add or select the business first. Tax Bestie needs the business type before it can organize meals, mileage, home office, trucker/transportation items, and profit/loss by tax year.</div>`;
  }
  if (!$("taxYear")?.value) {
    return `<div class="alert"><strong>Choose a tax year:</strong> Select the tax year at the top so Tax Bestie can show live profit or loss for the right record file.</div>`;
  }
  const t = totals($("taxYear").value, wizardBusinessIdForTotals());
  const impact = wizardImpactAmount();
  const afterIncome = t.income + impact.income;
  const afterExpenses = t.expenses + impact.expenses;
  const afterNet = afterIncome - afterExpenses;
  const parsedDate = parseWizardDate(recordWizard.date);
  const quarter = quarterFromDate(parsedDate);
  const quarterRows = parsedDate ? entriesForYear($("taxYear").value, wizardBusinessIdForTotals()).filter(entry => quarterFromDate(entry.event_date) === quarter) : [];
  const savedQuarter = quarterRows.reduce((sum, entry) => {
    if (isIncome(entry)) sum.income += Number(entry.amount_usd || 0);
    else sum.expenses += Number(entry.amount_usd || 0);
    return sum;
  }, { income: 0, expenses: 0 });
  const afterQuarterIncome = savedQuarter.income + impact.income;
  const afterQuarterExpenses = savedQuarter.expenses + impact.expenses;
  const typeText = recordWizard.type === "cash_income"
    ? "business income"
    : recordWizard.type === "cash_expense"
      ? "business expense"
      : recordWizard.giftStatus === "yes"
        ? "product/gift FMV income organizer"
        : recordWizard.giftStatus === "unsure"
          ? "review-only product/gift note"
          : recordWizard.giftStatus === "no"
            ? "personal gift note"
            : "record";
  const countText = impact.counts
    ? `This ${typeText} is not counted yet. It will be included after you finish the review step and click Complete & Save Record.`
    : recordWizard.type === "noncash_income" && recordWizard.giftStatus
      ? `This ${typeText} is not counted in profit/loss yet. It stays in the file for review.`
      : "Enter the amount or FMV to see the live profit/loss impact before saving.";
  const highQuarter = quarter && afterQuarterExpenses > 0 && (afterQuarterIncome === 0 || afterQuarterExpenses >= afterQuarterIncome * 1.5);
  const highYear = afterNet < 0 && afterExpenses >= Math.max(afterIncome * 1.5, 1);
  const alert = highQuarter || highYear
    ? `<div class="alert warn"><strong>Bestie Alert:</strong> ${highQuarter ? `For ${escapeHtml(quarter)} in TY ${escapeHtml($("taxYear").value)}, money spent is heavily outpacing money made.` : `Based on this entry, TY ${escapeHtml($("taxYear").value)} money spent is heavily outpacing money made.`} Business investments can be normal, but these records may need stronger support. Attach receipts, contracts, pitches, platform reports, or notes so a qualified tax professional can review the file.</div>`
    : "";
  const expenseNote = recordWizard.type === "cash_expense"
    ? expenseReviewNote(expenseReviewSignals(recordWizard.what.toLowerCase()), impact.amount, recordWizard.what).map(note => `<li>${escapeHtml(note)}</li>`).join("")
    : "";
  return `${selectedYearTotalsStrip(wizardBusinessIdForTotals())}<div class="alert compact-alert"><strong>Not saved yet:</strong> The entry you are typing is only a preview until you reach Review and click Complete & Save Record.</div><div class="live-preview-grid">
    <div><span>Completed records saved for TY ${escapeHtml($("taxYear").value)}</span><strong>${money.format(t.net)}</strong><small>Saved income ${money.format(t.income)} | Saved expenses ${money.format(t.expenses)}</small></div>
    <div><span>This unsaved entry</span><strong>${impact.counts ? money.format(impact.amount) : "Review only"}</strong><small>${escapeHtml(typeText)}</small></div>
    <div><span>Projected TY ${escapeHtml($("taxYear").value)} result</span><strong class="${afterNet < 0 ? "loss-text" : afterNet > 0 ? "profit-text" : ""}">${resultLabel(afterNet)}</strong><small>Income ${money.format(afterIncome)} | Expenses ${money.format(afterExpenses)}</small></div>
  </div>
  <div class="calculator-callout ${afterNet < 0 ? "loss" : afterNet > 0 ? "profit" : ""}">
    <strong>Tax Bestie calculator:</strong> TY ${escapeHtml($("taxYear").value)} would show ${escapeHtml(resultLabel(afterNet))} after this record.
  </div>
  <p class="muted">${escapeHtml(countText)}</p>
  ${expenseNote ? `<div class="wizard-hint"><strong>Expense review:</strong><ul>${expenseNote}</ul></div>` : ""}
  ${alert}`;
}

function renderWizardLivePreview() {
  const box = $("wizardLivePreview");
  if (!box) return;
  box.innerHTML = wizardLivePreviewHtml();
}

function wizardQuestionHtml(step) {
  const year = $("taxYear")?.value || "the selected tax year";
  if (step === "business") {
    return `<div class="wizard-question">
      <h4>What business or activity is this for?</h4>
      <p class="muted">Type the business/activity once. Tax Bestie will keep using the selected tax year until you change it at the top.</p>
      ${wizardTextInput("businessName", "Business / activity", "Type your business or activity", "Example: rideshare driver, delivery shopper, content creator, tax service")}
    </div>`;
  }
  if (step === "type") {
    return `<div class="wizard-question">
      <h4>What are you adding for ${escapeHtml(year)}?</h4>
      <p class="muted">Choose the kind of record. If this belongs to a different tax year, change the tax year at the top before saving.</p>
      ${wizardChoiceButtons(wizardTypeChoices(), "type")}
    </div>`;
  }
  if (step === "payment") {
    return `<div class="wizard-question">
      <h4>How were you paid?</h4>
      <p class="muted">This helps organize the income record. It still maps to Schedule C income organizer review.</p>
      ${wizardChoiceButtons([
        ["cash", "Cash", "Cash received for business activity"],
        ["check", "Check", "Check payment received"],
        ["platform", "Platform payout", "YouTube, TikTok, affiliate, marketplace, Stripe"],
        ["client", "Client payment", "Invoice or direct client payment"],
        ["brand_deal", "Brand deal", "Sponsorship, paid post, promotion"],
        ["crypto_business", "Crypto business payment", "USD value at time received; business payments only"]
      ], "payment")}
    </div>`;
  }
  if (step === "giftStatus") {
    return `<div class="wizard-question">
      <h4>Was this received for a post, review, service, promotion, brand deal, or barter?</h4>
      <p class="muted">Answer this before entering value. If yes, Tax Bestie asks for the date and fair market value so it can be organized for income review.</p>
      <div class="wizard-hint">Bestie note: brand promotions and non-cash deals can still be part of business records. Save the details and review tax treatment with a qualified tax professional.</div>
      ${wizardChoiceButtons([
        ["yes", "Yes, it was connected to business activity", "Post, review, service, promotion, brand deal, or barter"],
        ["no", "No, personal gift", "Tax Bestie will not count it in business income"],
        ["unsure", "Not sure", "Saved as review needed and not counted in profit/loss yet"]
      ], "giftStatus")}
    </div>`;
  }
  if (step === "what") {
    const isExpense = recordWizard.type === "cash_expense";
    const isGift = recordWizard.type === "noncash_income";
    const line = isExpense && recordWizard.what ? inferLineFrom("cash_expense", recordWizard.what, "") : "";
    return `<div class="wizard-question">
      <h4>${isExpense ? "What did you spend money on for your business activity?" : isGift ? "What did you receive?" : "What was it?"}</h4>
      <p class="muted">${isExpense ? "Type the business expense. Tax Bestie will suggest a Schedule C organizer line in the background." : "Keep this short and practical."}</p>
      ${wizardTextInput("what", isExpense ? "Business expense" : "Item received", isExpense ? "Studio time, mic, software, meals, mileage" : "Shoes, camera, hotel stay, product, service")}
      ${isExpense ? `<div class="wizard-hint" id="wizardMappingHint">${recordWizard.what ? `<strong>Suggested Schedule C organizer line:</strong> ${escapeHtml(lineLabel(line))}. ${/studio/i.test(recordWizard.what) ? "Studio time looks like rented business space." : "Review with a qualified tax professional before filing."}` : "Type the expense to see the Schedule C organizer mapping."}</div>` : ""}
    </div>`;
  }
  if (step === "date") {
    const { month, day } = wizardDateParts();
    const parsed = syncWizardDateParts() || parseWizardDate(recordWizard.date);
    const yearText = /^\d{4}$/.test(String(year)) ? String(year) : "Select TY";
    return `<div class="wizard-question">
      <h4>What date did this happen?</h4>
      <p class="muted">${/^\d{4}$/.test(String(year)) ? `For TY ${escapeHtml(year)}, enter only the month and day. The year is locked from the tax year selected at the top.` : "Choose the tax year at the top first. Then Tax Bestie will lock the year here."}</p>
      <div class="wizard-date-grid">
        <label>Month
          <input data-wizard-date-part="month" inputmode="numeric" maxlength="2" value="${escapeHtml(month)}" placeholder="MM">
        </label>
        <label>Day
          <input data-wizard-date-part="day" inputmode="numeric" maxlength="2" value="${escapeHtml(day)}" placeholder="DD">
        </label>
        <label>Tax year
          <input value="${escapeHtml(yearText)}" readonly aria-readonly="true">
        </label>
      </div>
      <div class="wizard-hint"><strong>Selected tax year:</strong> ${escapeHtml(yearText)}. If this record belongs to another year, change the tax year at the top before saving.</div>
      ${parsed ? `<div class="wizard-hint"><strong>Will save as:</strong> ${escapeHtml(displayWizardDate(parsed))}</div>` : ""}
    </div>`;
  }
  if (step === "amount") {
    const isGift = recordWizard.type === "noncash_income";
    return `<div class="wizard-question">
      <h4>${isGift ? "What was the fair market value?" : recordWizard.type === "cash_income" ? "How much did you receive?" : "How much did you pay?"}</h4>
      <p class="muted">${isGift ? "Use the dollar value at the time received. Save proof such as a retail page, invoice, contract, or screenshot if you can." : "Enter dollars and cents if needed."}</p>
      ${wizardTextInput("amount", isGift ? "Fair market value" : "Amount", "0.00", isGift ? "Proof can be a retail page, invoice, contract, screenshot, or comparable value." : "", "decimal")}
    </div>`;
  }
  if (step === "who") {
    const label = recordWizard.type === "cash_expense" ? "Who did you pay?" : recordWizard.type === "noncash_income" ? "Who gave it to you?" : "Who paid you?";
    return `<div class="wizard-question">
      <h4>${escapeHtml(label)}</h4>
      <p class="muted">Optional, but helpful for your record file.</p>
      ${wizardTextInput("who", label, recordWizard.type === "cash_expense" ? "Studio, Amazon, software company" : "Brand, platform, sponsor, client")}
    </div>`;
  }
  if (step === "proof") {
    return `<div class="wizard-question">
      <h4>Add proof now</h4>
      <p class="muted">Upload a receipt, screenshot, contract, payout report, or FMV proof if you have it now.</p>
      <label class="wizard-input">Receipt / screenshot / proof
        <input id="recordWizardProofInput" type="file" accept="image/*,.pdf" capture="environment">
        <span class="helper">${escapeHtml(recordWizard.proofName || "You can skip this and add proof later.")}</span>
      </label>
    </div>`;
  }
  if (step === "proofChoice") {
    return `<div class="wizard-question">
      <h4>Do you have proof to add now?</h4>
      <p class="muted">Proof is optional for this step. You can save the record now and add support later if needed.</p>
      ${wizardChoiceButtons([
        ["yes", "Yes, add proof now", "Receipt, screenshot, contract, payout report, or FMV support"],
        ["no", "No, skip for now", "Save the record without a file attached"]
      ], "proofChoice")}
    </div>`;
  }
  return wizardReviewHtml();
}

function wizardReviewHtml() {
  const typeLabel = wizardTypeChoices().find(([value]) => value === recordWizard.type)?.[1] || "Record";
  const parsedDate = parseWizardDate(recordWizard.date);
  const schedule = recordWizard.type === "cash_expense" ? lineLabel(inferLineFrom("cash_expense", recordWizard.what, "")) : "Schedule C Line 1 - Gross receipts or sales organizer";
  const giftNote = recordWizard.type === "noncash_income" && recordWizard.giftStatus !== "yes"
    ? `<p><strong>Counting:</strong> Not counted in income or profit/loss yet. ${recordWizard.giftStatus === "no" ? "You marked it personal." : "You marked it not sure, so it is saved as review needed."}</p>`
    : "";
  return `<div class="wizard-question">
    <h4>Review before saving</h4>
    <div class="wizard-review">
      <p><strong>Type:</strong> ${escapeHtml(typeLabel)}</p>
      ${recordWizard.payment ? `<p><strong>Payment type:</strong> ${escapeHtml(paymentTypeLabel("cash_income", recordWizard.payment) || recordWizard.payment)}</p>` : ""}
      ${recordWizard.giftStatus ? `<p><strong>Business connection:</strong> ${escapeHtml(recordWizard.giftStatus === "yes" ? "Yes, received for business activity" : recordWizard.giftStatus === "no" ? "No, personal gift" : "Not sure - review needed")}</p>` : ""}
      ${recordWizard.what ? `<p><strong>What:</strong> ${escapeHtml(recordWizard.what)}</p>` : ""}
      ${parsedDate ? `<p><strong>Date:</strong> ${escapeHtml(displayWizardDate(parsedDate))}</p>` : ""}
      ${recordWizard.amount ? `<p><strong>Amount / FMV:</strong> ${money.format(Number(normalizeMoneyValue(recordWizard.amount) || 0))}</p>` : ""}
      ${recordWizard.who ? `<p><strong>Provider / payer / payee:</strong> ${escapeHtml(recordWizard.who)}</p>` : ""}
      <p><strong>Organizer mapping:</strong> ${escapeHtml(schedule)}</p>
      ${giftNote}
      <p class="muted">Tax Bestie organizes records only. It does not decide deductibility, taxability, business status, or Circular 230 written tax advice. Review with a qualified tax professional.</p>
    </div>
  </div>`;
}

function renderRecordWizard() {
  const card = $("recordWizardCard");
  if (!card) return;
  const steps = wizardSteps();
  const step = currentWizardStep();
  const percent = Math.round((recordWizard.step / Math.max(steps.length - 1, 1)) * 100);
  if ($("recordWizardStep")) $("recordWizardStep").textContent = `Step ${recordWizard.step + 1} of ${steps.length}`;
  if ($("recordWizardPercent")) $("recordWizardPercent").textContent = `${percent}% complete`;
  if ($("recordWizardFill")) $("recordWizardFill").style.width = `${percent}%`;
  renderWizardProgressSteps(steps);
  document.querySelectorAll("[data-wizard-start-type]").forEach(button => {
    button.classList.toggle("active", button.dataset.wizardStartType === recordWizard.type);
  });
  card.innerHTML = wizardQuestionHtml(step);
  $("recordWizardBack")?.classList.toggle("field-hidden", recordWizard.step === 0);
  $("recordWizardNext")?.classList.toggle("field-hidden", step === "review");
  if ($("recordWizardNext")) {
    $("recordWizardNext").textContent = step === "proofChoice" || step === "proof" ? "Next: Review" : "Next";
  }
  $("recordWizardSave")?.classList.toggle("field-hidden", step !== "review");
  renderWizardLivePreview();
}

function validateWizardStep() {
  const step = currentWizardStep();
  const year = $("taxYear")?.value;
  if (step === "business" && !recordWizard.businessName.trim()) return "Type the business or activity before continuing.";
  if (step === "type" && !recordWizard.type) return "Choose what you are adding.";
  if (step === "payment" && !recordWizard.payment) return "Choose how you were paid.";
  if (step === "giftStatus" && !recordWizard.giftStatus) return "Choose whether this was received because of your business activity.";
  if (step === "what" && !recordWizard.what.trim()) return recordWizard.type === "cash_expense" ? "Type what you spent money on." : "Type what you received.";
  if (step === "date") {
    if (!year) return "Choose the tax year first.";
    const parsed = parseWizardDate(recordWizard.date);
    if (!parsed) return "Enter a valid date.";
    const check = dateMatchesTaxYear(parsed, year);
    if (!check.ok) return check.message;
  }
  if (step === "amount" && !validMoneyValue(recordWizard.amount)) return "Enter a valid dollar amount.";
  if (step === "proofChoice" && !recordWizard.proofChoice) return "Choose whether you want to add proof now.";
  return "";
}

async function readWizardProof() {
  const field = $("recordWizardProofInput");
  if (!field?.files?.length) return;
  const file = await readFileInput("recordWizardProofInput");
  recordWizard.proofName = file.name;
  recordWizard.proofType = file.type;
  recordWizard.proofData = file.data;
}

function syncWizardInput() {
  document.querySelectorAll("[data-wizard-date-part]").forEach(input => {
    const cleaned = input.value.replace(/\D/g, "").slice(0, 2);
    recordWizard[input.dataset.wizardDatePart === "month" ? "dateMonth" : "dateDay"] = cleaned;
  });
  syncWizardDateParts();
  const input = $("wizardInput");
  if (input?.dataset?.wizardInput) {
    recordWizard[input.dataset.wizardInput] = input.value.trim();
  }
}

function updateWizardMappingHint() {
  const hint = $("wizardMappingHint");
  if (!hint) return;
  const words = recordWizard.what || "";
  if (!words.trim()) {
    hint.textContent = "Type the expense to see the Schedule C organizer mapping.";
    return;
  }
  const line = inferLineFrom("cash_expense", words, "");
  hint.innerHTML = `<strong>Suggested Schedule C organizer line:</strong> ${escapeHtml(lineLabel(line))}. ${/studio/i.test(words) ? "Studio time looks like rented business space." : "Review with a qualified tax professional before filing."}`;
}

async function saveWizardRecord() {
  syncWizardInput();
  if (recordWizard.businessName.trim()) {
    $("simpleBusinessSearch").value = recordWizard.businessName.trim();
    applyBusinessSuggestionToInput("simpleBusinessSearch");
  }
  const businessId = await ensureSimpleBusiness();
  const taxYear = $("taxYear").value;
  if (!taxYear) {
    toast("Choose the tax year before saving.");
    return;
  }
  const parsedDate = parseWizardDate(recordWizard.date);
  const dateCheck = recordWizard.type === "noncash_income" && recordWizard.giftStatus !== "yes"
    ? { ok: true }
    : dateMatchesTaxYear(parsedDate, taxYear);
  if (!dateCheck.ok) {
    toast(dateCheck.message);
    return;
  }

  const isGiftReviewOnly = recordWizard.type === "noncash_income" && recordWizard.giftStatus !== "yes";
  const amount = isGiftReviewOnly ? "0.00" : Number(normalizeMoneyValue(recordWizard.amount || "0")).toFixed(2);
  if (!isGiftReviewOnly && (!amount || Number(amount) <= 0)) {
    toast("Enter a valid dollar amount before saving.");
    return;
  }

  const paymentText = recordWizard.payment ? (paymentTypeLabel("cash_income", recordWizard.payment) || recordWizard.payment) : "";
  const scheduleLine = recordWizard.type === "cash_expense"
    ? inferLineFrom("cash_expense", recordWizard.what, "")
    : recordWizard.type === "cash_income" || (recordWizard.type === "noncash_income" && recordWizard.giftStatus === "yes")
      ? "income_line_1"
      : "review_needed";
  const recordType = isGiftReviewOnly ? "review_note" : recordWizard.type === "noncash_income" ? "noncash_income" : recordWizard.type;
  const giftText = recordWizard.type === "noncash_income"
    ? recordWizard.giftStatus === "yes"
      ? "Gift/product question: Yes, received for business activity such as a post, review, service, promotion, brand deal, or barter."
      : recordWizard.giftStatus === "no"
        ? "Gift/product question: No, marked as personal and not counted in business income by Tax Bestie."
        : "Gift/product question: Not sure; saved as review needed and not counted in income or profit/loss yet."
    : "";
  const simpleSignals = expenseReviewSignals(recordWizard.what.toLowerCase());
  const reviewNotes = recordWizard.type === "cash_expense" ? expenseReviewNote(simpleSignals, Number(amount), recordWizard.what) : [];
  const quickNotes = [];
  if (recordWizard.type === "cash_expense") {
    quickNotes.push(...reviewNotes.map(note => `Bestie Quick Check: ${note}`));
  }

  const payload = {
    business_id: businessId,
    record_type: recordType,
    tax_year: taxYear,
    event_date: parsedDate || `${taxYear}-01-01`,
    amount_usd: amount,
    allocation_percent: 100,
    asset_review: isGiftReviewOnly || (simpleSignals.asset && Number(amount) >= 2000) || simpleSignals.homeOffice || simpleSignals.meal || simpleSignals.vehicle || recordWizard.giftStatus === "unsure" ? "review_needed" : "not_needed",
    shared_use_note: "",
    category: recordWizard.what || (recordWizard.type === "cash_income" ? paymentText || "Business income" : "Review needed"),
    description: recordWizard.type === "cash_income" ? paymentText : "",
    schedule_line: scheduleLine,
    counterparty: recordWizard.who || "",
    fmv_method: recordWizard.type === "noncash_income" ? `${fmvEvidenceText} ${giftText}`.trim() : "",
    crypto_asset: "",
    crypto_amount: "",
    crypto_wallet: "",
    transaction_hash: "",
    evidence_note: [paymentText ? `Payment/remittance type: ${paymentText}.` : "", giftText, ...quickNotes].filter(Boolean).join(" ") || "Guided entry",
    evidence_file_name: recordWizard.proofName,
    evidence_file_type: recordWizard.proofType,
    evidence_file_data: recordWizard.proofData,
    source: "guided_entry",
    reason: "Guided entry"
  };

  await api("/api/entries", { method: "POST", body: JSON.stringify(payload) });
  selectedTaxYearMemory = String(taxYear);
  selectedBusinessMemory = String(businessId);
  recordWizard.businessId = String(businessId);
  recordWizard.businessName = businessName(businessId);
  await refresh();
  $("taxYear").value = taxYear;
  $("recordTaxYear").value = taxYear;
  $("businessFilter").value = String(businessId);
  $("simpleBusiness").value = String(businessId);
  selectedTaxYearMemory = String(taxYear);
  selectedBusinessMemory = String(businessId);
  recordWizard.businessId = String(businessId);
  recordWizard.businessName = businessName(businessId);
  updateBusinessSearchFromSelect();
  updateExportLink();
  renderDashboard();
  renderRecords();
  renderFactors();
  showPostSavePanel();
  toast(isGiftReviewOnly ? "Saved as Review Needed. It is not counted in income or profit/loss yet." : "Saved.");
}

function setSimpleType(type) {
  $("simpleType").value = type;
  updateSimpleMappingPreview();
  const nextFocus = $("simpleAmount");
  if (nextFocus) setTimeout(() => nextFocus.focus(), 20);
}

function updateSimplePresetButtons(type = $("simpleType")?.value) {
  document.querySelectorAll("[data-simple-preset]").forEach(button => {
    button.classList.toggle("active", button.dataset.simplePreset === type);
  });
}

function dateMatchesTaxYear(dateValue, taxYear) {
  if (!dateValue) return { ok: false, message: "Add the date before saving this contemporaneous record." };
  const year = Number(String(dateValue).slice(0, 4));
  const selected = Number(taxYear);
  if (!selected) return { ok: false, message: "Choose the tax year before saving." };
  if (!year) return { ok: false, message: "Choose a valid date before saving." };
  if (year !== selected) {
    return {
      ok: false,
      message: `The date is in ${year}, but the selected tax year is ${selected}. Change the date or the tax year before saving.`
    };
  }
  return { ok: true, message: "" };
}

function setDateBoundsForTaxYear() {
  const year = $("taxYear")?.value || "";
  ["recordDate"].forEach(id => {
    const field = $(id);
    if (!field) return;
    if (year) {
      field.min = `${year}-01-01`;
      field.max = `${year}-12-31`;
    } else {
      field.removeAttribute("min");
      field.removeAttribute("max");
    }
  });
  updateTaxYearRangeHelp();
}

function updateTaxYearRangeHelp() {
  const el = $("taxYearRangeHelp");
  if (!el) return;
  const year = $("taxYear")?.value || "";
  const business = $("businessFilter")?.value ? businessName($("businessFilter").value) : "";
  if (!year) {
    el.textContent = "Choose a tax year to see the January 1 through December 31 record period.";
    return;
  }
  el.innerHTML = `<strong>Tax Year ${escapeHtml(year)}:</strong> January 1, ${escapeHtml(year)} through December 31, ${escapeHtml(year)}${business ? ` for ${escapeHtml(business)}` : ""}.`;
}

function clearMismatchedDate(fieldId, taxYear = $("taxYear")?.value) {
  const field = $(fieldId);
  if (!field?.value || !taxYear) return;
  const check = dateMatchesTaxYear(field.value, taxYear);
  if (!check.ok) {
    field.value = "";
    toast(check.message);
  }
}

function normalizeMoneyValue(value) {
  return String(value || "").replace(/[$,\s]/g, "");
}

function validMoneyValue(value) {
  const normalized = normalizeMoneyValue(value);
  return normalized && /^\d+(\.\d{1,2})?$/.test(normalized) && Number(normalized) > 0;
}

function moneyFieldValue(id) {
  const normalized = normalizeMoneyValue($(id).value);
  return normalized ? Number(normalized).toFixed(2) : "";
}

function updateSimpleEntryLabels(type = $("simpleType").value) {
  const amountLabel = $("simpleAmountLabel");
  const whatLabel = $("simpleWhatLabel");
  const whoLabel = $("simpleWhoLabel");
  const purposeLabel = $("simplePurposeLabel");
  const whatInput = $("simpleWhat");
  const whoInput = $("simpleWho");
  const purposeInput = $("simplePurpose");
  const whatField = $("simpleWhatField");
  const whoField = $("simpleWhoField");
  const purposeField = $("simplePurposeField");
  if (!amountLabel || !whoLabel) return;
  if (whatField) whatField.classList.remove("field-hidden");
  if (whoField) whoField.classList.remove("field-hidden");
  if (purposeField) purposeField.classList.add("field-hidden");
  if (whatLabel) whatLabel.textContent = "What was it? (optional)";
  if (purposeLabel) purposeLabel.textContent = "Short note (optional)";
  if (type === "cash_expense" || type === "crypto_expense") {
    amountLabel.textContent = type === "crypto_expense" ? "USD value paid" : "Amount paid";
    whoLabel.textContent = "Payee";
    if (whatInput) whatInput.placeholder = type === "crypto_expense" ? "Optional: gas fee, exchange fee, crypto paid to vendor" : "Optional: studio time, computer, mic, software, ads";
    if (whoInput) whoInput.placeholder = "Optional: studio, Amazon, contractor, software company";
    if (purposeInput) purposeInput.placeholder = "Optional note";
  } else if (type === "noncash_income") {
    amountLabel.textContent = "Fair market value";
    whoLabel.textContent = "Provider / brand";
    if (whatLabel) whatLabel.textContent = "What did you receive?";
    if (purposeField) purposeField.classList.remove("field-hidden");
    if (purposeLabel) purposeLabel.textContent = "Gift/barter note";
    if (whatInput) whatInput.placeholder = "Brand product, sponsored trip, barter service, gifted equipment";
    if (whoInput) whoInput.placeholder = "Optional: brand, sponsor, company, person";
    if (purposeInput) purposeInput.placeholder = "What post, review, service, or promotion was expected?";
  } else if (type === "crypto_income") {
    amountLabel.textContent = "USD value received";
    whoLabel.textContent = "Payer / exchange / wallet";
    if (whatInput) whatInput.placeholder = "Optional: USDC sponsorship, crypto payment, token reward";
    if (whoInput) whoInput.placeholder = "Optional: brand, client, Coinbase, wallet";
    if (purposeInput) purposeInput.placeholder = "Optional note";
  } else {
    amountLabel.textContent = "Amount received";
    whoLabel.textContent = "Payer";
    if (whatField) whatField.classList.add("field-hidden");
    if (purposeField) purposeField.classList.add("field-hidden");
    if (whoInput) whoInput.placeholder = "Optional: YouTube, TikTok, Meta, brand, client";
    if (purposeInput) purposeInput.placeholder = "Optional note";
  }
  updateTaxYearRangeHelp();
}

function updatePaymentTypeOptions(type = $("simpleType").value) {
  const select = $("simplePaymentType");
  const label = $("simplePaymentLabel");
  if (!select || !label) return;
  const current = select.value;
  const options = paymentTypeOptions[type] || paymentTypeOptions.cash_expense;
  label.textContent = type.includes("income") ? "How were you paid?" : "How did you pay?";
  select.innerHTML = options.map(([value, text]) => `<option value="${value}">${text}</option>`).join("");
  if (options.some(([value]) => value === current)) select.value = current;
}

function updatePaymentContext() {
  const type = $("simpleType")?.value || "";
  const paymentValue = $("simplePaymentType")?.value || "";
  const cryptoField = $("cryptoBusinessField");
  const whatField = $("simpleWhatField");
  const purposeField = $("simplePurposeField");
  const amountLabel = $("simpleAmountLabel");
  const whatLabel = $("simpleWhatLabel");
  const purposeLabel = $("simplePurposeLabel");
  const showCrypto = type === "cash_income" && paymentValue === "crypto_business";
  const showGift = type === "cash_income" && paymentValue === "product_gift_barter";
  if (cryptoField) cryptoField.classList.toggle("field-hidden", !showCrypto);
  if (showCrypto) {
    if (amountLabel) amountLabel.textContent = "USD value when received";
    if (whatField) whatField.classList.remove("field-hidden");
    if (whatLabel) whatLabel.textContent = "Crypto note (optional)";
    if ($("simpleWhat")) $("simpleWhat").placeholder = "Optional: BTC payment, ETH tip, USDC sponsorship";
  }
  if (showGift) {
    if (amountLabel) amountLabel.textContent = "Fair market value";
    if (whatField) whatField.classList.remove("field-hidden");
    if (purposeField) purposeField.classList.remove("field-hidden");
    if (whatLabel) whatLabel.textContent = "What did you receive?";
    if (purposeLabel) purposeLabel.textContent = "Gift/barter note";
    if ($("simpleWhat")) $("simpleWhat").placeholder = "Brand product, sponsored trip, gifted equipment";
    if ($("simplePurpose")) $("simplePurpose").placeholder = "What post, review, service, or promotion was expected?";
  }
}

function paymentTypeLabel(type, value) {
  const found = (paymentTypeOptions[type] || []).find(([optionValue]) => optionValue === value);
  return found?.[1] || "";
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
    const firstOption = type === "noncash_income"
      ? `<option value="">Select one</option>`
      : `<option value="">Not a gift/product entry</option>`;
    select.innerHTML = `
      ${firstOption}
      <option value="yes">Yes - received because of content, promotion, review, or services</option>
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
  const paymentValue = $("simplePaymentType")?.value || "";
  const show = type === "noncash_income" || type.includes("crypto") || paymentValue === "crypto_business" || paymentValue === "product_gift_barter" || giftStatus === "yes" || giftStatus === "unsure" || context.visible;
  help.classList.toggle("field-hidden", !show);
}

function defaultLocalState() {
  return {
    settings: {
      brand_name: "Tina Your Tax Bestie LLC",
      advisor_name: "",
      advisor_contact: "",
      accent_color: "#227c73",
      current_tax_year: new Date().getFullYear(),
      disclaimer: "Educational and record-organization purposes only. Not legal, tax, accounting, or Circular 230 written tax advice. Consult a qualified tax professional before filing or taking any tax position."
    },
    businesses: [],
    entries: [],
    factors: [],
    audit: []
  };
}

function loadLocalState() {
  try {
    const saved = JSON.parse(localStorage.getItem(localStoreKey) || "null");
    return saved && typeof saved === "object" ? { ...defaultLocalState(), ...saved } : defaultLocalState();
  } catch {
    return defaultLocalState();
  }
}

function saveLocalState(nextState) {
  localStorage.setItem(localStoreKey, JSON.stringify(nextState));
}

function nextLocalId(rows) {
  return rows.reduce((max, row) => Math.max(max, Number(row.id || 0)), 0) + 1;
}

function nowLocalIso() {
  return new Date().toISOString();
}

function auditLocal(store, entryId, action, reason, before = null, after = null) {
  store.audit.unshift({
    id: nextLocalId(store.audit),
    entry_id: entryId || "",
    action,
    reason: reason || "",
    before_json: before ? JSON.stringify(before) : "",
    after_json: after ? JSON.stringify(after) : "",
    created_at: nowLocalIso()
  });
  store.audit = store.audit.slice(0, 200);
}

function normalizeLocalEntry(payload, id = null) {
  const stamp = nowLocalIso();
  return {
    id: id || Number(payload.id || 0) || 0,
    business_id: Number(payload.business_id || 0),
    record_type: payload.record_type || "cash_expense",
    tax_year: Number(payload.tax_year || new Date().getFullYear()),
    event_date: payload.event_date || `${payload.tax_year || new Date().getFullYear()}-01-01`,
    amount_usd: Number(payload.amount_usd || 0),
    allocation_percent: Number(payload.allocation_percent || 100),
    asset_review: payload.asset_review || "not_needed",
    shared_use_note: payload.shared_use_note || "",
    category: payload.category || "",
    description: payload.description || "",
    schedule_line: payload.schedule_line || "",
    counterparty: payload.counterparty || "",
    fmv_method: payload.fmv_method || "",
    crypto_asset: payload.crypto_asset || "",
    crypto_amount: payload.crypto_amount || "",
    crypto_wallet: payload.crypto_wallet || "",
    transaction_hash: payload.transaction_hash || "",
    evidence_note: payload.evidence_note || "",
    evidence_file_name: payload.evidence_file_name || "",
    evidence_file_type: payload.evidence_file_type || "",
    evidence_file_data: payload.evidence_file_data || "",
    source: payload.source || "local_demo",
    created_at: payload.created_at || stamp,
    updated_at: stamp,
    deleted_at: payload.deleted_at || ""
  };
}

function parseLocalPath(path) {
  const url = new URL(path, window.location.origin || "http://local-demo");
  return { pathname: url.pathname, searchParams: url.searchParams };
}

function downloadLocalCsv(path) {
  const store = loadLocalState();
  const { searchParams } = parseLocalPath(path);
  const taxYear = searchParams.get("tax_year");
  const businessId = searchParams.get("business_id");
  const rows = store.entries.filter(entry =>
    (!taxYear || String(entry.tax_year) === String(taxYear)) &&
    (!businessId || String(entry.business_id) === String(businessId))
  );
  const fields = ["id", "business_id", "record_type", "tax_year", "event_date", "amount_usd", "allocation_percent", "asset_review", "shared_use_note", "category", "description", "schedule_line", "counterparty", "fmv_method", "evidence_note", "source", "created_at", "updated_at", "deleted_at"];
  const csv = [fields.join(","), ...rows.map(row => fields.map(field => `"${String(row[field] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tax-bestie-records.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 500);
}

async function localApi(path, options = {}) {
  const method = String(options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  const store = loadLocalState();
  const { pathname, searchParams } = parseLocalPath(path);
  localDemoMode = true;

  if (method === "GET" && pathname === "/api/bootstrap") {
    return store;
  }
  if (method === "POST" && pathname === "/api/entries") {
    const entry = normalizeLocalEntry(body, nextLocalId(store.entries));
    store.entries.push(entry);
    auditLocal(store, entry.id, "create", body.reason || "Saved in demo storage", null, entry);
    saveLocalState(store);
    return entry;
  }
  if (method === "POST" && pathname === "/api/businesses") {
    const stamp = nowLocalIso();
    const business = {
      id: nextLocalId(store.businesses),
      name: String(body.name || "").trim() || "Business Activity",
      entity_type: String(body.entity_type || "").trim(),
      description: String(body.description || "").trim(),
      active: body.active === false ? 0 : 1,
      created_at: stamp,
      updated_at: stamp
    };
    store.businesses.push(business);
    saveLocalState(store);
    return business;
  }
  if (method === "POST" && pathname === "/api/reset") {
    if (body.confirm !== "RESET") throw new Error("Type RESET to clear saved data.");
    const fresh = defaultLocalState();
    saveLocalState(fresh);
    return { ok: true, message: "Saved demo data cleared." };
  }
  if (method === "POST" && pathname === "/api/import.csv") {
    throw new Error("CSV import needs the hosted backend. Use manual entry for this local demo.");
  }
  if (method === "PUT" && pathname === "/api/settings") {
    store.settings = { ...store.settings, ...body };
    saveLocalState(store);
    return store.settings;
  }
  if (method === "PUT" && pathname === "/api/factors") {
    const businessId = Number(body.business_id || 0);
    store.factors = store.factors.filter(factor => Number(factor.business_id) !== businessId);
    for (const item of body.factors || []) {
      store.factors.push({
        id: nextLocalId(store.factors),
        business_id: businessId,
        factor_no: Number(item.factor_no),
        answer: item.answer || "mixed",
        note: item.note || "",
        updated_at: nowLocalIso()
      });
    }
    saveLocalState(store);
    return { ok: true };
  }

  const entryMatch = pathname.match(/^\/api\/entries\/(\d+)(?:\/restore)?$/);
  if (entryMatch) {
    const entryId = Number(entryMatch[1]);
    const index = store.entries.findIndex(entry => Number(entry.id) === entryId);
    if (index < 0) throw new Error("Record not found");
    const before = { ...store.entries[index] };
    if (method === "PUT" && pathname.endsWith("/restore")) {
      store.entries[index] = { ...store.entries[index], deleted_at: "", updated_at: nowLocalIso() };
      auditLocal(store, entryId, "restore", "Record restored", before, store.entries[index]);
      saveLocalState(store);
      return store.entries[index];
    }
    if (method === "PUT") {
      store.entries[index] = normalizeLocalEntry({ ...body, created_at: before.created_at, deleted_at: before.deleted_at }, entryId);
      auditLocal(store, entryId, "edit", body.reason || "Record edited", before, store.entries[index]);
      saveLocalState(store);
      return store.entries[index];
    }
    if (method === "DELETE") {
      store.entries[index] = { ...store.entries[index], deleted_at: nowLocalIso(), updated_at: nowLocalIso() };
      auditLocal(store, entryId, "soft_delete", searchParams.get("reason") || "Soft deleted by user", before, store.entries[index]);
      saveLocalState(store);
      return store.entries[index];
    }
  }

  const businessMatch = pathname.match(/^\/api\/businesses\/(\d+)$/);
  if (method === "PUT" && businessMatch) {
    const businessId = Number(businessMatch[1]);
    const index = store.businesses.findIndex(business => Number(business.id) === businessId);
    if (index < 0) throw new Error("Business not found");
    store.businesses[index] = {
      ...store.businesses[index],
      name: String(body.name || "").trim() || "Business Activity",
      entity_type: String(body.entity_type || "").trim(),
      description: String(body.description || "").trim(),
      active: body.active === false ? 0 : 1,
      updated_at: nowLocalIso()
    };
    saveLocalState(store);
    return store.businesses[index];
  }

  throw new Error("This action needs the hosted backend.");
}

async function api(path, options = {}) {
  if (localDemoMode) {
    return localApi(path, options);
  }
  try {
    const response = await fetch(path, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!response.ok) {
      const text = await response.text();
      try {
        const parsed = JSON.parse(text);
        throw new Error(parsed.error || "Request failed");
      } catch {
        throw new Error(response.status === 401 ? "Authentication required" : text || "Request failed");
      }
    }
    return response.json();
  } catch (error) {
    if (path === "/api/bootstrap" || error instanceof TypeError || /Failed to fetch|Load failed|NetworkError|Authentication required/i.test(error.message || "")) {
      localDemoMode = true;
      return localApi(path, options);
    }
    throw error;
  }
}

function errorMessage(error) {
  return error?.message || "Something went wrong. Please review the entry and try again.";
}

function activeEntries() {
  return state.entries.filter(entry => {
    const yearMatches = $("showAllYears")?.checked || String(entry.tax_year) === String($("taxYear")?.value);
    const deleteMatches = !$("showDeleted")?.checked ? !entry.deleted_at : true;
    return entryMatchesBusiness(entry) && yearMatches && deleteMatches;
  });
}

function entriesForYear(year = $("taxYear").value, businessId = selectedBusinessId()) {
  const selected = Number(businessId || 0);
  return state.entries.filter(entry => selected && Number(entry.business_id || 0) === selected && !entry.deleted_at && String(entry.tax_year) === String(year));
}

function selectedBusinessId() {
  return Number($("businessFilter")?.value || 0);
}

function entryMatchesBusiness(entry) {
  const selected = selectedBusinessId();
  if (!selected) return false;
  return Number(entry.business_id || 0) === selected;
}

function businessName(id) {
  return state.businesses.find(business => Number(business.id) === Number(id))?.name || "New Business Activity";
}

function isPlaceholderBusiness(business) {
  return /^new business activity$/i.test(String(business?.name || "").trim());
}

function selectedTaxYearStatus() {
  if (!$("taxYear")?.value) return "No tax year selected";
  const current = Number(state.settings.current_tax_year || new Date().getFullYear());
  const selected = Number($("taxYear")?.value);
  if (selected === current) return `${selected} Live YTD`;
  if (selected < current) return `${selected} Prior Year`;
  return `${selected} Future Year`;
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

function totals(year = $("taxYear").value, businessId = selectedBusinessId()) {
  const rows = entriesForYear(year, businessId);
  const income = rows.filter(isIncome).reduce((sum, e) => sum + Number(e.amount_usd || 0), 0);
  const expenses = rows.filter(e => !isIncome(e)).reduce((sum, e) => sum + Number(e.amount_usd || 0), 0);
  return { rows, income, expenses, net: income - expenses };
}

function yearResults(businessId = selectedBusinessId()) {
  const selected = Number(businessId || 0);
  const grouped = {};
  state.entries.filter(e => selected && !e.deleted_at && Number(e.business_id || 0) === selected).forEach(entry => {
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

function yearHasRecords(row) {
  return Number(row?.income || 0) > 0 || Number(row?.expenses || 0) > 0;
}

function recentFiveYearWindow(businessId = selectedBusinessId()) {
  if (!$("taxYear").value) return [];
  const selected = Number($("taxYear").value);
  const years = [];
  for (let year = selected - 4; year <= selected; year++) years.push(year);
  const results = yearResults(businessId);
  return years.map(year => {
    const found = results.find(row => Number(row.year) === year);
    return found || { year: String(year), income: 0, expenses: 0, net: 0 };
  });
}

function profitPath(windowRows) {
  const currentYear = Number(state.settings.current_tax_year || new Date().getFullYear());
  const recorded = yearsWithRecords(windowRows);
  const completed = recorded.filter(row => Number(row.year) < currentYear);
  const currentLive = recorded.find(row => Number(row.year) === currentYear);
  const lossRows = completed.filter(row => row.net < 0);
  const liveLossRows = recorded.filter(row => row.net < 0);
  const profitRows = completed.filter(row => row.net > 0);
  const first = recorded[0];
  const last = recorded[recorded.length - 1];
  const incomeImproving = recorded.length >= 2 && last.income > first.income;
  const losses = recorded.filter(row => row.net < 0);
  const lossNarrowing = losses.length >= 2 && Math.abs(losses[losses.length - 1].net) < Math.abs(losses[0].net);
  const threeLossTrigger = lossRows.length >= 3;
  return {
    recorded,
    completed,
    currentLive,
    lossRows,
    liveLossRows,
    profitRows,
    incomeImproving,
    lossNarrowing,
    threeLossTrigger,
  };
}

function readinessFlags(yearTotals = totals()) {
  const rows = yearTotals.rows || [];
  const expenseRatio = yearTotals.income > 0 ? yearTotals.expenses / yearTotals.income : yearTotals.expenses > 0 ? 99 : 0;
  const highExpenseRatio = yearTotals.income > 0 && yearTotals.expenses >= yearTotals.income * 1.5;
  const quarterMap = {};
  rows.forEach(entry => {
    const quarter = quarterFromDate(entry.event_date);
    if (!quarter) return;
    quarterMap[quarter] ||= { income: 0, expenses: 0 };
    if (isIncome(entry)) quarterMap[quarter].income += Number(entry.amount_usd || 0);
    else quarterMap[quarter].expenses += Number(entry.amount_usd || 0);
  });
  const highExpenseQuarters = Object.entries(quarterMap)
    .filter(([, totals]) => totals.expenses > 0 && (totals.income === 0 || totals.expenses >= totals.income * 1.5))
    .map(([quarter, totals]) => ({ quarter, ...totals }));
  const largeExpense = rows.find(entry => !isIncome(entry) && Number(entry.amount_usd || 0) >= 2000);
  const needsInfo = rows.filter(entry => entryCompletion(entry).label === "Needs info").length;
  const reviewItems = rows.filter(entry => entry.asset_review && entry.asset_review !== "not_needed").length;
  const missingProof = rows.filter(entry => !entry.evidence_note && !entry.evidence_file_data && !entry.fmv_method).length;
  const giftUnsure = rows.some(entry => /Not sure|review needed/i.test(`${entry.fmv_method || ""} ${entry.evidence_note || ""}`));
  return {
    expenseRatio,
    largeExpense,
    needsInfo,
    reviewItems,
    missingProof,
    giftUnsure,
    highExpenseRatio,
    highExpenseQuarters,
    exaggeratedExpenses: yearTotals.income > 0 && yearTotals.expenses >= yearTotals.income * 2,
    expensesNoIncome: yearTotals.income === 0 && yearTotals.expenses > 0,
    hasFlags: Boolean(largeExpense || needsInfo || reviewItems || giftUnsure || highExpenseRatio || highExpenseQuarters.length || (yearTotals.income === 0 && yearTotals.expenses > 0))
  };
}

function readinessAlertHtml(yearTotals = totals()) {
  if (!yearTotals.rows?.length || yearTotals.net >= 0) return "";
  const flags = readinessFlags(yearTotals);
  const reasons = [];
  if (flags.highExpenseQuarters?.length) reasons.push(`${flags.highExpenseQuarters[0].quarter} expenses are heavily outpacing income`);
  if (flags.highExpenseRatio) reasons.push("money spent is at least 150% of money made");
  if (flags.exaggeratedExpenses) reasons.push("money spent is much higher than money made");
  if (flags.expensesNoIncome) reasons.push("expenses are saved but no income is saved for this year");
  if (flags.largeExpense) reasons.push(`${flags.largeExpense.category || "a larger item"} is ${money.format(flags.largeExpense.amount_usd)}`);
  if (flags.needsInfo) reasons.push(`${flags.needsInfo} record${flags.needsInfo === 1 ? "" : "s"} need more detail`);
  if (flags.reviewItems) reasons.push(`${flags.reviewItems} item${flags.reviewItems === 1 ? "" : "s"} are marked for review`);
  if (flags.giftUnsure) reasons.push("a gift/product or barter item is marked not sure");
  if (!reasons.length) return "";
  return `<div class="alert warn"><strong>Bestie Alert:</strong> This year shows a loss and ${escapeHtml(reasons.slice(0, 3).join(", "))}. This does not decide whether your activity is a business or hobby. It means your records may need stronger support. Save receipts, contracts, pitches, platform reports, and notes showing how expenses connect to the business. Review with a qualified tax professional.</div>`;
}

function documentationCompletenessScore() {
  const rows = entriesForYear();
  if (!rows.length) return 0;
  const total = rows.reduce((sum, entry) => {
    const checks = [
      entry.tax_year,
      entry.event_date,
      Number(entry.amount_usd) > 0,
      String(entry.category || "").trim(),
      String(entry.counterparty || "").trim(),
      isIncome(entry) || String(entry.schedule_line || "").trim(),
      String(entry.evidence_note || entry.fmv_method || entry.shared_use_note || "").trim(),
      entry.evidence_file_data || !/receipt|invoice|contract|screenshot|proof|FMV|gift|barter|crypto/i.test(`${entry.record_type} ${entry.category} ${entry.description} ${entry.evidence_note}`)
    ];
    return sum + checks.filter(Boolean).length / checks.length;
  }, 0);
  return Math.round((total / rows.length) * 100);
}

function renderTaxYears() {
  const current = Number(state.settings.current_tax_year || new Date().getFullYear());
  const previous = selectedTaxYearMemory || $("taxYear")?.value || "";
  const years = new Set([...state.entries.map(e => Number(e.tax_year))]);
  for (let year = current - 6; year <= current + 4; year++) years.add(year);
  $("taxYear").innerHTML = `<option value="">Select tax year</option>` + [...years].filter(Boolean).sort((a, b) => b - a).map(year => `<option value="${year}">${year}</option>`).join("");
  $("taxYear").value = [...$("taxYear").options].some(option => option.value === String(previous)) ? String(previous) : "";
  selectedTaxYearMemory = $("taxYear").value;
  $("recordTaxYear").value = $("taxYear").value;
  setDateBoundsForTaxYear();
}

function renderBusinessFilter() {
  const selected = selectedBusinessMemory || String($("businessFilter")?.value || "");
  const options = state.businesses
    .filter(business => business.active || String(business.id) === selected)
    .map(business => `<option value="${business.id}">${escapeHtml(isPlaceholderBusiness(business) ? "New Business Activity - enter name/type" : business.name)}</option>`)
    .join("");
  const emptyOption = `<option value="">Choose business/activity</option>`;
  const addOption = `<option value="__new__">+ Add new business/activity</option>`;
  $("businessFilter").innerHTML = emptyOption + addOption + options;
  $("recordBusiness").innerHTML = emptyOption + options;
  $("simpleBusiness").innerHTML = emptyOption + options;
  $("businessFilter").value = state.businesses.some(b => String(b.id) === selected) ? selected : "";
  $("recordBusiness").value = $("businessFilter").value;
  $("simpleBusiness").value = $("businessFilter").value;
  selectedBusinessMemory = $("businessFilter").value;
  renderBusinessSuggestions();
  updateBusinessSearchFromSelect();
}

function renderDashboard() {
  if (!state.businesses.length || !selectedBusinessId()) {
    $("incomeTotal").textContent = money.format(0);
    $("expenseTotal").textContent = money.format(0);
    $("netTotal").textContent = money.format(0);
    $("profitYears").textContent = "0 losses";
    $("score").textContent = "0%";
    $("scoreBar").style.width = "0%";
    $("scoreText").textContent = "Start by adding your business/activity and first record.";
    $("profitAlert").innerHTML = `<div class="alert"><strong>Start clean:</strong> No data is loaded. Add your business/activity, choose the tax year, then save income, expenses, or product/gift records as they happen.</div>`;
    $("yearChart").innerHTML = `<p class="muted">No records yet.</p>`;
    renderProfitLossTable([]);
    if ($("scheduleSummary")) $("scheduleSummary").innerHTML = `<p class="muted">No expenses for ${escapeHtml(selectedTaxYearStatus())}.</p>`;
    renderPortalSnapshot({ income: 0, expenses: 0, net: 0, rows: [] }, profitPath(recentFiveYearWindow()));
    return;
  }
  if (!$("taxYear").value) {
    const emptyPath = profitPath([]);
    $("incomeTotal").textContent = money.format(0);
    $("expenseTotal").textContent = money.format(0);
    $("netTotal").textContent = money.format(0);
    $("profitYears").textContent = "Choose year";
    $("score").textContent = "0%";
    $("scoreBar").style.width = "0%";
    $("scoreText").textContent = "Choose a tax year before reviewing documentation completeness.";
    $("profitAlert").innerHTML = `<div class="alert"><strong>Choose tax year:</strong> Select the tax year you want to work on. The app will keep each tax year separate and only run the five-year profit review after a year is selected.</div>`;
    updateProfitReviewAccess(emptyPath);
    renderChart(yearResults());
    renderProfitLossTable(yearResults());
    renderScheduleSummary([]);
    renderPortalSnapshot({ income: 0, expenses: 0, net: 0, rows: [] }, emptyPath);
    return;
  }
  const t = totals();
  const windowRows = recentFiveYearWindow();
  const path = profitPath(windowRows);
  $("incomeTotal").textContent = money.format(t.income);
  $("expenseTotal").textContent = money.format(t.expenses);
  $("netTotal").textContent = money.format(t.net);
  $("profitYears").textContent = `${path.lossRows.length} losses`;
  const score = documentationCompletenessScore();
  $("score").textContent = `${score}%`;
  $("scoreBar").style.width = `${score}%`;
  $("scoreText").textContent = score >= 75 ? "Most records have the core details and support fields completed." : score >= 50 ? "Some records need more notes, proof, FMV support, or payer/payee details." : "Many records need missing details before they are ready for review.";
  renderProfitAlert(windowRows, path);
  updateProfitReviewAccess(path);
  renderChart(yearResults());
  renderProfitLossTable(windowRows);
  renderScheduleSummary(t.rows);
  renderPortalSnapshot(t, path);
}

function updateProfitReviewAccess(path = profitPath(recentFiveYearWindow())) {
  profitReviewUnlocked = path.threeLossTrigger || readinessFlags(totals()).hasFlags;
  const nav = document.querySelector('[data-view="factors"]');
  if (nav) nav.classList.toggle("locked", !profitReviewUnlocked);
}

function renderProfitAlert(rows, path) {
  const el = $("profitAlert");
  const early = readinessAlertHtml(totals());
  el.innerHTML = early || profitAlertHtml(path);
}

function profitAlertHtml(path) {
  if (!path.recorded.length) {
    return `<div class="alert"><strong>Start your business story:</strong> Add money made, money spent, products/gifts, and proof. Tax Bestie will watch your business progress as years are added.</div>`;
  }
  const yearSummary = path.recorded.map(row => {
    const net = Number(row.net || 0);
    const label = net < 0 ? "Loss" : net > 0 ? "Profit" : "Break even";
    return `<li><strong>TY ${escapeHtml(row.year)}:</strong> ${label} ${money.format(net)} <span class="muted">(income ${money.format(row.income || 0)}, expenses ${money.format(row.expenses || 0)})</span></li>`;
  }).join("");
  const trendBits = [
    path.incomeImproving ? "income is moving up" : "",
    path.lossNarrowing ? "losses are narrowing" : "",
  ].filter(Boolean);
  const trendText = trendBits.length ? ` The current trend shows ${trendBits.join(" and ")}.` : "";
  if (path.threeLossTrigger) {
    return `<div class="alert risk"><strong>Bestie Alert:</strong> Your saved records show losses in ${path.lossRows.length} of the last 5 completed tax years for ${escapeHtml(businessName(selectedBusinessId()))}. This does not decide whether your activity is a business or hobby. It means your records may need stronger support.${trendText}<ul class="profit-path-list">${yearSummary}</ul>If you are treating this as a business, answer the Business Check-In questions and confer with a qualified tax professional when needed. <p class="muted">${hobbyTreatmentNote}</p><div class="actions" style="margin-top:10px"><button class="small primary" data-start-review="true">Start Business Check-In</button><span class="muted">Not legal, tax, accounting, or Circular 230 written tax advice.</span></div></div>`;
  }
  if (path.profitRows.length >= 3) {
    return `<div class="alert good"><strong>Business Progress:</strong> Your records show ${path.profitRows.length} profitable years in the selected five-year lookback.<ul class="profit-path-list">${yearSummary}</ul>Keep receipts, contracts, product/gift value proof, and notes current.</div>`;
  }
  if (path.lossRows.length === 2) {
    return `<div class="alert warn"><strong>Bestie Heads-Up:</strong> Your completed-year records show 2 loss years in this five-year lookback. That can happen while growing, but keep receipts, proof, income efforts, and notes showing what you changed to improve profit.${trendText}<ul class="profit-path-list">${yearSummary}</ul>The Business Check-In appears if saved records show losses in 3 of 5 completed tax years. Educational record organization only; consult a qualified tax professional.</div>`;
  }
  const liveNote = path.currentLive && path.currentLive.net < 0 ? ` Current-year ${path.currentLive.year} is live YTD and is not treated as final until the year closes.` : "";
  return `<div class="alert"><strong>Business Progress:</strong> You have ${path.recorded.length} year${path.recorded.length === 1 ? "" : "s"} with records in this five-year lookback and ${path.lossRows.length} completed loss year${path.lossRows.length === 1 ? "" : "s"}.${trendText || " Keep documenting income growth, business changes, receipts, and why expenses help the business make money."}${liveNote}<ul class="profit-path-list">${yearSummary}</ul></div>`;
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

function renderProfitLossTable(rows) {
  const el = $("profitLossTable");
  if (!el) return;
  const savedRows = rows.filter(yearHasRecords);
  if (!savedRows.length) {
    el.innerHTML = `<p class="muted">No yearly profit/loss records yet.</p>`;
    return;
  }
  el.innerHTML = `<h4 class="mini-heading">Tax Years With Saved Records</h4><table><thead><tr><th>Tax Year</th><th>Income</th><th>Expenses</th><th>Profit / Loss</th><th>Status</th></tr></thead><tbody>${savedRows.map(row => {
    const net = Number(row.net || 0);
    const current = Number(state.settings.current_tax_year || new Date().getFullYear());
    const status = Number(row.year) === current ? "Live YTD" : net < 0 ? "Loss year" : net > 0 ? "Profit year" : "Break even";
    return `<tr><td>${row.year}</td><td>${money.format(row.income || 0)}</td><td>${money.format(row.expenses || 0)}</td><td><strong class="${net < 0 ? "loss-text" : "profit-text"}">${money.format(net)}</strong></td><td><span class="chip ${net < 0 ? "risk" : net > 0 ? "good" : ""}">${status}</span></td></tr>`;
  }).join("")}</tbody></table>`;
}

function yearResultStatus(row) {
  const net = Number(row?.net || 0);
  const income = Number(row?.income || 0);
  const expenses = Number(row?.expenses || 0);
  const hasRecords = income > 0 || expenses > 0;
  if (!hasRecords) return { label: "No records yet", className: "", explanation: "Add income or outlays to see a live profit or loss result." };
  if (net < 0) return { label: "Loss", className: "risk", explanation: "Expenses/outlays are higher than income for this tax year based on the records entered." };
  if (net > 0) return { label: "Profit", className: "good", explanation: "Income is higher than expenses/outlays for this tax year based on the records entered." };
  return { label: "Break even", className: "warn", explanation: "Income and expenses/outlays are equal for this tax year based on the records entered." };
}

function entryCompletion(entry) {
  const missing = [];
  if (!entry.tax_year) missing.push("tax year");
  if (!entry.event_date) missing.push("date");
  if (!(Number(entry.amount_usd) > 0)) missing.push("amount");
  const category = String(entry.category || "").trim();
  const scheduleLine = String(entry.schedule_line || "").trim();
  if (!isIncome(entry) && (!category || category === "Needs info")) missing.push("what it was");
  if (!isIncome(entry) && (!scheduleLine || scheduleLine === "needs_info")) missing.push("Schedule C mapping");

  const review = [];
  const combined = `${entry.record_type || ""} ${entry.category || ""} ${entry.description || ""} ${entry.fmv_method || ""} ${entry.evidence_note || ""}`;
  const needsFmv = entry.record_type === "noncash_income" || String(entry.record_type || "").includes("crypto") || /gift|barter|brand product|FMV|fair market/i.test(combined);
  if (needsFmv && !String(entry.fmv_method || "").trim()) review.push("FMV support");
  if (entry.asset_review && entry.asset_review !== "not_needed") review.push(assetLabel(entry.asset_review));
  if (!entry.evidence_file_data && /receipt|invoice|contract|screenshot|proof/i.test(combined)) review.push("attach proof if available");

  if (missing.length) {
    return {
      label: "Needs info",
      className: "risk",
      countsAsReady: false,
      detail: `Missing: ${missing.join(", ")}.`
    };
  }
  if (review.length) {
    return {
      label: "Review",
      className: "warn",
      countsAsReady: true,
      detail: `Saved; review ${review.join(", ")}.`
    };
  }
  return {
    label: "Complete",
    className: "good",
    countsAsReady: true,
    detail: isIncome(entry)
      ? "Saved with tax year, date, amount, and remittance type."
      : "Saved with the core tax-year, amount, description, and organizer mapping."
  };
}

function renderRecordsYearSummary() {
  const el = $("recordsYearSummary");
  if (!el) return;
  if (!$("taxYear")?.value) {
    el.innerHTML = `<div class="record-year-summary"><strong>Select a tax year</strong><p class="muted">The app keeps each tax year separate. Choose a year to see live profit or loss for that year.</p></div>`;
    return;
  }
  const t = totals();
  const status = yearResultStatus(t);
  const label = selectedTaxYearStatus();
  const savedRows = t.rows;
  const completeCount = savedRows.filter(entry => entryCompletion(entry).countsAsReady).length;
  const needsInfoCount = savedRows.length - completeCount;
  const completionNote = savedRows.length
    ? `${completeCount} saved record${completeCount === 1 ? "" : "s"} ready; ${needsInfoCount} need${needsInfoCount === 1 ? "s" : ""} more information.`
    : "No saved records yet for this tax year.";
  el.innerHTML = `
    <div class="record-year-summary ${status.className}">
      <div>
        <span>${escapeHtml(label)} result</span>
        <strong>TY ${escapeHtml($("taxYear").value)} ${escapeHtml(resultLabel(t.net))}</strong>
        <p>${escapeHtml(status.explanation)} ${escapeHtml(completionNote)}</p>
      </div>
      <div><span>Income</span><strong>${money.format(t.income)}</strong></div>
      <div><span>Expenses / Outlays</span><strong>${money.format(t.expenses)}</strong></div>
      <div><span>Net</span><strong class="${t.net < 0 ? "loss-text" : t.net > 0 ? "profit-text" : ""}">${money.format(t.net)}</strong></div>
    </div>`;
}

function renderRecordsProfitNotice(path = profitPath(recentFiveYearWindow())) {
  const el = $("recordsProfitNotice");
  if (!el) return;
  if (!$("taxYear")?.value) {
    el.innerHTML = `<div class="alert"><strong>Choose tax year:</strong> Select a tax year to preview the five-year profit/loss pattern and any profit motive prompt.</div>`;
    return;
  }
  const early = readinessAlertHtml(totals());
  el.innerHTML = early || profitAlertHtml(path);
}

function renderRecordsProfitPreview(rows = recentFiveYearWindow()) {
  const el = $("recordsProfitPreview");
  if (!el) return;
  if (!$("taxYear")?.value) {
    el.innerHTML = "";
    return;
  }
  const savedRows = rows.filter(yearHasRecords);
  if (!savedRows.length) {
    el.innerHTML = `<div class="alert"><strong>No saved records yet:</strong> Add business income, business expenses, or product/gift records for this tax year to see profit or loss progress.</div>`;
    return;
  }
  el.innerHTML = `<h4 class="mini-heading">Tax Years With Saved Records</h4><table><thead><tr><th>Tax Year</th><th>Income</th><th>Expenses</th><th>Profit / Loss</th><th>Status</th></tr></thead><tbody>${savedRows.map(row => {
    const net = Number(row.net || 0);
    const current = Number(state.settings.current_tax_year || new Date().getFullYear());
    const status = Number(row.year) === current ? "Live YTD" : net < 0 ? "Loss year" : net > 0 ? "Profit year" : "Break even";
    return `<tr><td>${row.year}</td><td>${money.format(row.income || 0)}</td><td>${money.format(row.expenses || 0)}</td><td><strong class="${net < 0 ? "loss-text" : net > 0 ? "profit-text" : ""}">${money.format(net)}</strong></td><td><span class="chip ${net < 0 ? "risk" : net > 0 ? "good" : net === 0 ? "warn" : ""}">${status}</span></td></tr>`;
  }).join("")}</tbody></table>`;
}

function renderScheduleSummary(rows) {
  if (!$("scheduleSummary")) return;
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
  const rows = [
    ["Review packet", `${counts.total} active records, ${counts.needsReview} tax-pro review flags, ${counts.fmv} FMV/crypto/gift items.`, "Open Records", "records"],
    ["Profit path", `${path.lossRows.length} loss year(s) in the five-year window. ${path.incomeImproving ? "Income is improving. " : ""}${path.lossNarrowing ? "Losses are narrowing." : ""}`, "Open Profit Review", "factors"],
    ["Evidence gaps", `${counts.missingEvidence} record(s) need stronger notes or proof before filing review.`, "Open Records", "records"],
    ["Export", "Download CSV for review, cleanup, or tax software workpapers.", "Export CSV", "export"],
  ];
  el.innerHTML = `
    <div class="portal-summary">
      <div><span>Selected activity</span><strong>${escapeHtml(businessName(selectedBusinessId()))}</strong></div>
      <div><span>${escapeHtml(selectedTaxYearStatus())} net</span><strong>${money.format(t.net)}</strong></div>
      <div><span>Records</span><strong>${counts.total}</strong></div>
      <div><span>Review flags</span><strong>${counts.needsReview}</strong></div>
    </div>
    <div class="portal-cards">${rows.map(row => `<div class="portal-card">
      <h4>${escapeHtml(row[0])}</h4>
      <p>${escapeHtml(row[1])}</p>
      <button class="small" data-portal-action="${escapeHtml(row[3])}">${escapeHtml(row[2])}</button>
    </div>`).join("")}</div>`;
}

function renderRecords() {
  const rows = activeEntries();
  const windowRows = recentFiveYearWindow();
  const path = profitPath(windowRows);
  updateProfitReviewAccess(path);
  if ($("recordsYearLabel")) {
    $("recordsYearLabel").textContent = $("showAllYears")?.checked
      ? "Showing all years"
      : `Showing ${selectedTaxYearStatus()} only`;
  }
  renderRecordsYearSummary();
  renderRecordsProfitNotice(path);
  renderRecordsProfitPreview(windowRows);
  if (!selectedBusinessId() || !$("taxYear")?.value) {
    $("recordsTable").innerHTML = `<p class="muted">No records listed. Choose a business/activity and tax year, then add your first record.</p>`;
    return;
  }
  $("recordsTable").innerHTML = rows.length ? `<table><thead><tr><th>Business</th><th>Year</th><th>Date</th><th>Status</th><th>Type</th><th>Amount</th><th>Use %</th><th>Schedule C</th><th>Category</th><th>Evidence</th><th>Actions</th></tr></thead><tbody>${rows.map(entry => {
    const completion = entryCompletion(entry);
    return `
    <tr class="${entry.deleted_at ? "deleted" : ""}">
      <td>${escapeHtml(businessName(entry.business_id))}</td>
      <td>${entry.tax_year}</td>
      <td>${entry.event_date}</td>
      <td><span class="chip ${completion.className}">${escapeHtml(completion.label)}</span><br><span class="muted">${escapeHtml(completion.detail)}</span></td>
      <td><span class="chip ${isIncome(entry) ? "good" : "risk"}">${labelType(entry.record_type)}</span></td>
      <td><strong>${money.format(entry.amount_usd)}</strong></td>
      <td>${Number(entry.allocation_percent || 100)}%${entry.asset_review !== "not_needed" ? `<br><span class="chip warn">${escapeHtml(assetLabel(entry.asset_review))}</span>` : ""}</td>
      <td>${lineLabel(entry.schedule_line)}</td>
      <td>${escapeHtml(entry.category)}<br><span class="muted">${escapeHtml(entry.description)}</span></td>
      <td>${escapeHtml(entry.evidence_note || entry.fmv_method || entry.shared_use_note || "")}${entry.evidence_file_data ? `<br><a href="${entry.evidence_file_data}" target="_blank" rel="noreferrer">View evidence</a>` : ""}</td>
      <td><div class="row-actions">${entry.deleted_at ? `<button class="small" data-restore="${entry.id}" title="Restore this deleted record">Restore</button>` : `<button class="small" data-edit="${entry.id}" title="Edit this saved record">Edit</button><button class="small danger" data-delete="${entry.id}" title="Delete this record. It stays in recordkeeping history.">Delete</button>`}</div></td>
    </tr>`;
  }).join("")}</tbody></table>` : `<p class="muted">No records for ${escapeHtml(selectedTaxYearStatus())}.</p>`;
}

function renderBusinesses() {
  $("businessTable").innerHTML = state.businesses.length ? `<table><thead><tr><th>Name</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead><tbody>${state.businesses.map(business => `<tr>
    <td><strong>${escapeHtml(business.name)}</strong><br><span class="muted">${escapeHtml(business.description)}</span></td>
    <td>${escapeHtml(business.entity_type || "")}</td>
    <td><span class="chip ${business.active ? "good" : "warn"}">${business.active ? "Active" : "Inactive"}</span></td>
    <td><button class="small" data-edit-business="${business.id}">Edit</button></td>
  </tr>`).join("")}</tbody></table>` : `<p class="muted">No businesses yet.</p>`;
}

function updateExportLink() {
  const link = $("exportSelectedYear");
  if (!link) return;
  const query = new URLSearchParams();
  if ($("taxYear")?.value) query.set("tax_year", $("taxYear").value);
  if ($("businessFilter")?.value) query.set("business_id", $("businessFilter").value);
  link.href = `/api/export.csv?${query.toString()}`;
  link.textContent = $("taxYear")?.value ? `Export ${$("taxYear").value} CSV` : "Export CSV";
}

function renderStorageModeNotice() {
  const side = $("sideDisclaimer");
  if (!side) return;
  const base = state.settings.disclaimer || defaultLocalState().settings.disclaimer;
  side.textContent = localDemoMode
    ? `${base} Demo storage is active because the backend is not connected. Use hosted Render storage for real saved records.`
    : base;
}

function findBusinessSuggestion(text) {
  const query = normalizeBusinessText(text);
  if (!query) return null;
  return businessSuggestions.find(suggestion =>
    normalizeBusinessText(suggestion.name).includes(query) ||
    query.includes(normalizeBusinessText(suggestion.name)) ||
    normalizeBusinessText(suggestion.type).includes(query) ||
    suggestion.words.some(word => normalizeBusinessText(word).includes(query) || query.includes(normalizeBusinessText(word)))
  ) || null;
}

function normalizeBusinessText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bcontentn\b/g, "content")
    .replace(/\bcontn\b/g, "content")
    .replace(/\byoutuber\b/g, "youtube")
    .replace(/\buber\b/g, "ube uber")
    .replace(/\binsta\b/g, "inst instacart")
    .trim();
}

function renderBusinessSuggestions() {
  const list = $("businessSuggestions");
  if (!list) return;
  const existing = state.businesses.map(business => `<option value="${escapeHtml(business.name)}"></option>`);
  const suggested = businessSuggestions.map(suggestion => `<option value="${escapeHtml(suggestion.name)}"></option>`);
  list.innerHTML = [...existing, ...suggested].join("");
}

function updateBusinessSearchFromSelect() {
  const input = $("simpleBusinessSearch");
  if (!input) return;
  input.value = state.businesses.find(business => String(business.id) === String($("simpleBusiness").value))?.name || "";
  updateBusinessSuggestHint();
}

function updateBusinessSuggestHint() {
  const input = $("simpleBusinessSearch");
  const hint = $("businessSuggestHint");
  if (!input || !hint) return;
  const exact = state.businesses.find(business => business.name.toLowerCase() === input.value.trim().toLowerCase());
  const suggestion = findBusinessSuggestion(input.value);
  if (exact) {
    $("simpleBusiness").value = exact.id;
    hint.textContent = `Using ${exact.name}.`;
  } else if (suggestion) {
    hint.textContent = `Suggestion: ${suggestion.name}. Save will create this activity if it is new.`;
  } else if (input.value.trim()) {
    hint.textContent = "Save will create this custom business/activity if it is new.";
  } else {
    hint.textContent = "Choose or create the activity this record belongs to.";
  }
}

function applyBusinessSuggestionToInput(inputId = "simpleBusinessSearch") {
  const input = $(inputId);
  if (!input) return;
  const typed = input.value.trim();
  const exact = state.businesses.find(business => business.name.toLowerCase() === typed.toLowerCase());
  const suggestion = findBusinessSuggestion(typed);
  if (!exact && suggestion) {
    input.value = suggestion.name;
    if (inputId === "simpleBusinessSearch") updateBusinessSuggestHint();
    if (inputId === "businessName") syncBusinessTypeFromName();
  }
}

function syncBusinessTypeFromName() {
  const name = $("businessName").value.trim();
  const type = $("businessType");
  if (!name) {
    if (type.dataset.autoFilled === "true") type.value = "";
    delete type.dataset.autoFilled;
    return;
  }
  const suggestion = findBusinessSuggestion(name);
  if (suggestion) {
    if (!type.value.trim() || type.dataset.autoFilled === "true") {
      type.value = suggestion.type;
      type.dataset.autoFilled = "true";
    }
    return;
  }
  if (type.dataset.autoFilled === "true") type.value = "";
  delete type.dataset.autoFilled;
}

async function ensureSimpleBusiness() {
  const typed = $("simpleBusinessSearch").value.trim();
  const selectedId = $("simpleBusiness").value;
  if (selectedId && !typed) return selectedId;
  const exact = state.businesses.find(business => business.name.toLowerCase() === typed.toLowerCase());
  if (exact) return exact.id;
  const suggestion = findBusinessSuggestion(typed);
  const name = suggestion?.name || typed;
  if (!name) {
    toast("Add a business/activity before saving.");
    $("simpleBusinessSearch").focus();
    throw new Error("Business/activity required");
  }
  const saved = await api("/api/businesses", {
    method: "POST",
    body: JSON.stringify({
      name,
      entity_type: suggestion?.type || "",
      description: suggestion ? `User selected suggested activity from "${typed}".` : "User-created business/activity."
    })
  });
  state.businesses.push(saved);
  selectedBusinessMemory = String(saved.id);
  renderBusinessFilter();
  $("businessFilter").value = String(saved.id);
  $("simpleBusiness").value = String(saved.id);
  $("recordBusiness").value = String(saved.id);
  $("simpleBusinessSearch").value = saved.name;
  return saved.id;
}

function parseAuditJson(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function auditSummary(event) {
  const after = parseAuditJson(event.after_json);
  const before = parseAuditJson(event.before_json);
  const row = after || before;
  if (!row) return "";
  const parts = [
    row.tax_year ? `TY ${row.tax_year}` : "",
    row.record_type ? labelType(row.record_type) : "",
    row.amount_usd ? money.format(row.amount_usd) : "",
    row.category || "",
    row.schedule_line ? lineLabel(row.schedule_line) : "",
  ].filter(Boolean);
  return parts.join(" | ");
}

function auditEventTaxYear(event) {
  const after = parseAuditJson(event.after_json);
  const before = parseAuditJson(event.before_json);
  return String(after?.tax_year || before?.tax_year || "");
}

function auditMatchesBusiness(event) {
  const after = parseAuditJson(event.after_json);
  const before = parseAuditJson(event.before_json);
  const row = after || before;
  if (!row?.business_id) return true;
  return Number(row.business_id) === selectedBusinessId();
}

function renderAudit() {
  const showAll = $("showAllYears")?.checked;
  const selectedYear = String($("taxYear")?.value || "");
  const rows = state.audit
    .filter(event => auditMatchesBusiness(event))
    .filter(event => showAll || !selectedYear || auditEventTaxYear(event) === selectedYear)
    .slice(0, 120);
  if ($("auditYearLabel")) {
    $("auditYearLabel").textContent = showAll ? "History for all years" : `History for ${selectedTaxYearStatus()}`;
  }
  $("auditTable").innerHTML = rows.length ? `<table><thead><tr><th>Time</th><th>Action</th><th>Record detail</th><th>Reason</th></tr></thead><tbody>${rows.map(event => `<tr><td>${event.created_at}</td><td>${event.action}</td><td>#${event.entry_id || ""}<br><span class="muted">${escapeHtml(auditSummary(event))}</span></td><td>${escapeHtml(event.reason || "")}</td></tr>`).join("")}</tbody></table>` : `<p class="muted">No recordkeeping history for this view.</p>`;
}

function renderFactors() {
  const intro = $("profitReviewIntro");
  const hobby = $("hobbyTreatmentIntro");
  const topButton = $("saveFactors");
  const bottomButton = $("saveFactorsBottom");
  const backButton = $("factorBack");
  const nextButton = $("factorNext");
  const bottomWrap = document.querySelector(".factor-save-bottom");
  const progress = $("checkinProgress");
  if (!profitReviewUnlocked) {
    intro?.classList.add("field-hidden");
    hobby?.classList.add("field-hidden");
    topButton?.classList.add("field-hidden");
    bottomWrap?.classList.add("field-hidden");
    progress?.classList.add("field-hidden");
    if ($("factorSummary")) {
      $("factorSummary").innerHTML = `<div class="alert"><strong>No Business Check-In needed yet.</strong> Keep saving money made, money spent, products/gifts, and proof. Tax Bestie will prompt you when the records show repeated losses or a year that needs stronger support. Educational record organization only.</div>`;
    }
    $("factorList").innerHTML = "";
    return;
  }
  intro?.classList.remove("field-hidden");
  hobby?.classList.remove("field-hidden");
  topButton?.classList.remove("field-hidden");
  bottomWrap?.classList.remove("field-hidden");
  progress?.classList.remove("field-hidden");
  const factors = factorsForBusiness();
  currentFactorIndex = Math.max(0, Math.min(currentFactorIndex, factors.length - 1));
  if (profitReviewSubmitted) {
    progress?.classList.add("field-hidden");
    $("factorList").innerHTML = "";
    if (backButton) backButton.classList.add("field-hidden");
    if (nextButton) nextButton.classList.add("field-hidden");
    if (topButton) topButton.classList.add("field-hidden");
    if (bottomButton) bottomButton.textContent = "Update Saved Check-In";
    renderFactorSummary(factors);
    return;
  }

  if (backButton) backButton.classList.remove("field-hidden");
  if (nextButton) nextButton.classList.remove("field-hidden");
  if (bottomButton) bottomButton.textContent = "Save & Finish Later";
  const path = profitPath(recentFiveYearWindow());
  const isRepeatedLoss = path.lossRows.length >= 3;
  if ($("factorSummary")) {
    $("factorSummary").innerHTML = `<div class="alert ${isRepeatedLoss ? "risk" : "warn"}"><strong>${isRepeatedLoss ? "Bestie Alert" : "Bestie Heads-Up"}:</strong> ${isRepeatedLoss ? "Your saved records show losses in 3 of the last 5 completed tax years." : "This year has records that may need stronger support."} Answer one question at a time. When you finish, Tax Bestie creates an educational discussion summary you can review with a qualified tax professional.</div>`;
  }
  const factor = factors[currentFactorIndex];
  const index = Number(factor.factor_no) - 1;
  const percent = Math.round(((currentFactorIndex + 1) / factors.length) * 100);
  if ($("checkinProgressText")) $("checkinProgressText").textContent = `Question ${currentFactorIndex + 1} of ${factors.length}`;
  if ($("checkinProgressPercent")) $("checkinProgressPercent").textContent = `${percent}% complete`;
  if ($("checkinProgressFill")) $("checkinProgressFill").style.width = `${percent}%`;
  if (backButton) backButton.disabled = currentFactorIndex === 0;
  if (nextButton) nextButton.textContent = currentFactorIndex === factors.length - 1 ? "Finish & Show Summary" : "Next";
  $("factorList").innerHTML = `<div class="factor single-factor">
    <div class="num">${factor.factor_no}</div>
    <div><h4>${factorText[index][0]} <button class="info" data-tip="${escapeHtml(factorText[index][1])}">i</button></h4><p class="muted">${factorText[index][1]}</p></div>
    <div class="checkin-choices" role="group" aria-label="${escapeHtml(factorText[index][0])}">
      <button type="button" class="${factor.answer === "yes" ? "selected" : ""}" data-factor-choice="${factor.factor_no}" data-answer="yes">Yes</button>
      <button type="button" class="${factor.answer === "mixed" ? "selected" : ""}" data-factor-choice="${factor.factor_no}" data-answer="mixed">Not sure / partly</button>
      <button type="button" class="${factor.answer === "no" ? "selected" : ""}" data-factor-choice="${factor.factor_no}" data-answer="no">No</button>
    </div>
    <textarea data-factor-note="${factor.factor_no}" placeholder="Optional: add a short note, receipt type, business change, or proof you have">${escapeHtml(factor.note || "")}</textarea>
  </div>`;
}

function setFactorAnswer(factorNo, answer, note = null) {
  const businessId = selectedBusinessId();
  const existing = state.factors.find(factor => Number(factor.business_id) === businessId && Number(factor.factor_no) === Number(factorNo));
  if (existing) {
    existing.answer = answer;
    if (note !== null) existing.note = note;
    return;
  }
  state.factors.push({
    business_id: businessId,
    factor_no: Number(factorNo),
    answer,
    note: note || ""
  });
}

function captureCurrentFactorInput() {
  const factor = factorsForBusiness()[currentFactorIndex];
  if (!factor) return;
  const note = document.querySelector(`[data-factor-note="${factor.factor_no}"]`)?.value || factor.note || "";
  const answer = state.factors.find(item => Number(item.business_id) === selectedBusinessId() && Number(item.factor_no) === Number(factor.factor_no))?.answer || factor.answer || "mixed";
  setFactorAnswer(factor.factor_no, answer, note);
}

function factorAnswerCounts(factors = factorsForBusiness()) {
  return factors.reduce((counts, factor) => {
    counts[factor.answer] = (counts[factor.answer] || 0) + 1;
    if (factor.note?.trim()) counts.notes += 1;
    return counts;
  }, { yes: 0, mixed: 0, no: 0, notes: 0 });
}

function renderFactorSummary(factors = factorsForBusiness()) {
  const el = $("factorSummary");
  if (!el) return;
  const counts = factorAnswerCounts(factors);
  const yesFactors = factors
    .filter(factor => factor.answer === "yes")
    .map(factor => factorText[Number(factor.factor_no) - 1]?.[0])
    .filter(Boolean);
  const needsWorkFactors = factors
    .filter(factor => factor.answer === "no" || factor.answer === "mixed")
    .map(factor => factorText[Number(factor.factor_no) - 1]?.[0])
    .filter(Boolean);
  const strength = counts.yes >= 6 && counts.notes >= 4
    ? "Strong record support"
    : counts.yes >= 4 || counts.notes >= 3
      ? "Developing record support"
      : "Needs more documentation";
  const className = counts.yes >= 6 ? "good" : counts.no >= 4 ? "risk" : "";
  const supportingText = yesFactors.length
    ? `Your answers currently show support in: ${yesFactors.slice(0, 4).join(", ")}${yesFactors.length > 4 ? ", and more" : ""}.`
    : "Your answers do not yet show clear support in any factor.";
  const workText = needsWorkFactors.length
    ? `Areas to document or discuss with a qualified tax professional: ${needsWorkFactors.slice(0, 5).join(", ")}${needsWorkFactors.length > 5 ? ", and more" : ""}.`
    : "No factor is marked Mixed or No right now; keep the records and evidence current.";
  const noteText = counts.notes < 3
    ? "Add short evidence notes where possible. Notes can mention receipts, calendars, platform reports, contracts, advisor input, business changes, or why losses occurred."
    : "You added notes to several factors, which helps organize the story behind the records.";
  const path = profitPath(recentFiveYearWindow());
  const lossText = path.lossRows.length >= 3
    ? `Your records show ${path.lossRows.length} completed loss years in the selected five-year window, so this summary is meant to help prepare a discussion about profit motive.`
    : `Your records show ${path.lossRows.length} completed loss year${path.lossRows.length === 1 ? "" : "s"} in the selected five-year window. Keep updating this review as records change.`;
  const discussionPoints = [
    path.lossRows.length >= 3 ? "Repeated losses and what business changes were made or planned." : "",
    path.incomeImproving ? "Income appears to be improving in the saved records." : "Whether income is increasing, flat, or declining.",
    path.lossNarrowing ? "Losses appear to be narrowing in the saved records." : "Whether losses are narrowing or growing.",
    counts.notes < 3 ? "Several answers need more written support or documentation." : "Several answers include notes that can help organize the record file."
  ].filter(Boolean);
  el.innerHTML = `<div class="alert ${className}">
    <strong>Business Check-In Summary:</strong> ${strength}.
    <p>${escapeHtml(lossText)}</p>
    <p>Yes: ${counts.yes}; Mixed: ${counts.mixed}; No: ${counts.no}; notes added: ${counts.notes}.</p>
    <p>${escapeHtml(supportingText)}</p>
    <p>${escapeHtml(workText)}</p>
    <p>${escapeHtml(noteText)}</p>
    <p><strong>Discuss with a qualified tax professional:</strong> ${escapeHtml(discussionPoints.join(" "))}</p>
    <p><strong>Records to gather:</strong> receipts, platform payout reports, contracts, calendars, mileage or travel logs, FMV support for gifts/barter/crypto, separate account records, business plan notes, and evidence of changes made to improve profitability.</p>
    <p class="muted">Educational record organization only. This does not decide whether the activity is a business or hobby, and no single factor controls. The IRS looks at all facts and circumstances. Confer with a qualified tax professional before filing or taking a tax position.</p>
  </div>`;
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

async function saveProfitReview(options = {}) {
  if (!profitReviewUnlocked) {
    toast("Business Check-In appears when saved records show repeated losses or a year that needs stronger support.");
    return;
  }
  captureCurrentFactorInput();
  const complete = Boolean(options.complete);
  const factors = factorsForBusiness().map(factor => ({
    factor_no: factor.factor_no,
    answer: factor.answer || "mixed",
    note: factor.note || ""
  }));
  profitReviewSubmitted = complete;
  await api("/api/factors", { method: "PUT", body: JSON.stringify({ business_id: selectedBusinessId(), factors }) });
  await refresh();
  document.querySelector('[data-view="factors"]').click();
  if (complete) {
    renderFactorSummary(factors);
    $("factorSummary")?.scrollIntoView({ behavior: "smooth", block: "start" });
    toast("Check-In finished. Discussion summary updated.");
  } else {
    toast("Check-In saved. You can finish it later.");
  }
}

function renderAll() {
  renderSettings();
  renderStorageModeNotice();
  renderBusinesses();
  renderDashboard();
  renderRecords();
  renderAudit();
  renderFactors();
  renderRecordWizard();
}

function labelType(type) {
  return {
    cash_income: "Cash income",
    cash_expense: "Cash expense",
    noncash_income: "Non-cash / FMV",
    crypto_income: "Crypto income",
    crypto_expense: "Crypto expense",
    review_note: "Review needed"
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
    amount_usd: moneyFieldValue("recordAmount"),
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

function validateAdvancedEntry() {
  const checks = [
    [$("recordTaxYear"), "Choose the tax year before saving."],
    [$("recordDate"), "Add the date before saving."],
    [$("recordAmount"), "Add the amount before saving."],
    [$("recordCategory"), "Add what this record was for before saving."],
    [$("counterparty"), "Add the payer, payee, provider, or exchange before saving."],
    [$("evidenceNote"), "Add the business purpose or evidence note before saving."]
  ];
  for (const [field, message] of checks) {
    if (!field.value.trim()) {
      toast(message);
      field.focus();
      return false;
    }
  }
  if (!validMoneyValue($("recordAmount").value)) {
    toast("Enter the dollar amount exactly, such as 4000 or 4000.00.");
    $("recordAmount").focus();
    return false;
  }
  const dateCheck = dateMatchesTaxYear($("recordDate").value, $("recordTaxYear").value);
  if (!dateCheck.ok) {
    toast(dateCheck.message);
    $("recordDate").focus();
    return false;
  }
  if (!$("recordType").value.includes("income") && !$("scheduleLine").value) {
    toast("Type the category or description so the app can suggest a Schedule C organizer line.");
    $("recordCategory").focus();
    return false;
  }
  return true;
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
  updateAdvancedCounterpartyLabel();
  goToView("capture", "Add Record", "Answer one question at a time to save income, expenses, products, gifts, or barter.");
}

function resetForm() {
  $("recordForm").reset();
  $("formTitle").textContent = "Add Record";
  $("recordId").value = "";
  $("recordDate").value = "";
  $("recordTaxYear").value = $("taxYear").value;
  setDateBoundsForTaxYear();
  $("recordBusiness").value = $("businessFilter").value;
  $("allocationPercent").value = 100;
  $("assetReview").value = "not_needed";
  $("evidenceFile").value = "";
  evidenceFilePayload = { name: "", type: "", data: "" };
  $("evidenceFileHint").textContent = "Optional receipt, screenshot, contract, or FMV proof.";
  delete $("scheduleLine").dataset.manual;
  updateLineSuggestion(true);
  updateAdvancedCounterpartyLabel();
}

function resetSimpleForm(options = {}) {
  const keepYear = $("taxYear").value;
  const keepBusiness = $("businessFilter").value;
  const keepBusinessName = $("simpleBusinessSearch")?.value || "";
  const keepType = options.keepType ? $("simpleType").value : "cash_income";
  $("simpleEntryForm").reset();
  $("simpleDate").value = "";
  $("taxYear").value = keepYear;
  $("recordTaxYear").value = keepYear;
  setDateBoundsForTaxYear();
  $("simpleBusiness").value = keepBusiness;
  $("simpleBusinessSearch").value = keepBusinessName || state.businesses.find(business => String(business.id) === String(keepBusiness))?.name || "";
  $("simpleEvidenceHint").textContent = "Optional proof.";
  $("simpleType").value = keepType;
  $("postSavePanel")?.classList.add("field-hidden");
  updateSimpleMappingPreview();
}

function clearSimpleEntryFields() {
  const keepType = $("simpleType").value;
  const keepBusinessId = $("simpleBusiness").value;
  const keepBusinessName = $("simpleBusinessSearch").value;
  $("simpleEntryForm").reset();
  $("simpleType").value = keepType;
  $("simpleBusiness").value = keepBusinessId;
  $("simpleBusinessSearch").value = keepBusinessName;
  $("simpleDate").value = "";
  setDateBoundsForTaxYear();
  $("simpleEvidenceHint").textContent = "Optional proof.";
  $("postSavePanel")?.classList.add("field-hidden");
  updateSimpleMappingPreview();
  toast("Entry cleared. Tax year, business, and entry type stayed selected.");
}

async function resetAllSavedData() {
  const confirmText = prompt("This clears all saved businesses, records, receipts, profit review answers, and recordkeeping history from this app. Type RESET to continue.");
  if (confirmText !== "RESET") {
    toast("Reset canceled.");
    return;
  }
  try {
    await api("/api/reset", { method: "POST", body: JSON.stringify({ confirm: "RESET" }) });
    selectedBusinessMemory = "";
    selectedTaxYearMemory = "";
    profitReviewSubmitted = false;
    currentFactorIndex = 0;
    profitReviewUnlocked = false;
    if ($("showAllYears")) $("showAllYears").checked = false;
    if ($("showDeleted")) $("showDeleted").checked = false;
    await refresh({ preserveSelection: false });
    wizardReset();
    toast("All saved data cleared.");
  } catch (error) {
    toast(errorMessage(error));
  }
}

function showPostSavePanel() {
  const panel = $("wizardPostSavePanel") || $("postSavePanel");
  if (!panel) return;
  const year = $("taxYear").value || "this tax year";
  const business = $("businessFilter").value ? businessName($("businessFilter").value) : "this business";
  const typeText = recordWizard.type === "cash_income"
      ? "income"
      : recordWizard.type === "cash_expense"
        ? "expense"
        : "product/gift";
  const crossPrompt = recordWizard.type === "cash_income"
    ? "Do you have any business expenses or product/gift income to add for this same tax year?"
    : recordWizard.type === "cash_expense"
      ? "Do you have any business income, product/gift income, or another expense to add for this same tax year?"
      : "Do you have any income or expenses to add for this same tax year?";
  if ($("wizardPostSaveText")) $("wizardPostSaveText").textContent = `Saved ${typeText} for ${business} in TY ${year}. ${crossPrompt}`;
  if ($("postSaveText")) $("postSaveText").textContent = `Add another item for ${business} in ${year}, or complete the tax-year review.`;
  panel.classList.remove("field-hidden");
}

function validateSimpleEntry() {
  const type = $("simpleType").value;
  const paymentValue = $("simplePaymentType").value;
  const required = [
    [$("taxYear"), "Choose the tax year before saving."],
    [$("simpleDate"), "Add the date before saving this contemporaneous record."],
    [$("simpleAmount"), "Add the amount before saving."],
    [$("simplePaymentType"), type.includes("income") ? "Choose the payment or remittance type before saving." : "Choose the payment method or expense type before saving."]
  ];
  for (const [field, message] of required) {
    if (!field.value.trim()) {
      toast(message);
      field.focus();
      return false;
    }
  }
  if (!validMoneyValue($("simpleAmount").value)) {
    toast("Enter the dollar amount exactly, such as 4000 or 4000.00.");
    $("simpleAmount").focus();
    return false;
  }
  const dateCheck = dateMatchesTaxYear($("simpleDate").value, $("taxYear").value);
  if (!dateCheck.ok) {
    toast(dateCheck.message);
    $("simpleDate").focus();
    return false;
  }
  const giftContext = updateGiftReviewUI(type, `${$("simpleWhat").value} ${$("simplePurpose").value}`.toLowerCase());
  if (type === "cash_income" && paymentValue === "crypto_business") {
    if (!$("cryptoBusinessStatus").value) {
      toast("Answer whether the crypto was received for this business.");
      $("cryptoBusinessStatus").focus();
      return false;
    }
    if ($("cryptoBusinessStatus").value !== "yes") {
      toast("Personal, investment, or unsure crypto is not added to this business profit/loss. Save only business payments here.");
      $("cryptoBusinessStatus").focus();
      return false;
    }
  }
  if ((type === "noncash_income" || paymentValue === "product_gift_barter") && !$("simpleWhat").value.trim()) {
    toast("Add what gift, product, trip, service, or barter item was received.");
    $("simpleWhat").focus();
    return false;
  }
  if ((type === "noncash_income" || paymentValue === "product_gift_barter") && giftContext.direction === "received" && !$("giftExchangeStatus").value) {
    toast("Answer whether the gift/barter was received because of content, promotion, review, or services.");
    $("giftExchangeStatus").focus();
    return false;
  }
  return true;
}

function editBusinessRecord(id) {
  const business = state.businesses.find(item => String(item.id) === String(id));
  if (!business) return;
  $("businessFormTitle").textContent = `Edit ${business.name}`;
  $("businessId").value = business.id;
  $("businessName").value = business.name;
  $("businessType").value = business.entity_type || "";
  delete $("businessType").dataset.autoFilled;
  $("businessDescription").value = business.description || "";
  $("businessActive").checked = Boolean(business.active);
  goToView("businesses", "Business Setup", "Add or edit the business/activity before recording income and expenses.");
}

function resetBusinessForm() {
  $("businessFormTitle").textContent = "Add Business / Activity";
  $("businessForm").reset();
  $("businessId").value = "";
  delete $("businessType").dataset.autoFilled;
  $("businessActive").checked = true;
  goToView("businesses", "Business Setup", "Add or edit the business/activity before recording income and expenses.");
  setTimeout(() => $("businessName").focus(), 30);
}

async function refresh(options = {}) {
  const preserveSelection = options.preserveSelection !== false;
  selectedTaxYearMemory = preserveSelection ? selectedTaxYearMemory || $("taxYear")?.value || "" : "";
  selectedBusinessMemory = preserveSelection ? selectedBusinessMemory || $("businessFilter")?.value || "" : "";
  state = await api("/api/bootstrap");
  renderTaxYears();
  renderLineOptions();
  renderBusinessFilter();
  resetForm();
  resetSimpleForm({ keepType: true });
  renderAll();
  updateExportLink();
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

function showView(view, title, subtitle) {
  document.body.classList.remove("landing-active");
  document.querySelectorAll(".nav").forEach(item => {
    item.classList.toggle("active", item.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach(item => item.classList.remove("active"));
  $(view).classList.add("active");
  document.body.dataset.view = view;
  if (title) $("viewTitle").textContent = title;
  if (subtitle) $("viewSub").textContent = subtitle;
}

function focusApp() {
  const target = document.querySelector("main") || document.querySelector(".app");
  requestAnimationFrame(() => {
    target?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function goToView(view, title, subtitle) {
  showView(view, title, subtitle);
  focusApp();
}

function enterApp(view = "dashboard") {
  const labels = {
    dashboard: ["Home", "Choose the business and tax year, then add records as money moves."],
    capture: ["Add Record", "Answer one question at a time to save income, expenses, products, gifts, or barter."],
    records: ["Progress", "Review saved records, yearly profit or loss, missing info, and five-year context."],
    factors: ["Bestie Alert", "Answer one simple question at a time when your records need a closer profit motive review."],
    imports: ["More", "Optional import, export, reset, and advanced tools."]
  };
  const selected = labels[view] || labels.dashboard;
  goToView(view, selected[0], selected[1]);
}

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    const labels = {
      dashboard: ["Home", "Choose the business and tax year, then add records as money moves."],
      capture: ["Add Record", "Answer one question at a time to save income, expenses, products, gifts, or barter."],
      records: ["Progress", "Review saved records, yearly profit or loss, missing info, and five-year context."],
      factors: ["Bestie Alert", "Answer one simple question at a time when your records need a closer profit motive review."],
      imports: ["More", "Optional import, export, reset, and advanced tools."]
    };
    goToView(button.dataset.view, labels[button.dataset.view][0], labels[button.dataset.view][1]);
    if (button.dataset.view === "capture") renderRecordWizard();
    if (button.dataset.view === "records") {
      renderRecords();
      renderAudit();
    }
    if (button.dataset.view === "factors") renderFactors();
  });
});

$("enterApp").addEventListener("click", () => showGuidedEntry());
$("previewApp").addEventListener("click", () => enterApp("records"));

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
$("simplePaymentType").addEventListener("change", updateSimpleMappingPreview);
$("cryptoBusinessStatus").addEventListener("change", updateSimpleMappingPreview);
$("giftExchangeStatus").addEventListener("change", updateSimpleMappingPreview);
$("simpleBusinessSearch").addEventListener("input", updateBusinessSuggestHint);
$("simpleBusinessSearch").addEventListener("change", () => applyBusinessSuggestionToInput("simpleBusinessSearch"));
$("simpleBusinessSearch").addEventListener("blur", () => applyBusinessSuggestionToInput("simpleBusinessSearch"));
$("businessName").addEventListener("input", syncBusinessTypeFromName);
$("businessName").addEventListener("change", () => applyBusinessSuggestionToInput("businessName"));
$("businessName").addEventListener("blur", () => applyBusinessSuggestionToInput("businessName"));
$("businessType").addEventListener("input", () => {
  delete $("businessType").dataset.autoFilled;
});
$("simpleBusiness").addEventListener("change", () => {
  updateBusinessSearchFromSelect();
  selectedBusinessMemory = $("simpleBusiness").value;
});

document.querySelectorAll("[data-simple-preset]").forEach(button => {
  button.addEventListener("click", () => setSimpleType(button.dataset.simplePreset));
});

document.body.addEventListener("input", (event) => {
  if (event.target?.dataset?.wizardDatePart) {
    const part = event.target.dataset.wizardDatePart;
    const cleaned = event.target.value.replace(/\D/g, "").slice(0, 2);
    event.target.value = cleaned;
    recordWizard[part === "month" ? "dateMonth" : "dateDay"] = cleaned;
    syncWizardDateParts();
    renderWizardLivePreview();
    return;
  }
  if (event.target?.dataset?.wizardInput) {
    recordWizard[event.target.dataset.wizardInput] = event.target.value;
    if (event.target.dataset.wizardInput === "what" && recordWizard.type === "cash_expense") {
      updateWizardMappingHint();
    }
    renderWizardLivePreview();
  }
});

document.body.addEventListener("click", (event) => {
  const startType = event.target.closest("[data-wizard-start-type]");
  if (!startType) return;
  const selectedName = recordWizard.businessName || ($("businessFilter")?.value ? businessName($("businessFilter").value) : "");
  showGuidedEntry();
  startWizardType(startType.dataset.wizardStartType || "", { keepBusinessName: selectedName });
  recordWizard.businessName = selectedName;
  recordWizard.step = recordWizard.type ? 1 : 0;
  renderRecordWizard();
});

$("recordWizardBack").addEventListener("click", () => {
  syncWizardInput();
  recordWizard.step = Math.max(0, recordWizard.step - 1);
  renderRecordWizard();
});

$("recordWizardNext").addEventListener("click", async () => {
  syncWizardInput();
  if (currentWizardStep() === "proof") await readWizardProof();
  const error = validateWizardStep();
  if (error) {
    toast(error);
    return;
  }
  recordWizard.step = Math.min(recordWizard.step + 1, wizardSteps().length - 1);
  renderRecordWizard();
});

$("recordWizardReset").addEventListener("click", () => wizardReset());
$("recordWizardSave").addEventListener("click", async () => {
  try {
    await saveWizardRecord();
  } catch (error) {
    toast(errorMessage(error));
  }
});
document.querySelectorAll("[data-post-add-type]").forEach(button => {
  button.addEventListener("click", () => {
    $("wizardPostSavePanel")?.classList.add("field-hidden");
    const selectedId = $("businessFilter")?.value || recordWizard.businessId || "";
    const selectedName = selectedId ? businessName(selectedId) : recordWizard.businessName;
    startWizardType(button.dataset.postAddType, { keepBusinessName: selectedName, keepBusinessId: selectedId });
    if (selectedId) {
      $("businessFilter").value = String(selectedId);
      recordWizard.businessId = String(selectedId);
    }
    recordWizard.businessName = selectedName;
    recordWizard.step = 1;
    renderRecordWizard();
  });
});
document.querySelectorAll("[data-new-record-different-year]").forEach(button => {
  button.addEventListener("click", () => {
    $("wizardPostSavePanel")?.classList.add("field-hidden");
    $("postSavePanel")?.classList.add("field-hidden");
    showGuidedEntry();
    wizardReset();
    setTimeout(() => $("taxYear")?.focus(), 60);
    toast("Choose the tax year for the new record, then tap Add.");
  });
});
$("wizardCompleteYearReview").addEventListener("click", () => {
  $("wizardPostSavePanel")?.classList.add("field-hidden");
  goToView("records", "Progress", "Review saved records, yearly profit or loss, missing info, and five-year context.");
  renderRecords();
  renderAudit();
});

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
  document.querySelector(".advanced-record-panel")?.classList.toggle("field-hidden", $("recordForm").classList.contains("advanced-hidden"));
  $("openAdvancedForm").textContent = $("recordForm").classList.contains("advanced-hidden") ? "Add Tax-Pro Details" : "Hide Tax-Pro Details";
});
$("clearSimpleForm").addEventListener("click", clearSimpleEntryFields);
$("clearEntryTopBtn").addEventListener("click", () => {
  showGuidedEntry();
  wizardReset();
});
$("resetAllDataTopBtn").addEventListener("click", resetAllSavedData);
$("addMoreEntry").addEventListener("click", () => {
  $("postSavePanel")?.classList.add("field-hidden");
  startWizardType(recordWizard.type);
});
$("completeYearReview").addEventListener("click", () => {
  $("postSavePanel")?.classList.add("field-hidden");
  goToView("records", "Progress", "Review saved records, yearly profit or loss, missing info, and five-year context.");
  renderRecords();
  renderAudit();
});

document.querySelectorAll("[data-allocation]").forEach(button => {
  button.addEventListener("click", () => {
    $("allocationPercent").value = button.dataset.allocation;
  });
});

document.querySelectorAll("[data-quick-type]").forEach(button => {
  button.addEventListener("click", () => {
    const selectedName = recordWizard.businessName || ($("businessFilter")?.value ? businessName($("businessFilter").value) : "");
    showGuidedEntry();
    startWizardType(button.dataset.quickType, { keepBusinessName: selectedName });
  });
});

if ($("resetWalkthroughBtn")) {
  $("resetWalkthroughBtn").addEventListener("click", resetAllSavedData);
}

$("addRecordBtn").addEventListener("click", () => {
  const wasOnCapture = document.body.dataset.view === "capture";
  showGuidedEntry();
  if (!wasOnCapture) {
    wizardReset();
  } else {
    renderRecordWizard();
  }
});

$("taxYear").addEventListener("change", () => {
  selectedTaxYearMemory = $("taxYear").value;
  profitReviewSubmitted = false;
  currentFactorIndex = 0;
  $("recordTaxYear").value = $("taxYear").value;
  setDateBoundsForTaxYear();
  clearMismatchedDate("recordDate");
  recordWizard.date = "";
  recordWizard.dateMonth = "";
  recordWizard.dateDay = "";
  updateExportLink();
  renderDashboard();
  renderRecords();
  renderAudit();
  renderFactors();
  if (document.body.dataset.view === "capture") renderRecordWizard();
});

$("simpleDate").addEventListener("change", () => {});
$("recordDate").addEventListener("change", () => clearMismatchedDate("recordDate", $("recordTaxYear").value || $("taxYear").value));
$("recordTaxYear").addEventListener("change", () => {
  if ($("recordTaxYear").value) {
    $("recordDate").min = `${$("recordTaxYear").value}-01-01`;
    $("recordDate").max = `${$("recordTaxYear").value}-12-31`;
  }
  clearMismatchedDate("recordDate", $("recordTaxYear").value);
});

$("businessFilter").addEventListener("change", () => {
  profitReviewSubmitted = false;
  currentFactorIndex = 0;
  if ($("businessFilter").value === "__new__") {
    selectedBusinessMemory = "";
    $("businessFilter").value = "";
    resetBusinessForm();
    toast("Enter the business/activity name and type.");
    return;
  }
  const selectedBusiness = state.businesses.find(business => String(business.id) === $("businessFilter").value);
  if (isPlaceholderBusiness(selectedBusiness)) {
    selectedBusinessMemory = $("businessFilter").value;
    editBusinessRecord(selectedBusiness.id);
    toast("Replace New Business Activity with the real business/activity name and type.");
    return;
  }
  selectedBusinessMemory = $("businessFilter").value;
  $("recordBusiness").value = $("businessFilter").value;
  $("simpleBusiness").value = $("businessFilter").value;
  updateBusinessSearchFromSelect();
  updateExportLink();
  updateTaxYearRangeHelp();
  renderDashboard();
  renderRecords();
  renderAudit();
  renderFactors();
});

$("showDeleted").addEventListener("change", renderRecords);
$("showAllYears").addEventListener("change", () => {
  renderRecords();
  renderAudit();
});
$("resetForm").addEventListener("click", resetForm);

$("recordForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateAdvancedEntry()) return;
  const id = $("recordId").value;
  if (id && !$("editReason").value.trim()) {
    toast("Add a reason for the edit.");
    return;
  }
  try {
    const payload = await formPayload();
    if (id) await api(`/api/entries/${id}`, { method: "PUT", body: JSON.stringify(payload) });
    else await api("/api/entries", { method: "POST", body: JSON.stringify(payload) });
    await refresh();
    toast(id ? "Record edited and recordkeeping history updated." : "Record saved.");
  } catch (error) {
    toast(errorMessage(error));
  }
});

$("simpleEntryForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateSimpleEntry()) return;
  const type = $("simpleType").value;
  const paymentValue = $("simplePaymentType").value;
  const derivedType = type === "cash_income" && paymentValue === "crypto_business"
    ? "crypto_income"
    : type === "cash_income" && paymentValue === "product_gift_barter"
      ? "noncash_income"
      : type;
  const whatValue = $("simpleWhat").value.trim();
  const purposeValue = $("simplePurpose").value.trim();
  const paymentText = paymentTypeLabel(type, paymentValue);
  const amountNumber = Number(moneyFieldValue("simpleAmount") || 0);
  const category = whatValue || (derivedType.includes("income") ? paymentText || "Income" : type === "cash_expense" || type === "crypto_expense" ? "Needs info" : "Needs info");
  const description = purposeValue || (derivedType.includes("income") ? paymentText : "");
  const giftContext = updateGiftReviewUI(type, `${category} ${description}`.toLowerCase());
  const giftStatus = $("giftExchangeStatus").value;
  const cryptoStatus = $("cryptoBusinessStatus")?.value || "";
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
  const simpleSignals = expenseReviewSignals(`${category} ${description}`.toLowerCase());
  const reviewNotes = expenseReviewNote(simpleSignals, amountNumber, `${category} ${description}`);
  const quickNotes = [];
  if (derivedType === "cash_expense" || derivedType === "crypto_expense") {
    quickNotes.push(...reviewNotes.map(note => `Bestie Quick Check: ${note}`));
  }
  if (derivedType === "noncash_income" || giftStatus === "yes" || giftStatus === "unsure") {
    quickNotes.push("Bestie Quick Check: save fair market value support and whether the product/gift was received for a post, review, service, or promotion.");
  }
  const needsAssetReview = cryptoStatus === "yes" || giftStatus === "unsure" || simpleSignals.meal || simpleSignals.vehicle || simpleSignals.homeOffice || ((simpleSignals.asset || /vehicle|car|truck|van/i.test(category)) && amountNumber >= 2000);
  const cryptoText = cryptoStatus === "yes" ? "Crypto question: Yes, received as a business payment. USD FMV at receipt included in business income. Later sale/spend gain-loss is outside this MVP and should be reviewed with a qualified tax professional." : "";
  const fmvMethod = derivedType === "noncash_income" || derivedType.includes("crypto") || giftStatus === "yes" || giftStatus === "unsure"
    ? `${fmvEvidenceText} ${giftStatusText} ${cryptoText}`.trim()
    : "";
  try {
    const keepType = type;
    const keepYear = $("taxYear").value;
    const businessId = await ensureSimpleBusiness();
    const payload = {
      business_id: businessId,
      record_type: derivedType,
      tax_year: $("taxYear").value,
      event_date: $("simpleDate").value,
      amount_usd: moneyFieldValue("simpleAmount"),
      allocation_percent: 100,
      asset_review: cryptoStatus === "yes" || giftStatus === "unsure" ? "review_needed" : needsAssetReview ? "possible_depreciation" : "not_needed",
      shared_use_note: "",
      category,
      description,
      schedule_line: (derivedType === "cash_expense" || derivedType === "crypto_expense") && !whatValue ? "needs_info" : inferLineFrom(derivedType, category, description),
      counterparty: $("simpleWho").value.trim(),
      fmv_method: fmvMethod,
      crypto_asset: "",
      crypto_amount: "",
      crypto_wallet: "",
      transaction_hash: "",
      evidence_note: [paymentText ? `Payment/remittance type: ${paymentText}.` : "", purposeValue, giftStatusText, cryptoText, ...quickNotes].filter(Boolean).join(" ") || "Quick capture",
      evidence_file_name: file.name,
      evidence_file_type: file.type,
      evidence_file_data: file.data,
      source: "simple_entry",
      reason: "Simple entry"
    };
    await api("/api/entries", { method: "POST", body: JSON.stringify(payload) });
    selectedTaxYearMemory = String(keepYear);
    selectedBusinessMemory = String(businessId);
    await refresh();
    $("taxYear").value = keepYear;
    $("recordTaxYear").value = keepYear;
    $("simpleType").value = keepType;
    $("simpleBusiness").value = String(businessId);
    $("businessFilter").value = String(businessId);
    selectedTaxYearMemory = String(keepYear);
    selectedBusinessMemory = String(businessId);
    updateBusinessSearchFromSelect();
    clearSimpleEntryFields();
    showPostSavePanel();
    renderDashboard();
    renderRecords();
    renderFactors();
    updateExportLink();
    toast("Saved.");
  } catch (error) {
    toast(errorMessage(error));
  }
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
  const factorChoice = event.target.dataset.factorChoice;
  const wizardChoice = event.target.closest("[data-wizard-choice]");
  if (wizardChoice) {
    const field = wizardChoice.dataset.wizardChoice;
    recordWizard[field] = wizardChoice.dataset.value || "";
    if (field === "type") {
      recordWizard.payment = "";
      recordWizard.giftStatus = "";
      recordWizard.date = "";
      recordWizard.what = "";
      recordWizard.amount = "";
      recordWizard.who = "";
      recordWizard.proofChoice = "";
      recordWizard.proofName = "";
      recordWizard.proofType = "";
      recordWizard.proofData = "";
    }
    renderWizardLivePreview();
    const error = validateWizardStep();
    if (error) {
      renderRecordWizard();
      return;
    }
    recordWizard.step = Math.min(recordWizard.step + 1, wizardSteps().length - 1);
    renderRecordWizard();
    return;
  }
  if (factorChoice) {
    const note = document.querySelector(`[data-factor-note="${factorChoice}"]`)?.value || "";
    setFactorAnswer(factorChoice, event.target.dataset.answer || "mixed", note);
    renderFactors();
    return;
  }
  if (portalAction) {
    if (portalAction === "export") {
      window.location.href = "/api/export.csv";
      return;
    }
    if (["records", "factors"].includes(portalAction)) {
      const labels = portalAction === "records"
        ? ["Progress", "Review saved records, yearly profit or loss, missing info, and five-year context."]
        : ["Bestie Alert", "Answer one simple question at a time when your records need a closer profit motive review."];
      goToView(portalAction, labels[0], labels[1]);
      return;
    }
    goToView("records", "Progress", "Review saved records, yearly profit or loss, missing info, and five-year context.");
    resetSimpleForm();
    setSimpleType(portalAction === "cash_expense" || portalAction === "cash_income" || portalAction === "noncash_income" ? portalAction : "cash_expense");
    return;
  }
  if (startReview) {
    profitReviewUnlocked = true;
    currentFactorIndex = 0;
    profitReviewSubmitted = false;
    renderFactors();
    goToView("factors", "Bestie Alert", "Answer one simple question at a time when your records need a closer profit motive review.");
    toast("Showing the Business Check-In.");
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

$("saveFactors").addEventListener("click", () => saveProfitReview({ complete: false }));
$("saveFactorsBottom").addEventListener("click", () => saveProfitReview({ complete: false }));
$("factorBack").addEventListener("click", () => {
  captureCurrentFactorInput();
  currentFactorIndex = Math.max(0, currentFactorIndex - 1);
  renderFactors();
});
$("factorNext").addEventListener("click", async () => {
  captureCurrentFactorInput();
  if (currentFactorIndex >= factorText.length - 1) {
    await saveProfitReview({ complete: true });
    return;
  }
  currentFactorIndex += 1;
  renderFactors();
});

$("businessForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  applyBusinessSuggestionToInput("businessName");
  const suggestion = findBusinessSuggestion($("businessName").value);
  if (!$("businessName").value.trim()) {
    toast("Enter the business/activity name before saving.");
    $("businessName").focus();
    return;
  }
  if (!$("businessType").value.trim() && !suggestion?.type) {
    toast("Enter the type of business/activity before saving.");
    $("businessType").focus();
    return;
  }
  const id = $("businessId").value;
  const payload = {
    name: $("businessName").value,
    entity_type: $("businessType").value || suggestion?.type || "",
    description: $("businessDescription").value || (suggestion ? `User selected suggested activity.` : ""),
    active: $("businessActive").checked
  };
  const saved = id
    ? await api(`/api/businesses/${id}`, { method: "PUT", body: JSON.stringify(payload) })
    : await api("/api/businesses", { method: "POST", body: JSON.stringify(payload) });
  selectedBusinessMemory = String(saved.id || id || "");
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
      current_tax_year: $("taxYear").value || state.settings.current_tax_year || new Date().getFullYear()
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

$("exportSelectedYear")?.addEventListener("click", (event) => {
  if (!localDemoMode) return;
  event.preventDefault();
  downloadLocalCsv($("exportSelectedYear").getAttribute("href") || "/api/export.csv");
});

refresh().catch(async (error) => {
  localDemoMode = true;
  try {
    await refresh({ preserveSelection: false });
    toast("Backend not connected. Demo storage is active in this browser.");
  } catch {
    document.body.innerHTML = `<main style="padding:24px"><h1>Tax Bestie could not open</h1><p>The backend is not connected and browser demo storage could not start.</p><pre>${escapeHtml(error.message)}</pre></main>`;
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
