import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailAttachment = {
  filename: string;
  content: string;
};

type SendEmailProps = {
  to: string;
  subject: string;
  html?: string;
  attachments: EmailAttachment[];
};

export async function sendEmail({ to, subject, attachments }: SendEmailProps) {
  const { data, error } = await resend.emails.send({
    from: 'contato@carmelindaaraujo.com',
    to,
    subject,
    html: 'Segue em anexo o seu Mapa de Nascimento. Obrigado pela compra!',
    attachments: attachments.map((attachment) => ({
      content: attachment.content,
      filename: attachment.filename,
    })),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
