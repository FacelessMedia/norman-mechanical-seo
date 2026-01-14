import { readFileSync } from 'fs';
import { join } from 'path';

const contentDir = join(process.cwd(), 'content');

function loadServiceBranches() {
  try {
    const filePath = join(contentDir, 'taxonomy', 'service-branches.json');
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return { services: {} };
  }
}

export function checkPageQuality(citySlug: string, serviceSlug: string, city: any, service: any) {
  const reasons: string[] = [];
  let passed = true;

  // Check if city is indexable
  if (city && city.indexable === false) {
    passed = false;
    reasons.push('City is marked as non-indexable');
  }

  // Count local factors
  const localFactorsCount = city?.localFactors?.length || 0;
  if (localFactorsCount < 3) {
    passed = false;
    reasons.push(`Only ${localFactorsCount} local factors (need >=3)`);
  }

  // Count service symptoms and causes from taxonomy
  const serviceBranches = loadServiceBranches();
  const serviceBranch = serviceBranches.services?.[serviceSlug];
  const symptomsCount = serviceBranch?.symptoms?.length || 0;
  const causesCount = serviceBranch?.causes?.length || 0;
  
  if (symptomsCount + causesCount < 3) {
    passed = false;
    reasons.push(`Only ${symptomsCount + causesCount} symptoms/causes (need >=3)`);
  }

  // Count total FAQs (service + city + page-specific)
  const serviceFaqsCount = service?.faqs?.length || 0;
  const cityFaqsCount = city?.city_faqs?.length || 0;
  const totalFaqsCount = serviceFaqsCount + cityFaqsCount;
  
  if (totalFaqsCount < 6) {
    passed = false;
    reasons.push(`Only ${totalFaqsCount} total FAQs (need >=6)`);
  }

  return {
    passed,
    reasons,
    localFactorsCount,
    serviceSymptomsCount: symptomsCount,
    serviceCausesCount: causesCount,
    totalFaqsCount
  };
}
