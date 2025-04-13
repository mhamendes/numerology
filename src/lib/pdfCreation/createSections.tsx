import { getDate } from 'date-fns';
import { jsPDF } from 'jspdf';

import { AllPossibleNumbers, DefaultNumbers } from '@/lib/numerology/types';

import {
  createTitle,
  NEW_PAGE_START_HEIGHT,
  PALETTE,
  START_HEIGHT,
  START_WIDTH,
  TOP_MARGIN,
} from './base';
import { createChallengesSection } from './createChallengesSection';
import { createDecisiveMomentsSection } from './createDecisiveMomentsSection';
import { createInvertedTriangleSection } from './createInvertedTriangleSection';
import { createLifeCycleSection } from './createLifeCycleSection';
import { createPersonalDaysSection } from './createPersonalDaysSection';
import { createPersonalMonthSection } from './createPersonalMonthSection';
import { createPersonalYearSection } from './createPersonalYearSection';
import { createSectionWithListOfNumbers } from './createSectionWithListOfNumbers';

import { getNumerologyResponse } from '@/actions/getNumerologyResponse';

type CreateSectionsArgs = {
  pdf: jsPDF;
  fullName: string;
  birthday: Date;
  numerologyResponse: Awaited<ReturnType<typeof getNumerologyResponse>>;
  locale: string;
};

