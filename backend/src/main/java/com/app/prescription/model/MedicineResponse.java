package com.app.prescription.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineResponse {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Medicine {
        private String raw_text;
        private String drug_brand;
        private String drug_generic;
        private String strength;
        private String form;
        private String route;
        private Signature sig;
        private List<String> uses;
        private List<String> side_effects_common;
        private List<String> side_effects_serious;
        private List<String> citations;
        private double confidence;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Signature {
        private String dose;
        private String frequency;
        private String duration;
        private String timing;
    }

    private List<Medicine> items;
    private String disclaimer;
}
