'use server';
import 'server-only';

import { getDate } from 'date-fns';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { DEFAULT_LOCALE, LocalesType } from '@/i18n/routing';
import { logger } from '@/lib/logger';
import { DefaultNumbers } from '@/lib/numerology/types';
import {
  createContactPage,
  createDocumentCover,
  createFooter,
  createHeader,
  createIntroductionPage,
  createMainPage,
  getConfiguredPdf,
} from '@/lib/pdfCreation';
import { createSection } from '@/lib/pdfCreation/createSections';

import { sendEmail } from '@/actions/email/sendEmail';

const _schema = z.object({
  email: z.email({ error: 'email' }),
  fullName: z.string().min(2, { error: 'fullName' }),
  birthday: z.date({ error: 'birthday' }),
});

export async function createBirthDayReturnDocument({
  fullName,
  birthday,
  locale,
}: Omit<z.infer<typeof _schema>, 'email'> & { locale: LocalesType }) {
  let pdf = await getConfiguredPdf();

  pdf = await createDocumentCover(pdf, 'birthDay');
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

  const birthdayVibrationTextBase = (
    await import(`src/assets/documents/pt-br/04-birthDate.json`)
  ).default;
  const birthdayVibrationText =
    ((await import(`src/assets/documents/${locale}/04-birthDate.json`))
      .default as typeof birthdayVibrationTextBase) ??
    birthdayVibrationTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.birthdayVibration,
    result: String(getDate(birthday)) as DefaultNumbers,
    text: birthdayVibrationText,
    locale,
  });

  pdf = await createContactPage(pdf, locale);
  pdf = await createHeader(pdf, locale, 'birthDay');
  pdf = await createFooter(pdf);

  const baseBase = (await import(`src/assets/documents/pt-br/base.json`))
    .default;
  const base =
    ((await import(`src/assets/documents/${locale}/base.json`))
      .default as typeof baseBase) ?? baseBase;

  const subject = base.birthDaySubject.replace('{{fullName}}', fullName);
  const filename = `${subject}.pdf`;
  const uri = pdf.output('datauristring', {
    filename,
  });

  const content = Buffer.from(pdf.output('arraybuffer')).toString('base64');

  return { uri, content, subject, filename };
}

const log = logger.child({ module: 'sendBirthDayDocumentEmail' });

export async function sendBirthDayDocumentEmail({
  email,
  fullName,
  ...props
}: z.infer<typeof _schema>) {
  const locale =
    ((await cookies()).get('NEXT_LOCALE')?.value as LocalesType | undefined) ??
    DEFAULT_LOCALE;

  try {
    const { content, filename, subject } = await createBirthDayReturnDocument({
      fullName,
      locale,
      ...props,
    });

    await sendEmail({
      to: email,
      fullName,
      subject,
      attachments: [{ filename, content }],
      type: 'free',
      locale,
    });

    return true;
  } catch (error) {
    log.error(error, 'sendBirthDayDocumentEmail error');
    return false;
  }
}
