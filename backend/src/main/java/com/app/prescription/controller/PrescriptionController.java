package com.app.prescription.controller;

import com.app.prescription.model.MedicineResponse;
import com.app.prescription.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

    private final GeminiService geminiService;

    @PostMapping("/parse")
    public ResponseEntity<MedicineResponse> parsePrescription(
            @RequestParam("file") MultipartFile file) {
        
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Check file size
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().build();
            }

            // Check file type
            String contentType = file.getContentType();
            if (contentType == null || !isValidImageType(contentType)) {
                return ResponseEntity.badRequest().build();
            }

            // Process the prescription
            MedicineResponse response = geminiService.analyzePrescription(file);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private boolean isValidImageType(String contentType) {
        return contentType.equals("image/jpeg") ||
               contentType.equals("image/png") ||
               contentType.equals("image/webp");
    }
}
