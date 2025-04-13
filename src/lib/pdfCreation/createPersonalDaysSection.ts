import { jsPDF } from 'jspdf';

import { getMonthString } from '@/lib/date';
import { getPersonalDays } from '@/lib/numerology/numbers';

import {
  createTitle,
  NEW_PAGE_START_HEIGHT,
  PALETTE,
  START_HEIGHT,
  START_WIDTH,
  TOP_MARGIN,
} from './base';

type TextItem = {
  title: string;
  data: string;
};

type Text = {
  title: string;
  description: string;
  items: TextItem[];
};

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  results: ReturnType<typeof getPersonalDays>;
  text: Text;
  locale: string;
};

export async function createPersonalDaysSection({
  pdf,
  title,
  results,
  text,
  locale,
}: CreateSectionArgs) {
  const personalDatesExtraContentBase = (
    await import(`src/assets/documents/pt-br/personalDatesExtraContent.json`)
  ).default;
  const personalDatesExtraContent =
    ((
      await import(
        `src/assets/documents/${locale}/personalDatesExtraContent.json`
      )
    ).default as typeof personalDatesExtraContentBase) ??
    personalDatesExtraContentBase;

  pdf = await createTitle({
    pdf,
    title: title,
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  pdf.autoTable({
    head: [[text.description]],
    startY: (pdf.lastAutoTable.finalY ?? 0) + 10,
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

  const invertedMatrix = invertMatrix({
    matrix: results.map((result) => ({
      days: result.days,
    })),
  });

  const months = getMonths(results, locale);
  console.log({ months });

  pdf.autoTable({
    head: [
      [personalDatesExtraContent.month, ...getMonths(results, locale)],
      [
        personalDatesExtraContent.monthPersonal,
        ...results.map((result) => result.monthNumber),
      ],
    ],
    body: [
      [personalDatesExtraContent.day],
      ...invertedMatrix.map((row, idx) => [
        idx + 1,
        ...row.map((item) => `${item}`),
      ]),
    ],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      halign: 'center',
      fontSize: 10,
      fontStyle: 'normal',
    },
    bodyStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      halign: 'center',
      fontSize: 10,
      fontStyle: 'normal',
    },
    theme: 'plain',
    tableWidth: 180,
    margin: { top: TOP_MARGIN },
  });

  pdf.autoTable({
    head: [],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      fontSize: 10,
      fontStyle: 'normal',
    },
    theme: 'plain',
    tableWidth: 180,
    margin: { top: TOP_MARGIN },
  });

  pdf = await createTitle({
    pdf,
    title: 'Descrição dos Dias Pessoais',
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  for (const textItem of text.items) {
    pdf.autoTable({
      head: [[textItem.title]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 10,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.green,
        font: 'CenturyGothic',
        fontSize: 14,
        fontStyle: 'normal',
      },
      theme: 'plain',
      tableWidth: 180,
      margin: { top: TOP_MARGIN },
    });

    pdf.autoTable({
      head: [[textItem.data]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontStyle: 'normal',
        fontSize: 10,
      },
      pageBreak: 'auto',
      theme: 'plain',
      tableWidth: 180,
      margin: { top: TOP_MARGIN },
    });
  }

  pdf.setDrawColor(PALETTE.green);
  pdf.setLineWidth(0.7);
  pdf.line(
    START_WIDTH,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5,
    190,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5
  );

  return pdf;
}

const getMonths = (
  data: {
    month: number;
  }[],
  locale: string
) => {
  return data.map((item) => {
    return getMonthString(item.month, locale);
  });
};

type MatrixArgs = {
  matrix: {
    days: number[];
  }[];
};

const invertMatrix = ({ matrix }: MatrixArgs) => {
  const inverted = matrix[0].days.map((_, index) =>
    matrix.map((row) => row.days[index] ?? '⠀⠀⠀')
  );
  return inverted;
};
