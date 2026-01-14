# Visual QA & Cosmetic Review Pack

## Overview

This document provides a deterministic sampling plan and component verification checklist for visual QA of the deployed Norman Mechanical SEO site. Use this pack after deploying to Vercel to ensure all Phase 12-14 components render correctly.

---

## Deterministic URL Sampling Plan

### Sampling Criteria

- **Top 3 Cities:** Palatine, Naperville, Schaumburg (8 neighborhoods each)
- **Revenue-Priority Services:** Drain Cleaning, Sewer Repair, Water Heater Installation
- **Noindex Example:** Pipe Repair (fails quality gates due to insufficient semantic data)

### Replace `[VERCEL-URL]` with Your Deployment URL

Example: `https://norman-mechanical-seo-abc123.vercel.app`

---

## QA URL List

### Core Pages (3 URLs)

| # | Page Type | URL | Purpose |
|---|-----------|-----|---------|
| 1 | Homepage | `[VERCEL-URL]/` | Verify base layout, navigation, hero |
| 2 | Locations Hub | `[VERCEL-URL]/locations` | Verify city listing, region hub behavior |
| 3 | Services Hub | `[VERCEL-URL]/services` | Verify service listing, category organization |

---

### City Pages (3 URLs)

| # | City | URL | Neighborhoods | Components to Verify |
|---|------|-----|---------------|---------------------|
| 4 | Palatine | `[VERCEL-URL]/locations/palatine` | 8 | Trust badges, CTA, 4 reviews, 3 city images, revenue-priority service links |
| 5 | Naperville | `[VERCEL-URL]/locations/naperville` | 8 | Trust badges, CTA, 4 reviews, 3 city images, revenue-priority service links |
| 6 | Schaumburg | `[VERCEL-URL]/locations/schaumburg` | 8 | Trust badges, CTA, 4 reviews, 3 city images, revenue-priority service links |

---

### Service Pages (3 URLs)

| # | Service | URL | Category | Components to Verify |
|---|---------|-----|----------|---------------------|
| 7 | Drain Cleaning | `[VERCEL-URL]/services/drain-cleaning` | Drain & Sewer (Revenue) | Trust badges, top 8 city links, related services |
| 8 | Sewer Repair | `[VERCEL-URL]/services/sewer-repair` | Drain & Sewer (Revenue) | Trust badges, top 8 city links, related services |
| 9 | Water Heater Installation | `[VERCEL-URL]/services/water-heater-installation` | Water Heaters (Revenue) | Trust badges, top 8 city links, related services |

---

### City × Service Pages (6 URLs)

| # | City | Service | URL | Components to Verify |
|---|------|---------|-----|---------------------|
| 10 | Palatine | Drain Cleaning | `[VERCEL-URL]/locations/palatine/drain-cleaning` | Trust badges, service proof, CTA, 3 reviews, 2 service images |
| 11 | Palatine | Sewer Repair | `[VERCEL-URL]/locations/palatine/sewer-repair` | Trust badges, service proof, CTA, 3 reviews, 2 service images |
| 12 | Naperville | Drain Cleaning | `[VERCEL-URL]/locations/naperville/drain-cleaning` | Trust badges, service proof, CTA, 3 reviews, 2 service images |
| 13 | Naperville | Water Heater Installation | `[VERCEL-URL]/locations/naperville/water-heater-installation` | Trust badges, service proof, CTA, 3 reviews, 2 service images |
| 14 | Schaumburg | Sewer Repair | `[VERCEL-URL]/locations/schaumburg/sewer-repair` | Trust badges, service proof, CTA, 3 reviews, 2 service images |
| 15 | Schaumburg | Water Heater Installation | `[VERCEL-URL]/locations/schaumburg/water-heater-installation` | Trust badges, service proof, CTA, 3 reviews, 2 service images |

---

### Noindex Page Example (1 URL)

| # | City | Service | URL | Purpose |
|---|------|---------|-----|---------|
| 16 | Palatine | Pipe Repair | `[VERCEL-URL]/locations/palatine/pipe-repair` | Verify noindex meta tag, page still renders, components present |

**Note:** Noindex pages should still display all conversion/media components. Check HTML source for `<meta name="robots" content="noindex,follow">`.

---

## Component Verification Checklist by Page Type

### 1. Homepage (`/`)

