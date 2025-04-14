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
export const BRAND_FACEBOOK_PAGE = 'https://www.facebook.com/drcosmicnumbers';
export const BRAND_INSTAGRAM_PAGE = 'https://www.instagram.com/drcosmicnumbers';
export const BRAND_INSTAGRAM_USERNAME = '@drcosmicnumbers';
export const BRAND_TWITTER_PAGE = 'https://www.twitter.com/drcosmicnumbers';
export const BRAND_YOUTUBE_PAGE = 'https://www.youtube.com/drcosmicnumbers';

export function getWhatsAppLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`;
}
