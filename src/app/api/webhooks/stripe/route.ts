import { UTCDate } from '@date-fns/utc';
import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';

import { LocalesType } from '@/i18n/routing';
import { logger } from '@/lib/logger';
import { stripe } from '@/lib/stripe/stripe';

import { createNumerologyReturnDocument } from '@/actions/createNumerologyReturnDocument';
import { sendEmail } from '@/actions/email/sendEmail';
import { ProductId } from '@/actions/stripe/getProductPrice';

const log = logger.child({ module: 'api/webhooks/stripe' });
export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get('stripe-signature') as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    log.error(error, 'Webhook Error on event formatting');
    return NextResponse.json(
      { message: `Webhook Error on event formatting: ${errorMessage}` },
      { status: 400 }
    );
  }

  log.info(`Successfully constructed event: ${event.id}`);

  const permittedEvents: string[] = ['checkout.session.completed'];

  if (permittedEvents.includes(event.type)) {
    try {
      const data = event.data.object as Stripe.Checkout.Session;
      const customerEmail = data.customer_details?.email;
      if (!customerEmail) throw new Error('Customer email not found');

      const fullName = data.metadata?.fullName;
      if (!fullName) throw new Error('Full name not found');

      const birthday = data.metadata?.birthday;
      if (!birthday) throw new Error('Birthday not found');

      const locale = data.metadata?.locale as LocalesType | undefined;
      if (!locale) throw new Error('Locale not found');

      const productId = data.metadata?.productId as ProductId | undefined;
      if (!productId) throw new Error('Product ID not found');

      log.info(`CheckoutSession status: ${data.payment_status}`);

      const { content, filename, subject } =
        await createNumerologyReturnDocument({
          fullName,
          birthday: new UTCDate(birthday),
          locale,
        });

      const response = await sendEmail({
        to: customerEmail,
        fullName,
        subject,
        attachments: [{ filename, content }],
        type: productId,
        locale,
      });

      log.info(`Email sent to ${customerEmail}`);
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const data = event.data.object as Stripe.Checkout.Session;
      const logError = log.child({
        eventId: event.id,
        sessionId: data.id,
        email: data.customer_details?.email,
        fullName: data.metadata?.fullName,
        birthday: data.metadata?.birthday,
        locale: data.metadata?.locale as LocalesType,
      });
      logError.error(error, 'Webhook Error on document creation');
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      );
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 });
}
