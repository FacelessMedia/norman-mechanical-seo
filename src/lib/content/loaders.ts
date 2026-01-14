import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export interface FAQ {
  question: string;
  answer: string;
}

export interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface Business {
  name: string;
  legalName: string;
  type: string;
  tagline: string;
  description: string;
  telephone: string;
  phone_display: string;
  phone_e164: string;
  address: Address;
  primary_category: string;
  url: string;
  logo: string;
  image: string;
  priceRange: string;
  openingHours: string;
  emergency_service: boolean;
  social?: {
    facebook?: string;
  };
}

export interface Service {
  name: string;
  slug: string;
  description: string;
  problems: string[];
  solutions: string[];
  faqs: FAQ[];
  relatedServices: string[];
}

export interface City {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  description: string;
  neighborhoods: string[];
  landmarks: string[];
  localFactors: string[];
  faqs: FAQ[];
}

export interface GBPService {
  name: string;
  slug: string;
}

export interface GBP {
  primary_category: string;
  additional_categories: string[];
  hours: Array<{
    day: string;
    opens: string | null;
    closes: string | null;
    closed: boolean;
  }>;
  service_areas: string[];
  markets_mentioned: string[];
  attributes: any;
  regular_hours_note: string;
  services_list: GBPService[];
  aggregate_rating: number | null;
  review_count: number | null;
  featured_review_excerpts: Array<{
    text: string;
    author: string;
  }>;
}

const contentDir = join(process.cwd(), 'content');

export function loadBusiness(): Business {
  const filePath = join(contentDir, 'globals', 'business.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export function loadGBP(): GBP {
  const filePath = join(contentDir, 'globals', 'gbp.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export function loadService(slug: string): Service | null {
  try {
    const filePath = join(contentDir, 'services', `${slug}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function loadAllServices(): Service[] {
  const servicesDir = join(contentDir, 'services');
  const files = readdirSync(servicesDir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = readFileSync(join(servicesDir, file), 'utf-8');
    return JSON.parse(content);
  });
}

export function loadCity(slug: string): City | null {
  try {
    const filePath = join(contentDir, 'locations', `${slug}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function loadAllCities(): City[] {
  const locationsDir = join(contentDir, 'locations');
  const files = readdirSync(locationsDir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = readFileSync(join(locationsDir, file), 'utf-8');
    return JSON.parse(content);
  });
}
