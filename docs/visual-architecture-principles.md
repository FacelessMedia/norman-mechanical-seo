# Visual Architecture Principles

## Overview

This document defines the visual architecture rules for the Norman Mechanical SEO site. These principles govern **presentation-only changes** including layout, hierarchy, spacing, component sequencing, and UX refinement.

**Phase 15 Scope:** Visual Architecture & UX Refinement  
**Explicitly Out of Scope:** Content changes, SEO logic, schema, quality gates, indexing behavior

---

## Page Hierarchy Rules

### Universal Hierarchy (All Pages)

**Above the fold (first 600px):**
1. Navigation header
2. H1 (page title)
3. Primary trust signal (trust badges OR CTA)
4. Lead paragraph (if present)

**Below the fold:**
5. Secondary content (problems, solutions, local factors)
6. Conversion elements (CTAs, reviews, service proof)
7. Media galleries
8. Tertiary content (FAQs, neighborhoods, related links)
9. Footer

### Page-Type Specific Hierarchy

#### Homepage
1. Hero section with H1
2. Trust badges (immediate credibility)
3. Service highlights
4. Testimonials
5. About section
6. Footer

#### City Pages (`/locations/[city]`)
1. H1: "Norman Mechanical in {City}, IL"
2. Trust badges (4 badges)
3. Description paragraph
4. Local factors list
5. Revenue-priority service links (10 services)
6. Location CTA (phone + emergency messaging)
7. Review excerpts (4 reviews)
8. City gallery (3 images)
9. Neighborhoods list
10. FAQs (if present)

#### Service Pages (`/services/[service]`)
1. H1: "{Service}"
2. Trust badges (4 badges)
3. Description paragraph
4. Problems list
5. Solutions list
6. Top city links (8 cities by neighborhood count)
7. Related services (up to 5)
8. FAQs (if present)

#### City × Service Pages (`/locations/[city]/[service]`)
1. H1: "{Service} in {City}, IL"
2. Trust badges (4 badges)
3. Contextual intro paragraph
4. Problems section (city-specific)
5. Solutions section
6. Service proof block (category expertise)
7. Service gallery (2 images with captions)
8. Local expertise section (city factors)
9. Location CTA (phone + emergency messaging)
10. Review excerpts (3 reviews)
11. Neighborhoods list
12. FAQs (if present)

---

## CTA Dominance Rules

### Primary CTA Requirements

