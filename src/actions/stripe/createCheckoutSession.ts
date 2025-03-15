'use server';

import { stripe } from '@/lib/stripe/stripe';

const PRODUCT_ID = process.env.PRODUCT_ID;

type CreateCheckoutSessionProps = {
  fullName: string;
  birthday: string;
};

export async function createCheckoutSession({
  fullName,
  birthday,
}: CreateCheckoutSessionProps) {
  if (!PRODUCT_ID) {
    throw new Error('Product ID not found');
  }

  const product = await stripe.products.retrieve(PRODUCT_ID);
  const price = await stripe.prices.retrieve(product.default_price as string);
  if (!price.id) {
    throw new Error('Price not found');
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: price.id, quantity: 1 }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: getReturnUrl(),
    metadata: {
      fullName,
      birthday,
    },
  });

  if (!session.client_secret) {
    throw new Error('Client secret not found');
  }

  return { client_secret: session.client_secret };
}

function getReturnUrl() {
  if (process.env.NODE_ENV === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/payment/return?sessionId={CHECKOUT_SESSION_ID}`;
  }
  return `http://${process.env.LOCAL_URL}/payment/return?sessionId={CHECKOUT_SESSION_ID}`;
}