export async function createSections({
  pdf,
  birthday,
  numerologyResponse,
  locale,
}: CreateSectionsArgs) {
  const baseSectionTitles = (
    await import(`src/assets/documents/pt-br/sectionTitles.json`)
  ).default;
  const sectionTitles =
    ((await import(`src/assets/documents/${locale}/sectionTitles.json`))
      .default as typeof baseSectionTitles) ?? baseSectionTitles;

  const motivationNumberTextBase = (
    await import(`src/assets/documents/pt-br/01-motivation.json`)
  ).default;
  const motivationNumberText =
    ((await import(`src/assets/documents/${locale}/01-motivation.json`))
      .default as typeof motivationNumberTextBase) ?? motivationNumberTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.motivationNumber,
    result: numerologyResponse.motivationNumber,
    text: motivationNumberText,
  });

  const impressionNumberTextBase = (
    await import(`src/assets/documents/pt-br/02-impression.json`)
  ).default;
  const impressionNumberText =
    ((await import(`src/assets/documents/${locale}/02-impression.json`))
      .default as typeof impressionNumberTextBase) ?? impressionNumberTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.impressionNumber,
    result: numerologyResponse.impressionNumber,
    text: impressionNumberText,
  });

  const expressionNumberTextBase = (
    await import(`src/assets/documents/pt-br/03-expression.json`)
  ).default;
  const expressionNumberText =
    ((await import(`src/assets/documents/${locale}/03-expression.json`))
      .default as typeof expressionNumberTextBase) ?? expressionNumberTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.expressionNumber,
    result: numerologyResponse.expressionNumber,
    text: expressionNumberText,
  });

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
  });

  const psychicNumberTextBase = (
    await import(`src/assets/documents/pt-br/05-psychicNumbers.json`)
  ).default;
  const psychicNumberText =
    ((await import(`src/assets/documents/${locale}/05-psychicNumbers.json`))
      .default as typeof psychicNumberTextBase) ?? psychicNumberTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.psychicNumber,
    result: numerologyResponse.psychicNumber,
    text: psychicNumberText,
  });

  const destinyNumberTextBase = (
    await import(`src/assets/documents/pt-br/06-destiny.json`)
  ).default;
  const destinyNumberText =
    ((await import(`src/assets/documents/${locale}/06-destiny.json`))
      .default as typeof destinyNumberTextBase) ?? destinyNumberTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.destinyNumber,
    result: numerologyResponse.destinyNumber,
    text: destinyNumberText,
  });

  const missionNumberTextBase = (
    await import(`src/assets/documents/pt-br/07-mission.json`)
  ).default;
  const missionNumberText =
    ((await import(`src/assets/documents/${locale}/07-mission.json`))
      .default as typeof missionNumberTextBase) ?? missionNumberTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.missionNumber,
    result: numerologyResponse.missionNumber,
    text: missionNumberText,
  });

  const hiddenTalentNumberTextBase = (
    await import(`src/assets/documents/pt-br/08-hiddenTalent.json`)
  ).default;
  const hiddenTalentNumberText =
    ((await import(`src/assets/documents/${locale}/08-hiddenTalent.json`))
      .default as typeof hiddenTalentNumberTextBase) ??
    hiddenTalentNumberTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.hiddenTalentNumber,
    result: numerologyResponse.hiddenTalentNumber,
    text: hiddenTalentNumberText,
  });

  const karmicLessonsTextBase = (
    await import(`src/assets/documents/pt-br/09-karmicLessons.json`)
  ).default;
  const karmicLessonsText =
    ((await import(`src/assets/documents/${locale}/09-karmicLessons.json`))
      .default as typeof karmicLessonsTextBase) ?? karmicLessonsTextBase;

  pdf = await createSectionWithMultipleResults({
    pdf,
    title: sectionTitles.karmicLessons,
    results: numerologyResponse.karmicLessons,
    text: karmicLessonsText,
  });

  const karmicDebtsTextBase = (
    await import(`src/assets/documents/pt-br/10-karmicDebts.json`)
  ).default;
  const karmicDebtsText =
    ((await import(`src/assets/documents/${locale}/10-karmicDebts.json`))
      .default as typeof karmicDebtsTextBase) ?? karmicDebtsTextBase;

  pdf = await createSectionWithMultipleResults({
    pdf,
    title: sectionTitles.karmicDebts,
    results: numerologyResponse.karmicDebts,
    text: karmicDebtsText,
  });

  const hiddenTendenciesTextBase = (
    await import(`src/assets/documents/pt-br/11-hiddenTrends.json`)
  ).default;
  const hiddenTendenciesText =
    ((await import(`src/assets/documents/${locale}/11-hiddenTrends.json`))
      .default as typeof hiddenTendenciesTextBase) ?? hiddenTendenciesTextBase;

  pdf = await createSectionWithMultipleResults({
    pdf,
    title: sectionTitles.hiddenTendencies,
    results: numerologyResponse.hiddenTendencies,
    text: hiddenTendenciesText,
  });

  const subconsciousResponseTextBase = (
    await import(`src/assets/documents/pt-br/12-subconsciousResponse.json`)
  ).default;
  const subconsciousResponseText =
    ((
      await import(
        `src/assets/documents/${locale}/12-subconsciousResponse.json`
      )
    ).default as typeof subconsciousResponseTextBase) ??
    subconsciousResponseTextBase;

  pdf = await createSection({
    pdf,
    title: sectionTitles.subconsciousResponse,
    result: numerologyResponse.subconsciousResponse,
    text: subconsciousResponseText,
  });

  const lifeCyclesTextBase = (
    await import(`src/assets/documents/pt-br/13-lifeCycles.json`)
  ).default;
  const lifeCyclesText =
    ((await import(`src/assets/documents/${locale}/13-lifeCycles.json`))
      .default as typeof lifeCyclesTextBase) ?? lifeCyclesTextBase;

  pdf = await createLifeCycleSection({
    pdf,
    title: sectionTitles.lifeCycles,
    result: numerologyResponse.lifeCycles,
    text: lifeCyclesText,
    locale,
  });

  const challengesTextBase = (
    await import(`src/assets/documents/pt-br/14-challenge.json`)
  ).default;
  const challengesText =
    ((await import(`src/assets/documents/${locale}/14-challenge.json`))
      .default as typeof challengesTextBase) ?? challengesTextBase;

  pdf = await createChallengesSection({
    pdf,
    title: sectionTitles.challenges,
    result: numerologyResponse.challenges,
    text: challengesText,
    locale,
  });

  const decisiveMomentsTextBase = (
    await import(`src/assets/documents/pt-br/15-decisiveMoments.json`)
  ).default;
  const decisiveMomentsText =
    ((await import(`src/assets/documents/${locale}/15-decisiveMoments.json`))
      .default as typeof decisiveMomentsTextBase) ?? decisiveMomentsTextBase;

  pdf = await createDecisiveMomentsSection({
    pdf,
    title: sectionTitles.decisiveMoments,
    result: numerologyResponse.decisiveMoments,
    text: decisiveMomentsText,
    locale,
  });

  const personalYearTextBase = (
    await import(`src/assets/documents/pt-br/16-personalYear.json`)
  ).default;
  const personalYearText =
    ((await import(`src/assets/documents/${locale}/16-personalYear.json`))
      .default as typeof personalYearTextBase) ?? personalYearTextBase;

  pdf = await createPersonalYearSection({
    pdf,
    title: sectionTitles.personalYears,
    birthday,
    results: numerologyResponse.personalYears,
    text: personalYearText,
    locale,
  });

  const personalMonthTextBase = (
    await import(`src/assets/documents/pt-br/17-personalMonth.json`)
  ).default;
  const personalMonthText =
    ((await import(`src/assets/documents/${locale}/17-personalMonth.json`))
      .default as typeof personalMonthTextBase) ?? personalMonthTextBase;

  pdf = await createPersonalMonthSection({
    pdf,
    title: sectionTitles.personalMonths,
    results: numerologyResponse.personalMonths,
    text: personalMonthText,
    locale,
  });

  const personalDayTextBase = (
    await import(`src/assets/documents/pt-br/18-personalDay.json`)
  ).default;
  const personalDayText =
    ((await import(`src/assets/documents/${locale}/18-personalDay.json`))
      .default as typeof personalDayTextBase) ?? personalDayTextBase;

  pdf = await createPersonalDaysSection({
    pdf,
    title: sectionTitles.personalDays,
    results: numerologyResponse.personalDays,
    text: personalDayText,
    locale,
  });

  const compatibleNumbersTextBase = (
    await import(`src/assets/documents/pt-br/22-compatibleNumbers.json`)
  ).default;
  const compatibleNumbersText =
    ((await import(`src/assets/documents/${locale}/22-compatibleNumbers.json`))
      .default as typeof compatibleNumbersTextBase) ??
    compatibleNumbersTextBase;

  pdf = await createSectionWithListOfNumbers({
    pdf,
    title: sectionTitles.compatibleNumbers,
    result: {
      value: numerologyResponse.compatibleNumbers.value,
      info: [
        {
          title: sectionTitles.compatibleNumbers,
          data: numerologyResponse.compatibleNumbers.info.compatible,
        },
        {
          title: sectionTitles.neutralNumbers,
          data: numerologyResponse.compatibleNumbers.info.neutral,
        },
        {
          title: sectionTitles.incompatibleNumbers,
          data: numerologyResponse.compatibleNumbers.info.incompatible,
        },
      ],
    },
    text: compatibleNumbersText,
  });

  const conjugalVibrationTextBase = (
    await import(`src/assets/documents/pt-br/23-conjugalVibration.json`)
  ).default;
  const conjugalVibrationText =
    ((await import(`src/assets/documents/${locale}/23-conjugalVibration.json`))
      .default as typeof conjugalVibrationTextBase) ??
    conjugalVibrationTextBase;

  pdf = await createSectionWithListOfNumbers({
    pdf,
    title: sectionTitles.conjugalVibration,
    result: {
      value: numerologyResponse.conjugalVibration.value,
      info: [
        {
          title: sectionTitles.vibrateWith,
          data: numerologyResponse.conjugalVibration.info.vibrate,
        },
        {
          title: sectionTitles.attracts,
          data: numerologyResponse.conjugalVibration.info.attracts,
        },
        {
          title: sectionTitles.oposes,
          data: numerologyResponse.conjugalVibration.info.oposes,
        },
        {
          title: sectionTitles.oposesProfoundly,
          data: numerologyResponse.conjugalVibration.info.oposesProfoundly,
        },
        {
          title: sectionTitles.passive,
          data: numerologyResponse.conjugalVibration.info.passive,
        },
      ],
    },
    text: conjugalVibrationText,
  });

  const invertedTriangleTextBase = (
    await import(`src/assets/documents/pt-br/24-invertedTriangle.json`)
  ).default;
  const invertedTriangleText =
    ((await import(`src/assets/documents/${locale}/24-invertedTriangle.json`))
      .default as typeof invertedTriangleTextBase) ?? invertedTriangleTextBase;

  const arcanesTextBase = (
    await import(`src/assets/documents/pt-br/25-arcanes.json`)
  ).default;
  const arcanesText =
    ((await import(`src/assets/documents/${locale}/25-arcanes.json`))
      .default as typeof arcanesTextBase) ?? arcanesTextBase;

  pdf = await createInvertedTriangleSection({
    pdf,
    locale,
    title: sectionTitles.invertedTriangle,
    result: numerologyResponse.invertedTrianglesData,
    text: invertedTriangleText,
    arcanesTitle: sectionTitles.yourArcanes,
    arcanesText: arcanesText,
  });

  return pdf;
}

