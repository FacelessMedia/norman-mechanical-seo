# Norman Mechanical SEO Program — Phase Ledger & Roadmap

> This document is the **operational timeline and checklist** for the project.
> It expands the Master Operating Guide with **granular tasks**, completion status, and future phases.

---

## How to Use This Document
- ✔ = Complete and locked
- 🟡 = In progress / partially complete
- ⏭️ = Next execution target
- 🔒 = Locked (do not revisit unless strategy changes)

If a task is checked ✔, it should **never be rebuilt** unless explicitly marked otherwise.

---

## PHASE 0 — Project Definition & Constraints (LOCKED 🔒)
**Goal:** Eliminate ambiguity before building anything.

✔ Define target business and market (Norman Mechanical, Chicagoland IL only)
✔ Reject WordPress as primary CMS (static-first chosen)
✔ Choose Astro + Vercel stack
✔ Decide content-as-data model (JSON/Markdown)
✔ Define Windsurf as execution-only agent
✔ Define ChatGPT as strategist/system architect

**Outcome:** No architectural decisions remain open.

---

## PHASE 1 — Platform & Build Foundation (COMPLETE ✔)
**Goal:** Create a future-proof technical base that never needs rework.

✔ Astro project scaffolded
✔ Vercel-compatible build configured
✔ Static-first rendering enforced
✔ Git-based deployment workflow established
✔ Clean folder structure created
✔ Dev / build / validate scripts operational

**Outcome:** Platform is stable for 5+ years.

---

## PHASE 2 — Visual & Structural Refactor (COMPLETE ✔)
**Goal:** Remove WordPress/Elementor debt while preserving conversion intent.

✔ Homepage HTML analyzed
✔ Visual layout rebuilt as clean Astro components
✔ Semantic HTML5 structure enforced
✔ Accessibility basics applied (ARIA, headings)
✔ CTA placement preserved
✔ Placeholder media structure defined

**Outcome:** No visual or UX dependency on WordPress.

---

## PHASE 3 — Canonical Entity Truth (COMPLETE ✔)
**Goal:** Eliminate randomness by defining one source of business truth.

✔ GBP data manually ingested
✔ business.json created (canonical NAP + brand entity)
✔ gbp.json created (hours, services, areas, attributes)
✔ Emergency service logic separated from business hours
✔ Phone normalization (display + E.164)
✔ Image/logo paths normalized
✔ Validation rules enforce no invented fields

**Outcome:** Brand entity is deterministic and schema-safe.

---

## PHASE 4 — Schema Architecture (COMPLETE ✔)
**Goal:** Make structured data the backbone, not an add-on.

✔ LocalBusiness / PlumbingService schema generator
✔ Service schema generator
✔ Place/City schema generator
✔ FAQPage schema support
✔ BreadcrumbList schema support
✔ Schema generators read from JSON only
✔ GBP overlay correctly merged
✔ Build fails on schema/field mismatch

**Outcome:** Schema scales automatically with content.

---

## PHASE 5 — Content Validation & Guardrails (COMPLETE ✔)
**Goal:** Prevent silent SEO failure.

✔ Content validation script
✔ Required field enforcement
✔ Slug uniqueness enforcement
✔ Build fails on invalid content
✔ Deterministic builds (repeatable results)

**Outcome:** No bad content can ship accidentally.

---

## PHASE 6 — Geographic Purity Enforcement (COMPLETE ✔)
**Goal:** Ensure Chicagoland-only focus permanently.

✔ Hard purge of non-IL locations
✔ Illinois-only state enforcement
✔ City allowlist implemented
✔ Geo string ban scanner (AZ, Phoenix, etc.)
✔ Word-boundary regex to avoid false positives
✔ Build fails on geo contamination

**Outcome:** Geographic scope cannot drift.

---

## PHASE 7 — Semantic Taxonomy System (COMPLETE ✔)
**Goal:** Enable semantic depth without thin content.

✔ Service categories defined
✔ Revenue-priority services marked
✔ Service semantic branches defined:
  - symptoms
  - causes
  - solutions
  - tools/methods
  - pricing factors
  - preventative maintenance
  - emergency triggers
✔ Branch data stored as structured phrases

