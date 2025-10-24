'use server';

/**
 * @fileOverview An AI-powered tool for pharmacists to get suggestions for translations,
 * expansions of medicine details, and flags for potentially erroneous information.
 *
 * - getPharmacistAISuggestions - A function that handles the medicine detail suggestions process.
 * - PharmacistAISuggestionInput - The input type for the getPharmacistAISuggestions function.
 * - PharmacistAISuggestionOutput - The return type for the getPharmacistAISuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PharmacistAISuggestionInputSchema = z.object({
  name_en: z.string().describe('The English name of the medicine.'),
  name_hi: z.string().describe('The Hindi translation of the medicine name.'),
  generic_name: z.string().describe('The generic name of the medicine.'),
  uses_en: z.string().describe('The uses of the medicine in English.'),
  uses_hi: z.string().describe('The uses of the medicine in Hindi.'),
  precautions_en: z.string().describe('The precautions for the medicine in English.'),
  precautions_hi: z.string().describe('The precautions for the medicine in Hindi.'),
  side_effects_en: z.string().describe('The side effects of the medicine in English.'),
  side_effects_hi: z.string().describe('The side effects of the medicine in Hindi.'),
});
export type PharmacistAISuggestionInput = z.infer<typeof PharmacistAISuggestionInputSchema>;

const PharmacistAISuggestionOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      field: z.string().describe('The field the suggestion applies to.'),
      suggestion: z.string().describe('The suggested improvement or correction.'),
      confidence: z.number().describe('A confidence score for the suggestion (0-1).'),
    })
  ).describe('A list of suggestions for the medicine details.'),
  flaggedAsPotentiallyErroneous: z.boolean().describe('Whether the current information is potentially erroneous.'),
  flagReason: z.string().optional().describe('The reason the information was flagged as potentially erroneous.'),
});
export type PharmacistAISuggestionOutput = z.infer<typeof PharmacistAISuggestionOutputSchema>;

export async function getPharmacistAISuggestions(input: PharmacistAISuggestionInput): Promise<PharmacistAISuggestionOutput> {
  return pharmacistAISuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pharmacistAISuggestionPrompt',
  input: {schema: PharmacistAISuggestionInputSchema},
  output: {schema: PharmacistAISuggestionOutputSchema},
  prompt: `You are an AI assistant helping pharmacists maintain a medicine catalog.

  You will be given the current details of a medicine, and you will provide suggestions for improvements,
  translations, or corrections. You will also flag the information as potentially erroneous if you find any issues.

  Current Medicine Details:
  English Name: {{{name_en}}}
  Hindi Name: {{{name_hi}}}
  Generic Name: {{{generic_name}}}
  Uses (English): {{{uses_en}}}
  Uses (Hindi): {{{uses_hi}}}
  Precautions (English): {{{precautions_en}}}
  Precautions (Hindi): {{{precautions_hi}}}
  Side Effects (English): {{{side_effects_en}}}
  Side Effects (Hindi): {{{side_effects_hi}}}

  Instructions:
  1. Provide suggestions for each field, if applicable. Focus on translation accuracy, completeness, and clarity.
  2. Provide a confidence score (0-1) for each suggestion.
  3. If you find any information that seems incorrect, inconsistent, or potentially harmful, flag the information as potentially erroneous and provide a reason.

  Output:
  Follow the schema and provide output in JSON format.
  Make sure each item in the suggestions array contains the "field", "suggestion", and "confidence" keys.
  `,
});

const pharmacistAISuggestionFlow = ai.defineFlow(
  {
    name: 'pharmacistAISuggestionFlow',
    inputSchema: PharmacistAISuggestionInputSchema,
    outputSchema: PharmacistAISuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
