'use server';
import 'server-only';

import { cookies } from 'next/headers';
import { z } from 'zod';

import { DEFAULT_LOCALE } from '@/i18n/routing';
import { logger } from '@/lib/logger';
import { getPersonalDays } from '@/lib/numerology/numbers';
import {
  createContactPage,
  createFooter,
  createHeader,
  createIntroductionPage,
  createMainPage,
  getConfiguredPdf,
} from '@/lib/pdfCreation';
import { createPersonalDaysSection } from '@/lib/pdfCreation/createPersonalDaysSection';

import { sendEmail } from '@/actions/email/sendEmail';

const _schema = z.object({
  email: z.string().email({ message: 'email' }),
  fullName: z.string().min(2, { message: 'fullName' }),
  birthday: z.date({ required_error: 'birthday' }),
});

export async function createPersonalDaysReturnDocument({
  fullName,
  birthday,
}: Omit<z.infer<typeof _schema>, 'email'>) {
  const personalDays = getPersonalDays({ birthday });

  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE;

  let pdf = await getConfiguredPdf();

  pdf = await createIntroductionPage(pdf, locale);
  pdf = await createMainPage({
    pdf,
    fullName,
    birthday,
    locale,
  });

  const baseSectionTitles = (
    await import(`src/assets/documents/pt-br/sectionTitles.json`)
  ).default;
  const sectionTitles =
    ((await import(`src/assets/documents/${locale}/sectionTitles.json`))
      .default as typeof baseSectionTitles) ?? baseSectionTitles;

  const personalDayTextBase = (
    await import(`src/assets/documents/pt-br/18-personalDay.json`)
  ).default;
  const personalDayText =
    ((await import(`src/assets/documents/${locale}/18-personalDay.json`))
      .default as typeof personalDayTextBase) ?? personalDayTextBase;

  pdf = await createPersonalDaysSection({
    pdf,
    title: sectionTitles.personalDays,
    results: personalDays,
    text: personalDayText,
    locale,
  });

  pdf = await createContactPage(pdf, locale);
  pdf = await createHeader(pdf, locale, 'personalDays');
  pdf = await createFooter(pdf);

  const baseBase = (await import(`src/assets/documents/pt-br/base.json`))
    .default;
  const base =
    ((await import(`src/assets/documents/${locale}/base.json`))
      .default as typeof baseBase) ?? baseBase;

  const subject = base.personalDaysSubject.replace('{{fullName}}', fullName);
  const filename = `${subject}.pdf`;
  const uri = pdf.output('datauristring', {
    filename,
  });

  const content = Buffer.from(pdf.output('arraybuffer')).toString('base64');

  return { uri, content, subject, filename };
}

const log = logger.child({ module: 'sendPersonalDaysDocumentEmail' });

export async function sendPersonalDaysDocumentEmail({
  email,
  ...props
}: z.infer<typeof _schema>) {
  try {
    const { content, filename, subject } =
      await createPersonalDaysReturnDocument({
        ...props,
      });

    await sendEmail({
      to: email,
      subject,
      attachments: [{ filename, content }],
      type: 'free',
    });

    return true;
  } catch (error) {
    log.error(error, 'sendPersonalDaysDocumentEmail error');
    return false;
  }
}
