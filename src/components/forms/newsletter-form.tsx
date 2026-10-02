'use client';

import { useTransition, useState } from 'react';
import { subscribeNewsletter } from '@/app/actions';
import { CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success: boolean; message: string }>({
    success: false,
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await subscribeNewsletter({ success: false, message: '' }, formData);
      setState(result);
      if (result.success) {
        e.currentTarget.reset();
      }
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail size={20} className="text-primary" />
        <h3 className="font-semibold">Newsletter</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Subscribe to get updates on new products and special offers.
      </p>

      {state.success && (
        <div className="flex items-start gap-2 rounded-lg bg-success/10 border border-success/20 p-3 mb-3">
          <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
          <p className="text-sm">{state.message}</p>
        </div>
      )}
      {!state.success && state.message && (
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 mb-3">
          <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" />
          <p className="text-sm">{state.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="flex h-10 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" disabled={isPending} size="sm">
          {isPending ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}