**Phase 12-14 Components:**
- [ ] **Navigation:** Links to /locations and /services visible
- [ ] **Trust Badges:** 4 badges displayed (24/7, Licensed, Family Owned, Cards Accepted)
- [ ] **Responsive:** Mobile menu works, layout adapts

**Visual Checks:**
- [ ] Logo displays correctly
- [ ] Hero section readable
- [ ] CTA button prominent
- [ ] Footer present

---

### 2. Locations Hub (`/locations`)

**Phase 12-14 Components:**
- [ ] **City List:** 12 cities displayed
- [ ] **Internal Links:** All city links functional
- [ ] **Region Hub:** Chicagoland not linked (indexable: false)

**Visual Checks:**
- [ ] City names alphabetized or organized
- [ ] Links styled consistently
- [ ] Page title/description present

---

### 3. Services Hub (`/services`)

**Phase 12-14 Components:**
- [ ] **Service List:** 21 services displayed
- [ ] **Internal Links:** All service links functional
- [ ] **Revenue Priority:** Revenue services appear first (if sorted)

**Visual Checks:**
- [ ] Service names clear
- [ ] Links styled consistently
- [ ] Page title/description present

---

### 4. City Pages (`/locations/[city]`)

**Phase 12 Components (Internal Linking):**
- [ ] **Revenue-Priority Service Links:** First 10 services prioritize revenue categories
  - Drain & Sewer services listed first
  - Water Heaters services listed early
  - Plumbing Repairs services listed early
  - Pumps & Drainage services listed early
- [ ] **Service Links:** All links formatted as `/locations/[city]/[service]`
- [ ] **Link Count:** 10 service links displayed

**Phase 13 Components (Conversion):**
- [ ] **Trust Badges:** 4 badges visible (24/7, Licensed, Family Owned, Cards)
  - Icons display correctly
  - Text readable
  - Responsive layout
- [ ] **Location CTA:** Prominent call-to-action block
  - Heading: "Need Plumbing Service in {City}?"
  - Subtext: Emergency service messaging
  - Phone number: (773) 466-7626 clickable
  - Blue gradient background
- [ ] **Review Excerpts:** 4 customer reviews displayed
  - Quote text visible
  - Author names present
  - Grid layout (3 columns on desktop)

**Phase 14 Components (Media):**
- [ ] **City Gallery:** 3 city images displayed
  - Heading: "Serving {City}"
  - Images load correctly
  - Hover effects work
  - Grid layout responsive

**Alt Text Verification (Spot Check):**
- [ ] Right-click any city image → Inspect → Check `alt` attribute
- [ ] Format should be: "{description} in {City}"
- [ ] Example: "Residential neighborhood street view in Palatine"

**Responsive Checks:**
- [ ] **Desktop (1200px+):** Multi-column grids, full navigation
- [ ] **Tablet (768px-1199px):** 2-column grids, adapted layout
- [ ] **Mobile (< 768px):** Single column, stacked components, hamburger menu

**Content Integrity:**
- [ ] City name in H1
- [ ] Description paragraph present
- [ ] Local factors list (3+ items)
- [ ] Neighborhoods list (8 items for sampled cities)
- [ ] FAQs section (if present)

---

### 5. Service Pages (`/services/[service]`)

**Phase 12 Components (Internal Linking):**
- [ ] **Top City Links:** 8 city links displayed
  - Cities sorted by neighborhood count (Palatine, Naperville, Schaumburg, etc.)
  - Links formatted as `/locations/[city]/[service]`
  - Section heading: "Available in These Areas"
- [ ] **Related Services:** Up to 5 related service links
  - Links formatted as `/services/[related-service]`

**Phase 13 Components (Conversion):**
- [ ] **Trust Badges:** 4 badges visible
- [ ] **No CTA:** Service pages do not have Location CTA (correct)
- [ ] **No Reviews:** Service pages do not have review excerpts (correct)

**Phase 14 Components (Media):**
- [ ] **No Gallery:** Service pages do not have image galleries (correct)

**Content Integrity:**
- [ ] Service name in H1
- [ ] Description paragraph
- [ ] Problems list (3+ items)
- [ ] Solutions list (3+ items)
- [ ] FAQs section (if present)

**Responsive Checks:**
- [ ] City links grid adapts to screen size
- [ ] Trust badges stack on mobile

