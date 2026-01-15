# VISUAL QA 404 MAP

**Generated:** 2026-01-14  
**Branch:** visual/global-shell-header-footer  
**Total 404 Requests:** 1,141  
**Unique Missing Paths:** 20

---

## SUMMARY

All missing resources are **images** (no CSS, JS, or font 404s). These are presentation assets referenced by homepage components and city/service gallery components.

### Missing Path Categories

| Category | Count | Status |
|----------|-------|--------|
| Homepage Hero/Service Icons | 6 | Need creation |
| City Gallery Images | 8 | Need creation |
| Service Gallery Images | 6 | Need creation |
| **TOTAL** | **20** | **All images** |

---

## DEDUPED MISSING PATHS

### 1. Homepage Hero & Service Highlights (6 files)

#### `/images/norman-van.webp`
- **Referenced in:** `src/components/Hero.astro:23`
- **Expected location:** `public/images/norman-van.webp`
- **Exists in repo:** ❌ No
- **Resource type:** image (webp)
- **Affected pages:** Homepage (all breakpoints)
- **Resolution:** Create placeholder webp image (800×314px)

#### `/images/van-animation.gif`
- **Referenced in:** `src/components/Hero.astro` (likely)
- **Expected location:** `public/images/van-animation.gif`
- **Exists in repo:** ❌ No
- **Resource type:** image (gif)
- **Affected pages:** Homepage (all breakpoints)
- **Resolution:** Create placeholder gif or static image

#### `/images/icons/drain.png`
- **Referenced in:** `src/components/ServiceHighlights.astro:5`
- **Expected location:** `public/images/icons/drain.png`
- **Exists in repo:** ❌ No (icons/ folder exists but empty)
- **Resource type:** image (png)
- **Affected pages:** Homepage (all breakpoints)
- **Resolution:** Create placeholder icon (64×64px recommended)

#### `/images/icons/water-line.png`
- **Referenced in:** `src/components/ServiceHighlights.astro:10`
- **Expected location:** `public/images/icons/water-line.png`
- **Exists in repo:** ❌ No
- **Resource type:** image (png)
- **Affected pages:** Homepage (all breakpoints)
- **Resolution:** Create placeholder icon (64×64px recommended)

#### `/images/icons/water-heater.png`
- **Referenced in:** `src/components/ServiceHighlights.astro:15`
- **Expected location:** `public/images/icons/water-heater.png`
- **Exists in repo:** ❌ No
- **Resource type:** image (png)
- **Affected pages:** Homepage (all breakpoints)
- **Resolution:** Create placeholder icon (64×64px recommended)

#### `/images/icons/sewer.png`
- **Referenced in:** `src/components/ServiceHighlights.astro:20`
- **Expected location:** `public/images/icons/sewer.png`
- **Exists in repo:** ❌ No
- **Resource type:** image (png)
- **Affected pages:** Homepage (all breakpoints)
- **Resolution:** Create placeholder icon (64×64px recommended)

---

### 2. City Gallery Images (8 files)

All referenced via `src/components/media/CityGallery.astro:25` using dynamic path construction: `/images/cities/${image.filename}`

#### `/images/cities/residential-neighborhood-1.jpg`
- **Expected location:** `public/images/cities/residential-neighborhood-1.jpg`
- **Exists in repo:** ❌ No (cities/ folder does not exist)
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages (palatine, elgin, naperville)
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/cities/residential-neighborhood-2.jpg`
- **Expected location:** `public/images/cities/residential-neighborhood-2.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/cities/residential-neighborhood-3.jpg`
- **Expected location:** `public/images/cities/residential-neighborhood-3.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/cities/commercial-district-1.jpg`
- **Expected location:** `public/images/cities/commercial-district-1.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/cities/commercial-district-2.jpg`
- **Expected location:** `public/images/cities/commercial-district-2.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/cities/local-landmark-1.jpg`
- **Expected location:** `public/images/cities/local-landmark-1.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/cities/local-landmark-2.jpg`
- **Expected location:** `public/images/cities/local-landmark-2.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/cities/local-landmark-3.jpg`
- **Expected location:** `public/images/cities/local-landmark-3.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City detail pages
- **Resolution:** Create placeholder jpg (400×300px)

---

### 3. Service Gallery Images (6 files)

All referenced via `src/components/media/ServiceGallery.astro:26` using dynamic path construction: `/images/services/${image.filename}`

#### `/images/services/faucet-installation.jpg`
- **Expected location:** `public/images/services/faucet-installation.jpg`
- **Exists in repo:** ❌ No (services/ folder does not exist)
- **Resource type:** image (jpg)
- **Affected pages:** City×Service pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/services/toilet-installation.jpg`
- **Expected location:** `public/images/services/toilet-installation.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City×Service pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/services/water-heater-installation.jpg`
- **Expected location:** `public/images/services/water-heater-installation.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City×Service pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/services/tankless-water-heater.jpg`
- **Expected location:** `public/images/services/tankless-water-heater.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City×Service pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/services/drain-cleaning-work.jpg`
- **Expected location:** `public/images/services/drain-cleaning-work.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City×Service pages
- **Resolution:** Create placeholder jpg (400×300px)

#### `/images/services/sewer-line-repair.jpg`
- **Expected location:** `public/images/services/sewer-line-repair.jpg`
- **Exists in repo:** ❌ No
- **Resource type:** image (jpg)
- **Affected pages:** City×Service pages
- **Resolution:** Create placeholder jpg (400×300px)

---

## RESOLUTION STRATEGY

### Phase 1: Create Directory Structure
```
public/images/
├── icons/          (exists, empty)
├── cities/         (CREATE)
└── services/       (CREATE)
```

### Phase 2: Generate Placeholder Assets

All placeholders will be minimal valid images to eliminate 404s:

1. **Homepage assets (6 files):**
   - `norman-van.webp` - 800×314px webp
   - `van-animation.gif` - static placeholder or minimal gif
   - 4 service icons - 64×64px png each

2. **City gallery (8 files):**
   - All 400×300px jpg placeholders

3. **Service gallery (6 files):**
   - All 400×300px jpg placeholders

### Phase 3: No Code Changes Required

All paths are already correct in components. This is purely a missing asset issue, not a code/routing issue.

---

## RISK ASSESSMENT

✅ **LOW RISK** - All missing resources are presentation images  
✅ **NO CODE CHANGES** - Paths are correct, just need files  
✅ **NO SCHEMA IMPACT** - Images are not part of structured data  
✅ **NO SEO IMPACT** - Alt text and meta already correct  
✅ **NO ROUTING IMPACT** - Static assets only

---

## IMPLEMENTATION NOTES

- All placeholders should be lightweight (<50KB each if possible)
- Use solid colors or simple gradients for placeholders
- Maintain exact filenames as referenced in components
- Do NOT modify component code or content JSON
- These can be replaced with real assets post-deployment
