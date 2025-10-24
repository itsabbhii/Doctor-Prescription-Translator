'use server';

import { 
  getPharmacistAISuggestions,
  type PharmacistAISuggestionInput,
  type PharmacistAISuggestionOutput,
} from '@/ai/flows/pharmacist-ai-suggestion-tool';
import {
  extractMedicines,
  type ExtractMedicinesInput,
  type ExtractMedicinesOutput,
} from '@/ai/flows/extract-medicines-flow';

export async function fetchAiSuggestions(data: PharmacistAISuggestionInput): Promise<PharmacistAISuggestionOutput> {
  try {
    // Basic validation to ensure we don't send empty data to the AI
    if (Object.values(data).every(val => val.trim() === '')) {
        return {
            suggestions: [],
            flaggedAsPotentiallyErroneous: false,
            flagReason: ''
        }
    }
    const result = await getPharmacistAISuggestions(data);
    return result;
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    // In a real app, you'd want more robust error handling and user feedback
    throw new Error('Failed to get AI suggestions. Please try again later.');
  }
}

export async function extractMedicinesFromImage(data: ExtractMedicinesInput): Promise<ExtractMedicinesOutput> {
    try {
        const result = await extractMedicines(data);
        return result;
    } catch (error) {
        console.error("Error extracting medicines from image:", error);
        throw new Error('Failed to extract medicines. Please try again.');
    }
}
