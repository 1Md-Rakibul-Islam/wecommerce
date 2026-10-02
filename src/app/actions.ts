'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const error of result.error.errors) {
      const field = error.path[0];
      if (field && !errors[field]) {
        errors[field] = error.message;
      }
    }
    return { success: false, message: 'Please fix the errors below.', errors };
  }

  return {
    success: true,
    message: `Thank you, ${result.data.name}! Your message has been received. We will get back to you within 24 hours.`,
  };
}

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function subscribeNewsletter(
  _prevState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const email = formData.get('email') as string;
  const result = newsletterSchema.safeParse({ email });

  if (!result.success) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  return {
    success: true,
    message: 'Successfully subscribed! Watch your inbox for updates.',
  };
}
