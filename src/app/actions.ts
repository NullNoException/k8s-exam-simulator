// @/app/actions.ts
'use server';

import {
  generateKubernetesQuestions,
  type GenerateKubernetesQuestionsInput,
  type QuestionDetail,
} from '@/ai/flows/generate-kubernetes-questions';
import { z } from 'zod';

const QuestionGenerationSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  numQuestions: z.coerce.number().min(1).max(10),
});

export async function generateQuestions(
  input: GenerateKubernetesQuestionsInput
): Promise<{ questions?: QuestionDetail[]; error?: string }> {
  const validatedInput = QuestionGenerationSchema.safeParse(input);

  if (!validatedInput.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const result = await generateKubernetesQuestions(validatedInput.data);
    if (result && result.questions) {
      return { questions: result.questions };
    }
    return { error: 'Failed to generate questions. The AI returned an empty result.' };
  } catch (error) {
    console.error('Error generating questions:', error);
    return { error: 'An unexpected error occurred while generating questions.' };
  }
}
