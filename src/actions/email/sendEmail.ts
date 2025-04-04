'use server';
'server-only';

import { Resend } from 'resend';
import { ProductId } from '@/actions/stripe/getProductPrice';
import { getBirthMapEmailReact } from './getBirthMapEmailReact';
import { getPersonalReadingEmailReact } from './getPersonalReadingEmailReact';
import { getRelationshipCompatibilityEmailReact } from './getRelationshipCompatibilityEmailReact';
import { getBusinessNumerologyEmailReact } from './getBusinessNumerologyEmailReact';

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailAttachment = {
  filename: string;
  content: string;
};

type EmailType = ProductId | 'free' | 'contact';

type SendEmailProps = {
  to: string;
  subject: string;
  html?: string;
  attachments?: EmailAttachment[];
  type?: EmailType;
};

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
  type,
}: SendEmailProps) {
  if (!type)
    throw new Error(`No email type provided, failed to send email to ${to}`);

  const scheduledAt: Record<EmailType, string | undefined> = {
    free: 'in 10 min',
    'birth-map': 'in 2 hours',
    'personal-reading': 'in 2 hours',
    'relationship-compatibility': 'in 2 hours',
    'business-numerology': 'in 2 hours',
    contact: undefined,
  };

  const htmlForType: Record<EmailType, string> = {
    free: 'Segue em anexo os seus dias Pessoais! Caso deseje o Mapa de Nascimento completo faça a compra pelo site https://drcosmicnumber.com/booking.',
    'birth-map': getBirthMapEmailReact(to),
    'personal-reading': await getPersonalReadingEmailReact(to),
    'relationship-compatibility':
      await getRelationshipCompatibilityEmailReact(to),
    'business-numerology': await getBusinessNumerologyEmailReact(to),
    contact: html ?? 'Email sem dados',
  };

  const { data, error } = await resend.emails.send({
    from: 'contact@drcosmicnumber.com',
    to,
    subject,
    html: htmlForType[type],
    attachments: attachments?.map((attachment) => ({
      content: attachment.content,
      filename: attachment.filename,
    })),
    scheduledAt: scheduledAt[type],
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
