'use server';
'server-only';

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

export async function getCalendlySingleUseSchedulingLink(type: ProductId) {
  const calendlyToken = process.env.CALENDLY_TOKEN;
  if (!calendlyToken) throw new Error('No Calendly Token Provided');

  const eventType = eventTypes[type];
  if (!eventType) throw new Error('No Event Type Provided');

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
