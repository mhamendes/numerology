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
    'pt-br': `Segue anexo a vibração do Dia do Nascimento de ${fullName}! Caso queira conhecer seu Mapa da Vida completo, faça a compra pelo site https://drcosmicnumber.com/life-map.`,
    pt: `Segue anexo a vibração do Dia do Nascimento de ${fullName}! Caso queira conhecer seu Mapa da Vida completo, faça a compra pelo site https://drcosmicnumber.com/life-map.`,
    it: `Allegata è la vibrazione del Giorno di Nascita di ${fullName}! Se desideri conoscere la tua Mappa della Vita completa, effettua l'acquisto sul sito https://drcosmicnumber.com/life-map.`,
    en: `Attached is the vibration of ${fullName}'s Birth Day! If you want to know your complete Life Map, make the purchase on the website https://drcosmicnumber.com/life-map.`,
  };

  return textCopy[locale];
}
