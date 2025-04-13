import { jsPDF } from 'jspdf';

import { AllPossibleNumbers } from '@/lib/numerology/types';

import {
  createTitle,
  NEW_PAGE_START_HEIGHT,
  PALETTE,
  START_HEIGHT,
  START_WIDTH,
  TOP_MARGIN,
} from './base';

type Text<T extends AllPossibleNumbers> = {
  title: string;
  description: string;
  items?: Record<T, string>;
};

type CreateSectionArgs<T extends AllPossibleNumbers> = {
  pdf: jsPDF;
  title: string;
  result: {
    value: T;
    valuePrefix: string;
    info: {
      title: string;
      data: number[];
    }[];
  };
  text: Text<T>;
};

export async function createSectionWithListOfNumbers<
  T extends AllPossibleNumbers,
>({ pdf, title, result, text }: CreateSectionArgs<T>) {
  pdf = await createTitle({
    pdf,
    title: title,
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  pdf.autoTable({
    head: [[text.description]],
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

  pdf.autoTable({
    head: [[`${result.valuePrefix}: ${result.value}`]],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.purple,
      font: 'CenturyGothic',
      fontSize: 14,
      fontStyle: 'normal',
    },
    theme: 'plain',
    tableWidth: 180,

    margin: { top: TOP_MARGIN },
  });

  result.info.forEach(({ title, data }) => {
    if (!data.length) return;
    pdf.autoTable({
      head: [[`${title}: ${getNumberArrayString(data)}`]],
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
  });

  if (text.items) {
    pdf.autoTable({
      head: [[text.items[result.value]]],
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

  pdf.setDrawColor(PALETTE.purple);
  pdf.setLineWidth(0.7);
  pdf.line(
    START_WIDTH,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5,
    190,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5
  );

  return pdf;
}

function getNumberArrayString(numbers: number[]) {
  if (!numbers.length) return 'Nenhum';

  if (numbers.length === 1) return numbers[0].toString();

  const lastNumber = numbers.pop();

  return `${numbers.join(', ')} e ${lastNumber}`;
}
