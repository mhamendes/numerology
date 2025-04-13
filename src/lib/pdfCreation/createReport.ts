import { getDate } from 'date-fns';
import { jsPDF } from 'jspdf';
import { UserOptions } from 'jspdf-autotable';

import { PALETTE, START_HEIGHT, START_WIDTH } from './base';

import { getNumerologyResponse } from '@/actions/getNumerologyResponse';

type CreateReportArgs = {
  pdf: jsPDF;
  fullName: string;
  birthday: Date;
  numerologyResponse: Awaited<ReturnType<typeof getNumerologyResponse>>;
  locale: string;
};

export async function createReport({
  pdf,
  fullName,
  birthday,
  numerologyResponse,
  locale,
}: CreateReportArgs) {
  const reportExtraContentBase = (
    await import(`src/assets/documents/pt-br/reportExtraContent.json`)
  ).default;
  const reportExtraContent =
    ((await import(`src/assets/documents/${locale}/reportExtraContent.json`))
      .default as typeof reportExtraContentBase) ?? reportExtraContentBase;

  pdf.addPage();

  pdf.setTextColor(PALETTE.black);
  pdf.setFont('CenturyGothic', 'normal');
  pdf.setFontSize(22);

  pdf.text(fullName.toUpperCase(), START_WIDTH, START_HEIGHT);

  pdf.setFontSize(12);
  pdf.text(
    reportExtraContent.birthday.replace(
      '{{birthday}}',
      birthday.toLocaleDateString(locale)
    ),
    START_WIDTH,
    START_HEIGHT + 10
  );

  pdf.setTextColor(PALETTE.green);
  pdf.setFontSize(14);
  pdf.text(reportExtraContent.reportTitle, START_WIDTH, START_HEIGHT + 20);

  const tableStyle: UserOptions = {
    headStyles: {
      fillColor: PALETTE.lightGreen,
      textColor: PALETTE.black,
      halign: 'center',
      valign: 'middle',
      font: 'CenturyGothic',
      fontStyle: 'normal',
      fontSize: 14,
      cellWidth: 45,
    },
    bodyStyles: {
      textColor: PALETTE.green,
      fillColor: PALETTE.lightGreen,
      halign: 'center',
      valign: 'middle',
      font: 'CenturyGothic',
      fontStyle: 'normal',
      fontSize: 18,
      cellWidth: 45,
    },
    theme: 'plain',
    tableWidth: 180,
  } as const;

  pdf.setTextColor(PALETTE.black);
  pdf.autoTable({
    head: reportExtraContent.head1,
    body: [
      [
        numerologyResponse.motivationNumber,
        numerologyResponse.impressionNumber,
        numerologyResponse.expressionNumber,
        getDate(birthday),
      ],
    ],
    startY: START_HEIGHT + 25,
    ...tableStyle,
  });
  pdf.autoTable({
    head: reportExtraContent.head2,
    body: [
      [
        numerologyResponse.psychicNumber,
        numerologyResponse.destinyNumber,
        numerologyResponse.missionNumber,
        numerologyResponse.hiddenTalentNumber,
      ],
    ],
    startY: START_HEIGHT + 45,
    ...tableStyle,
  });
  pdf.autoTable({
    head: reportExtraContent.head3,
    body: [
      [
        numerologyResponse.karmicLessons.join(', '),
        numerologyResponse.karmicDebts.join(', '),
        numerologyResponse.hiddenTendencies.join(', '),
        numerologyResponse.subconsciousResponse,
      ],
    ],
    startY: START_HEIGHT + 65,
    ...tableStyle,
  });
  pdf.autoTable({
    head: reportExtraContent.head4,
    body: [
      [
        reportExtraContent.head4FirstRow
          .replace(
            '{{firstEnergyNumber}}',
            numerologyResponse.lifeCycles.first.energyNumber
          )
          .replace(
            '{{secondEnergyNumber}}',
            numerologyResponse.lifeCycles.second.energyNumber
          )
          .replace(
            '{{thirdEnergyNumber}}',
            numerologyResponse.lifeCycles.third.energyNumber
          ),
        reportExtraContent.head4SecondRow
          .replace(
            '{{firstNumber}}',
            numerologyResponse.challenges.first.number
          )
          .replace(
            '{{secondNumber}}',
            numerologyResponse.challenges.second.number
          )
          .replace('{{mainNumber}}', numerologyResponse.challenges.main.number),
        reportExtraContent.head4ThirdRow
          .replace(
            '{{firstDecisiveMomentNumber}}',
            numerologyResponse.decisiveMoments.first.number
          )
          .replace(
            '{{secondDecisiveMomentNumber}}',
            numerologyResponse.decisiveMoments.second.number
          )
          .replace(
            '{{thirdDecisiveMomentNumber}}',
            numerologyResponse.decisiveMoments.third.number
          )
          .replace(
            '{{fourthDecisiveMomentNumber}}',
            numerologyResponse.decisiveMoments.fourth.number
          ),
        numerologyResponse.personalYears[0].number,
      ],
    ],
    startY: START_HEIGHT + 90,
    ...tableStyle,
  });

  pdf.setFont('CenturyGothic', 'normal');

  pdf.setTextColor(PALETTE.green);
  pdf.setFontSize(14);
  pdf.text(reportExtraContent.ascensionDegree, START_WIDTH, START_HEIGHT + 150);

  const ascensionDegreeBase = (
    await import(`src/assets/documents/pt-br/19-ascensionDegree.json`)
  ).default;
  const ascensionDegree =
    ((await import(`src/assets/documents/${locale}/19-ascensionDegree.json`))
      .default as typeof ascensionDegreeBase) ?? ascensionDegreeBase;

  pdf.setTextColor(PALETTE.black);
  pdf.setFontSize(12);
  pdf.text(
    ascensionDegree.items[numerologyResponse.ascensionDegree].data,
    START_WIDTH,
    START_HEIGHT + 157,
    {
      maxWidth: 180,
    }
  );

  pdf.setTextColor(PALETTE.green);
  pdf.setFontSize(14);
  pdf.text(reportExtraContent.favorableColors, START_WIDTH, START_HEIGHT + 172);

  const favorableColorsBase = (
    await import(`src/assets/documents/pt-br/20-favorableColors.json`)
  ).default;
  const favorableColors =
    ((await import(`src/assets/documents/${locale}/20-favorableColors.json`))
      .default as typeof favorableColorsBase) ?? favorableColorsBase;

  pdf.setTextColor(PALETTE.black);
  pdf.setFontSize(12);
  pdf.text(
    reportExtraContent.favorableColorsDescription.replace(
      '{{favorableColors}}',
      favorableColors.items[numerologyResponse.favorableColors].data
    ),
    START_WIDTH,
    START_HEIGHT + 179,
    {
      maxWidth: 180,
    }
  );

  pdf.setTextColor(PALETTE.green);
  pdf.setFontSize(14);
  pdf.text(reportExtraContent.favorableDays, START_WIDTH, START_HEIGHT + 194);

  pdf.setTextColor(PALETTE.black);
  pdf.setFontSize(12);
  pdf.text(
    numerologyResponse.favorableDays.join(' - '),
    START_WIDTH,
    START_HEIGHT + 201,
    {
      maxWidth: 180,
    }
  );

  pdf.setTextColor(PALETTE.green);
  pdf.setFontSize(14);
  pdf.text(reportExtraContent.more, START_WIDTH, START_HEIGHT + 211);

  pdf.setTextColor(PALETTE.black);
  pdf.setFontSize(12);
  pdf.text(
    reportExtraContent.moreDescription,
    START_WIDTH,
    START_HEIGHT + 218,
    {
      maxWidth: 180,
    }
  );
  return pdf;
}
