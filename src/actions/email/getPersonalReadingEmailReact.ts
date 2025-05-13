import { LocalesType } from '@/i18n/routing';

import { getCalendlySingleUseSchedulingLink } from '@/actions/calendly/getScheduleLink';

type PersonalReadingEmailReactProps = {
  fullName: string;
  locale: LocalesType;
};

export async function getPersonalReadingEmailReact({
  fullName,
  locale,
}: PersonalReadingEmailReactProps) {
  const calendlyScheduleLink = await getCalendlySingleUseSchedulingLink({
    type: 'personal-reading',
    locale,
  });

  const textCopy: Record<LocalesType, string> = {
    'pt-br': `Segue em anexo o seu Mapa da Vida, ${fullName}. Obrigado pela compra! O link de marcação da consulta a seguir só poderá ser utilizado uma única vez, não compartilhe-o com terceiros: ${calendlyScheduleLink}. Caso tenha algum problema, entre em contato conosco no email contact@drcosmicnumber.com.`,
    pt: `Segue em anexo o seu Mapa da Vida, ${fullName}. Obrigado pela compra! O link de marcação da consulta a seguir só poderá ser utilizado uma única vez, não compartilhe-o com terceiros: ${calendlyScheduleLink}. Caso tenha algum problema, entre em contato conosco no email contact@drcosmicnumber.com.`,
    it: `Segue in allegato il tuo Mappa della Vita, ${fullName}. Grazie per l'acquisto! Il seguente link per la prenotazione può essere utilizzato solo una volta, non condividerlo con terzi: ${calendlyScheduleLink}. Se hai problemi, contattaci all'email contact@drcosmicnumber.com.`,
    en: `Attached is your Life Map, ${fullName}. Thank you for your purchase! The following scheduling link can only be used once, do not share it with third parties: ${calendlyScheduleLink}. If you have any problems, contact us at contact@drcosmicnumber.com.`,
  };

  return textCopy[locale];
}
