# Vercel Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Norman Mechanical SEO site to Vercel for production hosting and visual QA review.

---

## Prerequisites

- Git repository pushed to GitHub, GitLab, or Bitbucket
- Vercel account (free tier sufficient)
- Repository contains validated content and passing build

---

## Verified Build Configuration

**Install Command:**
```bash
npm install
```

**Build Command:**
```bash
npm run build
```
- Executes validation, quality gates, and Astro build
- Expected duration: ~5 seconds
- Expected output: 301 pages

**Output Directory:**
```
dist/
```

**Framework:** Astro (auto-detected by Vercel)

**Node.js Version:** 18.x or 20.x (Vercel default)

**Environment Variables:** None required

---

## Step-by-Step Deployment Instructions

### Step 1: Import Repository

1. Navigate to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Vercel if first-time setup
5. Search for: `norman-mechanical-seo`
6. Click **"Import"**

---

### Step 2: Configure Project Settings

Vercel should auto-detect Astro framework. Verify the following settings:

**Framework Preset:** Astro

**Build & Development Settings:**

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Development Command | `npm run dev` |

**Root Directory:** `.` (repository root)

**Node.js Version:** 18.x or 20.x (default)

---

### Step 3: Environment Variables

**Action:** Skip this section

No environment variables are required. All data is sourced from static JSON files at build time.

---

### Step 4: Deploy

1. Review configuration summary
2. Click **"Deploy"**
3. Monitor build logs for:
   - ✅ Geographic integrity check passed
   - ✅ All content validation passed
   - ✅ Quality gate analysis complete (252/264 indexable)
   - ✅ 301 page(s) built
   - ✅ Build Complete!

**Expected Build Time:** 5-10 seconds

**Production URL:** `https://norman-mechanical-seo-[hash].vercel.app`

---

### Step 5: Verify Deployment

**Quick Verification Checklist:**

- [ ] Production URL loads successfully
- [ ] Homepage displays correctly
- [ ] Navigate to `/locations` - city list visible
- [ ] Navigate to `/services` - service list visible
- [ ] Click into one city page - components render
- [ ] Click into one service page - components render
- [ ] Click into one city×service page - all conversion/media components visible

---

## Preview Deployments for Cosmetic Review

### Purpose

Preview Deployments allow you to review cosmetic changes (CSS, layout, typography) in isolation before merging to production.

### Workflow

#### 1. Create Feature Branch

```bash
git checkout -b cosmetic/[description]
```

Example: `cosmetic/trust-badge-styling`

#### 2. Make Cosmetic Changes

**Allowed Changes:**
- CSS styling updates
- Component layout adjustments
- Typography changes
- Color scheme updates
- Spacing/padding modifications
- Responsive design tweaks

**Prohibited Changes:**
- Schema modifications
- Quality gate adjustments
- Content model changes
- Adding/removing cities or services
- Validation rule changes

#### 3. Commit and Push

```bash
git add .
git commit -m "Cosmetic: [describe change]"
git push origin cosmetic/[description]
```

#### 4. Automatic Preview Deployment

- Vercel automatically deploys every pushed branch
- Preview URL: `https://norman-mechanical-seo-[hash]-[branch].vercel.app`
- Build logs available in Vercel Dashboard → Deployments

#### 5. Review Preview

1. Go to Vercel Dashboard → Project → Deployments
2. Find deployment for your branch
3. Click **"Visit"** to open preview URL
4. Use Visual QA Pack (see `docs/visual-qa-pack.md`) to verify changes
5. Share preview URL with stakeholders for review

#### 6. Iterate or Merge

**If changes needed:**
```bash
# Make adjustments
git add .
git commit -m "Adjust: [describe adjustment]"
git push origin cosmetic/[description]
# New preview auto-generated
```

**If approved:**
```bash
git checkout main
git merge cosmetic/[description]
git push origin main
# Production deployment auto-triggered
```

---

## Custom Domain Setup (Optional)

### Add Custom Domain

1. Navigate to Project Settings → Domains
2. Click **"Add"**
3. Enter domain: `normanmechanicalinc.com` (or subdomain)
4. Click **"Add"**

### Configure DNS

