import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { load } from 'cheerio';
import robotsParser from 'robots-parser';

interface PageMetadata {
  url: string;
  status: number;
  canonical: string | null;
  title: string | null;
  metaDescription: string | null;
  h1: string[];
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
  internalLinks: Array<{ href: string; anchor: string }>;
  externalLinks: Array<{ href: string; anchor: string }>;
  images: Array<{ src: string; alt: string }>;
  schemas: any[];
}

interface CrawlResult {
  url: string;
  html: string;
  text: string;
  metadata: PageMetadata;
}

interface InternalLink {
  from: string;
  to: string;
  anchor: string;
}

class SiteAuditor {
  private baseUrl: string;
  private domain: string;
  private visited = new Set<string>();
  private toVisit = new Set<string>();
  private results: CrawlResult[] = [];
  private internalLinks: InternalLink[] = [];
  private robots: any;
  private userAgent = 'Mozilla/5.0 (compatible; SiteAuditor/1.0)';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.domain = new URL(this.baseUrl).hostname;
  }

  async run() {
    console.log(`🚀 Starting audit of ${this.baseUrl}\n`);

    await this.loadRobotsTxt();
    await this.discoverFromSitemap();
    await this.crawlPages();
    await this.saveResults();

    console.log('\n✅ Audit complete!');
  }

  private async loadRobotsTxt() {
    console.log('📋 Loading robots.txt...');
    try {
      const robotsUrl = `${this.baseUrl}/robots.txt`;
      const response = await fetch(robotsUrl);
      
      if (response.ok) {
        const robotsTxt = await response.text();
        this.robots = robotsParser(robotsUrl, robotsTxt);
        console.log('✓ robots.txt loaded and parsed\n');
      } else {
        console.log('⚠ No robots.txt found, proceeding without restrictions\n');
        this.robots = robotsParser(this.baseUrl, '');
      }
    } catch (error) {
      console.log('⚠ Error loading robots.txt, proceeding without restrictions\n');
      this.robots = robotsParser(this.baseUrl, '');
    }
  }

  private async discoverFromSitemap() {
    console.log('🗺️  Discovering URLs from sitemap.xml...');
    
    const sitemapUrls = [
      `${this.baseUrl}/sitemap.xml`,
      `${this.baseUrl}/sitemap_index.xml`,
      `${this.baseUrl}/sitemap-index.xml`
    ];

    for (const sitemapUrl of sitemapUrls) {
      try {
        const response = await fetch(sitemapUrl);
        if (response.ok) {
          const xml = await response.text();
          const urls = await this.parseSitemap(xml);
          
          for (const url of urls) {
            if (this.isAllowedByRobots(url) && this.isSameDomain(url)) {
              this.toVisit.add(url);
            }
          }
          
          console.log(`✓ Found ${urls.length} total URLs from sitemap\n`);
          break;
        }
      } catch (error) {
        continue;
      }
    }

    if (this.toVisit.size === 0) {
      console.log('⚠ No sitemap found, will discover via internal links');
      this.toVisit.add(this.baseUrl);
    }

    console.log(`📊 Total URLs queued: ${this.toVisit.size}\n`);
  }

  private async parseSitemap(xml: string): Promise<string[]> {
    const urls: string[] = [];
    const $ = load(xml, { xmlMode: true });

    $('url > loc').each((_, elem) => {
      const url = $(elem).text().trim();
      if (url) urls.push(url);
    });

    const nestedSitemaps: string[] = [];
    $('sitemap > loc').each((_, elem) => {
      const sitemapUrl = $(elem).text().trim();
      if (sitemapUrl) nestedSitemaps.push(sitemapUrl);
    });

    for (const sitemapUrl of nestedSitemaps) {
      try {
        const response = await fetch(sitemapUrl);
        if (response.ok) {
          const sitemapXml = await response.text();
          const nestedUrls = await this.parseSitemap(sitemapXml);
          urls.push(...nestedUrls);
          console.log(`  ✓ Parsed nested sitemap: ${sitemapUrl} (${nestedUrls.length} URLs)`);
        }
      } catch (error) {
        console.log(`  ⚠ Could not fetch nested sitemap: ${sitemapUrl}`);
      }
    }

    return urls;
  }

  private async crawlPages() {
    console.log('🕷️  Crawling pages...\n');

    let count = 0;

    while (this.toVisit.size > 0) {
      const urlsToProcess = Array.from(this.toVisit);
      
      for (const url of urlsToProcess) {
        if (this.visited.has(url)) {
          this.toVisit.delete(url);
          continue;
        }

        count++;
        console.log(`[${count}] Crawling: ${url}`);

        try {
          const result = await this.crawlPage(url);
          if (result) {
            this.results.push(result);
            this.visited.add(url);
            this.toVisit.delete(url);

            for (const link of result.metadata.internalLinks) {
              const normalizedUrl = this.normalizeUrl(link.href);
              if (
                normalizedUrl &&
                !this.visited.has(normalizedUrl) &&
                !this.toVisit.has(normalizedUrl) &&
                this.isAllowedByRobots(normalizedUrl) &&
                this.isSameDomain(normalizedUrl)
              ) {
                this.toVisit.add(normalizedUrl);
              }
            }
          } else {
            this.toVisit.delete(url);
          }
        } catch (error) {
          console.log(`  ✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
          this.toVisit.delete(url);
        }

        await this.delay(100);
      }
    }

    console.log(`\n✓ Crawled ${this.visited.size} pages`);
  }

  private async crawlPage(url: string): Promise<CrawlResult | null> {
    const response = await fetch(url, {
      headers: {
        'User-Agent': this.userAgent
      }
    });

    if (!response.ok) {
      console.log(`  ✗ Status ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      console.log(`  ✗ Not HTML (${contentType})`);
      return null;
    }

    const html = await response.text();
    const $ = load(html);

    const metadata = this.extractMetadata(url, $, response.status);
    const text = this.extractMainText($);

    for (const link of metadata.internalLinks) {
      this.internalLinks.push({
        from: url,
        to: link.href,
        anchor: link.anchor
      });
    }

    console.log(`  ✓ Extracted metadata (${metadata.schemas.length} schemas)`);

    return { url, html, text, metadata };
  }

  private extractMetadata(url: string, $: any, status: number): PageMetadata {
    const canonical = $('link[rel="canonical"]').attr('href') || null;
    const title = $('title').text().trim() || null;
    const metaDescription = $('meta[name="description"]').attr('content') || null;

    const h1: string[] = [];
    const h2: string[] = [];
    const h3: string[] = [];
    const h4: string[] = [];
    const h5: string[] = [];
    const h6: string[] = [];

    $('h1').each((_, elem) => h1.push($(elem).text().trim()));
    $('h2').each((_, elem) => h2.push($(elem).text().trim()));
    $('h3').each((_, elem) => h3.push($(elem).text().trim()));
    $('h4').each((_, elem) => h4.push($(elem).text().trim()));
    $('h5').each((_, elem) => h5.push($(elem).text().trim()));
    $('h6').each((_, elem) => h6.push($(elem).text().trim()));

    const internalLinks: Array<{ href: string; anchor: string }> = [];
    const externalLinks: Array<{ href: string; anchor: string }> = [];

    $('a[href]').each((_, elem) => {
      const href = $(elem).attr('href');
      const anchor = $(elem).text().trim();
      
      if (href) {
        const absoluteUrl = this.resolveUrl(url, href);
        if (absoluteUrl) {
          if (this.isSameDomain(absoluteUrl)) {
            internalLinks.push({ href: absoluteUrl, anchor });
          } else if (absoluteUrl.startsWith('http')) {
            externalLinks.push({ href: absoluteUrl, anchor });
          }
        }
      }
    });

    const images: Array<{ src: string; alt: string }> = [];
    $('img[src]').each((_, elem) => {
      const src = $(elem).attr('src');
      const alt = $(elem).attr('alt') || '';
      if (src) {
        const absoluteSrc = this.resolveUrl(url, src);
        if (absoluteSrc) {
          images.push({ src: absoluteSrc, alt });
        }
      }
    });

    const schemas: any[] = [];
    $('script[type="application/ld+json"]').each((_, elem) => {
      try {
        const schemaText = $(elem).html();
        if (schemaText) {
          const schema = JSON.parse(schemaText);
          schemas.push(schema);
        }
      } catch (error) {
        console.log(`  ⚠ Invalid JSON-LD schema`);
      }
    });

    return {
      url,
      status,
      canonical,
      title,
      metaDescription,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      internalLinks,
      externalLinks,
      images,
      schemas
    };
  }

  private extractMainText($: any): string {
    $('script, style, nav, header, footer, aside, .nav, .menu, .sidebar').remove();
    
    const mainContent = $('main, article, .content, .main-content, body').first();
    const text = mainContent.text()
      .replace(/\s+/g, ' ')
      .trim();
    
    return text;
  }

  private resolveUrl(base: string, relative: string): string | null {
    try {
      if (relative.startsWith('mailto:') || relative.startsWith('tel:') || relative.startsWith('javascript:')) {
        return null;
      }
      return new URL(relative, base).href;
    } catch {
      return null;
    }
  }

  private normalizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      parsed.hash = '';
      return parsed.href;
    } catch {
      return url;
    }
  }

  private isSameDomain(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.hostname === this.domain || parsed.hostname === `www.${this.domain}` || `www.${parsed.hostname}` === this.domain;
    } catch {
      return false;
    }
  }

  private isAllowedByRobots(url: string): boolean {
    if (!this.robots) return true;
    return this.robots.isAllowed(url, this.userAgent) !== false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async saveResults() {
    console.log('\n💾 Saving results...');

    const auditDir = join(process.cwd(), 'audit');
    const rawDir = join(auditDir, 'raw');
    const textDir = join(auditDir, 'text');
    const metaDir = join(auditDir, 'meta');

    [auditDir, rawDir, textDir, metaDir].forEach(dir => {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    });

    for (const result of this.results) {
      const path = this.urlToPath(result.url);
      
      this.saveFile(join(rawDir, `${path}.html`), result.html);
      this.saveFile(join(textDir, `${path}.md`), result.text);
      this.saveFile(join(metaDir, `${path}.json`), JSON.stringify(result.metadata, null, 2));
    }

    this.saveUrlsCsv(join(auditDir, 'urls.csv'));
    this.saveSchemaSummary(join(auditDir, 'schema-summary.json'));
    this.saveInternalLinksCsv(join(auditDir, 'internal-links.csv'));

    console.log(`✓ Saved ${this.results.length} pages to audit/`);
    console.log(`✓ Generated urls.csv (${this.results.length} URLs)`);
    console.log(`✓ Generated schema-summary.json`);
    console.log(`✓ Generated internal-links.csv (${this.internalLinks.length} links)`);
  }

  private urlToPath(url: string): string {
    try {
      const parsed = new URL(url);
      let path = parsed.pathname;
      
      if (path === '/') {
        return 'index';
      }
      
      path = path.replace(/^\//, '').replace(/\/$/, '');
      path = path.replace(/\//g, '_');
      path = path.replace(/[^a-zA-Z0-9_-]/g, '-');
      
      return path || 'index';
    } catch {
      return 'unknown';
    }
  }

  private saveFile(filePath: string, content: string) {
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filePath, content, 'utf-8');
  }

  private saveUrlsCsv(filePath: string) {
    const rows = ['url,status,title,canonical,h1_count,internal_links,external_links,images,schemas'];
    
    for (const result of this.results) {
      const m = result.metadata;
      rows.push([
        m.url,
        m.status,
        this.escapeCsv(m.title || ''),
        this.escapeCsv(m.canonical || ''),
        m.h1.length,
        m.internalLinks.length,
        m.externalLinks.length,
        m.images.length,
        m.schemas.length
      ].join(','));
    }
    
    writeFileSync(filePath, rows.join('\n'), 'utf-8');
  }

  private saveSchemaSummary(filePath: string) {
    const schemaCounts: Record<string, number> = {};
    const schemaExamples: Record<string, any> = {};
    
    for (const result of this.results) {
      for (const schema of result.metadata.schemas) {
        const type = schema['@type'] || 'Unknown';
        schemaCounts[type] = (schemaCounts[type] || 0) + 1;
        
        if (!schemaExamples[type]) {
          schemaExamples[type] = schema;
        }
      }
    }
    
    const summary = {
      totalSchemas: Object.values(schemaCounts).reduce((a, b) => a + b, 0),
      schemaTypes: Object.keys(schemaCounts).length,
      counts: schemaCounts,
      examples: schemaExamples
    };
    
    writeFileSync(filePath, JSON.stringify(summary, null, 2), 'utf-8');
  }

  private saveInternalLinksCsv(filePath: string) {
    const rows = ['from,to,anchor'];
    
    for (const link of this.internalLinks) {
      rows.push([
        link.from,
        link.to,
        this.escapeCsv(link.anchor)
      ].join(','));
    }
    
    writeFileSync(filePath, rows.join('\n'), 'utf-8');
  }

  private escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}

const TARGET_URL = 'https://normanmechanicalinc.com';

async function main() {
  const auditor = new SiteAuditor(TARGET_URL);
  await auditor.run();
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
