# Site Audit Crawler Documentation

## Overview

The site audit crawler is a comprehensive web scraping tool that crawls https://normanmechanicalinc.com and extracts detailed SEO and content data for analysis.

## Running the Audit

```bash
npm run audit
```

This will crawl the entire site and generate audit reports in the `audit/` directory.

## Features

### ✅ Sitemap Discovery
- Automatically discovers and parses `sitemap.xml` and `sitemap_index.xml`
- Recursively fetches nested sitemaps
- Falls back to internal link discovery if no sitemap exists

### ✅ Robots.txt Compliance
- Loads and respects `robots.txt` rules
- Only crawls URLs allowed by robots.txt
- Uses custom User-Agent: `Mozilla/5.0 (compatible; SiteAuditor/1.0)`

### ✅ Internal Link Discovery
- Follows internal links to discover additional pages
- Dynamically expands crawl queue as new links are found
- Normalizes URLs (removes fragments, handles relative URLs)

### ✅ Comprehensive Data Extraction

For each page, the crawler extracts:

- **URL & Status**: Full URL and HTTP status code
- **SEO Metadata**: Title, meta description, canonical URL
- **Heading Outline**: All H1-H6 tags with text content
- **Links**: Internal and external links with anchor text
- **Images**: Image sources and alt text
- **JSON-LD Schema**: All structured data blocks

## Output Structure

```
audit/
├── raw/                    # Raw HTML files
│   ├── index.html
│   ├── about-us.html
│   └── services_drain-cleaning.html
├── text/                   # Extracted main text (nav/footer removed)
│   ├── index.md
│   ├── about-us.md
│   └── services_drain-cleaning.md
├── meta/                   # Detailed metadata JSON
│   ├── index.json
│   ├── about-us.json
│   └── services_drain-cleaning.json
├── urls.csv               # Master URL index
├── schema-summary.json    # Schema type counts and examples
└── internal-links.csv     # All internal links (from,to,anchor)
```

## Output Files

### 1. `urls.csv`
Master index of all crawled URLs with summary statistics:
- URL
- HTTP status code
- Page title
- Canonical URL
- H1 count
- Internal link count
- External link count
- Image count
- Schema count

### 2. `schema-summary.json`
Aggregated schema data:
```json
{
  "totalSchemas": 42,
  "schemaTypes": 2,
  "counts": {
    "Unknown": 24,
    "Service": 18
  },
  "examples": {
    "Service": { ... }
  }
}
```

### 3. `internal-links.csv`
Complete internal link graph:
```csv
from,to,anchor
https://normanmechanicalinc.com/,https://normanmechanicalinc.com/about-us/,About Us
```

### 4. `raw/<path>.html`
Complete raw HTML for each page, saved with sanitized filenames.

### 5. `text/<path>.md`
Extracted main content with navigation, footer, and scripts removed. Useful for content analysis.

### 6. `meta/<path>.json`
Detailed metadata for each page:
```json
{
  "url": "https://normanmechanicalinc.com/services/drain-cleaning/",
  "status": 200,
  "canonical": "https://normanmechanicalinc.com/services/drain-cleaning/",
  "title": "Drain Cleaning Elgin, IL | Clogged Drain Service | Norman Mechanical",
  "metaDescription": "Professional drain cleaning in Elgin...",
  "h1": ["Drain Cleaning"],
  "h2": ["Professional Drain Cleaning in Elgin, IL..."],
  "h3": [],
  "h4": [],
  "h5": [],
  "h6": [],
  "internalLinks": [
    { "href": "https://normanmechanicalinc.com/about-us/", "anchor": "About Us" }
  ],
  "externalLinks": [
    { "href": "https://www.facebook.com/...", "anchor": "Facebook" }
  ],
  "images": [
    { "src": "https://normanmechanicalinc.com/logo.png", "alt": "Norman Mechanical" }
  ],
  "schemas": [
    { "@type": "Service", "name": "Drain Cleaning", ... }
  ]
}
```

## Latest Crawl Results

**Date**: January 14, 2026

**Statistics**:
- ✅ 24 pages crawled successfully
- ✅ 23 URLs discovered from sitemap
- ✅ 1,617 internal links mapped
- ✅ 42 JSON-LD schema blocks extracted
- ✅ 2 schema types identified (Service, Organization/Place/WebSite/WebPage graph)

**Pages Crawled**:
- Homepage
- About Us
- Contact Us
- Services hub + 12 service pages
- 4 blog posts
- Privacy Policy
- Category archive

## Crawl Behavior

### Politeness
- 100ms delay between requests
- Respects robots.txt
- Uses descriptive User-Agent

### URL Normalization
- Removes URL fragments (#anchors)
- Handles relative URLs
- Deduplicates URLs

### Domain Scope
- Only crawls same-domain URLs
- Handles www/non-www variants
- Excludes mailto:, tel:, javascript: links

### Content Filtering
- Only processes HTML pages (skips XML, images, etc.)
- Removes navigation, footer, scripts from text extraction
- Preserves all content in raw HTML files

## Use Cases

### SEO Audit
- Review title tags and meta descriptions
- Check canonical URL implementation
- Analyze heading structure (H1-H6)
- Verify schema markup

### Content Analysis
- Extract clean text for content review
- Identify thin content pages
- Review internal linking structure

### Technical SEO
- Map internal link graph
- Identify orphan pages
- Check for broken internal links
- Verify schema implementation

### Competitive Analysis
- Compare schema implementation
- Analyze content structure
- Review internal linking strategy

## Customization

To audit a different site, edit `scripts/audit-site.ts`:

```typescript
const TARGET_URL = 'https://your-site.com';
```

## Dependencies

- **cheerio**: HTML parsing and manipulation
- **robots-parser**: robots.txt parsing
- **tsx**: TypeScript execution

## Notes

- The crawler is deterministic - running it multiple times produces the same results
- All output files use UTF-8 encoding
- CSV files properly escape commas and quotes in content
- File paths are sanitized (slashes become underscores)
- The crawler will skip non-HTML content types
