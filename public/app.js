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
    ["", "Select remittance type"],
    ["platform_payout", "Platform payout"],
    ["client_payment", "Client payment"],
    ["brand_deal", "Brand deal / sponsorship"],
    ["affiliate", "Affiliate payout"],
    ["cash_check", "Cash / check"],
    ["zelle_venmo", "Zelle / Venmo / Cash App"],
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
let evidenceFilePayload = { name: "", type: "", data: "" };
let profitReviewUnlocked = false;
let selectedTaxYearMemory = "";
let selectedBusinessMemory = "";
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
      ? "Suggested: Line 24b - Deductible meals. Transportation worker/DOT meals may have an 80% limit instead of the usual 50%; save trip details and confirm the tax-year rule with a qualified tax professional."
      : "Suggested: Line 24b - Deductible meals. The app should store the full receipt amount and estimate the deductible portion separately, often 50%. Confirm exceptions with a qualified tax professional.";
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
  const line = inferLineFrom(type, what, purpose);
  const words = `${what} ${purpose}`.toLowerCase();
  updateSimpleEntryLabels(type);
  updatePaymentTypeOptions(type);
  updateSimplePresetButtons(type);
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

function updateSimpleEntryLabels(type = $("simpleType").value) {
  const amountLabel = $("simpleAmountLabel");
  const whoLabel = $("simpleWhoLabel");
  const whatInput = $("simpleWhat");
  const whoInput = $("simpleWho");
  const purposeInput = $("simplePurpose");
  if (!amountLabel || !whoLabel) return;
  if (type === "cash_expense" || type === "crypto_expense") {
    amountLabel.textContent = type === "crypto_expense" ? "USD value paid" : "Amount paid";
    whoLabel.textContent = "Payee";
    if (whatInput) whatInput.placeholder = type === "crypto_expense" ? "Gas fee, exchange fee, crypto paid to vendor" : "Studio time, computer, mic, software, ads, contractor";
    if (whoInput) whoInput.placeholder = "Studio, Amazon, Apple, contractor, software company";
    if (purposeInput) purposeInput.placeholder = "Short note: what business use was this for?";
  } else if (type === "noncash_income") {
    amountLabel.textContent = "Fair market value";
    whoLabel.textContent = "Provider / brand";
    if (whatInput) whatInput.placeholder = "Brand product, sponsored trip, barter service, gifted equipment";
    if (whoInput) whoInput.placeholder = "Brand, sponsor, company, person";
    if (purposeInput) purposeInput.placeholder = "Short note: what post, review, service, or promotion was expected?";
  } else if (type === "crypto_income") {
    amountLabel.textContent = "USD value received";
    whoLabel.textContent = "Payer / exchange / wallet";
    if (whatInput) whatInput.placeholder = "USDC sponsorship, crypto payment, token reward";
    if (whoInput) whoInput.placeholder = "Brand, client, Coinbase, wallet";
    if (purposeInput) purposeInput.placeholder = "Short note: why did the business receive this crypto?";
  } else {
    amountLabel.textContent = "Amount received";
    whoLabel.textContent = "Payer";
    if (whatInput) whatInput.placeholder = "Platform payout, brand deal, client payment, affiliate income, sponsorship";
    if (whoInput) whoInput.placeholder = "YouTube, TikTok, Meta, brand, client, affiliate network";
    if (purposeInput) purposeInput.placeholder = "Short note: what content, service, or sale created this income?";
  }
}

