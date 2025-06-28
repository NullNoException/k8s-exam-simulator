'use client';

import * as React from 'react';
import { CheckCircle2, XCircle, Loader2, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import type { PracticeSession } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

type PracticeViewProps = {
  session: PracticeSession;
  setSession: React.Dispatch<React.SetStateAction<PracticeSession | null>>;
  onEndSession: () => void;
};

export function PracticeView({ session, setSession, onEndSession }: PracticeViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [isValidating, setIsValidating] = React.useState(false);
  const { toast } = useToast();
  const [history, setHistory] = useLocalStorage<PracticeSession[]>('k8s-dojo-history', []);
  
  const currentQuestion = session.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / session.questions.length) * 100;

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuestions = [...session.questions];
    updatedQuestions[currentQuestionIndex].userAnswer = e.target.value;
    setSession({ ...session, questions: updatedQuestions });
  };
  
  const normalize = (str: string) => str.trim().replace(/\s+/g, ' ');

  const handleValidate = () => {
    setIsValidating(true);
    // Simulate validation
    setTimeout(() => {
      const isCorrect = normalize(currentQuestion.userAnswer) === normalize(currentQuestion.solution);
      const updatedQuestions = [...session.questions];
      const status = isCorrect ? 'correct' : 'incorrect';
      updatedQuestions[currentQuestionIndex].status = status;
      updatedQuestions[currentQuestionIndex].feedback = isCorrect
        ? `Validation successful! The verification command \`${currentQuestion.validation}\` would return the expected output: '${currentQuestion.expectedValidationOutput}'.`
        : `Validation failed. Your answer did not produce the expected outcome. Review the solution to see the correct approach.`;
      
      setSession({ ...session, questions: updatedQuestions });
      setIsValidating(false);
      toast({
        title: isCorrect ? 'Validation Successful' : 'Validation Failed',
        description: isCorrect ? 'Great job!' : 'Check the feedback for details.',
        variant: isCorrect ? 'default' : 'destructive',
      });
    }, 1500);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of session
      const completedSession = { ...session, completedAt: new Date().toISOString() };
      setHistory([...history, completedSession]);
      toast({
        title: "Session Complete!",
        description: `Topic: ${session.topic}, Difficulty: ${session.difficulty}. Results saved to history.`,
      });
      onEndSession();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{session.topic}</Badge>
                    <Badge variant={session.difficulty === 'Easy' ? 'default' : session.difficulty === 'Medium' ? 'secondary' : 'destructive'}>{session.difficulty}</Badge>
                </div>
                <CardTitle>Question {currentQuestionIndex + 1} of {session.questions.length}</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={onEndSession}>End Session</Button>
        </div>
        <div className="pt-4">
            <Progress value={progress} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentQuestion.setup && currentQuestion.setup.length > 0 && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Environment Setup</AlertTitle>
            <AlertDescription>
              <p className="mb-2">The following setup is assumed to have been applied to your cluster:</p>
              <pre className="p-2 rounded-md bg-muted font-code text-sm whitespace-pre-wrap">
                {currentQuestion.setup}
              </pre>
            </AlertDescription>
          </Alert>
        )}
        <p className="pt-4 text-base text-foreground">
          {currentQuestion.text}
        </p>

        <div>
          <label htmlFor="answer-workspace" className="font-medium text-sm mb-2 block">Answer Workspace</label>
          <Textarea
            id="answer-workspace"
            placeholder="Enter your kubectl commands or YAML manifests here..."
            className="font-code min-h-[250px] bg-secondary"
            value={currentQuestion.userAnswer}
            onChange={handleAnswerChange}
            disabled={isValidating || currentQuestion.status !== 'unanswered'}
          />
        </div>
        {currentQuestion.status !== 'unanswered' && currentQuestion.feedback && (
          <Alert variant={currentQuestion.status === 'correct' ? 'default' : 'destructive'}>
            {currentQuestion.status === 'correct' ? 
              <CheckCircle2 className="h-4 w-4" /> : 
              <XCircle className="h-4 w-4" />
            }
            <AlertTitle>{currentQuestion.status === 'correct' ? 'Correct' : 'Incorrect'}</AlertTitle>
            <AlertDescription>
              <p>{currentQuestion.feedback}</p>
              {currentQuestion.status === 'incorrect' && (
                <>
                  <p className="font-semibold mt-4 mb-2">Expected Solution:</p>
                  <pre className="p-2 rounded-md bg-secondary/50 font-code text-sm whitespace-pre-wrap">
                    {currentQuestion.solution}
                  </pre>
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentQuestion.status === 'unanswered' ? (
          <Button onClick={handleValidate} disabled={isValidating || !currentQuestion.userAnswer}>
            {isValidating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Validate Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentQuestionIndex === session.questions.length - 1 ? 'Finish Session' : 'Next Question'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
