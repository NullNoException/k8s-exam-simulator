// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A flow for generating Kubernetes certification questions.
 *
 * - generateKubernetesQuestions - A function that generates Kubernetes certification questions.
 * - GenerateKubernetesQuestionsInput - The input type for the generateKubernetesQuestions function.
 * - GenerateKubernetesQuestionsOutput - The return type for the generateKubernetesQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKubernetesQuestionsInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic of the Kubernetes questions (e.g., Pods, Deployments, Services).'),
  difficulty: z
    .enum(['Easy', 'Medium', 'Hard'])
    .describe('The difficulty level of the questions.'),
  numQuestions: z.number().describe('Number of questions to generate'),
});
export type GenerateKubernetesQuestionsInput = z.infer<
  typeof GenerateKubernetesQuestionsInputSchema
>;

const GenerateKubernetesQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('The generated Kubernetes questions.'),
});
export type GenerateKubernetesQuestionsOutput = z.infer<
  typeof GenerateKubernetesQuestionsOutputSchema
>;

export async function generateKubernetesQuestions(
  input: GenerateKubernetesQuestionsInput
): Promise<GenerateKubernetesQuestionsOutput> {
  return generateKubernetesQuestionsFlow(input);
}

const generateKubernetesQuestionsPrompt = ai.definePrompt({
  name: 'generateKubernetesQuestionsPrompt',
  input: {schema: GenerateKubernetesQuestionsInputSchema},
  output: {schema: GenerateKubernetesQuestionsOutputSchema},
  prompt: `You are an expert in Kubernetes and are creating questions for certification.

Generate {{numQuestions}} realistic, certification-style Kubernetes questions for the {{topic}} topic with {{difficulty}} difficulty.

Each question should be scenario-based and test practical knowledge of Kubernetes concepts.

Format each question as a single string in the output array. Do not provide additional explanation.`,
});

const generateKubernetesQuestionsFlow = ai.defineFlow(
  {
    name: 'generateKubernetesQuestionsFlow',
    inputSchema: GenerateKubernetesQuestionsInputSchema,
    outputSchema: GenerateKubernetesQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateKubernetesQuestionsPrompt(input);
    return output!;
  }
);
