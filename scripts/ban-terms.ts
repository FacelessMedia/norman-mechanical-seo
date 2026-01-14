import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const BANNED_TERMS = ['Phoenix', 'Scottsdale', 'Tempe', 'AZ', 'Arizona'];
const SEARCH_DIRS = ['content', 'src'];
const IGNORE_PATTERNS = ['node_modules', '.git', 'dist', '.astro'];

interface Violation {
  file: string;
  term: string;
  line: number;
  context: string;
}

const violations: Violation[] = [];

function shouldIgnore(path: string): boolean {
  return IGNORE_PATTERNS.some(pattern => path.includes(pattern));
}

function scanFile(filePath: string) {
  if (shouldIgnore(filePath)) return;
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      BANNED_TERMS.forEach(term => {
        // Use word boundary regex to avoid false positives
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        if (regex.test(line)) {
          violations.push({
            file: filePath,
            term,
            line: index + 1,
            context: line.trim().substring(0, 100)
          });
        }
      });
    });
  } catch (error) {
    // Skip files that can't be read as text
  }
}

function scanDirectory(dirPath: string) {
  if (shouldIgnore(dirPath)) return;
  
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = join(dirPath, item);
      
      if (shouldIgnore(fullPath)) continue;
      
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        scanFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
}

function main() {
  console.log('🔍 Scanning for banned geographic terms...\n');
  console.log(`Banned terms: ${BANNED_TERMS.join(', ')}\n`);
  
  const rootDir = process.cwd();
  
  for (const dir of SEARCH_DIRS) {
    const fullPath = join(rootDir, dir);
    console.log(`Scanning ${dir}/...`);
    scanDirectory(fullPath);
  }
  
  if (violations.length > 0) {
    console.log('\n❌ GEOGRAPHIC CONTAMINATION DETECTED!\n');
    console.log('='.repeat(70));
    
    const groupedByFile = violations.reduce((acc, v) => {
      if (!acc[v.file]) acc[v.file] = [];
      acc[v.file].push(v);
      return acc;
    }, {} as Record<string, Violation[]>);
    
    Object.entries(groupedByFile).forEach(([file, fileViolations]) => {
      console.log(`\n📁 ${file}`);
      fileViolations.forEach(v => {
        console.log(`   Line ${v.line}: Found "${v.term}"`);
        console.log(`   Context: ${v.context}`);
      });
    });
    
    console.log('\n' + '='.repeat(70));
    console.log(`\n❌ Found ${violations.length} violation(s) in ${Object.keys(groupedByFile).length} file(s)`);
    console.log('\nBuild FAILED: Remove all non-Chicagoland geographic references.\n');
    process.exit(1);
  }
  
  console.log('\n✅ No banned geographic terms found!');
  console.log('✅ Geographic integrity check passed.\n');
  process.exit(0);
}

main();
