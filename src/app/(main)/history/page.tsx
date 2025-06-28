import { HistoryView } from '@/components/history/history-view';

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Practice History</h1>
      <p className="text-muted-foreground mb-6">Review your past practice sessions and track your progress over time.</p>
      <HistoryView />
    </div>
  );
}
