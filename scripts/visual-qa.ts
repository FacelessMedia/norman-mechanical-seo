import { chromium } from '@playwright/test';
import { execSync, spawn, ChildProcess } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const QA_OUTPUT_DIR = './qa-output';
const BASE_URL = 'http://localhost:4321';

const BREAKPOINTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const TEST_URLS = [
  '/',
  '/services/',
  '/services/faucet-installation/',
  '/services/water-heater-repair/',
  '/services/drain-cleaning/',
  '/locations/',
  '/locations/palatine/',
  '/locations/elgin/',
  '/locations/naperville/',
  '/locations/palatine/faucet-installation/',
  '/locations/elgin/water-heater-repair/',
  '/locations/naperville/drain-cleaning/',
];

interface QAResult {
  url: string;
  breakpoint: string;
  hasHorizontalScroll: boolean;
  hasConsoleErrors: boolean;
  hasHeaderOverlap: boolean;
  consoleErrors: string[];
  screenshotPath: string;
}

interface Network404 {
  pageRoute: string;
  viewport: string;
  requestUrl: string;
  requestPath: string;
  status: number;
  resourceType: string;
  referrer?: string;
}

const results: QAResult[] = [];
const network404s: Network404[] = [];

async function checkHorizontalScroll(page: any): Promise<boolean> {
  return await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

async function checkHeaderOverlap(page: any): Promise<boolean> {
  return await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return false;
    
    const h1Rect = h1.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const expectedMinTop = viewportWidth <= 768 ? 120 : 160; // Match CSS variable offsets
    
    return h1Rect.top < expectedMinTop;
  });
}

