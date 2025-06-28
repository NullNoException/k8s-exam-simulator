import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClusterManagement } from "@/components/settings/cluster-management";
import { ApiKeys } from "@/components/settings/api-keys";

export function SettingsView() {
    return (
        <Tabs defaultValue="cluster" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="cluster">Cluster Management</TabsTrigger>
                <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            </TabsList>
            <TabsContent value="cluster" className="mt-6">
                <ClusterManagement />
            </TabsContent>
            <TabsContent value="api-keys" className="mt-6">
                <ApiKeys />
            </TabsContent>
        </Tabs>
    );
}
