'use client';

import * as React from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { PracticeSession } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export function HistoryView() {
  const [history] = useLocalStorage<PracticeSession[]>('k8s-dojo-history', []);
  const [selectedSession, setSelectedSession] = React.useState<PracticeSession | null>(null);

  const sortedHistory = React.useMemo(() => {
    return [...history].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [history]);

  if (history.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardHeader>
          <CardTitle>No History Found</CardTitle>
          <CardDescription>
            You haven't completed any practice sessions yet.
            <br />
            Go to the Practice tab to get started!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getSuccessRate = (session: PracticeSession) => {
    const correct = session.questions.filter(q => q.status === 'correct').length;
    return Math.round((correct / session.questions.length) * 100);
  };
  
  return (
    <Dialog>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedHistory.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{session.topic}</CardTitle>
                <Badge variant={getSuccessRate(session) > 70 ? 'default' : 'destructive'}>
                  {getSuccessRate(session)}%
                </Badge>
              </div>
              <CardDescription>
                {format(parseISO(session.createdAt), "MMMM d, yyyy 'at' h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{session.difficulty}</Badge>
                <Badge variant="outline">{session.questions.length} questions</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={() => setSelectedSession(session)}>
                  Review Session
                </Button>
              </DialogTrigger>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedSession && (
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Review Session: {selectedSession.topic}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-6">
            <div className="space-y-6">
              {selectedSession.questions.map((q, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2 mb-2">
                     {q.status === 'correct' ? <CheckCircle2 className="text-green-500"/> : <XCircle className="text-red-500"/>}
                    <h4 className="font-semibold">Question {index + 1}</h4>
                  </div>
                  <p className="text-muted-foreground mb-2">{q.text}</p>
                  <p className="font-semibold text-sm">Your Answer:</p>
                  <pre className="p-2 rounded-md bg-secondary font-code text-sm whitespace-pre-wrap">{q.userAnswer || 'No answer provided.'}</pre>
                  {q.feedback && (
                     <p className="text-sm mt-2 text-muted-foreground"><span className='font-semibold'>Feedback:</span> {q.feedback}</p>
                  )}
                  {index < selectedSession.questions.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );
}
