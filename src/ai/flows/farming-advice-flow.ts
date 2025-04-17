'use server';

/**
 * @fileOverview Provides AI-powered farming advice based on crop type, region, and user query.
 *
 * - getFarmingAdvice - A function that returns farming advice.
 * - FarmingAdviceInput - The input type for the getFarmingAdvice function.
 * - FarmingAdviceOutput - The return type for the getFarmingAdvice function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const FarmingAdviceInputSchema = z.object({
  cropType: z.string().describe('The type of crop for which advice is needed.'),
  region: z.string().describe('The region or location where the farming is taking place.'),
  query: z.string().describe('Specific question or topic for the farming advice.'),
});

export type FarmingAdviceInput = z.infer<typeof FarmingAdviceInputSchema>;

const FarmingAdviceOutputSchema = z.object({
  advice: z.string().describe('Detailed farming advice based on the input criteria.'),
});

export type FarmingAdviceOutput = z.infer<typeof FarmingAdviceOutputSchema>;

export async function getFarmingAdvice(input: FarmingAdviceInput): Promise<FarmingAdviceOutput> {
  try {
    return await farmingAdviceFlow(input);
  } catch (error: any) {
    console.error('Error in getFarmingAdvice:', error);
    throw new Error(`Failed to get farming advice: ${error.message}`);
  }
}

const prompt = ai.definePrompt({
  name: 'farmingAdvicePrompt',
  input: {
    schema: z.object({
      cropType: z.string().describe('The type of crop for which advice is needed.'),
      region: z.string().describe('The region or location where the farming is taking place.'),
      query: z.string().describe('Specific question or topic for the farming advice.'),
    }),
  },
  output: {
    schema: z.object({
      advice: z.string().describe('Detailed farming advice based on the input criteria.'),
    }),
  },
  prompt: `You are an expert AI agricultural assistant providing farming advice.

  Given the following information:
  - Crop Type: {{{cropType}}}
  - Region: {{{region}}}
  - Query: {{{query}}}

  Provide detailed and practical advice to the farmer, considering the crop type, region, and specific query.

  `,
});

const farmingAdviceFlow = ai.defineFlow<
  typeof FarmingAdviceInputSchema,
  typeof FarmingAdviceOutputSchema
>({
  name: 'farmingAdviceFlow',
  inputSchema: FarmingAdviceInputSchema,
  outputSchema: FarmingAdviceOutputSchema,
}, async input => {
  try {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('No output received from the prompt.');
    }
    return output;
  } catch (error: any) {
    console.error('Error in farmingAdviceFlow:', error);
    throw new Error(`Flow failed: ${error.message}`);
  }
});
