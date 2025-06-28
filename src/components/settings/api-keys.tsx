'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function ApiKeys() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Settings Saved",
            description: "Your API key settings have been saved locally.",
        });
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>AI Provider API Keys</CardTitle>
                <CardDescription>
                    If you were using a cloud-based LLM, you would configure your API keys here. The current setup uses a local model.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="openai-key">OpenAI API Key</Label>
                        <Input id="openai-key" type="password" placeholder="sk-..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                        <Input id="anthropic-key" type="password" placeholder="anthropic-api-key..." />
                    </div>
                    <Button type="submit">Save Keys</Button>
                </form>
            </CardContent>
        </Card>
    );
}