type TextItem = {
  title: string;
  data?: string;
  positive?: string;
  negative?: string;
  orientation?: string;
  duplicate?: {
    title: string;
    data: string;
  };
  triplicate?: {
    title: string;
    data: string;
  };
};

type Text<T extends AllPossibleNumbers> = {
  title: string;
  description: string;
  items: Record<T, TextItem>;
};

type CreateSectionArgs<T extends AllPossibleNumbers> = {
  pdf: jsPDF;
  skipTitle?: boolean;
  skipEndLine?: boolean;
  title: string;
  result: T;
  ocurrences?: number;
  text: Text<T>;
};

async function createSection<T extends AllPossibleNumbers>({
  pdf,
  skipTitle,
  skipEndLine,
  title,
  result,
  ocurrences,
  text,
}: CreateSectionArgs<T>) {
  if (!skipTitle) {
    pdf = await createTitle({
      pdf,
      title: title,
      startHeight: NEW_PAGE_START_HEIGHT,
    });
  }

  const resultText = text.items[result];

  if (!skipTitle) {
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
  }

  pdf.autoTable({
    head: [[resultText.title]],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
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

  if (resultText.positive) {
    pdf.autoTable({
      head: [['Pontos positivos:']],
      body: [[resultText.positive]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontSize: 10,
      },
      theme: 'plain',
      tableWidth: 180,
      margin: { top: TOP_MARGIN },
    });
  }

  if (resultText.negative) {
    pdf.autoTable({
      head: [['Pontos negativos:']],
      body: [[resultText.negative]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontSize: 10,
      },
      theme: 'plain',
      tableWidth: 180,
      margin: { top: TOP_MARGIN },
    });
  }

  if (resultText.data) {
    pdf.autoTable({
      tableId: `${title} - description`,
      head: [[resultText.data]],
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

  if (resultText.orientation) {
    pdf.autoTable({
      head: [['Orientação:']],
      body: [[resultText.orientation]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontSize: 10,
      },
      theme: 'plain',
      tableWidth: 180,
      margin: { top: TOP_MARGIN },
    });
  }

  const ocurrencesText = getOcurrencesText({
    ocurrences,
    text: resultText,
  });
  if (ocurrencesText) {
    pdf.autoTable({
      head: [['ATENÇÃO']],
      body: [[ocurrencesText.title], [ocurrencesText.data]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontStyle: 'bold',
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
  }

  if (!skipEndLine) {
    pdf.setDrawColor(PALETTE.green);
    pdf.setLineWidth(0.7);
    pdf.line(
      START_WIDTH,
      (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5,
      190,
      (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5
    );
  }

  return pdf;
}

function getOcurrencesText({
  ocurrences,
  text,
}: {
  ocurrences?: number;
  text: TextItem;
}) {
  if (ocurrences === 2) {
    return text.duplicate;
  }
  if (ocurrences === 3) {
    return text.triplicate;
  }

  return;
}

type CreateSectionWithMultipleResultsArgs<T extends AllPossibleNumbers> = Omit<
  CreateSectionArgs<T>,
  'result'
> & {
  results: T[];
};

async function createSectionWithMultipleResults<T extends AllPossibleNumbers>({
  pdf,
  results,
  title,
  text,
}: CreateSectionWithMultipleResultsArgs<T>) {
  const resultsSetArray = Array.from(new Set(results));

  const ocurrencesMap = results.reduce((acc, result) => {
    acc.set(result, (acc.get(result) ?? 0) + 1);
    return acc;
  }, new Map<T, number>());

  for (let i = 0; i < resultsSetArray.length; i++) {
    pdf = await createSection({
      pdf,
      skipTitle: i !== 0,
      skipEndLine: i < resultsSetArray.length - 1,
      title: title,
      ocurrences: ocurrencesMap.get(resultsSetArray[i]),
      result: resultsSetArray[i],
      text,
    });
  }

  return pdf;
}
