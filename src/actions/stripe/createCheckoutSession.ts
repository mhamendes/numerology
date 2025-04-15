'use server';

import { cookies } from 'next/headers';

import { DEFAULT_LOCALE } from '@/i18n/routing';
import { stripe } from '@/lib/stripe/stripe';

type CreateCheckoutSessionProps = {
  productId: string;
  productServerId: string;
  fullName?: string | null;
  birthday?: string | null;
  email?: string | null;
  partnerFullName?: string | null;
  partnerBirthday?: string | null;
  businessName?: string | null;
  businessType?: string | null;
};

export async function createCheckoutSession({
  fullName = null,
  birthday = null,
  email = null,
  partnerFullName = null,
  partnerBirthday = null,
  businessName = null,
  businessType = null,
  productServerId,
  productId,
}: CreateCheckoutSessionProps) {
  if (!productServerId || !productId) {
    throw new Error('Product ID not found');
  }

  if (!email) {
    throw new Error('Email is required');
  }

  if (productId === 'business-numerology' && (!businessName || !businessType)) {
    throw new Error('Business information is required');
  }

  if (productId !== 'business-numerology' && (!fullName || !birthday)) {
    throw new Error('Personal information is required');
  }

  if (
    productId === 'relationship-compatibility' &&
    (!partnerFullName || !partnerBirthday)
  ) {
    throw new Error('Partner information is required');
  }

  const product = await stripe.products.retrieve(productServerId);
  const price = await stripe.prices.retrieve(product.default_price as string);
  if (!price.id) {
    throw new Error('Price not found');
  }

  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE;
  const currency = (await cookies()).get('CURRENCY')?.value;

  if (!currency) {
    throw new Error('Currency not found');
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: price.id, quantity: 1 }],
    currency,
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: getReturnUrl(productId),
    allow_promotion_codes: true,
    customer_email: email,
    metadata: {
      fullName,
      birthday,
      email,
      productId,
      partnerFullName,
      partnerBirthday,
      businessName,
      businessType,
      locale,
    },
  });

  if (!session.client_secret) {
    throw new Error('Client secret not found');
  }

  return { client_secret: session.client_secret };
}

function getReturnUrl(productId: string) {
  if (process.env.NODE_ENV === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/booking/return?productId=${productId}&sessionId={CHECKOUT_SESSION_ID}`;
  }
  return `http://${process.env.LOCAL_URL}/booking/return?productId=${productId}&sessionId={CHECKOUT_SESSION_ID}`;
}
