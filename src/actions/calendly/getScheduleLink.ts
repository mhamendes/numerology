'use server';
'server-only';

import { LocalesType } from '@/i18n/routing';

import { ProductId } from '@/actions/stripe/getProductPrice';

const BASE_URL = 'https://api.calendly.com';

type CalendlyResponse = {
  resource: {
    booking_url: string;
    owner: string;
    owner_type: string;
  };
};

const eventTypes: Record<ProductId, string | null> = {
  'life-map': null,
  'personal-reading': '28bb79d2-7e09-486a-ac84-f6fba80d07e7',
  'relationship-compatibility': null,
  'business-numerology': null,
};

type GetCalendlySingleUseSchedulingLinkProps = {
  type: ProductId;
  locale: LocalesType;
};

export async function getCalendlySingleUseSchedulingLink({
  type,
  locale,
}: GetCalendlySingleUseSchedulingLinkProps) {
  const calendlyToken = process.env.CALENDLY_TOKEN;
  if (!calendlyToken) throw new Error('No Calendly Token Provided');

  const fallbackLink = {
    'pt-br':
      'Link não disponível, entre em contato conosco no email contact@drcosmicnumber.com',
    pt: 'Link não disponível, entre em contato conosco no email contact@drcosmicnumber.com',
    it: "Link non disponibile, contattaci all'email contact@drcosmicnumber.com",
    en: 'Link not available, contact us at contact@drcosmicnumber.com',
  };

  const eventType = eventTypes[type];
  if (!eventType) return fallbackLink[locale];

  const response = await fetch(`${BASE_URL}/scheduling_links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${calendlyToken}`,
    },
    body: `{"max_event_count":1,"owner":"https://api.calendly.com/event_types/${eventType}","owner_type":"EventType"}`,
  });

  const responseJson = (await response.json()) as CalendlyResponse;

  return responseJson.resource.booking_url;
}
