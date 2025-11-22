
import { GoogleGenerativeAI } from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("[v0] GEMINI_API_KEY is not set");
      return NextResponse.json(
        { message: "API Key not configured. Please add GEMINI_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const mediaType = file.type as "image/jpeg" | "image/png" | "image/webp";

    console.log("[v0] Starting Gemini API call with media type:", mediaType);

    // Correct working model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // ⚠️ YOUR ORIGINAL PROMPT — NOT CHANGED AT ALL ⚠️
    const prompt = `You are a prescription analyzer. Analyze this prescription image and extract all medicines/medications with their complete details.

Return a JSON object with this exact structure:
{
  "items": [
    {
      "raw_text": "Original text from prescription",
      "drug_brand": "Brand name or null",
      "drug_generic": "Generic name or null",
      "strength": "Dosage strength or null",
      "form": "tablet/capsule/liquid/injection/etc",
      "route": "oral/injection/topical/etc",
      "sig": {
        "dose": "Amount per dose or null",
        "frequency": "How often to take or null",
        "duration": "Duration of treatment or null",
        "timing": "Special timing instructions or null"
      },
      "uses": ["Use 1", "Use 2"],
      "side_effects_common": ["Side effect 1", "Side effect 2"],
      "side_effects_serious": ["Serious side effect 1"],
      "citations": ["Source 1"],
      "confidence": 0.95
    }
  ],
  "disclaimer": "This analysis is for informational purposes only. Always consult with a healthcare professional."
}

Requirements:
- Extract ALL medicines visible in the prescription
- Provide realistic uses and side effects based on the medication
- Use null for unknown values
- Confidence should be between 0 and 1 (1 being very confident)
- Return ONLY valid JSON, no additional text`

    // FIXED generateContent format
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64,
                mimeType: mediaType,
              },
            },
            { text: prompt },
          ],
        },
      ],
    });

    const responseText = result.response.text();
    console.log("[v0] Raw Gemini response:", responseText);

    let parsedResponse;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("[v0] No JSON found in response:", responseText);
        throw new Error("No JSON found in response");
      }
      parsedResponse = JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("[v0] JSON Parse Error:", error);
      return NextResponse.json(
        {
          message: "Failed to parse prescription data",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    if (!parsedResponse.items || !Array.isArray(parsedResponse.items)) {
      return NextResponse.json(
        { message: "Invalid response format from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("[v0] API Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { message: "Failed to analyze prescription", error: message },
      { status: 500 }
    );
  }
}
