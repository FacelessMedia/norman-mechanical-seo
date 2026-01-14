import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface QualityCheck {
  url: string;
  city: string;
  service: string;
  passed: boolean;
  reasons: string[];
  localFactorsCount: number;
  serviceSymptomsCount: number;
  serviceCausesCount: number;
  totalFaqsCount: number;
}

interface QualityReport {
  totalPages: number;
  indexablePages: number;
  noindexPages: number;
  checks: QualityCheck[];
}

const contentDir = join(process.cwd(), 'content');

function loadServiceBranches() {
  const filePath = join(contentDir, 'taxonomy', 'service-branches.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function loadCity(slug: string) {
  try {
    const filePath = join(contentDir, 'locations', `${slug}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function loadService(slug: string) {
  try {
    const filePath = join(contentDir, 'services', `${slug}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function getAllCities() {
  const locationsDir = join(contentDir, 'locations');
  const files = readdirSync(locationsDir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = readFileSync(join(locationsDir, file), 'utf-8');
    return JSON.parse(content);
  }).filter(city => city.type === 'city'); // Exclude regions
}

function getAllServices() {
  const servicesDir = join(contentDir, 'services');
  const files = readdirSync(servicesDir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = readFileSync(join(servicesDir, file), 'utf-8');
    return JSON.parse(content);
  });
}

export function checkPageQuality(citySlug: string, serviceSlug: string): QualityCheck {
  const city = loadCity(citySlug);
  const service = loadService(serviceSlug);
  const serviceBranches = loadServiceBranches();
  
  const url = `/locations/${citySlug}/${serviceSlug}`;
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
    url,
    city: city?.name || citySlug,
    service: service?.name || serviceSlug,
    passed,
    reasons,
    localFactorsCount,
    serviceSymptomsCount: symptomsCount,
    serviceCausesCount: causesCount,
    totalFaqsCount
  };
}

export function generateQualityReport(): QualityReport {
  const cities = getAllCities();
  const services = getAllServices();
  const checks: QualityCheck[] = [];

  for (const city of cities) {
    for (const service of services) {
      const check = checkPageQuality(city.slug, service.slug);
      checks.push(check);
    }
  }

  const indexablePages = checks.filter(c => c.passed).length;
  const noindexPages = checks.filter(c => !c.passed).length;

  return {
    totalPages: checks.length,
    indexablePages,
    noindexPages,
    checks
  };
}

function main() {
  console.log('🔍 Running Quality Gate Analysis...\n');
  
  const report = generateQualityReport();
  
  console.log('=' .repeat(70));
  console.log('QUALITY GATE REPORT');
  console.log('='.repeat(70));
  console.log(`Total City+Service Pages: ${report.totalPages}`);
  console.log(`✅ Indexable (Pass Quality Gates): ${report.indexablePages}`);
  console.log(`🚫 Noindex (Fail Quality Gates): ${report.noindexPages}`);
  console.log(`📊 Index Rate: ${((report.indexablePages / report.totalPages) * 100).toFixed(1)}%`);
  console.log('='.repeat(70));
  
  if (report.noindexPages > 0) {
    console.log('\n🚫 Pages Failing Quality Gates:\n');
    const failedPages = report.checks.filter(c => !c.passed);
    
    for (const page of failedPages.slice(0, 10)) {
      console.log(`${page.url}`);
      console.log(`  City: ${page.city} | Service: ${page.service}`);
      console.log(`  Issues:`);
      page.reasons.forEach(reason => console.log(`    - ${reason}`));
      console.log('');
    }
    
    if (failedPages.length > 10) {
      console.log(`... and ${failedPages.length - 10} more pages\n`);
    }
  }
  
  console.log('\n✅ Quality gate analysis complete!');
  console.log('Pages will be marked with noindex meta tag if they fail quality thresholds.\n');
}

main();
