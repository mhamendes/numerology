'use server';
'server-only';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailAttachment = {
  filename: string;
  content: string;
};

type EmailType = 'fullMap' | 'personalDays' | 'contact';

type SendEmailProps = {
  to: string;
  subject: string;
  html?: string;
  attachments?: EmailAttachment[];
  type: EmailType;
};

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
  type,
}: SendEmailProps) {
  const scheduledAt: Record<EmailType, string | undefined> = {
    personalDays: 'in 10 min',
    fullMap: 'in 2 hours',
    contact: undefined,
  };

  const defaultHtml =
    type === 'personalDays'
      ? 'Segue em anexo os seus dias Pessoais! Caso deseje o Mapa de Nascimento completo faça a compra pelo site. Obrigado pela compra!'
      : 'Segue em anexo o seu Mapa de Nascimento. Obrigado pela compra!';

  const { data, error } = await resend.emails.send({
    from: 'contact@drcosmicnumber.com',
    to,
    subject,
    html: html ?? defaultHtml,
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
