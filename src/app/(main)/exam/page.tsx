import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileVideo } from "lucide-react";

export default function ExamPage() {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full mt-20">
            <Card className="max-w-md p-8">
                <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit mb-4">
                        <FileVideo className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Exam Simulation</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                        This feature is coming soon! Get ready to test your skills under pressure with timed exams that mimic the real CKAD, CKA, and CKS tests.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
