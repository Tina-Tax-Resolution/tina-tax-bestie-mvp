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
let evidenceFilePayload = { name: "", type: "", data: "" };
let profitReviewUnlocked = false;
let profitReviewSubmitted = false;
let selectedTaxYearMemory = "";
let selectedBusinessMemory = "";
const hobbyTreatmentNote = "If this activity is not engaged in for profit, income may still need to be reported, but ordinary hobby expenses may be limited or unavailable as deductions under current federal rules. Inventory or cost-of-goods-sold questions should be reviewed separately with a qualified tax professional. Educational only.";
const fmvEvidenceText = "FMV support: save retail listing, comparable sale, invoice, contract, exchange price, appraised value, or other contemporaneous proof. Educational only; confer with a qualified tax professional.";

function lineLabel(line) {
  if (!line) return "Needs info - add description for Schedule C mapping";
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
  ["simpleDate", "recordDate"].forEach(id => {
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
  label.textContent = type.includes("income") ? "Payment / remittance type" : "Payment method / expense type";
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

function yearHasRecords(row) {
  return Number(row?.income || 0) > 0 || Number(row?.expenses || 0) > 0;
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
    $("scoreText").textContent = "Add records to measure whether the record file is complete.";
    $("profitAlert").innerHTML = `<div class="alert"><strong>Start clean:</strong> Add your business/activity, then enter income and expenses as they happen. This creates a live recordkeeping file based on your inputs.</div>`;
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
  profitReviewUnlocked = path.threeLossTrigger;
  const nav = document.querySelector('[data-view="factors"]');
  if (nav) nav.classList.toggle("locked", !profitReviewUnlocked);
}

function renderProfitAlert(rows, path) {
  const el = $("profitAlert");
  el.innerHTML = profitAlertHtml(path);
}

function profitAlertHtml(path) {
  if (!path.recorded.length) {
    return `<div class="alert"><strong>Start your business story:</strong> Add income, expenses, gifts/barter, crypto, and evidence. The app will watch the profit path as years are added.</div>`;
  }
  const trendBits = [
    path.incomeImproving ? "income is moving up" : "",
    path.lossNarrowing ? "losses are narrowing" : "",
  ].filter(Boolean);
  const trendText = trendBits.length ? ` The current trend shows ${trendBits.join(" and ")}.` : "";
  if (path.threeLossTrigger) {
    return `<div class="alert risk"><strong>Bestie Alert:</strong> Your completed-year records show losses in ${path.lossRows.length} of the last 5 tax years for ${escapeHtml(businessName(selectedBusinessId()))}. That does not automatically mean it is a hobby, but the IRS may look more closely at whether you are operating with a profit motive.${trendText} If you are treating this as a business, answer the questions below and confer with a qualified tax professional when needed. <p class="muted">${hobbyTreatmentNote}</p><div class="actions" style="margin-top:10px"><button class="small primary" data-start-review="true">Review Profit Motive Factors</button><span class="muted">Not legal, tax, accounting, or Circular 230 written tax advice.</span></div></div>`;
  }
  if (path.profitRows.length >= 3) {
    return `<div class="alert good"><strong>Profit pattern note:</strong> Your records show ${path.profitRows.length} profitable years in the selected five-year window. This may support a business pattern, but it is not a guarantee. Keep receipts, contracts, FMV proof, and business-purpose notes current.</div>`;
  }
  if (path.lossRows.length === 2) {
    return `<div class="alert warn"><strong>Heads up:</strong> Your completed-year records show 2 loss years in this five-year window. That can happen in a startup phase, but keep documenting income growth, business changes, receipts, and why expenses help the activity make money.${trendText} The 9-question Profit Alert appears if saved records show losses in 3 of 5 completed tax years. Educational record organization only; consult a qualified tax professional.</div>`;
  }
  const liveNote = path.currentLive && path.currentLive.net < 0 ? ` Current-year ${path.currentLive.year} is live YTD and is not treated as final until the year closes.` : "";
  return `<div class="alert"><strong>Profit Path Note:</strong> You have ${path.recorded.length} year${path.recorded.length === 1 ? "" : "s"} with records in this five-year window and ${path.lossRows.length} completed loss year${path.lossRows.length === 1 ? "" : "s"}.${trendText || " Keep documenting income growth, business changes, receipts, and why expenses help the activity make money."}${liveNote}</div>`;
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
        <strong>${escapeHtml(status.label)} ${money.format(Math.abs(t.net))}</strong>
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
  el.innerHTML = profitAlertHtml(path);
}

function renderRecordsProfitPreview(rows = recentFiveYearWindow()) {
  const el = $("recordsProfitPreview");
  if (!el) return;
  if (!$("taxYear")?.value) {
    el.innerHTML = "";
    return;
  }
  const savedRows = rows.filter(yearHasRecords);
  const emptyYears = rows.filter(row => !yearHasRecords(row)).map(row => row.year);
  if (!savedRows.length) {
    el.innerHTML = `<div class="alert"><strong>Five-Year Review Window:</strong> ${rows.map(row => row.year).join(", ")}. No saved records yet in this selected window.</div>`;
    return;
  }
  const emptyNote = emptyYears.length
    ? `<p class="muted">Five-year review window also includes ${emptyYears.join(", ")} with no saved records. Those years are shown for Section 183 context only; they are not stored income or expense records.</p>`
    : "";
  el.innerHTML = `<h4 class="mini-heading">Tax Years With Saved Records In This Five-Year Window</h4>${emptyNote}<table><thead><tr><th>Tax Year</th><th>Income</th><th>Expenses</th><th>Profit / Loss</th><th>Status</th></tr></thead><tbody>${savedRows.map(row => {
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
      <td><div class="row-actions">${entry.deleted_at ? `<button class="small" data-restore="${entry.id}">Restore</button>` : `<button class="small" data-edit="${entry.id}">Edit</button><button class="small icon-button danger" data-delete="${entry.id}" aria-label="Delete record ${entry.id}" title="Delete this record"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg><span class="sr-only">Delete</span></button>`}</div></td>
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
  const bottomWrap = document.querySelector(".factor-save-bottom");
  if (!profitReviewUnlocked) {
    intro?.classList.add("field-hidden");
    hobby?.classList.add("field-hidden");
    topButton?.classList.add("field-hidden");
    bottomWrap?.classList.add("field-hidden");
    if ($("factorSummary")) {
      $("factorSummary").innerHTML = `<div class="alert"><strong>No Profit Review needed yet.</strong> Keep capturing records. The app will prompt you if saved records show losses in 3 of 5 completed tax years for this business/activity. Educational record organization only.</div>`;
    }
    $("factorList").innerHTML = "";
    return;
  }
  intro?.classList.remove("field-hidden");
  hobby?.classList.remove("field-hidden");
  topButton?.classList.remove("field-hidden");
  bottomWrap?.classList.remove("field-hidden");
  const factors = factorsForBusiness();
  if (profitReviewSubmitted) {
    renderFactorSummary(factors);
  } else if ($("factorSummary")) {
    $("factorSummary").innerHTML = `<div class="alert risk"><strong>Bestie Alert:</strong> Your records show a repeated loss pattern. Answer the questions below, then click <strong>Submit Review</strong> to generate an educational discussion summary for you and a qualified tax professional. This is record organization only, not tax advice.</div>`;
  }
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
    <strong>Profit Motive Discussion Summary:</strong> ${strength}.
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
  profitReviewSubmitted = true;
  await api("/api/factors", { method: "PUT", body: JSON.stringify({ business_id: selectedBusinessId(), factors }) });
  await refresh();
  document.querySelector('[data-view="factors"]').click();
  renderFactorSummary(factors);
  $("factorSummary")?.scrollIntoView({ behavior: "smooth", block: "start" });
  toast("Review submitted. Discussion summary updated.");
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
  window.scrollTo({ top: 0, behavior: "smooth" });
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

function showPostSavePanel() {
  const panel = $("postSavePanel");
  if (!panel) return;
  const year = $("taxYear").value || "this tax year";
  const business = $("businessFilter").value ? businessName($("businessFilter").value) : "this business";
  $("postSaveText").textContent = `Add another item for ${business} in ${year}, or complete the tax-year review.`;
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
  showView("businesses", "Business Setup", "Add or edit the business/activity before recording income and expenses.");
}

function resetBusinessForm() {
  $("businessFormTitle").textContent = "Add Business / Activity";
  $("businessForm").reset();
  $("businessId").value = "";
  delete $("businessType").dataset.autoFilled;
  $("businessActive").checked = true;
  showView("businesses", "Business Setup", "Add or edit the business/activity before recording income and expenses.");
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

function enterApp(view = "dashboard") {
  const labels = {
    dashboard: ["Home", "Choose the business and tax year, then add records as money moves."],
    records: ["Year Review", "Review saved records, yearly profit or loss, missing info, and five-year context."],
    factors: ["Profit Alert", "The 9 questions appear only after a 3-out-of-5 completed loss pattern is detected."],
    imports: ["More", "Optional import, export, reset, and advanced tools."]
  };
  const selected = labels[view] || labels.dashboard;
  showView(view, selected[0], selected[1]);
}

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    const labels = {
      dashboard: ["Home", "Choose the business and tax year, then add records as money moves."],
      records: ["Year Review", "Review saved records, yearly profit or loss, missing info, and five-year context."],
      factors: ["Profit Alert", "The 9 questions appear only after a 3-out-of-5 completed loss pattern is detected."],
      imports: ["More", "Optional import, export, reset, and advanced tools."]
    };
    showView(button.dataset.view, labels[button.dataset.view][0], labels[button.dataset.view][1]);
  });
});

$("enterApp").addEventListener("click", () => enterApp("dashboard"));
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
$("addMoreEntry").addEventListener("click", () => {
  $("postSavePanel")?.classList.add("field-hidden");
  clearSimpleEntryFields();
  setTimeout(() => $("simpleDate").focus(), 50);
});
$("completeYearReview").addEventListener("click", () => {
  $("postSavePanel")?.classList.add("field-hidden");
  showView("records", "Year Review", "Review saved records, yearly profit or loss, missing info, and five-year context.");
  renderRecords();
  renderAudit();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll("[data-allocation]").forEach(button => {
  button.addEventListener("click", () => {
    $("allocationPercent").value = button.dataset.allocation;
  });
});

document.querySelectorAll("[data-quick-type]").forEach(button => {
  button.addEventListener("click", () => {
    showView("capture", "Add Record", "Save one income, expense, product/gift/barter, or business crypto payment.");
    resetSimpleForm();
    setSimpleType(button.dataset.quickType);
  });
});

if ($("resetWalkthroughBtn")) {
  $("resetWalkthroughBtn").addEventListener("click", async () => {
    const confirmText = prompt("This clears saved businesses, records, receipts, profit review answers, and recordkeeping history from this app. Type RESET to continue.");
    if (confirmText !== "RESET") {
      toast("Reset canceled.");
      return;
    }
    try {
      await api("/api/reset", { method: "POST", body: JSON.stringify({ confirm: "RESET" }) });
      selectedBusinessMemory = "";
      selectedTaxYearMemory = "";
      if ($("showAllYears")) $("showAllYears").checked = false;
      if ($("showDeleted")) $("showDeleted").checked = false;
      await refresh({ preserveSelection: false });
      toast("Data cleared.");
    } catch (error) {
      toast(errorMessage(error));
    }
  });
}

$("addRecordBtn").addEventListener("click", () => {
  showView("capture", "Add Record", "Save one income, expense, product/gift/barter, or business crypto payment.");
  resetSimpleForm();
  setTimeout(() => $("simpleAmount").focus(), 50);
});

$("taxYear").addEventListener("change", () => {
  selectedTaxYearMemory = $("taxYear").value;
  profitReviewSubmitted = false;
  $("recordTaxYear").value = $("taxYear").value;
  setDateBoundsForTaxYear();
  clearMismatchedDate("simpleDate");
  clearMismatchedDate("recordDate");
  updateExportLink();
  renderDashboard();
  renderRecords();
  renderAudit();
  renderFactors();
});

$("simpleDate").addEventListener("change", () => clearMismatchedDate("simpleDate"));
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
  const needsAssetReview = cryptoStatus === "yes" || giftStatus === "unsure" || category.toLowerCase().match(/computer|camera|mic|microphone|phone|equipment|laptop/);
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
      evidence_note: [paymentText ? `Payment/remittance type: ${paymentText}.` : "", purposeValue, giftStatusText, cryptoText].filter(Boolean).join(" ") || "Quick capture",
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
  if (portalAction) {
    if (portalAction === "export") {
      window.location.href = "/api/export.csv";
      return;
    }
    if (["records", "factors"].includes(portalAction)) {
      const labels = portalAction === "records"
        ? ["Year Review", "Review saved records, yearly profit or loss, missing info, and five-year context."]
        : ["Profit Alert", "The 9 questions appear only after a 3-out-of-5 completed loss pattern is detected."];
      showView(portalAction, labels[0], labels[1]);
      return;
    }
    showView("records", "Year Review", "Review saved records, yearly profit or loss, missing info, and five-year context.");
    resetSimpleForm();
    setSimpleType(portalAction === "cash_expense" || portalAction === "cash_income" || portalAction === "noncash_income" ? portalAction : "cash_expense");
    return;
  }
  if (startReview) {
    profitReviewUnlocked = true;
    renderFactors();
    showView("factors", "Profit Alert", "The 9 questions appear only after a 3-out-of-5 completed loss pattern is detected.");
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
