import type { Service, City } from './loaders';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface InternalLink {
  href: string;
  text: string;
}

interface ServiceCategory {
  name: string;
  slug: string;
  description: string;
  revenue_priority: boolean;
  services: string[];
}

interface ServiceCategories {
  categories: ServiceCategory[];
}

function loadServiceCategories(): ServiceCategories {
  const filePath = join(process.cwd(), 'content', 'taxonomy', 'service-categories.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export function getServiceLinks(allServices: Service[]): InternalLink[] {
  return allServices.map(service => ({
    href: `/services/${service.slug}`,
    text: service.name
  }));
}

export function getCityLinks(allCities: City[]): InternalLink[] {
  return allCities.map(city => ({
    href: `/locations/${city.slug}`,
    text: city.name
  }));
}

export function getRelatedServiceLinks(
  relatedServiceSlugs: string[],
  allServices: Service[],
  limit: number = 5
): InternalLink[] {
  const links: InternalLink[] = [];
  
  for (const slug of relatedServiceSlugs.slice(0, limit)) {
    const service = allServices.find(s => s.slug === slug);
    if (service) {
      links.push({
        href: `/services/${service.slug}`,
        text: service.name
      });
    }
  }
  
  return links;
}

export function getTopServiceLinks(
  allServices: Service[],
  limit: number = 10
): InternalLink[] {
  const categories = loadServiceCategories();
  const revenuePrioritySlugs: string[] = [];
  
  for (const category of categories.categories) {
    if (category.revenue_priority) {
      revenuePrioritySlugs.push(...category.services);
    }
  }
  
  const priorityServices = allServices.filter(s => revenuePrioritySlugs.includes(s.slug));
  const otherServices = allServices.filter(s => !revenuePrioritySlugs.includes(s.slug));
  
  const orderedServices = [...priorityServices, ...otherServices];
  
  return orderedServices.slice(0, limit).map(service => ({
    href: `/services/${service.slug}`,
    text: service.name
  }));
}

export function getTopCityLinks(
  allCities: City[],
  limit: number = 8
): InternalLink[] {
  const sortedCities = [...allCities].sort((a, b) => {
    const aNeighborhoods = a.neighborhoods?.length || 0;
    const bNeighborhoods = b.neighborhoods?.length || 0;
    return bNeighborhoods - aNeighborhoods;
  });
  
  return sortedCities.slice(0, limit).map(city => ({
    href: `/locations/${city.slug}`,
    text: city.name
  }));
}

export function getCityServiceLink(citySlug: string, serviceSlug: string, serviceName: string): InternalLink {
  return {
    href: `/locations/${citySlug}/${serviceSlug}`,
    text: serviceName
  };
}

export function buildContextualIntro(
  cityName: string,
  serviceName: string,
  localFactors: string[],
  problems: string[]
): string {
  const factor = localFactors[0] || `${cityName} has unique plumbing needs`;
  const problem = problems[0] || 'common plumbing issues';
  
  return `${serviceName} in ${cityName} requires specialized expertise. ${factor}. Our team addresses ${problem.toLowerCase()} with proven solutions tailored to local conditions.`;
}
