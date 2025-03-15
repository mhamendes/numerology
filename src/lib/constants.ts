export const PHONE_NUMBER = '+351935625353';
export const CONTACT_EMAIL = 'contact@cosmicnumbers.com';
export const BRAND_NAME = 'Cosmic Numbers';
export const [BRAND_FIRST_NAME, BRAND_LAST_NAME] = BRAND_NAME.split(' ');
export const BRAND_ADDRESS = '123 Cosmic Way, Universe City';
export const BRAND_FACEBOOK_PAGE = 'https://www.facebook.com/cosmicnumbers';
export const BRAND_INSTAGRAM_PAGE = 'https://www.instagram.com/cosmicnumbers';
export const BRAND_TWITTER_PAGE = 'https://www.twitter.com/cosmicnumbers';
export const BRAND_YOUTUBE_PAGE = 'https://www.youtube.com/cosmicnumbers';

export function getWhatsAppLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`;
}
