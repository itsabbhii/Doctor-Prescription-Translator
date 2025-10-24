'use server';

/**
 * @fileOverview An AI-powered tool for extracting medicine names from a prescription image.
 *
 * - extractMedicinesFromImage - A function that handles the medicine extraction process.
 * - ExtractMedicinesInput - The input type for the extractMedicinesFromImage function.
 * - ExtractMedicinesOutput - The return type for the extractMedicinesFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractMedicinesInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractMedicinesInput = z.infer<typeof ExtractMedicinesInputSchema>;

const ExtractMedicinesOutputSchema = z.object({
  medicines: z.array(z.string()).describe('A list of medicine names extracted from the prescription.'),
});
export type ExtractMedicinesOutput = z.infer<typeof ExtractMedicinesOutputSchema>;


export async function extractMedicines(input: ExtractMedicinesInput): Promise<ExtractMedicinesOutput> {
  return extractMedicinesFlow(input);
}


const prompt = ai.definePrompt({
  name: 'extractMedicinesPrompt',
  input: {schema: ExtractMedicinesInputSchema},
  output: {schema: ExtractMedicinesOutputSchema},
  prompt: `You are an expert at reading and parsing medical prescriptions.

  You will be given an image of a prescription. Your task is to extract only the names of the medicines listed.
  - Do not include dosages, frequencies, or any other information.
  - Return only the names of the medicines as a list of strings.
  - If you cannot identify any medicines, return an empty list.

  Image: {{media url=imageDataUri}}`,
});

const extractMedicinesFlow = ai.defineFlow(
    {
      name: 'extractMedicinesFlow',
      inputSchema: ExtractMedicinesInputSchema,
      outputSchema: ExtractMedicinesOutputSchema,
    },
    async input => {
        const {output} = await prompt(input);
        return output!;
    }
);
