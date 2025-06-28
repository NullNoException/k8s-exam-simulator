import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
            <p className="text-muted-foreground mb-6">Manage your local cluster configuration and application preferences.</p>
            <SettingsView />
        </div>
    );
}
