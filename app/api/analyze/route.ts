import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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

      // Build the content parts for Gemini — use multimodal for PDF/image files
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let contents: any[];
      const isTextFile = !fileBase64 || fileType?.includes("text") || (mimeType || "").includes("text");

      if (isTextFile && fileText) {
        // Plain text report: send as text
        contents = [{
          role: "user",
          parts: [
            { text: instructions },
            { text: `\n\nREPORT TEXT CONTENT:\n---\n${fileText.slice(0, 8000)}\n---\n\nFile name: ${fileName || "report"}` }
          ]
        }];
      } else if (fileBase64 && mimeType) {
        // PDF, image or binary — send as inline base64 for Gemini to directly read
        contents = [{
          role: "user",
          parts: [
            { text: instructions },
            {
              inlineData: {
                mimeType: mimeType,
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

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
      });

      const rawText = response.text || "";
      const cleanedText = rawText
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

      try {
        const parsed = JSON.parse(cleanedText);
        return NextResponse.json({ success: true, report: parsed, source: "Advanced Diagnostic Engine" });
      } catch (parseErr) {
        console.warn("JSON parse failed, trying to extract JSON block:", parseErr);
        // Try to extract JSON from inside the text
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            return NextResponse.json({ success: true, report: parsed, source: "Advanced Diagnostic Engine" });
          } catch {
            console.error("Could not parse extracted JSON block");
          }
        }
      }
    }

    // Fallback: API key missing — return a generic report with no fake patient info
    return NextResponse.json({
      success: true,
      report: {
        title: isUrdu ? `طبی رپورٹ تجزیہ` : `Medical Report Analysis`,
        category: isUrdu ? "کلینیکل پیتھالوجی" : "Clinical Pathology",
        date: new Date().toLocaleDateString(isUrdu ? "ur-PK" : "en-US", { month: "short", day: "numeric", year: "numeric" }),
        patientInfo: {
          name: isUrdu ? "دستیاب نہیں" : "Not Available",
          age: isUrdu ? "دستیاب نہیں" : "Not Available",
          gender: isUrdu ? "دستیاب نہیں" : "Not Available",
          specimenId: "N/A",
          referringDoctor: isUrdu ? "دستیاب نہیں" : "Not Available",
          facility: isUrdu ? "دستیاب نہیں" : "Not Available",
        },
        overallStatus: isUrdu
          ? "رپورٹ کا تجزیہ مکمل نہیں ہو سکا - API Key درکار ہے"
          : "Analysis unavailable — API key not configured",
        overallStatusSeverity: "warning",
        virusAndInfectionDetection: {
          status: isUrdu ? "تجزیہ دستیاب نہیں" : "Analysis unavailable",
          hasDetection: false,
          detectedPathogens: [],
          details: isUrdu ? "براہ کرم GEMINI_API_KEY سیٹ کریں" : "Please configure GEMINI_API_KEY to enable analysis.",
        },
        sicknessExplanations: [],
        biomarkers: [],
        insights: [],
        doctorRecommendations: [],
      },
      source: "Fallback"
    });

  } catch (error) {
    console.error("Diagnostic Analysis Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to complete clinical report analysis" },
      { status: 500 }
    );
  }
}
