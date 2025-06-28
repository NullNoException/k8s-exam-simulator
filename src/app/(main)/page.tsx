'use client';

import * as React from 'react';
import { QuestionGenerator } from '@/components/practice/question-generator';
import { PracticeView } from '@/components/practice/practice-view';
import type { PracticeSession } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { generateQuestions } from '@/app/actions';

export default function PracticePage() {
  const [session, setSession] = React.useState<PracticeSession | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleGenerateQuestions = async (
    topic: string,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    numQuestions: number
  ) => {
    setIsLoading(true);
    const result = await generateQuestions({ topic, difficulty, numQuestions });
    setIsLoading(false);

    if (result.error || !result.questions) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Questions',
        description: result.error || 'Could not generate questions. Please try again.',
      });
      return;
    }

    const newSession: PracticeSession = {
      id: new Date().toISOString(),
      topic,
      difficulty,
      questions: result.questions.map((q) => ({
        text: q,
        userAnswer: '',
        status: 'unanswered',
      })),
      createdAt: new Date().toISOString(),
    };
    setSession(newSession);
  };

  const handleEndSession = () => {
    setSession(null);
    toast({
      title: 'Practice Session Ended',
      description: 'You can start a new session at any time.',
    });
  };

  return (
    <div className="container mx-auto">
      {session ? (
        <PracticeView session={session} setSession={setSession} onEndSession={handleEndSession} />
      ) : (
        <QuestionGenerator
          onGenerate={handleGenerateQuestions}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
