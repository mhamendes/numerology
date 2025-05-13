'use server';
'server-only';

import { Resend } from 'resend';

import { LocalesType } from '@/i18n/routing';

import { getBusinessNumerologyEmailReact } from './getBusinessNumerologyEmailReact';
import { getFreeEmailReact } from './getFreeEmailReact';
import { getLifeMapEmailReact } from './getLifeMapEmailReact';
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
  locale,
}: SendEmailProps) {
  if (!type)
    throw new Error(`No email type provided, failed to send email to ${to}`);

  console.log('type', type);

  const getEmailHtml = async (type: EmailType) => {
    switch (type) {
      case 'free':
        return getFreeEmailReact({ fullName, locale });
      case 'life-map':
        return getLifeMapEmailReact({ fullName, locale });
      case 'personal-reading':
        return getPersonalReadingEmailReact({ fullName, locale });
      case 'relationship-compatibility':
        return getRelationshipCompatibilityEmailReact({ fullName, locale });
      case 'business-numerology':
        return getBusinessNumerologyEmailReact({ fullName, locale });
      case 'contact':
        return `${fullName} de email ${to} enviou a mensagem: ${html}`;
      default:
        throw new Error(
          `No email type provided, failed to send email to ${to}`
        );
    }
  };

  const { data, error } = await resend.emails.send({
    from: 'contact@drcosmicnumber.com',
    to,
    subject,
    html: await getEmailHtml(type),
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
