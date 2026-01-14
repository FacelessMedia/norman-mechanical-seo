import type { Business, GBP } from '../loaders';

export function generateLocalBusinessSchema(business: Business, gbp: GBP, pageUrl: string) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': business.type,
    '@id': `${business.url}#organization`,
    name: business.name,
    description: business.description,
    url: business.url,
    logo: {
      '@type': 'ImageObject',
      url: `${business.url.replace(/\/$/, '')}${business.logo}`
    },
    image: {
      '@type': 'ImageObject',
      url: `${business.url.replace(/\/$/, '')}${business.image}`
    },
    telephone: business.telephone,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry
    },
    areaServed: gbp.service_areas.map(area => {
      const parts = area.split(', ');
      return {
        '@type': 'City',
        name: parts[0],
        addressRegion: parts[1] || undefined
      };
    }),
    openingHoursSpecification: gbp.hours
      .filter(h => !h.closed)
      .map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes
      }))
  };

  if (business.social?.facebook) {
    schema.sameAs = [business.social.facebook];
  }

  if (gbp.services_list && gbp.services_list.length > 0) {
    schema.makesOffer = gbp.services_list.slice(0, 10).map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        url: service.slug ? `${business.url}services/${service.slug}` : undefined
      }
    }));
  }

  if (business.emergency_service) {
    schema.description = `${schema.description} Emergency service available 24/7.`;
  }

  return schema;
}