**Location CTA Component:**
- **Visual weight:** Must be the most prominent element in its section
- **Background:** Blue gradient (#0066cc to #0052a3) for high contrast
- **Typography:** Phone number minimum 1.5rem (24px), bold weight
- **Spacing:** Minimum 3rem margin above and below
- **Clickability:** Phone number must be `tel:` link with hover state
- **Emergency messaging:** Must appear when `business.emergency_service: true`

### CTA Placement by Page Type

**City Pages:**
- Position: After service links, before reviews
- Heading: "Need Plumbing Service in {City}?"
- Subtext: "Available 24/7 for emergencies" (if applicable)

**City × Service Pages:**
- Position: After local expertise section, before reviews
- Heading: "Need {Service} in {City}?"
- Subtext: "Available 24/7 for emergencies" (if applicable)

**Service Pages:**
- No CTA (focus on city links and related services)

### CTA Visual Hierarchy

**Desktop (1200px+):**
- CTA width: 100% of content area
- Phone number: Center-aligned, 1.75rem
- Button padding: 2rem vertical, 3rem horizontal

**Tablet (768px-1199px):**
- CTA width: 100%
- Phone number: Center-aligned, 1.5rem
- Button padding: 1.5rem vertical, 2rem horizontal

**Mobile (< 768px):**
- CTA width: 100%
- Phone number: Center-aligned, 1.5rem (minimum)
- Button padding: 1.5rem vertical, 1.5rem horizontal
- Emergency text: 0.9rem minimum for readability

---

## Trust Placement Rules

### Trust Badges Component

**Positioning:**
- **Always:** Immediately after H1 and lead paragraph
- **Never:** Below the fold on first load
- **Mobile:** Stack vertically, maintain visibility

**Visual Requirements:**
- 4 badges: 24/7 Emergency, Licensed & Insured, Family Owned, Cards Accepted
- Icons: Minimum 24px × 24px, maximum 32px × 32px
- Text: Minimum 14px, maximum 16px
- Spacing: Minimum 1rem between badges
- Border: Optional, but if present must be consistent across all badges

**Layout:**
- **Desktop:** Horizontal flex layout, auto-fit grid (min 200px per badge)
- **Tablet:** 2×2 grid
- **Mobile:** Vertical stack, full width

### Trust Sequencing

**Order of trust signals (top to bottom):**
1. Trust badges (immediate, above fold)
2. Service proof block (category expertise - city×service pages only)
3. Review excerpts (social proof - city and city×service pages)
4. Media galleries (visual proof - city and city×service pages)

**Never place:**
- Reviews above service proof
- Media above trust badges
- CTAs above trust badges

---

## Media Placement Rules

### City Gallery (City Pages)

**Positioning:**
- After review excerpts
- Before FAQs
- Never above the fold

**Visual Requirements:**
- 3 images per city page
- Grid layout: auto-fit, min 280px per image
- Aspect ratio: 4:3 or 16:9 (consistent across all images)
- Lazy loading: Required
- Hover effects: Subtle elevation (4px translateY, shadow increase)

**Alt Text:**
- Format: "{description} in {City}"
- Example: "Residential neighborhood street view in Palatine"
- Never keyword stuff

### Service Gallery (City × Service Pages)

**Positioning:**
- After service proof block
- Before local expertise section
- Never above the fold

**Visual Requirements:**
- 2 images per city×service page
- Grid layout: auto-fit, min 300px per image
- Captions: Required below each image
- Category-appropriate images (drain services show drain equipment)
- Lazy loading: Required

**Alt Text:**
- Format: "{Service} service in {City} - {description}"
- Example: "Drain Cleaning service in Palatine - Drain cleaning equipment and work"
- Never keyword stuff

### Image Reuse Efficiency

**City Images:**
- Pool: 8 images total
- Assignment: Hash-based deterministic selection
- Reuse: Each image appears on ~4-5 city pages

**Service Images:**
- Pool: 17 images across 6 categories
- Assignment: Category-based selection
- Reuse: All services in same category share image pool

---

## Mobile-First Constraints

### Breakpoint Strategy

**Mobile (< 768px):**
- Single column layout
- Stacked components
- Full-width CTAs
- Minimum touch target: 44px × 44px
- Font size minimum: 16px (body), 14px (captions)

**Tablet (768px-1199px):**
- 2-column grids where appropriate
- Adapted spacing (reduce from desktop)
- Maintain CTA prominence

**Desktop (1200px+):**
- Multi-column grids
- Generous spacing
- Full navigation visible

### Mobile-First Component Behavior

**Trust Badges:**
- Mobile: Stack vertically, full width
- Tablet: 2×2 grid
- Desktop: Horizontal flex, 4 across

**Service Links:**
- Mobile: Vertical list, full width
- Tablet: 2 columns
- Desktop: 3-4 columns

**Review Excerpts:**
- Mobile: Single column
- Tablet: 2 columns
- Desktop: 3 columns (city pages), 2 columns (city×service pages)

**Media Galleries:**
- Mobile: Single column, full width
- Tablet: 2 columns
- Desktop: 3 columns (city gallery), 2 columns (service gallery)

### Mobile Performance Rules

**Image Optimization:**
- Lazy loading: Required for all images
- Responsive images: Use `srcset` if implementing multiple sizes
- Max image size: 400KB per image

**Touch Targets:**
- Phone numbers: Minimum 44px × 44px
- Navigation links: Minimum 44px × 44px
- Service links: Minimum 44px height

**Scroll Behavior:**
- No horizontal scroll at any breakpoint
- Smooth scroll for anchor links
- Sticky header: Optional, but if present must not exceed 80px height

---

## What NEVER Appears Above the Fold

### Prohibited Above-Fold Elements

**Never place these in the first 600px:**
1. FAQs section
2. Neighborhoods list
3. Media galleries (city or service)
4. Footer
5. Related services (on service pages)
6. Review excerpts (acceptable on city×service pages if space permits, but not required)

### Above-Fold Priority Order

**Must appear (in order):**
1. Navigation header
2. H1 (page title)
3. Trust badges
4. Lead paragraph or description

**May appear (space permitting):**
5. Primary content (problems list, local factors)
6. CTA (if city or city×service page)

**Never appear:**
7. Tertiary content (FAQs, neighborhoods, media)

---

## Component Sequencing Rules

### City Pages Sequence

```
1. H1 + Description
2. Trust Badges
3. Local Factors
4. Service Links (revenue-priority)
5. Location CTA
6. Review Excerpts (4)
7. City Gallery (3 images)
8. Neighborhoods
9. FAQs
```

### Service Pages Sequence

```
1. H1 + Description
2. Trust Badges
3. Problems
4. Solutions
5. Top City Links (8)
6. Related Services (up to 5)
7. FAQs
```

### City × Service Pages Sequence

```
1. H1 + Contextual Intro
2. Trust Badges
3. Problems (city-specific)
4. Solutions
5. Service Proof Block
6. Service Gallery (2 images)
7. Local Expertise (city factors)
8. Location CTA
9. Review Excerpts (3)
10. Neighborhoods
11. FAQs
```

### Sequencing Constraints

**Never reorder:**
- H1 must always be first content element
- Trust badges must always follow H1/description
- CTAs must always appear before reviews
- Media must always appear after service proof (if both present)

**Flexible ordering:**
- Problems vs. Solutions (can swap if UX testing suggests)
- Neighborhoods vs. FAQs (can swap)
- Review excerpts position (can move within lower third of page)

---

## Visual Consistency Rules

### Typography Hierarchy

**Headings:**
- H1: 2.5rem (desktop), 2rem (mobile)
- H2: 2rem (desktop), 1.75rem (mobile)
- H3: 1.5rem (desktop), 1.25rem (mobile)
- Body: 1rem (16px minimum)
- Captions: 0.9rem (14px minimum)

**Font Weights:**
- H1: Bold (700)
- H2: Semi-bold (600)
- H3: Semi-bold (600)
- Body: Regular (400)
- CTA text: Bold (700)

### Color Palette

**Primary:**
- Brand blue: #0066cc
- Dark blue: #0052a3
- Text: #1a1a1a
- Light gray: #f9f9f9

**Accents:**
- Success green: #28a745
- Warning yellow: #ffc107
- Error red: #dc3545

**Backgrounds:**
- White: #ffffff
- Light gray: #f9f9f9
- Service proof: #e3f2fd (light blue)

### Spacing System

**Margin/Padding Scale:**
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)
- 2xl: 4rem (64px)

