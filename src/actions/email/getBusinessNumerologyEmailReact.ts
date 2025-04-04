import { getCalendlySingleUseSchedulingLink } from '@/actions/calendly/getScheduleLink';

export async function getBusinessNumerologyEmailReact(to: string) {
  const calendlyScheduleLink =
    await getCalendlySingleUseSchedulingLink('personal-reading');

  return `Segue em anexo o seu Mapa de Negócios, ${to}. Obrigado pela compra! O link de marcação da consulta a seguir só poderá ser utilizado uma única vez, não compartilhe-o com terceiros: ${calendlyScheduleLink}.`;
}