**Outcome:** Services have depth without manual writing.

---

## PHASE 8 — Quality Gates & Index Control (COMPLETE ✔)
**Goal:** Control what Google is allowed to index.

✔ Build-time quality gate checks
✔ City+service pages evaluated
✔ Automatic noindex on failure
✔ Quality gate reporting
✔ Index rate visibility

**Outcome:** Crawl budget and quality are protected.

---

## PHASE 9 — Chicagoland Location Expansion (COMPLETE ✔)
**Goal:** Build 10–12 real, locally grounded city pages.

✔ All 12 IL cities created with full JSON files
✔ Each city includes:
  - neighborhoods (5–12)
  - landmarks (5–12)
  - local_factors (5–10)
  - city_faqs (6–10)

**Outcome:** 12 indexable Chicagoland city hubs.

---

## PHASE 10 — Service Expansion to 20+ (COMPLETE ✔)
**Goal:** Cover all revenue-driving plumbing services.

✔ GBP services list normalized (21 services)
✔ Each service has:
  - Individual service JSON file
  - Category assignment
  - Short description
  - FAQs (5–8)
  - Related services
✔ Semantic branches meet minimum counts

**Outcome:** 21 authoritative service pages.

---

## PHASE 11 — City × Service Scaling (COMPLETE ✔)
**Goal:** Multiply reach without multiplying risk.

✔ City×service pages generated automatically (264 pages)
✔ Quality gates enforced before indexing
✔ Index rate maintained at 95.5% (252/264 indexable)
✔ No manual editing of combo pages

**Outcome:** High-converting long-tail coverage.

---

## PHASE 12 — Internal Linking Optimization (COMPLETE ✔)
**Goal:** Concentrate authority where it matters.

✔ Revenue services prioritized in city pages
✔ Top cities prioritized in service pages (by neighborhood count)
✔ Region hubs distribute equity without indexing
✔ Automated anchor text variation

---

## PHASE 13 — Conversion & Proof Layer (COMPLETE ✔)
**Goal:** Turn rankings into calls.

✔ Featured review excerpts injected (8 authentic reviews from GBP)
✔ Job-type proof blocks added (tied to service categories)
✔ Trust badges & guarantees implemented (4 badges)
✔ Location-specific CTAs deployed

---

## PHASE 14 — Media & Local Proof Expansion (COMPLETE ✔)
**Goal:** Increase E-E-A-T signals.

✔ City-specific image galleries (8 images, hash-based assignment)
✔ Service-specific job photos (17 images, category-based assignment)
✔ Alt text tied to service + city (programmatic generation)
✔ Media reused across pages via deterministic rules

---

## PHASE 15 — Visual Architecture & UX Refinement (IN PROGRESS 🟡)
**Goal:** Optimize presentation layer for conversion and usability.

**Scope:**
- Layout, hierarchy, spacing, and component sequencing
- CTA dominance and trust signal placement
- Mobile-first responsive behavior
- Visual consistency and accessibility

**Explicitly Out of Scope:**
- Content changes
- SEO logic modifications
- Schema alterations
- Quality gate adjustments
- Indexing behavior changes

**Deployment:** Preview branches first, production only after visual QA

**Governing Document:** `docs/visual-architecture-principles.md`

---

## PHASE 16 — Ongoing Growth Loop (FUTURE 🔒)
**Goal:** Hands-off expansion.

⏭️ Add new city → system scales
⏭️ Add new service → system scales
⏭️ Update GBP → overlay updates schema
⏭️ No architecture changes required

---

## Current Project Position (Snapshot)
- **Completed:** Phases 0–14
- **Active:** Phase 15 (Visual Architecture & UX Refinement)
- **Next Execution Focus:** Visual QA on deployed site, cosmetic refinements based on findings

---

## Resume Instruction (Copy/Paste)

"Continue the *Norman Mechanical SEO Program*.
Reference the *Master Operating Guide* and the *Phase Ledger & Roadmap*.
Current work: Phase 15 (Visual Architecture & UX).
Do not revisit completed phases."

---

## Operating Principle

Discipline scales. Disorder multiplies cost.
This ledger exists so momentum never depends on memory.

