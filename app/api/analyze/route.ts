import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Vercel serverless function max execution time
export const maxDuration = 60;

function resolveMimeType(mime?: string | null, fileName?: string | null): string {
  const ext = fileName?.split(".").pop()?.toLowerCase();
  if (mime && mime !== "application/octet-stream" && mime.includes("/")) {
    return mime;
  }
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "txt":
      return "text/plain";
    case "csv":
      return "text/csv";
    default:
      return "application/pdf";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, fileText, fileBase64, mimeType, fileType, reportLang = "en" } = body;

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const isUrdu = reportLang === "ur";

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "GEMINI_API_KEY is not configured in Vercel environment variables. Please add GEMINI_API_KEY in your Vercel Project Settings and redeploy."
        },
        { status: 500 }
      );
    }

    const client = new GoogleGenAI({ apiKey });

    const instructions = `
You are an expert clinical medical report analyst. Your task is to:
1. READ the uploaded medical document carefully.
2. EXTRACT real patient details exactly as they appear in the document. Never invent or assume patient details.
3. ANALYZE every test result, value, and finding in the report.
4. Generate a comprehensive, detailed medical analysis.

PATIENT INFORMATION EXTRACTION RULES:
- Scan the entire document for: patient name, age, sex/gender, specimen/accession/sample ID, referring doctor name, lab/hospital/clinic name.
- These fields are usually near the top of lab reports. Look for labels like: "Patient Name:", "Name:", "Patient:", "Age:", "Sex:", "Gender:", "Specimen No:", "Lab No:", "Sample ID:", "Referred by:", "Ref. Doctor:", "Dr.", "Lab:", "Hospital:", "Clinic:"
- If a field is genuinely NOT present in the document, use the string "Not Available".
- Do NOT fabricate or guess patient information.

LANGUAGE RULE:
- Output language: ${isUrdu ? "URDU (اردو) only. Use Urdu script for all text fields. Only keep standard medical abbreviations like Hgb, WBC, CRP, etc. in English." : "Professional English only."}

STRICT OUTPUT FORMAT:
Respond ONLY with a raw valid JSON object. No markdown, no code fences, no extra text before or after.

JSON STRUCTURE:
{
  "title": "${isUrdu ? "جامع طبی تشخیصی رپورٹ" : "Comprehensive Clinical Diagnostic Report"}",
  "category": "${isUrdu ? "کلینیکل پیتھالوجی و تجزیہ" : "Clinical Pathology & Analysis"}",
  "date": "${new Date().toLocaleDateString(isUrdu ? "ur-PK" : "en-US", { month: "short", day: "numeric", year: "numeric" })}",
  "patientInfo": {
    "name": "Extracted patient name exactly as in document, or Not Available",
    "age": "Extracted age with unit (e.g. 28 Years), or Not Available",
    "gender": "Extracted gender (Male/Female or مرد/خاتون), or Not Available",
    "specimenId": "Extracted specimen or lab ID, or N/A",
    "referringDoctor": "Extracted doctor name with Dr. title, or Not Available",
    "facility": "Extracted lab or hospital name, or Not Available"
  },
  "overallStatus": "Comprehensive clinical summary of patient health status",
  "overallStatusSeverity": "success or warning or danger",
  "virusAndInfectionDetection": {
    "status": "Summary of infection or viral finding",
    "hasDetection": true or false,
    "detectedPathogens": ["list", "of", "markers"],
    "details": "Detailed paragraph about any infections, pathogens, or inflammatory markers found"
  },
  "sicknessExplanations": [
    "Detailed physiological explanation of finding 1",
    "Detailed physiological explanation of finding 2",
    "Detailed physiological explanation of finding 3"
  ],
  "biomarkers": [
    {
      "name": "Test/parameter name",
      "value": "Measured value",
      "unit": "Unit of measurement",
      "refRange": "Normal reference range",
      "status": "Normal or Low or High or Elevated or Critical",
      "flag": "success or warning or danger",
      "explanation": "What this specific result means clinically for the patient",
      "pct": 50
    }
  ],
  "insights": [
    "Key clinical insight 1",
    "Key clinical insight 2",
    "Key clinical insight 3"
  ],
  "doctorRecommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2",
    "Specific actionable recommendation 3"
  ]
}
`.trim();

    const finalMime = resolveMimeType(mimeType || fileType, fileName);
    const isTextFile = !fileBase64 || finalMime.startsWith("text/") || fileName?.endsWith(".txt") || fileName?.endsWith(".csv");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contents: any[];

    if (isTextFile && fileText) {
      contents = [{
        role: "user",
        parts: [
          { text: instructions },
          { text: `\n\nREPORT TEXT CONTENT:\n---\n${fileText.slice(0, 10000)}\n---\n\nFile name: ${fileName || "report"}` }
        ]
      }];
    } else if (fileBase64) {
      contents = [{
        role: "user",
        parts: [
          { text: instructions },
          {
            inlineData: {
              mimeType: finalMime,
              data: fileBase64
            }
          },
          { text: `\nFile name: ${fileName || "report"}. Extract all patient information and analyze all test results from the document above.` }
        ]
      }];
    } else {
      contents = [{
        role: "user",
        parts: [
          { text: instructions },
          { text: `File name: ${fileName || "Medical_Report"}. No readable content available. Generate a clinically appropriate analysis based on the file name type, but set all patientInfo fields to "Not Available".` }
        ]
      }];
    }

    // Supported high-performance Gemini models
    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-pro-preview",
      "gemini-3.1-flash-lite",
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any = null;
    let lastModelError: any = null;
    let isQuotaExceeded = false;
    let isKeyInvalid = false;

    for (const model of candidateModels) {
      try {
        response = await client.models.generateContent({
          model,
          contents,
          config: {
            responseMimeType: "application/json",
          },
        });
        if (response && response.text) {
          break;
        }
      } catch (err: any) {
        const msg = err?.message || String(err);
        console.warn(`Model ${model} execution error:`, msg);
        lastModelError = err;

        if (
          msg.includes("API_KEY_INVALID") ||
          msg.includes("API key not valid") ||
          msg.includes("UNAUTHENTICATED") ||
          err?.status === 400 ||
          err?.status === 401 ||
          err?.status === 403
        ) {
          isKeyInvalid = true;
          break; // Stop immediately on invalid key
        }

        if (
          msg.includes("429") ||
          msg.includes("RESOURCE_EXHAUSTED") ||
          msg.includes("Quota exceeded") ||
          err?.status === 429
        ) {
          isQuotaExceeded = true;
        }
      }
    }

    if (isKeyInvalid) {
      return NextResponse.json(
        {
          success: false,
          error: isUrdu
            ? "جیمنی اے آئی کی (API Key) درست نہیں ہے۔ براہ کرم گوگل اے آئی اسٹوڈیو کی درست کی فراہم کریں۔"
            : "The provided GEMINI_API_KEY is invalid or unauthorized. Please verify your Google AI Studio API key in your Vercel Project Settings."
        },
        { status: 401 }
      );
    }

    if (!response || !response.text) {
      if (isQuotaExceeded) {
        const quotaMsg = isUrdu
          ? "جیمنی اے آئی فری کوٹہ کی حد (Rate Limit) مکمل ہو چکی ہے۔ براہ کرم 10 سیکنڈ بعد دوبارہ کوشش کریں۔"
          : "Gemini API rate limit reached. Please wait ~10 seconds and try again.";
        return NextResponse.json({ success: false, error: quotaMsg }, { status: 429 });
      }
      throw new Error(lastModelError?.message || "Failed to generate report with available AI models");
    }

    const rawText = response.text || "";
    const cleanedText = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleanedText);
      return NextResponse.json({ success: true, report: parsed, source: "Advanced Diagnostic Engine" });
    } catch {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ success: true, report: parsed, source: "Advanced Diagnostic Engine" });
      }
      throw new Error("Unable to parse structured JSON from AI model response");
    }

  } catch (error: any) {
    console.error("Diagnostic Analysis Error:", error);
    const msg = error?.message || "Failed to complete clinical report analysis";
    const isQuota = msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("Quota exceeded");
    return NextResponse.json(
      {
        success: false,
        error: isQuota
          ? "Gemini API rate limit reached. Please wait a few moments and try again."
          : msg
      },
      { status: isQuota ? 429 : 500 }
    );
  }
}