---

### 6. City × Service Pages (`/locations/[city]/[service]`)

**Phase 12 Components (Internal Linking):**
- [ ] **Breadcrumb Navigation:** Locations / {City} / {Service}
- [ ] **Related Links Section:** Links to service page and city page

**Phase 13 Components (Conversion):**
- [ ] **Trust Badges:** 4 badges visible at top
- [ ] **Service Proof Block:** Category-specific proof points
  - Heading: "{Category} Expertise" (e.g., "Drain & Sewer Expertise")
  - 4 proof points with checkmarks
  - Blue background box
  - Correct category for service (drain-cleaning → Drain & Sewer)
- [ ] **Location CTA:** Prominent call-to-action block
  - Heading: "Need {Service} in {City}?"
  - Phone number clickable
  - Emergency messaging
- [ ] **Review Excerpts:** 3 customer reviews displayed
  - Quote text visible
  - Author names present
  - Grid layout

**Phase 14 Components (Media):**
- [ ] **Service Gallery:** 2 service images displayed
  - Heading: "{Service} Work Examples"
  - Images load correctly
  - Captions present below images
  - Category-appropriate images (drain services show drain equipment)

**Alt Text Verification (Spot Check):**
- [ ] Right-click any service image → Inspect → Check `alt` attribute
- [ ] Format should be: "{Service} service in {City} - {description}"
- [ ] Example: "Drain Cleaning service in Palatine - Drain cleaning equipment and work"

**Responsive Checks:**
- [ ] All components stack properly on mobile
- [ ] Service gallery switches to single column
- [ ] CTA button remains prominent
- [ ] Trust badges remain readable

**Content Integrity:**
- [ ] H1: "{Service} in {City}, IL"
- [ ] Contextual intro paragraph
- [ ] Problems section specific to city
- [ ] Solutions section
- [ ] Local expertise section
- [ ] Neighborhoods list

---

### 7. Noindex Page Example (`/locations/palatine/pipe-repair`)

**Noindex Verification:**
- [ ] **View Page Source** (Ctrl+U or Cmd+U)
- [ ] Search for: `<meta name="robots" content="noindex,follow">`
- [ ] Confirm tag is present in `<head>`

**Component Presence (Should Still Render):**
- [ ] Trust badges visible
- [ ] Service proof block visible (Plumbing Repairs category)
- [ ] Location CTA visible
- [ ] Review excerpts visible
- [ ] Service gallery visible (2 images)

**Quality Gate Indicator:**
- [ ] Page renders normally despite noindex
- [ ] No error messages
- [ ] All conversion/media components function

**Purpose:** Verify that noindex pages still provide full user experience, only excluded from search indexing.

---

## Cosmetic Change Request Template

Use this template to document any cosmetic changes needed after visual QA review.

---

### Change Request #: _____ 
**Date:** ___________  
**Reviewer:** ___________

---

#### 1. WHAT TO CHANGE

**Component Name:**  
_Example: Trust Badges, Location CTA, Review Excerpts, City Gallery, Service Gallery, Service Proof Block, etc._

**Page Type(s) Affected:**  
☐ Homepage  
☐ Locations Hub  
☐ Services Hub  
☐ City Pages  
☐ Service Pages  
☐ City × Service Pages  
☐ All Pages  

**Current State (Describe what you see):**  
_Example: Trust badges have gray borders and small icons. Text is 14px. Badges are left-aligned._

