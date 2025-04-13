import jsPDF from 'jspdf';

import { PALETTE, START_HEIGHT, TOP_MARGIN } from './base';

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  description: string;
  list: string[][];
  divideList?: boolean;
  extra?: string;
};

export async function createSectionWithBulletPoints({
  pdf,
  title,
  description,
  list,
  divideList,
  extra,
}: CreateSectionArgs) {
  pdf.autoTable({
    head: [[title]],
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

  pdf.autoTable({
    head: [[description]],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      fontSize: 10,
      fontStyle: 'normal',
      cellWidth: 'wrap',
    },
    theme: 'plain',
    tableWidth: 180,

    margin: { top: TOP_MARGIN },
  });

  if (divideList) {
    list.forEach((item) => {
      pdf.autoTable({
        head: [item],
        startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
        headStyles: {
          cellPadding: 1,
          textColor: PALETTE.black,
          font: 'CenturyGothic',
          fontSize: 10,
          fontStyle: 'bold',
        },
        theme: 'plain',

        margin: { top: TOP_MARGIN },
      });
    });
  } else {
    pdf.autoTable({
      head: list,
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontSize: 10,
        fontStyle: 'bold',
      },
      theme: 'plain',

      margin: { top: TOP_MARGIN },
    });
  }

  if (extra) {
    pdf.autoTable({
      head: [[extra]],
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
  }

  return pdf;
}
