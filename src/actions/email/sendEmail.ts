'use server';
'server-only';

import { Resend } from 'resend';

import { LocalesType } from '@/i18n/routing';

import { getBirthMapEmailReact } from './getBirthMapEmailReact';
import { getBusinessNumerologyEmailReact } from './getBusinessNumerologyEmailReact';
import { getPersonalReadingEmailReact } from './getPersonalReadingEmailReact';
import { getRelationshipCompatibilityEmailReact } from './getRelationshipCompatibilityEmailReact';

import { ProductId } from '@/actions/stripe/getProductPrice';

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailAttachment = {
  filename: string;
  content: string;
};

type EmailType = ProductId | 'free' | 'contact';

type SendEmailProps = {
  to: string;
  subject: string;
  fullName: string;
  html?: string;
  attachments?: EmailAttachment[];
  type: EmailType;
  locale: LocalesType;
};

export async function sendEmail({
  to,
  subject,
  fullName,
  html,
  attachments,
  type,
}: SendEmailProps) {
  if (!type)
    throw new Error(`No email type provided, failed to send email to ${to}`);

  const htmlForType: Record<EmailType, string> = {
    free: 'Segue em anexo os seus dias Pessoais! Caso deseje o Mapa de Nascimento completo faça a compra pelo site https://drcosmicnumber.com/booking.',
    'birth-map': getBirthMapEmailReact(fullName),
    'personal-reading': await getPersonalReadingEmailReact(fullName),
    'relationship-compatibility':
      await getRelationshipCompatibilityEmailReact(fullName),
    'business-numerology': await getBusinessNumerologyEmailReact(fullName),
    contact: `${fullName} de email ${to} enviou a mensagem: ${html}`,
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
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
