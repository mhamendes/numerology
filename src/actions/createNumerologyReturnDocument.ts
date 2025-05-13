'use server';
import 'server-only';

import { z } from 'zod';

import { LocalesType } from '@/i18n/routing';
import {
  createContactPage,
  createDocumentCover,
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
  locale,
}: z.infer<typeof schema> & { locale: LocalesType }) {
  if (!locale)
    throw new Error('Missing locale when creating numerology return document');

  const numerologyResponse = await getNumerologyResponse({
    fullName,
    birthday,
  });

  let pdf = await getConfiguredPdf();

  pdf = await createDocumentCover(pdf, 'fullMap');
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
  pdf = await createHeader(pdf, locale, 'fullMap');
  pdf = await createFooter(pdf);

  const baseBase = (await import(`src/assets/documents/pt-br/base.json`))
    .default;
  const base =
    ((await import(`src/assets/documents/${locale}/base.json`))
      .default as typeof baseBase) ?? baseBase;

  const subject = base.lifeMapSubject.replace('{{fullName}}', fullName);
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
  locale,
}: z.infer<typeof _schemaWithPassword> & { locale: LocalesType }) {
  if (password !== 'braga341314') throw new Error('wrong-password');

  return createNumerologyReturnDocument({ fullName, birthday, locale });
}
