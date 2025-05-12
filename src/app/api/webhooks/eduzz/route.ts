import crypto from 'crypto';
import { NextResponse } from 'next/server';

import { LocalesType } from '@/i18n/routing';
import { logger } from '@/lib/logger';

import { EduzzEvent } from './types';

import { createNumerologyReturnDocument } from '@/actions/createNumerologyReturnDocument';
import { sendEmail } from '@/actions/email/sendEmail';
import { ProductId } from '@/actions/stripe/getProductPrice';
import { updateSaleByTrackerCode } from '@/db/migrations';
import { getSaleByTrackerCode } from '@/db/queries';

const log = logger.child({ module: 'api/webhooks/stripe' });
export async function POST(req: Request) {
  let event: EduzzEvent;

  try {
    const requestBody = await (await req.blob()).text();
    const signature = req.headers.get('x-signature') as string;
    const secret = process.env.EDUZZ_WEBHOOK_SECRET as string;

    if (!secret) {
      throw new Error('EDUZZ_WEBHOOK_SECRET is not set');
    }
    const calculatedSignature = crypto
      .createHmac('sha256', secret)
      .update(requestBody)
      .digest('hex');

    if (calculatedSignature !== signature) {
      throw new Error('Invalid signature');
    }

    event = JSON.parse(requestBody);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    log.error(error, 'Webhook Error on event formatting');
    return NextResponse.json(
      { message: `Webhook Error on event formatting: ${errorMessage}` },
      { status: 400 }
    );
  }

  log.info('Successfully constructed event:', event.id);

  const permittedEvents: string[] = ['myeduzz.invoice_paid'];

  if (!permittedEvents.includes(event.event)) {
    return NextResponse.json({ message: 'Received' }, { status: 200 });
  }

  try {
    const trackerCode = event.data.tracker.code1;
    if (!trackerCode) throw new Error('Tracker code not found');

    const sale = await getSaleByTrackerCode(trackerCode);
    if (!sale) throw new Error('Sale not found');

    const customerEmail = sale.email;
    if (!customerEmail) throw new Error('Customer email not found');

    const fullName = sale.fullName;
    if (!fullName) throw new Error('Full name not found');

    const birthday = sale.birthDay;
    if (!birthday) throw new Error('Birthday not found');

    const locale = sale.locale as LocalesType | undefined;
    if (!locale) throw new Error('Locale not found');

    const productId = sale.productId as ProductId | undefined;
    if (!productId) throw new Error('Product ID not found');

    log.info(`Payment status: ${event.data.status}`);

    const { content, filename, subject } = await createNumerologyReturnDocument(
      {
        fullName,
        birthday: new Date(birthday),
        locale,
      }
    );

    const response = await sendEmail({
      to: customerEmail,
      fullName,
      subject,
      attachments: [{ filename, content }],
      type: productId,
      locale,
    });

    log.info(`Email sent to ${customerEmail}`);

    await updateSaleByTrackerCode({
      status: 'paid',
      updatedAt: new Date(),
      trackerCode,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const data = event.data;
    const logError = log.child({
      eventId: event.id,
      sessionId: data.id,
      email: data.buyer.email,
      fullName: data.buyer.name,
    });
    logError.error(error, 'Webhook Error on document creation');
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
