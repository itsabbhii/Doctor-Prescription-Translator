package com.app.prescription.service;

import com.app.prescription.model.MedicineResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.model.id}")
    private String geminiModelId;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Gson gson = new Gson();
    private final OkHttpClient httpClient = new OkHttpClient();

    private static final String SYSTEM_PROMPT = """
            You are a clinical prescription interpreter.
            
            INPUT: You will receive an image of a handwritten medical prescription.
            
            TASK:
            1. Extract all medicines written in the prescription.
            2. Normalize to generic drug names (if brand is written, capture both brand + generic).
            3. Capture strength, dosage form, route, frequency, and duration.
            4. Expand abbreviations: OD = once daily, BD = twice daily, TDS/TID = three times daily, QHS = at bedtime, SOS/PRN = as needed, HS = at night.
            5. If handwriting is unclear, return "unknown" and set confidence low.
            6. For each medicine add:
               - Uses (simple language)
               - Common side effects
               - Serious side effects
            7. Add citations from reliable medical sources.
            8. Always include: "This information is educational and not a substitute for medical advice."
            
            OUTPUT FORMAT: JSON strictly.
            
            SCHEMA:
            {
              "items":[
                {
                  "raw_text": string,
                  "drug_brand": string|null,
                  "drug_generic": string|null,
                  "strength": string|null,
                  "form": "tablet|capsule|syrup|injection|unknown",
                  "route": "oral|IV|IM|topical|unknown",
                  "sig": {
                    "dose": string|null,
                    "frequency": string|null,
                    "duration": string|null,
                    "timing": string|null
                  },
                  "uses": [string],
                  "side_effects_common": [string],
                  "side_effects_serious": [string],
                  "citations": [string],
                  "confidence": number
                }
              ],
              "disclaimer": "This information is educational and not a substitute for professional medical advice."
            }
            
            RULES:
            - Do not guess unknown parts. Use null + confidence <0.5.
            - If detection fails, return an empty items list.
            - Response must always be valid JSON.
            """;

    public MedicineResponse analyzePrescription(MultipartFile file) throws IOException {
        // Convert file to base64
        byte[] fileContent = file.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(fileContent);

        // Determine MIME type
        String mimeType = file.getContentType();
        if (mimeType == null) {
            mimeType = "image/png";
        }

        // Call Gemini API
        String jsonResponse = callGeminiApi(base64Image, mimeType);

        // Parse and validate response
        return parseGeminiResponse(jsonResponse);
    }

    private String callGeminiApi(String base64Image, String mimeType) throws IOException {
        String url = String.format(
                "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s",
                geminiModelId, geminiApiKey
        );

        // Build request payload
        JsonObject payload = new JsonObject();
        JsonArray contents = new JsonArray();
        JsonObject content = new JsonObject();
        JsonArray parts = new JsonArray();

        // Add system prompt
        JsonObject textPart = new JsonObject();
        textPart.addProperty("text", SYSTEM_PROMPT);
        parts.add(textPart);

        // Add image data
        JsonObject imagePart = new JsonObject();
        JsonObject inlineData = new JsonObject();
        inlineData.addProperty("mime_type", mimeType);
        inlineData.addProperty("data", base64Image);
        imagePart.add("inline_data", inlineData);
        parts.add(imagePart);

        content.add("parts", parts);
        contents.add(content);
        payload.add("contents", contents);

        // Make HTTP request
        RequestBody body = RequestBody.create(
                payload.toString(),
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                log.error("Gemini API error: {}", response.code());
                throw new IOException("Gemini API request failed: " + response.code());
            }

            String responseBody = response.body().string();
            return extractTextFromResponse(responseBody);
        }
    }

    private String extractTextFromResponse(String response) throws IOException {
        JsonNode root = objectMapper.readTree(response);
        JsonNode candidates = root.path("candidates");
        
        if (candidates.isArray() && candidates.size() > 0) {
            JsonNode content = candidates.get(0).path("content");
            JsonNode parts = content.path("parts");
            
            if (parts.isArray() && parts.size() > 0) {
                return parts.get(0).path("text").asText();
            }
        }
        
        throw new IOException("Invalid response format from Gemini API");
    }

    private MedicineResponse parseGeminiResponse(String jsonText) {
        try {
            // Extract JSON from the text (in case there's extra text)
            String cleanJson = extractJsonFromText(jsonText);
            
            // Parse JSON
            MedicineResponse response = objectMapper.readValue(
                    cleanJson,
                    MedicineResponse.class
            );

            // Set default disclaimer if not present
            if (response.getDisclaimer() == null || response.getDisclaimer().isEmpty()) {
                response.setDisclaimer(
                        "This information is educational and not a substitute for professional medical advice."
                );
            }

            return response;

        } catch (Exception e) {
            log.error("Failed to parse Gemini response: {}", e.getMessage());
            // Return empty response on parse error
            return MedicineResponse.builder()
                    .items(java.util.List.of())
                    .disclaimer("This information is educational and not a substitute for professional medical advice.")
                    .build();
        }
    }

    private String extractJsonFromText(String text) {
        // Try to find JSON object in the text
        int startIdx = text.indexOf('{');
        int endIdx = text.lastIndexOf('}');
        
        if (startIdx != -1 && endIdx != -1 && endIdx > startIdx) {
            return text.substring(startIdx, endIdx + 1);
        }
        
        return text;
    }
}
