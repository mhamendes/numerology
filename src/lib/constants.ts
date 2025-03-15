export const PHONE_NUMBER = '+351935625353';

export function getWhatsAppLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`;
}

export const LOCALES = ['pt-br', 'pt', 'it', 'en'];
export const DEFAULT_LOCALE = 'en';