Vercel provides DNS records:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record (for www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Add these records to your domain registrar's DNS settings.

**DNS Propagation:** 5-60 minutes

**SSL Certificate:** Auto-provisioned by Vercel (HTTPS enabled automatically)

---

## What to Do If Build Fails

### Step 1: Read Build Logs

1. Go to Vercel Dashboard → Project → Deployments
2. Click on the failed deployment
3. Click **"Build Logs"** tab
4. Scroll through logs to identify error

### Step 2: Identify Error Type

**Common Error Patterns:**

#### Geographic Integrity Failure
```
🚫 Banned geographic terms found!
```
**Action:** Review logs for banned terms (Phoenix, Scottsdale, Tempe, AZ, Arizona). These should not appear in content files.

#### Content Validation Failure
```
❌ Validation failed for [file]
```
**Action:** Review logs for specific validation errors. Check JSON syntax and required fields in the failing file.

#### Quality Gate Issues
```
🚫 Pages Failing Quality Gates: [number]
```
**Note:** This is informational only. Pages failing quality gates receive noindex meta tags but do not fail the build.

#### Astro Build Failure
```
[ERROR] [file] - [error message]
```
**Action:** Review logs for TypeScript errors, missing imports, or component issues.

### Step 3: Local Verification

Before pushing fixes, verify locally:

```bash
# Run validation
npm run validate

# Run quality gates
npm run quality-gates

# Run build
npm run build

# Preview locally
npm run preview
```

All commands should complete successfully before pushing to trigger new deployment.

### Step 4: Review Recent Changes

If build was previously successful:
- Check recent commits for changes to:
  - Content JSON files
  - Component files
  - Schema generators
  - Validation scripts

Use `git diff` to review changes:
```bash
git diff HEAD~1 HEAD
```

### Step 5: Rollback if Needed

If unable to identify issue quickly:

1. Go to Vercel Dashboard → Project → Deployments
2. Find last successful deployment
3. Click **"..."** menu → **"Promote to Production"**
4. This restores previous working version while you debug

### Step 6: Get Help

If build failure persists:
- Copy full build log output
- Note the specific error message
- Review Phase Ledger & Roadmap for constraints
- Ensure no prohibited changes were made (schema, quality gates, content models)

---

## Monitoring & Analytics

### Build Analytics

**Location:** Vercel Dashboard → Project → Analytics

**Metrics:**
- Build duration (~5s expected)
- Build success rate
- Deployment frequency

### Performance Monitoring

**Location:** Vercel Dashboard → Project → Speed Insights (if enabled)

**Metrics:**
- Page load times
- Core Web Vitals
- Geographic performance

### Deployment History

**Location:** Vercel Dashboard → Project → Deployments

**Information:**
- All deployments (production + preview)
- Build logs for each deployment
- Deployment status and duration
- Git commit associated with each deployment

---

## Important Notes

### Build Command Behavior

- **Validation runs first:** Geographic term check and content validation
- **Quality gates run second:** 252/264 pages expected to pass (95.5% index rate)
- **12 pages receive noindex:** Pipe-repair service lacks sufficient semantic data (expected behavior)
- **Build completes successfully:** Even with noindex pages present

### Static Site Generation

- All 301 pages pre-rendered at build time
- No server-side rendering
- No serverless functions required
- No edge functions required
- Pure static HTML/CSS/JS output

### Content Updates

To update content:
1. Modify JSON files in `content/` directory
2. Commit and push changes
3. Vercel auto-triggers rebuild
4. Validation and quality gates run automatically
5. New static site deployed to CDN

---

## Quick Reference

| Action | Command/Location |
|--------|------------------|
| Deploy to production | Push to `main` branch |
| Create preview | Push to any other branch |
| View build logs | Vercel Dashboard → Deployments → [Deployment] → Build Logs |
| Add custom domain | Project Settings → Domains |
| Rollback deployment | Deployments → [Previous] → Promote to Production |
| Local validation | `npm run validate` |
| Local build | `npm run build` |
| Local preview | `npm run preview` |

---

**Deployment Guide Version:** 1.0  
**Last Updated:** Phase 14 Complete  
**Next Review:** After cosmetic changes or content updates
