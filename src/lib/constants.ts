export const PHONE_NUMBER = '+351935625353';
export const CONTACT_EMAIL = 'contact@drcosmicnumbers.com';
export const BRAND_NAME = 'Dr Cosmic° Numbēr °1';
export const [BRAND_FIRST_NAME, BRAND_LAST_NAME] = ['DrCosmic°', 'Numbēr°1'];
export const BRAND_ADDRESS = [
  'Praça Camilo Castelo Branco, 31 – Centro',
  'Comercial da Estação – Sala 36',
  'Braga – Portugal – CP: 4700-427',
];
export const JOINED_BRAND_ADDRESS = BRAND_ADDRESS.join(', ');
export const BRAND_WEBSITE = 'https://www.drcosmicnumbers.com';
export const BRAND_FACEBOOK_PAGE =
  'https://www.facebook.com/people/Dr-Cosmic-Number-1/61576339460848/';
export const BRAND_INSTAGRAM_PAGE =
  'https://www.instagram.com/drcosmicnumber1/';
export const BRAND_INSTAGRAM_USERNAME = '@drcosmicnumber1';

export function getWhatsAppLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`;
}
