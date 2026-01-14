# Norman Mechanical SEO - Local SEO Static Site

A future-proof local SEO static site foundation built with Astro, designed for programmatic city+service pages with schema-first architecture.

## 🏗️ Project Structure

```
/
├── content/                    # JSON content files
│   ├── globals/
│   │   └── business.json      # Business entity data
│   ├── services/              # Service definitions
│   │   ├── drain-cleaning.json
│   │   ├── water-heater-repair.json
│   │   └── pipe-repair.json
│   └── locations/             # City/location data
│       ├── phoenix.json
│       ├── scottsdale.json
│       └── tempe.json
├── src/
│   ├── layouts/
│   │   └── Base.astro         # Base layout with SEO meta tags
│   ├── lib/
│   │   ├── content/
│   │   │   ├── loaders.ts     # Content loading utilities
│   │   │   ├── internalLinks.ts  # Internal linking logic
│   │   │   └── schema/        # JSON-LD schema generators
│   │   │       ├── localBusiness.ts
│   │   │       ├── service.ts
│   │   │       ├── city.ts
│   │   │       ├── faq.ts
│   │   │       └── breadcrumbs.ts
│   │   └── seo/
│   │       └── meta.ts        # Meta tag generation
│   └── pages/
│       ├── index.astro        # Homepage
│       ├── services/
│       │   ├── index.astro    # Services hub
│       │   └── [service].astro  # Dynamic service pages
│       └── locations/
│           ├── index.astro    # Locations hub
│           ├── [city].astro   # Dynamic city pages
│           └── [city]/[service].astro  # City+service combo pages
├── scripts/
│   └── validate-content.ts    # Build-time content validation
├── public/                    # Static assets
└── vercel.json               # Vercel deployment config
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Content Validation

Validate all content files before building:

```bash
npm run validate
```

This checks:
- Required fields exist
- Slugs are unique
- Arrays are properly formatted
- FAQs have questions and answers

### Build

Build the static site (includes validation):

```bash
npm run build
```

To skip validation during build:

```bash
npm run build:skip-validation
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## 📝 Content Management

### Adding a New Service

1. Create a new JSON file in `content/services/` (e.g., `leak-detection.json`)
2. Include all required fields:
   - `name`: Service name
   - `slug`: URL-friendly identifier
   - `description`: Brief description
   - `problems`: Array of problems solved
   - `solutions`: Array of solutions offered
   - `faqs`: Array of FAQ objects with `question` and `answer`
   - `relatedServices`: Array of related service slugs
3. Run `npm run validate` to ensure it's valid

### Adding a New City

1. Create a new JSON file in `content/locations/` (e.g., `mesa.json`)
2. Include all required fields:
   - `name`: City name
   - `slug`: URL-friendly identifier
   - `state`: Full state name
   - `stateAbbr`: State abbreviation
   - `description`: Brief description
   - `neighborhoods`: Array of neighborhood names
   - `landmarks`: Array of local landmarks
   - `localFactors`: Array of location-specific factors
   - `faqs`: Array of FAQ objects
3. Run `npm run validate` to ensure it's valid

## 🔍 SEO Features

### Structured Data (JSON-LD)

The site automatically generates:
- **LocalBusiness** schema on homepage and location hubs
- **Service** schema on service pages
- **Place/City** schema on city pages
- **FAQPage** schema where FAQs exist
- **BreadcrumbList** on all non-home pages

### Internal Linking Strategy

- **Service pages** link to all cities and top 5 related services
- **City pages** link to top 10 services
- **City+service pages** link up to parent city and service hubs
- Contextual intros assembled from `city.localFactors` + `service.problems`

### Meta Tags

All pages include:
- Title tags (optimized format)
- Meta descriptions
- Canonical URLs
- Open Graph tags
- Twitter Card tags

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link or create a project

4. For production deployment:
```bash
vercel --prod
```

#### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Astro and configure build settings
6. Click "Deploy"

### Deploy to Other Platforms

The site builds to a static `dist/` folder and can be deployed to:
- Netlify
- Cloudflare Pages
- GitHub Pages
- Any static hosting service

Build command: `npm run build`  
Output directory: `dist`

## 🧪 Validation Rules

The validation script ensures:
- All required fields are present
- Slugs are unique across services and cities
- Arrays (problems, solutions, neighborhoods, etc.) are non-empty
- FAQs have both questions and answers
- JSON files are valid

Build will fail if validation errors are found.

## 🎯 Page Generation

The site generates pages programmatically:

- **3 service pages** (drain-cleaning, water-heater-repair, pipe-repair)
- **3 city pages** (phoenix, scottsdale, tempe)
- **9 city+service combo pages** (3 cities × 3 services)
- **Total: 17+ pages** from minimal content files

Add more services or cities to exponentially increase page count.

## 📦 Dependencies

- **astro** - Static site framework
- **@types/node** - TypeScript Node.js types
- **tsx** - TypeScript execution for validation script

## 🔧 Configuration

- `astro.config.mjs` - Astro configuration
- `tsconfig.json` - TypeScript configuration
- `vercel.json` - Vercel deployment settings
- `package.json` - Scripts and dependencies

## 📄 License

This is a custom project for Norman Mechanical.
