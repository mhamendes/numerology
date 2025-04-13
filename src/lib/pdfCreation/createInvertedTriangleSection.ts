import { jsPDF } from 'jspdf';

import { invertedTriangles } from '@/lib/numerology/invertedTriangles';
import { ArcaneNumbers, NegativeSequences } from '@/lib/numerology/types';

import {
  createTitle,
  NEW_PAGE_START_HEIGHT,
  PALETTE,
  START_HEIGHT,
  START_WIDTH,
  TOP_MARGIN,
} from './base';

type Text = {
  title: string;
  descriptionTriangle: string;
  descriptionNegativeSequences: string;
  items: Record<NegativeSequences, string>;
};

type ArcaneText = {
  title: string;
  description: string;
  items: Record<
    ArcaneNumbers,
    {
      title: string;
      data: string;
    }
  >;
};

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  arcanesTitle: string;
  result: ReturnType<typeof invertedTriangles>;
  text: Text;
  arcanesText: ArcaneText;
  locale: string;
};

export async function createInvertedTriangleSection({
  pdf,
  title,
  arcanesTitle,
  result,
  text,
  arcanesText,
  locale,
}: CreateSectionArgs) {
  const invertedTriangleExtraContentBase = (
    await import(`src/assets/documents/pt-br/invertedTriangleExtraContent.json`)
  ).default;
  const invertedTriangleExtraContent =
    ((
      await import(
        `src/assets/documents/${locale}/invertedTriangleExtraContent.json`
      )
    ).default as typeof invertedTriangleExtraContentBase) ??
    invertedTriangleExtraContentBase;

  pdf = await createTitle({
    pdf,
    title: title,
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  pdf.autoTable({
    head: [[text.descriptionTriangle]],
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

  pdf = createInvertedTriangleImage({
    pdf,
    invertedTriangle: result.allTriangleSums,
    negativeSequences: result.negativeSequences,
    startHeight: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5,
  });

  pdf.autoTable({
    head: [[text.descriptionNegativeSequences]],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
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

  result.negativeSequences.forEach((sequence) => {
    pdf.autoTable({
      head: [[`[${sequence.split('').join('_')}]: ${text.items[sequence]}`]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
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
  });

  pdf.autoTable({
    head: [
      [
        invertedTriangleExtraContent.head1
          .replace('{{age}}', result.currentAge.toString())
          .replace('{{arcane}}', result.currentArcane)
          .replace('{{arcaneEndAge}}', result.currentArcaneEndAge.toString()),
      ],
    ],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
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
    head: [
      [
        invertedTriangleExtraContent.head2.replace(
          '{{arcane}}',
          result.singleDigitArcane.toString()
        ),
      ],
    ],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
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
    head: [[invertedTriangleExtraContent.head3]],
    body: [[result.arcanePairs.join(' - ')]],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      fontStyle: 'normal',
      fontSize: 10,
    },
    bodyStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      fontStyle: 'bold',
      fontSize: 10,
    },
    theme: 'plain',
    tableWidth: 180,
    margin: { top: TOP_MARGIN },
  });

  const arcaneDuration = await getArcaneDuration({
    locale,
    ...result.timeOfEachArcane,
  });
  pdf.autoTable({
    head: [
      [
        invertedTriangleExtraContent.head4.replace(
          '{{arcaneDuration}}',
          arcaneDuration
        ),
      ],
    ],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
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

  pdf.setDrawColor(PALETTE.purple);
  pdf.setLineWidth(0.7);
  pdf.line(
    START_WIDTH,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5,
    190,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5
  );

  pdf = await createTitle({
    pdf,
    title: arcanesTitle,
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  pdf.autoTable({
    head: [[arcanesText.description]],
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

  Array.from(new Set(result.arcanePairs))
    .sort()
    .map((arcane, idx) => {
      const currentText = arcanesText.items[arcane];
      const sum = idx === 0 ? 5 : 2;
      pdf.autoTable({
        head: [[currentText.title]],
        startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + sum,
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

      pdf.autoTable({
        head: [[currentText.data]],
        startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
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
    });

  return pdf;
}

async function getArcaneDuration({
  locale,
  years,
  months,
}: {
  locale: string;
  years: number;
  months: number;
}) {
  const invertedTriangleExtraContentBase = (
    await import(`src/assets/documents/pt-br/invertedTriangleExtraContent.json`)
  ).default;
  const invertedTriangleExtraContent =
    ((
      await import(
        `src/assets/documents/${locale}/invertedTriangleExtraContent.json`
      )
    ).default as typeof invertedTriangleExtraContentBase) ??
    invertedTriangleExtraContentBase;

  const monthsText =
    months === 1
      ? invertedTriangleExtraContent.month
      : invertedTriangleExtraContent.months;
  const yearsText =
    years === 1
      ? invertedTriangleExtraContent.year
      : invertedTriangleExtraContent.years;

  if (months === 0) return `${years} ${yearsText}`;
  return `${years} ${yearsText} e ${months} ${monthsText}`;
}

type CreateInvertedTriangleImage = {
  pdf: jsPDF;
  invertedTriangle: string[][];
  negativeSequences: string[];
  startHeight: number;
};

function createInvertedTriangleImage({
  pdf,
  invertedTriangle,
  negativeSequences,
  startHeight,
}: CreateInvertedTriangleImage) {
  pdf.setFont('CenturtyGothic', 'normal');
  pdf.setTextColor(PALETTE.black);
  pdf.setFontSize(12);

  const totalHeight = invertedTriangle.length * 5;

  const name = invertedTriangle.shift();
  const nameLength = name ? name.length : 0;

  const pageWidth = pdf.internal.pageSize.getWidth() / 2;

  let startWidth: number = pageWidth - nameLength * 2;
  if (name) {
    name.forEach((char) => {
      pdf.text(
        char,
        startWidth,
        startHeight,
        {
          maxWidth: 180,
        },
        'center'
      );
      startWidth += 4;
    });
  }

  let triangleRowStartHeight = startHeight + 5;
  invertedTriangle.forEach((triangleRow, idx) => {
    startWidth = pageWidth - nameLength * 2 + idx * 2;
    triangleRow.forEach((section) => {
      if (negativeSequences.some((sequence) => section.includes(sequence))) {
        pdf.setTextColor(PALETTE.red);
      }

      const text = section.split('');
      text.forEach((number) => {
        pdf.text(number, startWidth, triangleRowStartHeight, {
          maxWidth: 180,
        });
        startWidth += 4;
      });
      pdf.setTextColor(PALETTE.black);
    });
    triangleRowStartHeight += 5;
  });

  pdf.autoTable({
    startY: startHeight + totalHeight + 5,
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

  return pdf;
}
