import { LocalesType } from '@/i18n/routing';

type LifeMapEmailReactProps = {
  fullName: string;
  locale: LocalesType;
};

export function getFreeEmailReact({
  fullName,
  locale,
}: LifeMapEmailReactProps) {
  const textCopy: Record<LocalesType, string> = {
    'pt-br': `Segue em anexo os seus dias Pessoais, ${fullName}! Caso deseje o Mapa da Vida completo faça a compra pelo site https://drcosmicnumber.com/booking.`,
    pt: `Segue em anexo os seus dias Pessoais, ${fullName}! Caso deseje o Mapa da Vida completo faça a compra pelo site https://drcosmicnumber.com/booking.`,
    it: `Segue in allegato i tuoi Giorni Personali, ${fullName}! Se desideri acquistare il Mappa della Vita completo, visita il sito https://drcosmicnumber.com/booking.`,
    en: `Attached are your Personal Days, ${fullName}! If you wish to purchase the complete Life Map, please visit https://drcosmicnumber.com/booking.`,
  };

  return textCopy[locale];
}
