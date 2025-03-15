'use server';

import { stripe } from '@/lib/stripe/stripe';

export async function getCheckoutSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return {
    status: session.status,
    customer_email: session.customer_details?.email,
  };
}
