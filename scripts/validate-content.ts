import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface ValidationError {
  file: string;
  field: string;
  message: string;
}

const errors: ValidationError[] = [];

function validateJSON(filePath: string, requiredFields: string[]): any {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push({
          file: filePath,
          field,
          message: `Missing required field: ${field}`
        });
      }
    }
    
    return data;
  } catch (error) {
    errors.push({
      file: filePath,
      field: 'JSON',
      message: `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
    return null;
  }
}

function validateBusiness() {
  console.log('Validating business.json...');
  const filePath = join(process.cwd(), 'content', 'globals', 'business.json');
  
  const requiredFields = [
    'name', 'phone_display', 'phone_e164', 'url', 'primary_category', 'emergency_service'
  ];
  
  const data = validateJSON(filePath, requiredFields);
  
  if (data) {
    if (data.email !== undefined) {
      errors.push({
        file: filePath,
        field: 'email',
        message: 'email field must NOT be present in business.json (remove it)'
      });
    }
    
    if (typeof data.emergency_service !== 'boolean') {
      errors.push({
        file: filePath,
        field: 'emergency_service',
        message: 'emergency_service must be a boolean'
      });
    }
    
    if (data.address) {
      const addressFields = ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode'];
      for (const field of addressFields) {
        if (!data.address[field]) {
          errors.push({
            file: filePath,
            field: `address.${field}`,
            message: `Missing required address field: ${field}`
          });
        }
      }
    } else {
      errors.push({
        file: filePath,
        field: 'address',
        message: 'Missing required field: address'
      });
    }
  }
}

function validateGBP() {
  console.log('Validating gbp.json...');
  const filePath = join(process.cwd(), 'content', 'globals', 'gbp.json');
  
  const requiredFields = [
    'primary_category', 'hours', 'service_areas', 'attributes'
  ];
  
  const data = validateJSON(filePath, requiredFields);
  
  if (data) {
    if (!Array.isArray(data.hours) || data.hours.length === 0) {
      errors.push({
        file: filePath,
        field: 'hours',
        message: 'hours must be a non-empty array'
      });
    } else {
      for (let i = 0; i < data.hours.length; i++) {
        const hour = data.hours[i];
        if (!hour.day) {
          errors.push({
            file: filePath,
            field: `hours[${i}].day`,
            message: 'Each hour entry must have a day field'
          });
        }
        if (hour.closed === undefined) {
          errors.push({
            file: filePath,
            field: `hours[${i}].closed`,
            message: 'Each hour entry must have a closed field'
          });
        }
      }
    }
    
    if (!Array.isArray(data.service_areas) || data.service_areas.length === 0) {
      errors.push({
        file: filePath,
        field: 'service_areas',
        message: 'service_areas must be a non-empty array'
      });
    }
    
    if (!data.attributes || typeof data.attributes !== 'object') {
      errors.push({
        file: filePath,
        field: 'attributes',
        message: 'attributes must be an object'
      });
    }
    
    if (!Array.isArray(data.services_list)) {
      errors.push({
        file: filePath,
        field: 'services_list',
        message: 'services_list must be an array'
      });
    } else {
      for (let i = 0; i < data.services_list.length; i++) {
        const service = data.services_list[i];
        if (!service.name || !service.slug) {
          errors.push({
            file: filePath,
            field: `services_list[${i}]`,
            message: 'Each service must have name and slug fields'
          });
        }
      }
    }
  }
}

function validateServices() {
  console.log('Validating services...');
  const servicesDir = join(process.cwd(), 'content', 'services');
  const files = readdirSync(servicesDir).filter(f => f.endsWith('.json'));
  
  const slugs = new Set<string>();
  const requiredFields = [
    'name', 'slug', 'description', 'problems', 'solutions', 'faqs', 'relatedServices'
  ];
  
  for (const file of files) {
    const filePath = join(servicesDir, file);
    const data = validateJSON(filePath, requiredFields);
    
    if (data) {
      if (slugs.has(data.slug)) {
        errors.push({
          file: filePath,
          field: 'slug',
          message: `Duplicate slug: ${data.slug}`
        });
      }
      slugs.add(data.slug);
      
      if (!Array.isArray(data.problems) || data.problems.length === 0) {
        errors.push({
          file: filePath,
          field: 'problems',
          message: 'problems must be a non-empty array'
        });
      }
      
      if (!Array.isArray(data.solutions) || data.solutions.length === 0) {
        errors.push({
          file: filePath,
          field: 'solutions',
          message: 'solutions must be a non-empty array'
        });
      }
      
      if (!Array.isArray(data.faqs)) {
        errors.push({
          file: filePath,
          field: 'faqs',
          message: 'faqs must be an array'
        });
      } else {
        for (let i = 0; i < data.faqs.length; i++) {
          const faq = data.faqs[i];
          if (!faq.question || !faq.answer) {
            errors.push({
              file: filePath,
              field: `faqs[${i}]`,
              message: 'FAQ must have question and answer'
            });
          }
        }
      }
      
      if (!Array.isArray(data.relatedServices)) {
        errors.push({
          file: filePath,
          field: 'relatedServices',
          message: 'relatedServices must be an array'
        });
      }
    }
  }
}

function validateCities() {
  console.log('Validating cities...');
  const citiesDir = join(process.cwd(), 'content', 'locations');
  const files = readdirSync(citiesDir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  
  // Load allowlist
  const allowlistPath = join(citiesDir, '_allowlist.json');
  let allowlist: { allowed_state: string; allowed_cities: string[] } | null = null;
  try {
    const allowlistContent = readFileSync(allowlistPath, 'utf-8');
    allowlist = JSON.parse(allowlistContent);
  } catch {
    errors.push({
      file: allowlistPath,
      field: 'allowlist',
      message: 'Missing _allowlist.json - required for geographic validation'
    });
  }
  
  const slugs = new Set<string>();
  
  for (const file of files) {
    const filePath = join(citiesDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    // Skip validation for regions
    if (data.type === 'region') {
      continue;
    }
    
    // ENFORCE ALLOWLIST
    if (allowlist) {
      // Check state
      if (data.state !== allowlist.allowed_state && data.stateAbbr !== allowlist.allowed_state) {
        errors.push({
          file: filePath,
          field: 'state',
          message: `State "${data.state || data.stateAbbr}" not allowed. Only "${allowlist.allowed_state}" is permitted.`
        });
      }
      
      // Check slug in allowlist
      if (data.slug && !allowlist.allowed_cities.includes(data.slug)) {
        errors.push({
          file: filePath,
          field: 'slug',
          message: `City slug "${data.slug}" not in allowlist. Remove this file or add to _allowlist.json.`
        });
      }
    }
    
    // Validate city type locations
    const requiredFields = [
      'name', 'slug', 'state', 'stateAbbr', 'description',
      'neighborhoods', 'landmarks', 'localFactors'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push({
          file: filePath,
          field,
          message: `Missing required field: ${field}`
        });
      }
    }
    
    if (data.slug) {
      if (slugs.has(data.slug)) {
        errors.push({
          file: filePath,
          field: 'slug',
          message: `Duplicate slug: ${data.slug}`
        });
      }
      slugs.add(data.slug);
    }
    
    if (data.neighborhoods && (!Array.isArray(data.neighborhoods) || data.neighborhoods.length === 0)) {
      errors.push({
        file: filePath,
        field: 'neighborhoods',
        message: 'neighborhoods must be a non-empty array'
      });
    }
    
    if (data.landmarks && (!Array.isArray(data.landmarks) || data.landmarks.length === 0)) {
      errors.push({
        file: filePath,
        field: 'landmarks',
        message: 'landmarks must be a non-empty array'
      });
    }
    
    if (data.localFactors && (!Array.isArray(data.localFactors) || data.localFactors.length === 0)) {
      errors.push({
        file: filePath,
        field: 'localFactors',
        message: 'localFactors must be a non-empty array'
      });
    }
    
    // Accept both faqs and city_faqs
    const faqsField = data.city_faqs || data.faqs;
    if (faqsField && !Array.isArray(faqsField)) {
      errors.push({
        file: filePath,
        field: 'city_faqs',
        message: 'city_faqs must be an array'
      });
    } else if (faqsField) {
      for (let i = 0; i < faqsField.length; i++) {
        const faq = faqsField[i];
        if (!faq.question || !faq.answer) {
          errors.push({
            file: filePath,
            field: `city_faqs[${i}]`,
            message: 'FAQ must have question and answer'
          });
        }
      }
    }
  }
}

function main() {
  console.log('Starting content validation...\n');
  
  validateBusiness();
  validateGBP();
  validateServices();
  validateCities();
  
  console.log('\n' + '='.repeat(60));
  
  if (errors.length === 0) {
    console.log('✅ All content validation passed!');
    console.log('='.repeat(60));
    process.exit(0);
  } else {
    console.log(`❌ Found ${errors.length} validation error(s):\n`);
    
    for (const error of errors) {
      console.log(`File: ${error.file}`);
      console.log(`Field: ${error.field}`);
      console.log(`Error: ${error.message}`);
      console.log('-'.repeat(60));
    }
    
    console.log('='.repeat(60));
    process.exit(1);
  }
}

main();
