'use server';
import 'server-only';

import { cookies } from 'next/headers';
import { z } from 'zod';

import { DEFAULT_LOCALE } from '@/i18n/routing';
import {
  createContactPage,
  createFooter,
  createHeader,
  createIntroductionPage,
  createMainPage,
  createReport,
  createSections,
  createUnificationSection,
  getConfiguredPdf,
} from '@/lib/pdfCreation';

import { getNumerologyResponse } from './getNumerologyResponse';

const schema = z.object({
  fullName: z.string().min(2, {
    message: 'fullName',
  }),
  birthday: z.date({ required_error: 'birthday' }),
});

export async function createNumerologyReturnDocument({
  fullName,
  birthday,
}: z.infer<typeof schema>) {
  const numerologyResponse = await getNumerologyResponse({
    fullName,
    birthday,
  });

  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE;

  let pdf = await getConfiguredPdf();

  pdf = await createIntroductionPage(pdf, locale);
  pdf = await createMainPage({ pdf, fullName, birthday, locale });

  pdf = await createReport({
    pdf,
    fullName,
    birthday,
    numerologyResponse,
    locale,
  });
  pdf = await createSections({
    pdf,
    fullName,
    birthday,
    numerologyResponse,
    locale,
  });
  pdf = await createUnificationSection(pdf, locale);
  pdf = await createContactPage(pdf, locale);
  pdf = await createHeader(pdf, locale);
  pdf = await createFooter(pdf);

  const baseBase = (await import(`src/assets/documents/pt-br/base.json`))
    .default;
  const base =
    ((await import(`src/assets/documents/${locale}/base.json`))
      .default as typeof baseBase) ?? baseBase;

  const subject = base.subject.replace('{{fullName}}', fullName);
  const filename = `${subject}.pdf`;
  const uri = pdf.output('datauristring', {
    filename,
  });

  const content = Buffer.from(pdf.output('arraybuffer')).toString('base64');

  return { uri, content, subject, filename };
}

const _schemaWithPassword = schema.extend({
  password: z.string().min(8, {
    message: 'password',
  }),
});

export async function actionCreateNumerologyReturnDocument({
  fullName,
  birthday,
  password,
}: z.infer<typeof _schemaWithPassword>) {
  if (password !== 'braga341314') throw new Error('wrong-password');

  return createNumerologyReturnDocument({ fullName, birthday });
}
