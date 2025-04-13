import 'jspdf-autotable';

import jsPDF from 'jspdf';

import {
  BRAND_ADDRESS,
  BRAND_INSTAGRAM_USERNAME,
  BRAND_WEBSITE,
  CONTACT_EMAIL,
  PHONE_NUMBER,
} from '@/lib/constants';

import { createSectionWithBulletPoints } from './createSectionWithBulletPoints';
import { DocType } from './types';

import { centuryGothic } from '@/assets/fonts/centuryGothic';
import { centuryGothicBold } from '@/assets/fonts/centuryGothicBold';
import { zapfino } from '@/assets/fonts/zapfino';
import { logoBase64 } from '@/assets/images/logoBase64';

export const START_WIDTH = 15;
export const START_HEIGHT = 35;
export const NEW_PAGE_START_HEIGHT = 30;
export const TOP_MARGIN = 27;

export const PALETTE = {
  black: '#000000',
  green: '#006871',
  lightGreen: '#E3EFD9',
  red: '#FF0000',
};

export async function getConfiguredPdf() {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.addFileToVFS('zapfino-normal.ttf', zapfino);
  pdf.addFont('zapfino-normal.ttf', 'zapfino', 'normal');
  pdf.addFileToVFS('Century Gothic Bold-normal.ttf', centuryGothicBold);
  pdf.addFont('Century Gothic Bold-normal.ttf', 'CenturyGothic', 'bold');
  pdf.addFileToVFS('CenturyGothic-normal.ttf', centuryGothic);
  pdf.addFont('CenturyGothic-normal.ttf', 'CenturyGothic', 'normal');

  return pdf;
}

export async function createIntroductionPage(pdf: jsPDF, locale: string) {
  const baseIntroduction = (
    await import(`src/assets/documents/pt-br/introduction.json`)
  ).default;
  const introduction =
    ((await import(`src/assets/documents/${locale}/introduction.json`))
      .default as typeof baseIntroduction) ?? baseIntroduction;

  pdf.setFont('zapfino', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(PALETTE.black);
  pdf.text(
    introduction.data,
    START_WIDTH,
    90,
    {
      maxWidth: 180,
      lineHeightFactor: 3.5,
    },
    undefined
  );
  return pdf;
}

async function getBaseContent(locale: string) {
  const baseBase = (await import(`src/assets/documents/pt-br/base.json`))
    .default;
  return (
    ((await import(`src/assets/documents/${locale}/base.json`))
      .default as typeof baseBase) ?? baseBase
  );
}

type CreateMainPageArgs = {
  pdf: jsPDF;
  fullName: string;
  birthday: Date;
  locale: string;
};
export async function createMainPage({
  pdf,
  fullName,
  birthday,
  locale,
}: CreateMainPageArgs) {
  const base = await getBaseContent(locale);

  pdf.addPage();

  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();

  pdf.setFont('zapfino', 'normal');
  pdf.setTextColor(PALETTE.black);
  pdf.setFontSize(20);
  pdf.text(
    `${fullName}\n\n\n${birthday.toLocaleDateString(locale)}`,
    pageWidth / 2,
    110,
    {
      maxWidth: 180,
      baseline: 'middle',
      align: 'center',
    },
    'center'
  );

  pdf.setFontSize(12);
  pdf.text(
    `${base.doneAt} ${new Date().toLocaleDateString(locale)}`,
    pageWidth / 2,
    pageHeight - 35,
    {
      maxWidth: 180,
      baseline: 'middle',
      align: 'center',
    },
    'center'
  );

  pdf.text(
    `${base.mentorName} Carmelinda Araújo`,
    pageWidth / 2,
    pageHeight - 25,
    {
      maxWidth: 180,
      baseline: 'middle',
      align: 'center',
    },
    'center'
  );
  return pdf;
}

export async function createUnificationSection(pdf: jsPDF, locale: string) {
  const base = await getBaseContent(locale);

  pdf = await createTitle({
    pdf,
    title: base.unifyingNumbersTitle,
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  pdf.autoTable({
    head: [[base.unifyingNumbersDescription]],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 10,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      fontStyle: 'normal',
      fontSize: 10,
    },
    theme: 'plain',
    tableWidth: 180,
    margin: { top: TOP_MARGIN },
  });

  pdf = await createSectionWithBulletPoints({
    pdf,
    title: base.whereIAmGoingTitle,
    description: base.whereIAmGoingDescription,
    list: base.whereIAmGoingList,
    extra: base.whereIAmGoingExtra,
  });

  pdf = await createSectionWithBulletPoints({
    pdf,
    title: base.toolsIAmUsingTitle,
    description: base.toolsIAmUsingDescription,
    list: base.toolsIAmUsingList,
  });

  pdf = await createSectionWithBulletPoints({
    pdf,
    title: base.questionsIAmAskingTitle,
    description: base.questionsIAmAskingDescription,
    list: base.questionsIAmAskingList,
    divideList: true,
  });

  return pdf;
}

export async function createContactPage(pdf: jsPDF, locale: string) {
  const base = await getBaseContent(locale);

  pdf.addPage();
  const data = [
    [base.phone, `${PHONE_NUMBER}\n`],
    [base.email, `${CONTACT_EMAIL}\n`],
    [base.instagram, `${BRAND_INSTAGRAM_USERNAME}\n`],
    [base.website, `${BRAND_WEBSITE}\n`],
    [base.address, BRAND_ADDRESS.join('\n')],
  ];

  pdf.autoTable({
    head: [[base.contacts]],
    startY: 100,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.green,
      font: 'zapfino',
      fontSize: 16,
      fontStyle: 'normal',
      halign: 'center',
    },
    theme: 'plain',
    tableWidth: 180,
  });

  pdf.autoTable({
    head: data,
    startY: (pdf.lastAutoTable.finalY ?? 110) + 10,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.green,
      font: 'CenturyGothic',
      fontSize: 12,
      fontStyle: 'normal',
      halign: 'center',
      valign: 'middle',
    },
    margin: { horizontal: 50 },
    theme: 'plain',
    tableWidth: 130,
  });

  return pdf;
}

