import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Vercel serverless function max execution time (up to 60s)
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
    // fileBase64: raw base64 string (no data: prefix), mimeType: actual mime
    const { fileName, fileText, fileBase64, mimeType, fileType, reportLang = "en" } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    const isUrdu = reportLang === "ur";

    if (apiKey) {
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

      // Build the content parts for Gemini — use multimodal for PDF/image files
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let contents: any[];

      if (isTextFile && fileText) {
        // Plain text report: send as text
        contents = [{
          role: "user",
          parts: [
            { text: instructions },
            { text: `\n\nREPORT TEXT CONTENT:\n---\n${fileText.slice(0, 10000)}\n---\n\nFile name: ${fileName || "report"}` }
          ]
        }];
      } else if (fileBase64) {
        // PDF, image or binary — send as inline base64 for Gemini to directly read
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
        // Fallback: only file name available
        contents = [{
          role: "user",
          parts: [
            { text: instructions },
            { text: `File name: ${fileName || "Medical_Report"}. No readable content available. Generate a clinically appropriate analysis based on the file name type, but set all patientInfo fields to "Not Available".` }
          ]
        }];
      }

      // Try candidate models in order of capability and availability
      const candidateModels = [
        "gemini-3.6-flash",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-2.5-pro"
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let response: any = null;
      let lastModelError: any = null;

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
          console.warn(`Model ${model} attempt failed:`, err?.message || err);
          lastModelError = err;
        }
      }

      if (!response || !response.text) {
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
      } catch (parseErr) {
        console.warn("JSON parse failed on raw response, attempting regex extraction:", parseErr);
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ success: true, report: parsed, source: "Advanced Diagnostic Engine" });
        }
        throw new Error("Unable to parse JSON from AI model response");
      }
    }

    // Fallback: API key missing
    return NextResponse.json(
      {
        success: false,
        error: "GEMINI_API_KEY is not configured in environment variables. Please add GEMINI_API_KEY in your Vercel Project Settings."
      },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("Diagnostic Analysis Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to complete clinical report analysis" },
      { status: 500 }
    );
  }
}

