import { LocalesType } from '@/i18n/routing';

type LifeMapEmailReactProps = {
  fullName: string;
  locale: LocalesType;
};

export function getLifeMapEmailReact({
  fullName,
  locale,
}: LifeMapEmailReactProps) {
  const textCopy: Record<LocalesType, string> = {
    'pt-br': `Segue em anexo o seu Mapa da Vida, ${fullName}. Obrigado pela compra!`,
    pt: `Segue em anexo o seu Mapa da Vida, ${fullName}. Obrigado pela compra!`,
    it: `Segue in allegato il tuo Mapa della Vita, ${fullName}. Grazie per l'acquisto!`,
    en: `Attached is your Life Map, ${fullName}. Thank you for your purchase!`,
  };

  return textCopy[locale];
}