**Desired State (Describe what you want):**  
_Example: Trust badges should have blue borders matching brand color (#0066cc). Icons should be 20% larger. Badges should be center-aligned. Text should be 16px for better readability._

---

#### 2. WHY (Rationale)

**Primary Goal:**  
☐ Improve clarity/readability  
☐ Increase conversion potential  
☐ Enhance usability  
☐ Fix visual inconsistency  
☐ Improve mobile experience  
☐ Align with brand guidelines  
☐ Other: ___________

**Detailed Rationale:**  
_Example: Current trust badges blend into background and don't draw enough attention. Larger icons and blue borders will increase visual prominence and reinforce brand identity. Center alignment creates better visual balance on city pages._

**Expected Impact:**  
_Example: Increased trust signal visibility may improve time-on-page and reduce bounce rate. Better mobile readability will improve user experience on smaller screens._

---

#### 3. CONSTRAINT CHECK (REQUIRED)

**Confirm this change does NOT affect:**

☐ **Schema/Structured Data:** No changes to LocalBusiness, Service, City, FAQ, or Breadcrumb schema  
☐ **Quality Gates:** No changes to validation thresholds (≥3 local factors, ≥5 symptoms/causes, ≥6 FAQs)  
☐ **Content Models:** No changes to JSON structure in content/ directory  
☐ **Index/Noindex Logic:** No changes to quality gate pass/fail behavior  
☐ **Internal Linking Rules:** No changes to revenue-priority or top-city selection logic  
☐ **Data Sources:** No changes to business.json, gbp.json, or service-categories.json  
☐ **Architecture:** No new components, only styling changes to existing components  

**If ANY box above is unchecked, this change requires Phase Ledger review and may be out of scope for cosmetic changes.**

---

#### 4. TECHNICAL DETAILS

**Files to Modify (Estimated):**  
_Example: src/components/conversion/TrustBadges.astro (CSS only)_

**Change Type:**  
☐ CSS/Styling only  
☐ Layout/spacing adjustment  
☐ Typography change  
☐ Color scheme update  
☐ Responsive breakpoint adjustment  
☐ Image styling (not content)  
☐ Component positioning  

**Affected Breakpoints:**  
☐ Desktop (1200px+)  
☐ Tablet (768px-1199px)  
☐ Mobile (< 768px)  
☐ All breakpoints  

---

#### 5. ACCEPTANCE CRITERIA

**How will we know this change is complete and correct?**

**Visual Verification:**  
- [ ] _Example: Trust badges display with blue (#0066cc) borders_
- [ ] _Example: Badge icons are visibly larger (20% increase)_
- [ ] _Example: Badges are center-aligned on all page types_
- [ ] _Example: Text is 16px and easily readable_

**Responsive Verification:**  
- [ ] _Example: Badges stack vertically on mobile (< 768px)_
- [ ] _Example: Spacing remains consistent across breakpoints_

**Cross-Browser Verification:**  
- [ ] _Example: Tested in Chrome, Firefox, Safari_
- [ ] _Example: No layout breaks or rendering issues_

**Performance Check:**  
- [ ] _Example: No impact on page load time_
- [ ] _Example: No console errors introduced_

---

#### 6. PREVIEW DEPLOYMENT VERIFICATION

**Preview URL:** ___________  
**Branch Name:** ___________

**Sampled Pages Checked:**  
- [ ] Homepage  
- [ ] 1 City Page: ___________  
- [ ] 1 Service Page: ___________  
- [ ] 1 City × Service Page: ___________  

**Approval Status:**  
☐ Approved for production merge  
☐ Needs revision (see notes below)  
☐ Rejected (does not meet acceptance criteria)  

**Notes:**  
_______________________________________  
_______________________________________  
_______________________________________

---

#### 7. DEPLOYMENT TRACKING

**Git Branch:** ___________  
**Commit Hash:** ___________  
**Preview Deployment Date:** ___________  
**Production Deployment Date:** ___________  
**Deployed By:** ___________

---

## Quick Reference

### Browser DevTools Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Open DevTools | F12 or Ctrl+Shift+I | Cmd+Option+I |
| View Page Source | Ctrl+U | Cmd+U |
| Inspect Element | Ctrl+Shift+C | Cmd+Shift+C |
| Responsive Mode | Ctrl+Shift+M | Cmd+Option+M |

### Common Responsive Breakpoints

| Device | Width | Notes |
|--------|-------|-------|
| Mobile | < 768px | Single column, stacked components |
| Tablet | 768px - 1199px | 2-column grids, adapted layout |
| Desktop | 1200px+ | Multi-column grids, full navigation |

### Phase 12-14 Component Summary

| Phase | Components Added | Pages Affected |
|-------|------------------|----------------|
| Phase 12 | Internal linking (revenue-priority, top cities) | City, Service pages |
| Phase 13 | Trust badges, CTAs, reviews, service proof | City, City×Service pages |
| Phase 14 | City gallery, service gallery, alt text | City, City×Service pages |

---

**Visual QA Pack Version:** 1.0  
**Last Updated:** Phase 14 Complete  
**Next Review:** After cosmetic changes or major updates
