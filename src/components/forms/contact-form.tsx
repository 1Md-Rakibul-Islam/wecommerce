'use client';

import { useTransition, useState } from 'react';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const initialState: ContactFormState = {
  success: false,
  message: '',
};

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ContactFormState>(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitContactForm(initialState, formData);
      setState(result);
      if (result.success) {
        e.currentTarget.reset();
      }
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
      <h2 className="font-semibold text-lg mb-6">Send us a message</h2>

      {state.success ? (
        <div className="flex items-start gap-3 rounded-lg bg-success/10 border border-success/20 p-4 mb-4">
          <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
          <p className="font-medium text-sm">{state.message}</p>
        </div>
      ) : state.message ? (
        <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4 mb-4">
          <AlertCircle size={20} className="text-destructive shrink-0 mt-0.5" />
          <p className="font-medium text-sm">{state.message}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium block mb-1.5">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive mt-1">{state.errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium block mb-1.5">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {state.errors?.email && (
              <p className="text-sm text-destructive mt-1">{state.errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="text-sm font-medium block mb-1.5">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {state.errors?.subject && (
            <p className="text-sm text-destructive mt-1">{state.errors.subject}</p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium block mb-1.5">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us more..."
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {state.errors?.message && (
            <p className="text-sm text-destructive mt-1">{state.errors.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending} className="h-11 px-8">
          {isPending ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </div>
  );
}
