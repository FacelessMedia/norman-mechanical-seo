import { readFileSync } from 'fs';
import { join } from 'path';

interface MediaImage {
  id: string;
  filename: string;
  category: string;
  description: string;
}

interface CityImagesData {
  images: MediaImage[];
  assignment_rules: {
    description: string;
    method: string;
    reuse: string;
  };
}

interface ServiceImagesData {
  images: MediaImage[];
  assignment_rules: {
    description: string;
    method: string;
    reuse: string;
  };
}

let cityImagesCache: CityImagesData | null = null;
let serviceImagesCache: ServiceImagesData | null = null;

function loadCityImages(): CityImagesData {
  if (cityImagesCache) return cityImagesCache;
  const filePath = join(process.cwd(), 'content', 'media', 'city-images.json');
  const content = readFileSync(filePath, 'utf-8');
  cityImagesCache = JSON.parse(content);
  return cityImagesCache!;
}

function loadServiceImages(): ServiceImagesData {
  if (serviceImagesCache) return serviceImagesCache;
  const filePath = join(process.cwd(), 'content', 'media', 'service-images.json');
  const content = readFileSync(filePath, 'utf-8');
  serviceImagesCache = JSON.parse(content);
  return serviceImagesCache!;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getCityImages(citySlug: string, limit: number = 3): MediaImage[] {
  const data = loadCityImages();
  const hash = simpleHash(citySlug);
  const startIndex = hash % data.images.length;
  
  const selectedImages: MediaImage[] = [];
  for (let i = 0; i < limit; i++) {
    const index = (startIndex + i) % data.images.length;
    selectedImages.push(data.images[index]);
  }
  
  return selectedImages;
}

export function getServiceImages(serviceSlug: string, serviceCategorySlug: string | null, limit: number = 2): MediaImage[] {
  const data = loadServiceImages();
  
  if (!serviceCategorySlug) {
    const hash = simpleHash(serviceSlug);
    const startIndex = hash % data.images.length;
    const selectedImages: MediaImage[] = [];
    for (let i = 0; i < limit; i++) {
      const index = (startIndex + i) % data.images.length;
      selectedImages.push(data.images[index]);
    }
    return selectedImages;
  }
  
  const categoryImages = data.images.filter(img => img.category === serviceCategorySlug);
  
  if (categoryImages.length === 0) {
    const hash = simpleHash(serviceSlug);
    const startIndex = hash % data.images.length;
    const selectedImages: MediaImage[] = [];
    for (let i = 0; i < limit; i++) {
      const index = (startIndex + i) % data.images.length;
      selectedImages.push(data.images[index]);
    }
    return selectedImages;
  }
  
  return categoryImages.slice(0, limit);
}

export function generateCityImageAlt(cityName: string, imageDescription: string): string {
  return `${imageDescription} in ${cityName}`;
}

export function generateServiceImageAlt(serviceName: string, imageDescription: string, cityName?: string): string {
  if (cityName) {
    return `${serviceName} in ${cityName} - ${imageDescription}`;
  }
  return `${serviceName} plumbing work - ${imageDescription}`;
}

export function generateCityServiceImageAlt(serviceName: string, cityName: string, imageDescription: string): string {
  return `${serviceName} service in ${cityName} - ${imageDescription}`;
}
