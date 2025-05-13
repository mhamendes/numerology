import { LocalesType } from '@/i18n/routing';

import { getCalendlySingleUseSchedulingLink } from '@/actions/calendly/getScheduleLink';

type RelationshipCompatibilityEmailReactProps = {
  fullName: string;
  locale: LocalesType;
};

export async function getRelationshipCompatibilityEmailReact({
  fullName,
  locale,
}: RelationshipCompatibilityEmailReactProps) {
  const calendlyScheduleLink = await getCalendlySingleUseSchedulingLink({
    type: 'relationship-compatibility',
    locale,
  });

  const textCopy: Record<LocalesType, string> = {
    'pt-br': `Segue em anexo o seu Mapa de Relacionamento, ${fullName}. O link de marcação da consulta a seguir só poderá ser utilizado uma única vez, não compartilhe-o com terceiros: ${calendlyScheduleLink}.`,
    pt: `Segue em anexo o seu Mapa de Relacionamento, ${fullName}. O link de marcação da consulta a seguir só poderá ser utilizado uma única vez, não compartilhe-o com terceiros: ${calendlyScheduleLink}.`,
    it: `Segue in allegato la tua Mappa di Compatibilità, ${fullName}. Grazie per l'acquisto! Il seguente link per la prenotazione può essere utilizzato solo una volta, non condividerlo con terzi: ${calendlyScheduleLink}.`,
    en: `Attached is your Relationship Compatibility Map, ${fullName}. Thank you for your purchase! The following scheduling link can only be used once, do not share it with third parties: ${calendlyScheduleLink}.`,
  };

  return textCopy[locale];
}
