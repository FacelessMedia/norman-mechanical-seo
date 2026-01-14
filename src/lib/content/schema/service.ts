import type { Service, Business, GBP } from '../loaders';

export function generateServiceSchema(
  service: Service,
  business: Business,
  gbp: GBP,
  pageUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.name,
    description: service.description,
    provider: {
      '@type': business.type,
      '@id': `${business.url}#organization`,
      name: business.name
    },
    areaServed: gbp.service_areas.map(area => {
      const parts = area.split(', ');
      return {
        '@type': 'City',
        name: parts[0],
        addressRegion: parts[1] || undefined
      };
    }),
    serviceType: service.name,
    url: pageUrl
  };
}