async function captureScreenshot(
  page: any,
  url: string,
  breakpoint: { name: string; width: number; height: number }
): Promise<string> {
  const sanitizedUrl = url.replace(/\//g, '_').replace(/^_/, '') || 'homepage';
  const filename = `${sanitizedUrl}_${breakpoint.name}.png`;
  const filepath = path.join(QA_OUTPUT_DIR, filename);
  
  await page.screenshot({ path: filepath, fullPage: true });
  return filename;
}

async function testPage(
  page: any,
  url: string,
  breakpoint: { name: string; width: number; height: number }
): Promise<QAResult> {
  const consoleErrors: string[] = [];
  
  page.on('console', (msg: any) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  // Track 404 network requests
  page.on('response', async (response: any) => {
    if (response.status() === 404) {
      const request = response.request();
      const requestUrl = request.url();
      const parsedUrl = new URL(requestUrl);
      
      network404s.push({
        pageRoute: url,
        viewport: `${breakpoint.name} (${breakpoint.width}×${breakpoint.height})`,
        requestUrl: requestUrl,
        requestPath: parsedUrl.pathname,
        status: 404,
        resourceType: request.resourceType(),
        referrer: request.headers()['referer'] || undefined,
      });
    }
  });
  
  await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
  await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle' });
  
  // Wait for potential layout shifts
  await page.waitForTimeout(500);
  
  const hasHorizontalScroll = await checkHorizontalScroll(page);
  const hasHeaderOverlap = await checkHeaderOverlap(page);
  const screenshotPath = await captureScreenshot(page, url, breakpoint);
  
  return {
    url,
    breakpoint: breakpoint.name,
    hasHorizontalScroll,
    hasConsoleErrors: consoleErrors.length > 0,
    hasHeaderOverlap,
    consoleErrors,
    screenshotPath,
  };
}

async function runQA() {
  console.log('🔍 Starting Visual QA...\n');
  
  // Create output directory
  if (!fs.existsSync(QA_OUTPUT_DIR)) {
    fs.mkdirSync(QA_OUTPUT_DIR, { recursive: true });
  }
  
  // Start Astro preview server
  console.log('🚀 Starting Astro preview server...');
  const serverProcess: ChildProcess = spawn('npm', ['run', 'preview'], {
    cwd: process.cwd(),
    stdio: 'ignore',
    shell: true,
    detached: false,
  });
  
  // Wait for server to be ready
  console.log('⏳ Waiting for server to start...');
  await new Promise(resolve => setTimeout(resolve, 8000));
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    for (const url of TEST_URLS) {
      console.log(`\n📄 Testing: ${url}`);
      
      for (const breakpoint of BREAKPOINTS) {
        console.log(`  📱 ${breakpoint.name} (${breakpoint.width}×${breakpoint.height})`);
        
        const result = await testPage(page, url, breakpoint);
        results.push(result);
        
        if (result.hasHorizontalScroll) {
          console.log(`    ⚠️  Horizontal scroll detected`);
        }
        if (result.hasHeaderOverlap) {
          console.log(`    ⚠️  Header overlap detected`);
        }
        if (result.hasConsoleErrors) {
          console.log(`    ⚠️  Console errors: ${result.consoleErrors.length}`);
        }
      }
    }
  } finally {
    await browser.close();
    
    // Kill preview server
    console.log('\n🛑 Stopping preview server...');
    try {
      if (serverProcess && serverProcess.pid) {
        if (process.platform === 'win32') {
          execSync(`taskkill /F /PID ${serverProcess.pid} /T`, { stdio: 'ignore' });
        } else {
          process.kill(serverProcess.pid, 'SIGTERM');
        }
      }
    } catch (e) {
      // Ignore errors killing server
      console.log('  (Server may have already stopped)');
    }
  }
  
  generateReport();
}

function generateReport() {
  console.log('\n\n📊 Generating QA Report...\n');
  
  const totalTests = results.length;
  const passCount = results.filter(r => !r.hasHorizontalScroll && !r.hasHeaderOverlap && !r.hasConsoleErrors).length;
  const failCount = totalTests - passCount;
  
  let report = `# VISUAL QA REPORT\n\n`;
  report += `**Branch:** visual/global-shell-header-footer\n`;
  report += `**Date:** ${new Date().toISOString()}\n`;
  report += `**Total Tests:** ${totalTests}\n`;
  report += `**Passed:** ${passCount}\n`;
  report += `**Failed:** ${failCount}\n\n`;
  
  report += `---\n\n`;
  report += `## SUMMARY TABLE\n\n`;
  report += `| URL | Breakpoint | H-Scroll | Console Errors | Header Overlap | Screenshot |\n`;
  report += `|-----|------------|----------|----------------|----------------|------------|\n`;
  
  for (const result of results) {
    const hscroll = result.hasHorizontalScroll ? '❌' : '✅';
    const errors = result.hasConsoleErrors ? '❌' : '✅';
    const overlap = result.hasHeaderOverlap ? '❌' : '✅';
    
    report += `| ${result.url} | ${result.breakpoint} | ${hscroll} | ${errors} | ${overlap} | ${result.screenshotPath} |\n`;
  }
  
  report += `\n---\n\n`;
  report += `## ISSUES DETECTED\n\n`;
  
  const issues = analyzeIssues();
  
  if (issues.length === 0) {
    report += `✅ **No issues detected!** All pages passed visual QA.\n\n`;
  } else {
    issues.forEach((issue, index) => {
      report += `### Issue #${index + 1}: ${issue.title}\n\n`;
      report += `**Priority:** ${issue.priority}\n`;
      report += `**Affected Pages:** ${issue.affectedPages.join(', ')}\n`;
      report += `**Breakpoints:** ${issue.breakpoints.join(', ')}\n\n`;
      report += `**Description:**\n${issue.description}\n\n`;
      report += `**Likely Files:**\n${issue.files.map(f => `- \`${f}\``).join('\n')}\n\n`;
      report += `**Proposed Fix:**\n${issue.proposedFix}\n\n`;
      report += `**Screenshots:**\n${issue.screenshots.map(s => `- ${s}`).join('\n')}\n\n`;
      report += `---\n\n`;
    });
  }
  
  report += `## SCREENSHOT DIRECTORY\n\n`;
  const screenshots = fs.readdirSync(QA_OUTPUT_DIR);
  report += `Total screenshots: ${screenshots.length}\n\n`;
  report += `\`\`\`\n${screenshots.join('\n')}\n\`\`\`\n`;
  
  const reportPath = path.join(QA_OUTPUT_DIR, 'QA-REPORT.md');
  fs.writeFileSync(reportPath, report);
  
  // Save network 404s to JSON
  const network404Path = path.join(QA_OUTPUT_DIR, 'network-404s.json');
  fs.writeFileSync(network404Path, JSON.stringify(network404s, null, 2));
  
  console.log(report);
  console.log(`\n✅ Report saved to: ${reportPath}`);
  console.log(`✅ Network 404s saved to: ${network404Path} (${network404s.length} requests)`);
}

interface Issue {
  title: string;
  priority: string;
  affectedPages: string[];
  breakpoints: string[];
  description: string;
  files: string[];
  proposedFix: string;
  screenshots: string[];
}

function analyzeIssues(): Issue[] {
  const issues: Issue[] = [];
  
  // Check for horizontal scroll issues
  const hscrollResults = results.filter(r => r.hasHorizontalScroll);
  if (hscrollResults.length > 0) {
    const affectedPages = [...new Set(hscrollResults.map(r => r.url))];
    const breakpoints = [...new Set(hscrollResults.map(r => r.breakpoint))];
    
    issues.push({
      title: 'Horizontal Scroll Detected',
      priority: 'P0',
      affectedPages,
      breakpoints,
      description: 'Page content is wider than viewport, causing horizontal scroll. This typically indicates a component or element has a fixed width that exceeds the viewport or lacks proper responsive constraints.',
      files: ['src/layouts/Base.astro', 'src/components/Header.astro', 'src/components/Footer.astro'],
      proposedFix: 'Add `overflow-x: hidden` to body or identify the specific element causing overflow using browser DevTools. Check for:\n- Fixed widths on containers\n- Padding/margin causing overflow\n- Header/footer elements not constrained to viewport\n- Images without max-width: 100%',
      screenshots: hscrollResults.map(r => r.screenshotPath),
    });
  }
  
  // Check for header overlap issues
  const overlapResults = results.filter(r => r.hasHeaderOverlap);
  if (overlapResults.length > 0) {
    const affectedPages = [...new Set(overlapResults.map(r => r.url))];
    const breakpoints = [...new Set(overlapResults.map(r => r.breakpoint))];
    
    issues.push({
      title: 'Fixed Header Overlaps Content',
      priority: 'P0',
      affectedPages,
      breakpoints,
      description: 'The fixed header is overlapping the H1 or main content. The top padding on main container is insufficient to compensate for the fixed header height.',
      files: ['src/layouts/Base.astro'],
      proposedFix: 'Increase top padding on main element in Base.astro:\n\n```css\nmain {\n  padding: 160px 2rem 3rem; /* Increase from 140px to 160px */\n}\n\n@media (max-width: 768px) {\n  main {\n    padding: 120px 1.5rem 2rem; /* Increase from 100px to 120px */\n  }\n}\n```',
      screenshots: overlapResults.map(r => r.screenshotPath),
    });
  }
  
  // Check for console errors
  const errorResults = results.filter(r => r.hasConsoleErrors);
  if (errorResults.length > 0) {
    const affectedPages = [...new Set(errorResults.map(r => r.url))];
    const breakpoints = [...new Set(errorResults.map(r => r.breakpoint))];
    const uniqueErrors = [...new Set(errorResults.flatMap(r => r.consoleErrors))];
    
    issues.push({
      title: 'Console Errors Detected',
      priority: 'P1',
      affectedPages,
      breakpoints,
      description: `JavaScript console errors detected:\n${uniqueErrors.map(e => `- ${e}`).join('\n')}`,
      files: ['src/components/Header.astro', 'src/components/Footer.astro', 'src/layouts/Base.astro'],
      proposedFix: 'Review console errors and fix JavaScript issues. Common causes:\n- Missing DOM elements for event listeners\n- Incorrect selectors\n- Script loading order issues',
      screenshots: errorResults.map(r => r.screenshotPath),
    });
  }
  
  return issues;
}

runQA().catch(console.error);