function updatePaymentTypeOptions(type = $("simpleType").value) {
  const select = $("simplePaymentType");
  const label = $("simplePaymentLabel");
  if (!select || !label) return;
  const current = select.value;
  const options = paymentTypeOptions[type] || paymentTypeOptions.cash_expense;
  label.textContent = type.includes("income") ? "Payment / remittance type" : "Payment method / expense type";
  select.innerHTML = options.map(([value, text]) => `<option value="${value}">${text}</option>`).join("");
  if (options.some(([value]) => value === current)) select.value = current;
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

function entriesForYear(year = $("taxYear").value) {
  return state.entries.filter(entry => entryMatchesBusiness(entry) && !entry.deleted_at && String(entry.tax_year) === String(year));
}

function selectedBusinessId() {
  return Number($("businessFilter")?.value || state.businesses[0]?.id || 0);
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
  if (!$("taxYear").value) return [];
  const selected = Number($("taxYear").value);
  const years = [];
  for (let year = selected - 4; year <= selected; year++) years.push(year);
  const results = yearResults();
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
  const previous = selectedTaxYearMemory || $("taxYear")?.value || "";
  const years = new Set([...state.entries.map(e => Number(e.tax_year))]);
  for (let year = current - 6; year <= current + 4; year++) years.add(year);
  $("taxYear").innerHTML = `<option value="">Select tax year</option>` + [...years].filter(Boolean).sort((a, b) => b - a).map(year => `<option value="${year}">${year}</option>`).join("");
  $("taxYear").value = [...$("taxYear").options].some(option => option.value === String(previous)) ? String(previous) : "";
  selectedTaxYearMemory = $("taxYear").value;
  $("recordTaxYear").value = $("taxYear").value;
}

function renderBusinessFilter() {
  const selected = selectedBusinessMemory || String(selectedBusinessId());
  const options = state.businesses
    .filter(business => business.active || String(business.id) === selected)
    .map(business => `<option value="${business.id}">${escapeHtml(isPlaceholderBusiness(business) ? "New Business Activity - enter name/type" : business.name)}</option>`)
    .join("");
  const emptyOption = `<option value="">Choose business/activity</option>`;
  const addOption = `<option value="__new__">+ Add new business/activity</option>`;
  $("businessFilter").innerHTML = emptyOption + addOption + options;
  $("recordBusiness").innerHTML = emptyOption + options;
  $("simpleBusiness").innerHTML = emptyOption + options;
  $("businessFilter").value = state.businesses.some(b => String(b.id) === selected) ? selected : String(state.businesses[0]?.id || "");
  $("recordBusiness").value = $("businessFilter").value;
  $("simpleBusiness").value = $("businessFilter").value;
  selectedBusinessMemory = $("businessFilter").value;
  renderBusinessSuggestions();
  updateBusinessSearchFromSelect();
}

function renderDashboard() {
  if (!state.businesses.length) {
    $("incomeTotal").textContent = money.format(0);
    $("expenseTotal").textContent = money.format(0);
    $("netTotal").textContent = money.format(0);
    $("profitYears").textContent = "0 losses";
    $("score").textContent = "0%";
    $("scoreBar").style.width = "0%";
    $("scoreText").textContent = "Add your first business/activity and records.";
    $("profitAlert").innerHTML = `<div class="alert"><strong>Start clean:</strong> Add your business/activity, then enter income and expenses as they happen. This creates a live recordkeeping file based on your inputs.</div>`;
    $("yearChart").innerHTML = `<p class="muted">No records yet.</p>`;
    renderProfitLossTable([]);
    $("scheduleSummary").innerHTML = `<p class="muted">No expenses for ${escapeHtml(selectedTaxYearStatus())}.</p>`;
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
    $("scoreText").textContent = "Choose a tax year before reviewing income, expenses, or profit motive alerts.";
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
  const score = readinessScore();
  $("score").textContent = `${score}%`;
  $("scoreBar").style.width = `${score}%`;
  $("scoreText").textContent = score >= 75 ? "Strong educational record file. Keep evidence current." : score >= 50 ? "Moderate support. Add evidence, FMV support, and profit explanations." : "Needs stronger records, business-purpose notes, and profit path support.";
  renderProfitAlert(windowRows, path);
  updateProfitReviewAccess(path);
  renderChart(yearResults());
  renderProfitLossTable(windowRows);
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
    el.innerHTML = `<div class="alert risk"><strong>Bestie Alert:</strong> Your completed-year records show losses in ${path.lossRows.length} of the last 5 tax years for ${escapeHtml(businessName(selectedBusinessId()))}. That does not automatically mean it is a hobby, but the IRS may look more closely at whether you are operating with a profit motive.${trendText} If you are treating this as a business, answer the questions below and confer with a qualified tax professional when needed. <p class="muted">${hobbyTreatmentNote}</p><div class="actions" style="margin-top:10px"><button class="small primary" data-start-review="true">Review Profit Motive Factors</button><span class="muted">Not legal, tax, accounting, or Circular 230 written tax advice.</span></div></div>`;
    return;
  }
  if (path.profitRows.length >= 3) {
    el.innerHTML = `<div class="alert good"><strong>Profit pattern note:</strong> Your records show ${path.profitRows.length} profitable years in the selected five-year window. This may support a business pattern, but it is not a guarantee. Keep receipts, contracts, FMV proof, and business-purpose notes current.</div>`;
    return;
  }
  const liveNote = path.currentLive && path.currentLive.net < 0 ? ` Current-year ${path.currentLive.year} is live YTD and is not treated as final until the year closes.` : "";
  el.innerHTML = `<div class="alert"><strong>Profit Path Note:</strong> You have ${path.recorded.length} year${path.recorded.length === 1 ? "" : "s"} with records in this five-year window and ${path.lossRows.length} completed loss year${path.lossRows.length === 1 ? "" : "s"}.${trendText || " Keep documenting income growth, business changes, receipts, and why expenses help the activity make money."}${liveNote}</div>`;
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
  if (!rows.length) {
    el.innerHTML = `<p class="muted">No yearly profit/loss records yet.</p>`;
    return;
  }
  el.innerHTML = `<table><thead><tr><th>Tax Year</th><th>Income</th><th>Expenses</th><th>Profit / Loss</th><th>Status</th></tr></thead><tbody>${rows.map(row => {
    const net = Number(row.net || 0);
    const hasRecords = Number(row.income || 0) > 0 || Number(row.expenses || 0) > 0;
    const current = Number(state.settings.current_tax_year || new Date().getFullYear());
    const status = !hasRecords ? "No records" : Number(row.year) === current ? "Live YTD" : net < 0 ? "Loss year" : net > 0 ? "Profit year" : "Break even";
    return `<tr><td>${row.year}</td><td>${money.format(row.income || 0)}</td><td>${money.format(row.expenses || 0)}</td><td><strong class="${net < 0 ? "loss-text" : "profit-text"}">${money.format(net)}</strong></td><td><span class="chip ${net < 0 ? "risk" : net > 0 ? "good" : ""}">${status}</span></td></tr>`;
  }).join("")}</tbody></table>`;
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
  if ($("recordsYearLabel")) {
    $("recordsYearLabel").textContent = $("showAllYears")?.checked
      ? "Showing all years"
      : `Showing ${selectedTaxYearStatus()} only`;
  }
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
      <td><div class="row-actions">${entry.deleted_at ? `<button class="small" data-restore="${entry.id}">Restore</button>` : `<button class="small" data-edit="${entry.id}">Edit</button><button class="small icon-button danger" data-delete="${entry.id}" aria-label="Delete record ${entry.id}" title="Delete this record"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg><span class="sr-only">Delete</span></button>`}</div></td>
    </tr>`).join("")}</tbody></table>` : `<p class="muted">No records for ${escapeHtml(selectedTaxYearStatus())}.</p>`;
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

function renderAudit() {
  $("auditTable").innerHTML = state.audit.length ? `<table><thead><tr><th>Time</th><th>Action</th><th>Record detail</th><th>Reason</th></tr></thead><tbody>${state.audit.slice(0, 80).map(event => `<tr><td>${event.created_at}</td><td>${event.action}</td><td>#${event.entry_id || ""}<br><span class="muted">${escapeHtml(auditSummary(event))}</span></td><td>${escapeHtml(event.reason || "")}</td></tr>`).join("")}</tbody></table>` : `<p class="muted">No recordkeeping history yet.</p>`;
}

function renderFactors() {
  if (!profitReviewUnlocked) {
    if ($("factorSummary")) $("factorSummary").innerHTML = "";
    $("factorList").innerHTML = `<div class="alert"><strong>Profit Motive Review locked for now:</strong> The full questions appear after the app detects losses in 3 of the last 5 tax years for this business/activity. Keep adding income, expenses, gifts/barter, crypto, and evidence so the app can watch the profit path.</div>`;
    return;
  }
  const factors = factorsForBusiness();
  renderFactorSummary(factors);
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
  el.innerHTML = `<div class="alert ${className}">
    <strong>Profit Review Snapshot:</strong> ${strength}.
    <p>Yes: ${counts.yes}; Mixed: ${counts.mixed}; No: ${counts.no}; notes added: ${counts.notes}.</p>
    <p>${escapeHtml(supportingText)}</p>
    <p>${escapeHtml(workText)}</p>
    <p>${escapeHtml(noteText)}</p>
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

async function saveProfitReview() {
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
  document.querySelector('[data-view="factors"]').click();
  renderFactorSummary(factors);
  toast("Profit review saved. Snapshot updated.");
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
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  $("recordForm").reset();
  $("formTitle").textContent = "Add Record";
  $("recordId").value = "";
  $("recordDate").value = "";
  $("recordTaxYear").value = $("taxYear").value;
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
  $("simpleBusiness").value = keepBusiness;
  $("simpleBusinessSearch").value = keepBusinessName || state.businesses.find(business => String(business.id) === String(keepBusiness))?.name || "";
  $("simpleEvidenceHint").textContent = "Optional proof.";
  $("simpleType").value = keepType;
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
  $("simpleEvidenceHint").textContent = "Optional proof.";
  updateSimpleMappingPreview();
  toast("Entry cleared. Tax year, business, and entry type stayed selected.");
}

function validateSimpleEntry() {
  const type = $("simpleType").value;
  const required = [
    [$("taxYear"), "Choose the tax year before saving."],
    [$("simpleDate"), "Add the date before saving this contemporaneous record."],
    [$("simpleAmount"), "Add the amount before saving."],
    [$("simplePaymentType"), type.includes("income") ? "Choose the payment or remittance type before saving." : "Choose the payment method or expense type before saving."],
    [$("simpleWhat"), type.includes("income") ? "Add what kind of income this was before saving." : "Add what you paid for before saving."],
    [$("simpleWho"), type.includes("income") ? "Add the payer, provider, or exchange before saving." : "Add the payee before saving."],
    [$("simplePurpose"), "Add a short note before saving."]
  ];
  for (const [field, message] of required) {
    if (!field.value.trim()) {
      toast(message);
      field.focus();
      return false;
    }
  }
  const dateCheck = dateMatchesTaxYear($("simpleDate").value, $("taxYear").value);
  if (!dateCheck.ok) {
    toast(dateCheck.message);
    $("simpleDate").focus();
    return false;
  }
  const giftContext = updateGiftReviewUI(type, `${$("simpleWhat").value} ${$("simplePurpose").value}`.toLowerCase());
  if (type === "noncash_income" && giftContext.direction === "received" && !$("giftExchangeStatus").value) {
    toast("Answer whether the gift/barter was received because of content, promotion, review, or services.");
    $("giftExchangeStatus").focus();
    return false;
  }
  if (!type.includes("income") && !inferLineFrom(type, $("simpleWhat").value, $("simplePurpose").value)) {
    toast("Tell us what this expense was for before saving so it does not default to Other.");
    $("simpleWhat").focus();
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
  document.querySelector('[data-view="businesses"]').click();
}

function resetBusinessForm() {
  $("businessFormTitle").textContent = "Add Business / Activity";
  $("businessForm").reset();
  $("businessId").value = "";
  delete $("businessType").dataset.autoFilled;
  $("businessActive").checked = true;
  document.querySelector('[data-view="businesses"]').click();
  setTimeout(() => $("businessName").focus(), 30);
}

async function refresh() {
  selectedTaxYearMemory = selectedTaxYearMemory || $("taxYear")?.value || "";
  selectedBusinessMemory = selectedBusinessMemory || $("businessFilter")?.value || "";
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
$("clearSimpleForm").addEventListener("click", clearSimpleEntryFields);

document.querySelectorAll("[data-allocation]").forEach(button => {
  button.addEventListener("click", () => {
    $("allocationPercent").value = button.dataset.allocation;
  });
});

document.querySelectorAll("[data-quick-type]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector('[data-view="records"]').click();
    resetSimpleForm();
    setSimpleType(button.dataset.quickType);
  });
});

if ($("resetWalkthroughBtn")) {
  $("resetWalkthroughBtn").addEventListener("click", async () => {
    const confirmText = prompt("This clears businesses, records, profit review answers, and recordkeeping history for a fresh walkthrough. Type RESET to continue.");
    if (confirmText !== "RESET") {
      toast("Reset canceled.");
      return;
    }
    await api("/api/reset", { method: "POST", body: JSON.stringify({ confirm: "RESET" }) });
    selectedBusinessMemory = "";
    selectedTaxYearMemory = "";
    await refresh();
    toast("Walkthrough data cleared.");
  });
}

$("addRecordBtn").addEventListener("click", () => {
  document.querySelector('[data-view="records"]').click();
  resetSimpleForm();
  setTimeout(() => $("simpleAmount").focus(), 50);
});

$("taxYear").addEventListener("change", () => {
  selectedTaxYearMemory = $("taxYear").value;
  $("recordTaxYear").value = $("taxYear").value;
  updateExportLink();
  renderDashboard();
  renderRecords();
  renderFactors();
});

$("businessFilter").addEventListener("change", () => {
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
  renderDashboard();
  renderRecords();
  renderFactors();
});

$("showDeleted").addEventListener("change", renderRecords);
$("showAllYears").addEventListener("change", renderRecords);
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
  const category = $("simpleWhat").value.trim();
  const description = $("simplePurpose").value.trim();
  const giftContext = updateGiftReviewUI(type, `${category} ${description}`.toLowerCase());
  const giftStatus = $("giftExchangeStatus").value;
  const paymentText = paymentTypeLabel(type, $("simplePaymentType").value);
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
  try {
    const keepType = type;
    const keepYear = $("taxYear").value;
    const businessId = await ensureSimpleBusiness();
    const payload = {
      business_id: businessId,
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
      evidence_note: [description, paymentText ? `Payment/remittance type: ${paymentText}.` : "", giftStatusText].filter(Boolean).join(" "),
      evidence_file_name: file.name,
      evidence_file_type: file.type,
      evidence_file_data: file.data,
      source: "simple_entry",
      reason: "Simple entry"
    };
    await api("/api/entries", { method: "POST", body: JSON.stringify(payload) });
    await refresh();
    $("taxYear").value = keepYear;
    $("recordTaxYear").value = keepYear;
    $("simpleType").value = keepType;
    $("simpleBusiness").value = String(businessId);
    $("businessFilter").value = String(businessId);
    updateBusinessSearchFromSelect();
    clearSimpleEntryFields();
    renderDashboard();
    renderRecords();
    renderFactors();
    updateExportLink();
    toast("Saved. Add another record when ready.");
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
    setSimpleType(portalAction === "cash_expense" || portalAction === "cash_income" || portalAction === "noncash_income" ? portalAction : "cash_expense");
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

$("saveFactors").addEventListener("click", saveProfitReview);
$("saveFactorsBottom").addEventListener("click", saveProfitReview);

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

refresh().catch(error => {
  document.body.innerHTML = `<main style="padding:24px"><h1>Backend not running</h1><p>Start the local MVP server first, then open the localhost URL.</p><pre>${escapeHtml(error.message)}</pre></main>`;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
