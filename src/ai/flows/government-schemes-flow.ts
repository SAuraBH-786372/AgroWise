'use server';

/**
 * @fileOverview Provides AI-powered government schemes based on location and user query.
 *
 * - getGovernmentSchemes - A function that returns government schemes.
 * - GovernmentSchemesInput - The input type for the getGovernmentSchemes function.
 * - GovernmentSchemesOutput - The return type for the getGovernmentSchemes function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const GovernmentSchemesInputSchema = z.object({
  location: z.string().describe('The location for which government schemes are needed.'),
  query: z.string().describe('Specific keywords or topic for the government schemes.'),
});

export type GovernmentSchemesInput = z.infer<typeof GovernmentSchemesInputSchema>;

const GovernmentSchemesOutputSchema = z.object({
  schemes: z.string().describe('Detailed information about government schemes based on the input criteria.'),
});

export type GovernmentSchemesOutput = z.infer<typeof GovernmentSchemesOutputSchema>;

export async function getGovernmentSchemes(input: GovernmentSchemesInput): Promise<GovernmentSchemesOutput> {
  try {
    return await governmentSchemesFlow(input);
  } catch (error: any) {
    console.error('Error in getGovernmentSchemes:', error);
    throw new Error(`Failed to get government schemes: ${error.message}`);
  }
}

const prompt = ai.definePrompt({
  name: 'governmentSchemesPrompt',
  input: {
    schema: z.object({
      location: z.string().describe('The location for which government schemes are needed.'),
      query: z.string().describe('Specific keywords or topic for the government schemes.'),
    }),
  },
  output: {
    schema: z.object({
      schemes: z.string().describe('Detailed information about government schemes based on the input criteria.'),
    }),
  },
  prompt: `You are an expert AI agricultural assistant providing information on government schemes.

  Given the following information:
  - Location: {{{location}}}
  - Query: {{{query}}}

  Search the web to find government schemes related to agriculture and farming in the specified location, considering the specific query.
  Provide detailed information to the farmer.
  `,
});

const governmentSchemesFlow = ai.defineFlow<
  typeof GovernmentSchemesInputSchema,
  typeof GovernmentSchemesOutputSchema
>({
  name: 'governmentSchemesFlow',
  inputSchema: GovernmentSchemesInputSchema,
  outputSchema: GovernmentSchemesOutputSchema,
}, async input => {
  try {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('No output received from the prompt.');
    }
    return output;
  } catch (error: any) {
    console.error('Error in governmentSchemesFlow:', error);
    throw new Error(`Flow failed: ${error.message}`);
  }
});
