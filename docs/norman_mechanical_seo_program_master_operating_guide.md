# Norman Mechanical SEO Program — Master Operating Guide

> **Authoritative Reference:** If there is any conflict, the **Phase Ledger & Roadmap** (`norman_mechanical_seo_program_phase_ledger_roadmap.md`) overrides this document.

This guide defines the **identity, architecture, guardrails, and operating rules** of the Norman Mechanical SEO Program. It exists to eliminate re-explanation, prevent drift, and ensure long-term system integrity.

---

## 1. Project Identity
- **Business:** Norman Mechanical Inc
- **Market:** Chicagoland, Illinois ONLY
- **Industry:** Plumbing / Mechanical Services
- **Primary Goal:** Rank and convert across 10–12 Chicagoland cities × 20+ plumbing services
- **Time Horizon:** 5+ years, minimal maintenance

---

## 2. Operating Roles (Locked)

### ChatGPT
**Role:** Strategic Architect & System Governor
- Designs systems and rules
- Defines phases and sequencing
- Enforces guardrails
- Reviews and approves execution

### Windsurf
**Role:** Execution Engine
- Writes files and code
- Runs builds and validation
- Reports results
- Never decides strategy

---

## 3. Core Architecture (Non‑Negotiable)

- **Framework:** Astro (static‑first)
- **Hosting:** Vercel
- **CMS:** None (content‑as‑data)
- **Content Format:** JSON + Markdown
- **Deployment:** Git + Vercel CLI

> Content is **data**. Pages are **outputs**.

---

## 4. Canonical Truth Hierarchy

1. `content/globals/business.json` — Canonical brand entity
2. `content/globals/gbp.json` — Google Business Profile overlay
3. `content/services/*.json` — Service entities
4. `content/locations/*.json` — City / region entities

No field may be invented. Missing data must remain null until verified.

---

## 5. Geographic Doctrine (Absolute)

- Illinois only
- Chicagoland suburbs only
- All cities must exist in `_allowlist.json`
- Any geo contamination must fail the build

---

## 6. SEO Model

- Entity‑first
- Semantic depth over page count
- Programmatic consistency
- Quality gates before indexing

### URL Structure
- `/services/{service}/`
- `/locations/{city}/`
- `/locations/{city}/{service}/`

---

## 7. Quality Control Philosophy

- Fewer indexed pages > many weak pages
- No manual editing of programmatic outputs
- Build‑time enforcement > human review

---

## 8. Change Control

Any change to:
- Platform
- Architecture
- URL structure
- Quality gates
- Geography

Must be explicitly approved and reflected in the Phase Ledger.

---

## 9. Resume Instruction (Copy/Paste)

"This is the **Norman Mechanical SEO Program**.
Follow the *Master Operating Guide* and the *Phase Ledger & Roadmap*.
Do not revisit completed phases."

---

## 10. Phase 15 — Visual Architecture & UX Refinement

**Scope:**
- Presentation-only changes
- Layout, hierarchy, spacing, and component sequencing
- CTA dominance and trust signal placement
- Mobile-first responsive behavior

**Explicitly Out of Scope:**
- Content changes
- SEO logic modifications
- Schema alterations
- Quality gate adjustments
- Indexing behavior changes

**Governing Document:** `docs/visual-architecture-principles.md`

**Operating Principle:** This phase operates strictly at the visual system level. All changes must be cosmetic and must not affect content models, schema, or SEO logic.

---

## Operating Principle

Discipline scales. Guardrails protect momentum.

