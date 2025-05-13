import { LocalesType } from '@/i18n/routing';

import { getCalendlySingleUseSchedulingLink } from '@/actions/calendly/getScheduleLink';

type BusinessNumerologyEmailReactProps = {
  fullName: string;
  locale: LocalesType;
};

export async function getBusinessNumerologyEmailReact({
  fullName,
  locale,
}: BusinessNumerologyEmailReactProps) {
  const calendlyScheduleLink =
    await getCalendlySingleUseSchedulingLink('personal-reading');

  const textCopy: Record<LocalesType, string> = {
    'pt-br': `Segue em anexo o seu Mapa de Negócios, ${fullName}. Obrigado pela compra! O link de marcação da consulta a seguir só poderá ser utilizado uma única vez, não compartilhe-o com terceiros: ${calendlyScheduleLink}.`,
    pt: `Segue em anexo o seu Mapa de Negócios, ${fullName}. Obrigado pela compra! O link de marcação da consulta a seguir só poderá ser utilizado uma única vez, não compartilhe-o com terceiros: ${calendlyScheduleLink}.`,
    it: `Segue in allegato la tua Mappa Numerologica Aziendale, ${fullName}. Grazie per l'acquisto! Il seguente link per la prenotazione può essere utilizzato solo una volta, non condividerlo con terzi: ${calendlyScheduleLink}.`,
    en: `Attached is your Business Numerology Map, ${fullName}. Thank you for your purchase! The following scheduling link can only be used once, do not share it with third parties: ${calendlyScheduleLink}.`,
  };

  return textCopy[locale];
}