export async function createHeader(pdf: jsPDF, locale: string, type: DocType) {
  const base = await getBaseContent(locale);

  const numberOfPages = pdf.getNumberOfPages();

  const title: Record<DocType, string> = {
    fullMap: base.birthMapTitle,
    personalDays: base.personalDaysTitle,
  };

  Array.from({ length: numberOfPages }).forEach((_, index) => {
    pdf.setPage(index + 1);

    pdf.addImage(logoBase64, 'WEBP', 20, 5, 24, 15);
    pdf.setFontSize(20);
    pdf.setTextColor(PALETTE.green);
    pdf.setFont('zapfino', 'normal');
    pdf.text(title[type], 70, 17, undefined, undefined);
    pdf.setDrawColor(PALETTE.green);
    pdf.setLineWidth(0.7);
    pdf.line(START_WIDTH, 22, 190, 22);
  });
  return pdf;
}

export async function createFooter(pdf: jsPDF) {
  const pageHeight = pdf.internal.pageSize.getHeight();
  const numberOfPages = pdf.getNumberOfPages();

  Array.from({ length: numberOfPages }).forEach((_, index) => {
    pdf.setPage(index + 1);
    pdf.setDrawColor(PALETTE.green);
    pdf.setLineWidth(0.7);
    pdf.line(START_WIDTH, pageHeight - 15, 190, pageHeight - 15);
    pdf.setFontSize(12);
    pdf.setTextColor(PALETTE.green);
    pdf.setFont('CenturyGothic', 'normal');
    pdf.text(`${index + 1}`, 185, pageHeight - 10);
  });

  return pdf;
}

type CreateTitleArgs = {
  pdf: jsPDF;
  title: string;
  startHeight: number;
  skipNewPage?: boolean;
};

export async function createTitle({
  pdf,
  title,
  startHeight,
  skipNewPage,
}: CreateTitleArgs) {
  if (!skipNewPage) {
    pdf.addPage();
  }
  pdf.autoTable({
    startY: startHeight,
    head: [[title]],
    headStyles: {
      textColor: PALETTE.green,
      font: 'zapfino',
      fontSize: 16,
    },
    theme: 'plain',
    tableWidth: 180,
  });

  pdf.setDrawColor(PALETTE.green);
  pdf.setLineWidth(0.7);
  pdf.line(START_WIDTH, startHeight + 15, 190, startHeight + 15);

  return pdf;
}
