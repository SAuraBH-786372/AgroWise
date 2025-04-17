'use server';

/**
 * @fileOverview Provides AI-powered crop suggestions based on soil type, location, and season.
 *
 * - suggestCrops - A function that returns a list of suggested crops.
 * - CropSuggestionInput - The input type for the suggestCrops function.
 * - CropSuggestionOutput - The return type for the suggestCrops function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const CropSuggestionInputSchema = z.object({
  soilType: z.string().describe('The type of soil available for farming.'),
  location: z.string().describe('The location (state/region) of the farm.'),
  season: z.string().describe('The current season or month.'),
});

export type CropSuggestionInput = z.infer<typeof CropSuggestionInputSchema>;

const CropSuggestionOutputSchema = z.object({
  crops: z.array(
    z.object({
      name: z.string().describe('The name of the suggested crop.'),
      yieldEstimate: z.string().describe('Estimated yield per acre/hectare.'),
      growthDuration: z.string().describe('The typical growth duration of the crop.'),
      marketValue: z.string().describe('The current market value of the crop.'),
    })
  ).describe('A list of suggested crops with their estimated yield, growth duration and market value.'),
});

export type CropSuggestionOutput = z.infer<typeof CropSuggestionOutputSchema>;

export async function suggestCrops(input: CropSuggestionInput): Promise<CropSuggestionOutput> {
  try {
    return await cropSuggestionFlow(input);
  } catch (error: any) {
    console.error('Error in suggestCrops:', error);
    throw new Error(`Failed to get crop suggestions: ${error.message}`);
  }
}


const prompt = ai.definePrompt({
  name: 'cropSuggestionPrompt',
  input: {
    schema: z.object({
      soilType: z.string().describe('The type of soil available for farming.'),
      location: z.string().describe('The location (state/region) of the farm.'),
      season: z.string().describe('The current season or month.'),
    }),
  },
  output: {
    schema: z.object({
      crops: z.array(
        z.object({
          name: z.string().describe('The name of the suggested crop.'),
          yieldEstimate: z.string().describe('Estimated yield per acre/hectare, include units like tons/acre or kg/hectare.'),
          growthDuration: z.string().describe('The typical growth duration of the crop, always include units (weeks or months).'),
          marketValue: z.string().describe('The current market value of the crop, specify the currency used.'),
        })
      ).describe('A list of suggested crops with their estimated yield, growth duration and market value.'),
    }),
  },
  prompt: `You are an expert AI agricultural assistant helping a farmer choose the best crops to grow. You provide detailed and accurate information.

  Given the following information:
  - Soil Type: {{{soilType}}}
  - Location: {{{location}}}
  - Season: {{{season}}}

  Suggest 3 crops that are well-suited to these conditions. For each crop, include:
  - A yield estimate (specify units like tons/acre or kg/hectare)
  - The typical growth duration (ALWAYS include units like "3-4 weeks" or "2-3 months")
  - The current market value (specify the currency like INR, USD, etc.)

  Some crops may have short growth periods, such as radish (3-4 weeks), while others like rice may take several months (3-4 months). Always provide the appropriate time unit.

  Format your response as a JSON object.`,
});

const cropSuggestionFlow = ai.defineFlow<
  typeof CropSuggestionInputSchema,
  typeof CropSuggestionOutputSchema
>({
  name: 'cropSuggestionFlow',
  inputSchema: CropSuggestionInputSchema,
  outputSchema: CropSuggestionOutputSchema,
}, async input => {
  try {
    const { output } = await prompt(input);
    if (!output) {
       return {
         crops: [],
       };
    }
    return output;
  } catch (error: any) {
    console.error('Error in cropSuggestionFlow:', error);
    throw new Error(`Flow failed: ${error.message}`);
  }
});
