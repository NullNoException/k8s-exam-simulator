'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  numQuestions: z.coerce.number().min(1).max(10),
});

type QuestionGeneratorProps = {
  onGenerate: (topic: string, difficulty: 'Easy' | 'Medium' | 'Hard', numQuestions: number) => void;
  isLoading: boolean;
};

export function QuestionGenerator({ onGenerate, isLoading }: QuestionGeneratorProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: 'Deployments',
      difficulty: 'Medium',
      numQuestions: 3,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onGenerate(values.topic, values.difficulty, values.numQuestions);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Start a New Practice Session</CardTitle>
        <CardDescription>
          Configure your practice session and our AI will generate tailored Kubernetes questions for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kubernetes Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pods, Services, RBAC" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a specific Kubernetes topic you want to practice.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose between 1 and 10 questions for this session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                'Generate Questions'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
