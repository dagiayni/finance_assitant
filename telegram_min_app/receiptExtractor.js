// receiptExtractor.js
// Step 1: OCR.space  → free, extracts raw text from image (500 req/day)
// Step 2: OpenRouter → free Gemini Flash parses structure from that text
// Future: swap both steps for Claude vision when scaling

const OCR_SPACE_URL  = "https://api.ocr.space/parse/image";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// ─── Step 1: OCR.space — raw text extraction ─────────────────────────────────

async function extractTextWithOCR(imageBase64, mimeType = "image/jpeg") {
  const formData = new FormData();
  formData.append("base64Image",       `data:${mimeType};base64,${imageBase64}`);
  formData.append("language",          "eng");
  formData.append("isOverlayRequired", "false");
  formData.append("detectOrientation", "true");
  formData.append("scale",             "true"); // helps with small/blurry receipts
  formData.append("OCREngine",         "2");    // Engine 2 is better for receipts

  const response = await fetch(OCR_SPACE_URL, {
    method:  "POST",
    headers: { "apikey": process.env.OCR_SPACE_API_KEY },
    body:    formData,
  });

  if (!response.ok) {
    throw new Error(`OCR.space HTTP error: ${response.status}`);
  }

  const data = await response.json();

  if (data.IsErroredOnProcessing) {
    throw new Error(`OCR.space error: ${data.ErrorMessage}`);
  }

  const rawText = data.ParsedResults
    ?.map(r => r.ParsedText)
    .join("\n")
    .trim();

  if (!rawText) {
    throw new Error("OCR.space returned empty text — image may be unreadable");
  }

  return rawText;
}

// ─── Step 2: OpenRouter Gemini Flash (free) — parse structure from text ───────

async function parseStructureWithAI(rawText) {
  const prompt = `
You are a receipt data parser. Below is raw OCR text from a receipt.
Return ONLY a valid JSON object — no markdown, no explanation, raw JSON only.

OCR TEXT:
---
${rawText}
---

Return this exact structure:
{
  "vendor_name":  string or null,
  "vendor_tin":   string or null,
  "date":         string (YYYY-MM-DD) or null,
  "items": [
    { "description": string, "quantity": number, "unit_price": number, "total": number }
  ],
  "subtotal":     number or null,
  "tax":          number or null,
  "total_amount": number or null,
  "currency":     string (default "ETB"),
  "confidence":   number (0.0 to 1.0)
}

Confidence guide: 1.0 = everything clear, 0.7 = some fields uncertain, 0.4 = messy OCR.
Use null for any field not found. Return [] for items if none are listed.
`;

  const response = await fetch(OPENROUTER_URL, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer":  process.env.APP_URL || "http://localhost:3000",
      "X-Title":       "Finance Assistant",
    },
    body: JSON.stringify({
      model:      "google/gemini-2.0-flash-exp:free",
      max_tokens: 800,
      messages:   [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter error: ${response.status}`);
  }

  const data    = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  return parseJSON(content);
}

// ─── TIN classification ───────────────────────────────────────────────────────

function classifyTransaction(extracted, masterTin) {
  const vendorTin = (extracted.vendor_tin || "").trim();
  const master    = (masterTin || "").trim();

  // No TIN on receipt = paying an external vendor = expense
  if (!vendorTin || !master) return "expense";

  return vendorTin === master ? "income" : "expense";
}

// ─── JSON parser (strips markdown fences models sometimes add) ────────────────

function parseJSON(raw) {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * extractReceiptData
 *
 * @param {string} imageBase64  - base64-encoded receipt image
 * @param {string} masterTin    - the business's own TIN (set by owner)
 * @param {string} [mimeType]   - image MIME type (default: "image/jpeg")
 *
 * @returns {object} {
 *   data:        parsed receipt fields,
 *   type:        "income" | "expense",
 *   rawText:     raw OCR text (store this for audit trail),
 *   needsReview: boolean — true if confidence < 0.75,
 * }
 */
async function extractReceiptData(imageBase64, masterTin, mimeType = "image/jpeg") {
  // Step 1 — get raw text (free, OCR.space)
  console.log("[extractor] Running OCR.space...");
  const rawText = await extractTextWithOCR(imageBase64, mimeType);
  console.log("[extractor] OCR text length:", rawText.length);

  // Step 2 — parse structure from text (free, Gemini Flash)
  console.log("[extractor] Parsing with Gemini Flash...");
  const extracted = await parseStructureWithAI(rawText);
  console.log("[extractor] Confidence:", extracted.confidence);

  // Step 3 — classify as income or expense
  const type = classifyTransaction(extracted, masterTin);

  return {
    data:        extracted,
    type,
    rawText,                                  // store for audit trail & future re-parsing
    needsReview: extracted.confidence < 0.75,
  };
}

module.exports = { extractReceiptData };
