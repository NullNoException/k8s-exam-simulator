'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const clusterTypes = [
    { name: 'minikube', status: 'Running' },
    { name: 'kind', status: 'Stopped' },
    { name: 'podman', status: 'Not Installed' },
];

export function ClusterManagement() {
    const { toast } = useToast();

    const handleAction = (action: string, cluster: string) => {
        toast({
            title: `Action simulation`,
            description: `${action} action for ${cluster} is not available in the web UI.`
        })
    }
    
    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Local Cluster Management</CardTitle>
                <CardDescription>
                    Select and manage your local Kubernetes cluster for answer validation.
                    This functionality would be enabled in a desktop version of the app.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {clusterTypes.map((cluster) => (
                    <div key={cluster.name} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold capitalize">{cluster.name}</span>
                            {cluster.status === 'Running' ? (
                                <Badge className="bg-green-500 hover:bg-green-600">
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    {cluster.status}
                                </Badge>
                            ) : (
                                <Badge variant="secondary">{cluster.status}</Badge>
                            )}
                        </div>
                        <div className="space-x-2">
                             <Button size="sm" variant="outline" disabled={cluster.status !== 'Stopped'} onClick={() => handleAction('Start', cluster.name)}>Start</Button>
                             <Button size="sm" variant="destructive" disabled={cluster.status !== 'Running'} onClick={() => handleAction('Stop', cluster.name)}>Stop</Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