**Component Spacing:**
- Between sections: 3rem (desktop), 2rem (mobile)
- Between components: 2rem (desktop), 1.5rem (mobile)
- Within components: 1rem

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text on background: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- Interactive elements: Minimum 3:1

**Focus States:**
- All interactive elements must have visible focus indicator
- Focus outline: 2px solid, high contrast color
- Never remove focus styles without replacement

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Tab order must follow visual hierarchy
- Skip links: Optional but recommended

### Screen Reader Optimization

**Alt Text:**
- All images must have descriptive alt text
- Decorative images: Use empty alt (`alt=""`)
- Never duplicate visible text in alt text

**ARIA Labels:**
- Use semantic HTML first
- Add ARIA labels only when semantic HTML insufficient
- Never use ARIA to override semantic meaning

**Heading Structure:**
- One H1 per page
- No skipped heading levels (H1 → H2 → H3, never H1 → H3)
- Headings describe content structure, not visual styling

---

## Performance Budgets

### Page Weight Limits

**Total page weight:**
- Homepage: < 500KB
- City pages: < 600KB
- Service pages: < 500KB
- City × service pages: < 700KB

**Asset Limits:**
- Images: < 400KB per image
- CSS: < 50KB (minified)
- JavaScript: < 100KB (minified)

### Load Time Targets

**First Contentful Paint (FCP):**
- Target: < 1.5s
- Maximum: < 2.5s

**Largest Contentful Paint (LCP):**
- Target: < 2.5s
- Maximum: < 4.0s

**Cumulative Layout Shift (CLS):**
- Target: < 0.1
- Maximum: < 0.25

---

## Change Request Compliance

### Before Making Visual Changes

**Required checks:**
1. Identify page type (homepage, city, service, city×service)
2. Confirm change is presentation-only (no content, schema, or SEO logic)
3. Verify compliance with hierarchy rules
4. Check mobile-first constraints
5. Ensure accessibility requirements met

### Prohibited Changes

**Never modify:**
- Schema generators (LocalBusiness, Service, City, FAQ, Breadcrumb)
- Quality gate thresholds
- Index/noindex logic
- Content JSON files
- Internal linking rules (revenue-priority, top-city selection)
- Data sources (business.json, gbp.json, service-categories.json)

**Only modify:**
- CSS styling
- Component layout (within sequencing rules)
- Typography (within hierarchy rules)
- Spacing (within spacing system)
- Colors (within palette)
- Responsive breakpoints (within mobile-first constraints)

---

## Preview Deployment Workflow

### Branch Strategy

**Branch naming:**
- Format: `visual/[description]`
- Example: `visual/trust-badge-prominence`
- Example: `visual/cta-mobile-spacing`

**Commit messages:**
- Format: `Visual: [description]`
- Example: `Visual: Increase CTA phone number size on mobile`
- Example: `Visual: Adjust trust badge spacing for tablet`

### Testing Requirements

**Before merging to main:**
1. Preview deployment created on Vercel
2. Visual QA completed on preview URL
3. Tested on 3 breakpoints (mobile, tablet, desktop)
4. Tested on 2+ browsers (Chrome, Firefox or Safari)
5. No console errors
6. No layout shifts or broken components

**Approval criteria:**
- All 16 QA URLs tested
- No regressions on existing pages
- Mobile responsive behavior verified
- Accessibility checks passed

---

## Version History

**Version 1.0** - Initial visual architecture principles (Phase 15)  
**Last Updated:** Phase 14 Complete  
**Next Review:** After Phase 15 completion or major visual changes
