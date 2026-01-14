import type { City, Business } from '../loaders';

export function generateCitySchema(
  city: City,
  business: Business,
  pageUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${pageUrl}#place`,
    name: city.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.stateAbbr,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressLocality: city.name,
      addressRegion: city.stateAbbr
    }
  };
}

export function generateAreaServedSchema(city: City, business: Business) {
  return {
    '@context': 'https://schema.org',
    '@type': business.type,
    '@id': `${business.url}#organization`,
    name: business.name,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: city.state
      }
    }
  };
}
