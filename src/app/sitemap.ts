import type { MetadataRoute } from 'next';

const baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/pt-br`,
          pt: `${baseUrl}/pt`,
          it: `${baseUrl}/it`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/pt-br/about`,
          pt: `${baseUrl}/pt/about`,
          it: `${baseUrl}/it/about`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/pt-br/booking`,
          pt: `${baseUrl}/pt/booking`,
          it: `${baseUrl}/it/booking`,
          en: `${baseUrl}/en/booking`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/pt-br/contact`,
          pt: `${baseUrl}/pt/contact`,
          it: `${baseUrl}/it/contact`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/life-map`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/pt-br/life-map`,
          pt: `${baseUrl}/pt/life-map`,
          it: `${baseUrl}/it/life-map`,
          en: `${baseUrl}/en/life-map`,
        },
      },
    },
    {
      url: `${baseUrl}/qa`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/pt-br/qa`,
          pt: `${baseUrl}/pt/qa`,
          it: `${baseUrl}/it/qa`,
          en: `${baseUrl}/en/qa`,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'pt-br': `${baseUrl}/pt-br/services`,
          pt: `${baseUrl}/pt/services`,
          it: `${baseUrl}/it/services`,
          en: `${baseUrl}/en/services`,
        },
      },
    },
  ];
}
