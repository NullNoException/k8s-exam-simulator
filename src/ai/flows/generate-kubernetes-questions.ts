// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A flow for generating Kubernetes certification questions.
 *
 * - generateKubernetesQuestions - A function that generates Kubernetes certification questions.
 * - GenerateKubernetesQuestionsInput - The input type for the generateKubernetesQuestions function.
 * - QuestionDetail - The type for a single generated question.
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

const QuestionDetailSchema = z.object({
  text: z.string().describe('The scenario-based question text.'),
  setup: z.string().describe('The YAML or bash commands needed to set up the initial cluster state for the question. This can be an empty string if not needed.'),
  solution: z.string().describe('The correct YAML or bash command to answer the question.'),
  validation: z.string().describe("A single `kubectl` command to verify the solution. It should output a single value."),
  expectedValidationOutput: z.string().describe("The exact string output from the validation command."),
});
export type QuestionDetail = z.infer<typeof QuestionDetailSchema>;

const GenerateKubernetesQuestionsOutputSchema = z.object({
  questions: z.array(QuestionDetailSchema).describe('An array of generated Kubernetes questions.'),
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

For each question, provide the following:
1.  **text**: The scenario-based question.
2.  **setup**: The bash commands (using kubectl) or YAML manifest required to set up the initial state for the question. If no setup is needed, provide an empty string.
3.  **solution**: The correct bash command or YAML manifest that solves the question. This is the expected answer.
4.  **validation**: A single \`kubectl\` command that can be used to verify the solution is correct. This command should check a specific property of a resource (e.g., an image name, a label, a replica count). It must output a single, simple value that can be easily compared. For example: \`kubectl get deployment my-deployment -o jsonpath='{.spec.replicas}'\`.
5.  **expectedValidationOutput**: The exact string output that the \`validation\` command should produce if the solution has been applied correctly. For the replica count example, this might be '3'.

Format the output as an array of objects, according to the output schema.`,
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
