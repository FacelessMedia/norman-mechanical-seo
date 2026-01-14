# VISUAL QA REPORT

**Branch:** visual/global-shell-header-footer
**Date:** 2026-01-14T22:54:46.504Z
**Total Tests:** 36
**Passed:** 0
**Failed:** 36

---

## SUMMARY TABLE

| URL | Breakpoint | H-Scroll | Console Errors | Header Overlap | Screenshot |
|-----|------------|----------|----------------|----------------|------------|
| / | mobile | ✅ | ❌ | ✅ | homepage_mobile.png |
| / | tablet | ✅ | ❌ | ✅ | homepage_tablet.png |
| / | desktop | ✅ | ❌ | ✅ | homepage_desktop.png |
| /services/ | mobile | ✅ | ❌ | ✅ | services__mobile.png |
| /services/ | tablet | ✅ | ❌ | ✅ | services__tablet.png |
| /services/ | desktop | ✅ | ❌ | ✅ | services__desktop.png |
| /services/faucet-installation/ | mobile | ✅ | ❌ | ✅ | services_faucet-installation__mobile.png |
| /services/faucet-installation/ | tablet | ✅ | ❌ | ✅ | services_faucet-installation__tablet.png |
| /services/faucet-installation/ | desktop | ✅ | ❌ | ✅ | services_faucet-installation__desktop.png |
| /services/water-heater-repair/ | mobile | ✅ | ❌ | ✅ | services_water-heater-repair__mobile.png |
| /services/water-heater-repair/ | tablet | ✅ | ❌ | ✅ | services_water-heater-repair__tablet.png |
| /services/water-heater-repair/ | desktop | ✅ | ❌ | ✅ | services_water-heater-repair__desktop.png |
| /services/drain-cleaning/ | mobile | ✅ | ❌ | ✅ | services_drain-cleaning__mobile.png |
| /services/drain-cleaning/ | tablet | ✅ | ❌ | ✅ | services_drain-cleaning__tablet.png |
| /services/drain-cleaning/ | desktop | ✅ | ❌ | ✅ | services_drain-cleaning__desktop.png |
| /locations/ | mobile | ✅ | ❌ | ✅ | locations__mobile.png |
| /locations/ | tablet | ✅ | ❌ | ✅ | locations__tablet.png |
| /locations/ | desktop | ✅ | ❌ | ✅ | locations__desktop.png |
| /locations/palatine/ | mobile | ✅ | ❌ | ✅ | locations_palatine__mobile.png |
| /locations/palatine/ | tablet | ✅ | ❌ | ✅ | locations_palatine__tablet.png |
| /locations/palatine/ | desktop | ✅ | ❌ | ✅ | locations_palatine__desktop.png |
| /locations/elgin/ | mobile | ✅ | ❌ | ✅ | locations_elgin__mobile.png |
| /locations/elgin/ | tablet | ✅ | ❌ | ✅ | locations_elgin__tablet.png |
| /locations/elgin/ | desktop | ✅ | ❌ | ✅ | locations_elgin__desktop.png |
| /locations/naperville/ | mobile | ✅ | ❌ | ✅ | locations_naperville__mobile.png |
| /locations/naperville/ | tablet | ✅ | ❌ | ✅ | locations_naperville__tablet.png |
| /locations/naperville/ | desktop | ✅ | ❌ | ✅ | locations_naperville__desktop.png |
| /locations/palatine/faucet-installation/ | mobile | ✅ | ❌ | ✅ | locations_palatine_faucet-installation__mobile.png |
| /locations/palatine/faucet-installation/ | tablet | ✅ | ❌ | ✅ | locations_palatine_faucet-installation__tablet.png |
| /locations/palatine/faucet-installation/ | desktop | ✅ | ❌ | ✅ | locations_palatine_faucet-installation__desktop.png |
| /locations/elgin/water-heater-repair/ | mobile | ✅ | ❌ | ✅ | locations_elgin_water-heater-repair__mobile.png |
| /locations/elgin/water-heater-repair/ | tablet | ✅ | ❌ | ✅ | locations_elgin_water-heater-repair__tablet.png |
| /locations/elgin/water-heater-repair/ | desktop | ✅ | ❌ | ✅ | locations_elgin_water-heater-repair__desktop.png |
| /locations/naperville/drain-cleaning/ | mobile | ✅ | ❌ | ✅ | locations_naperville_drain-cleaning__mobile.png |
| /locations/naperville/drain-cleaning/ | tablet | ✅ | ❌ | ✅ | locations_naperville_drain-cleaning__tablet.png |
| /locations/naperville/drain-cleaning/ | desktop | ✅ | ❌ | ✅ | locations_naperville_drain-cleaning__desktop.png |

---

## ISSUES DETECTED

### Issue #1: Console Errors Detected

**Priority:** P1
**Affected Pages:** /, /services/, /services/faucet-installation/, /services/water-heater-repair/, /services/drain-cleaning/, /locations/, /locations/palatine/, /locations/elgin/, /locations/naperville/, /locations/palatine/faucet-installation/, /locations/elgin/water-heater-repair/, /locations/naperville/drain-cleaning/
**Breakpoints:** mobile, tablet, desktop

**Description:**
JavaScript console errors detected:
- Failed to load resource: the server responded with a status of 404 (Not Found)

**Likely Files:**
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/layouts/Base.astro`

**Proposed Fix:**
Review console errors and fix JavaScript issues. Common causes:
- Missing DOM elements for event listeners
- Incorrect selectors
- Script loading order issues

**Screenshots:**
- homepage_mobile.png
- homepage_tablet.png
- homepage_desktop.png
- services__mobile.png
- services__tablet.png
- services__desktop.png
- services_faucet-installation__mobile.png
- services_faucet-installation__tablet.png
- services_faucet-installation__desktop.png
- services_water-heater-repair__mobile.png
- services_water-heater-repair__tablet.png
- services_water-heater-repair__desktop.png
- services_drain-cleaning__mobile.png
- services_drain-cleaning__tablet.png
- services_drain-cleaning__desktop.png
- locations__mobile.png
- locations__tablet.png
- locations__desktop.png
- locations_palatine__mobile.png
- locations_palatine__tablet.png
- locations_palatine__desktop.png
- locations_elgin__mobile.png
- locations_elgin__tablet.png
- locations_elgin__desktop.png
- locations_naperville__mobile.png
- locations_naperville__tablet.png
- locations_naperville__desktop.png
- locations_palatine_faucet-installation__mobile.png
- locations_palatine_faucet-installation__tablet.png
- locations_palatine_faucet-installation__desktop.png
- locations_elgin_water-heater-repair__mobile.png
- locations_elgin_water-heater-repair__tablet.png
- locations_elgin_water-heater-repair__desktop.png
- locations_naperville_drain-cleaning__mobile.png
- locations_naperville_drain-cleaning__tablet.png
- locations_naperville_drain-cleaning__desktop.png

---

## SCREENSHOT DIRECTORY

Total screenshots: 37

```
homepage_desktop.png
homepage_mobile.png
homepage_tablet.png
locations_elgin_water-heater-repair__desktop.png
locations_elgin_water-heater-repair__mobile.png
locations_elgin_water-heater-repair__tablet.png
locations_elgin__desktop.png
locations_elgin__mobile.png
locations_elgin__tablet.png
locations_naperville_drain-cleaning__desktop.png
locations_naperville_drain-cleaning__mobile.png
locations_naperville_drain-cleaning__tablet.png
locations_naperville__desktop.png
locations_naperville__mobile.png
locations_naperville__tablet.png
locations_palatine_faucet-installation__desktop.png
locations_palatine_faucet-installation__mobile.png
locations_palatine_faucet-installation__tablet.png
locations_palatine__desktop.png
locations_palatine__mobile.png
locations_palatine__tablet.png
locations__desktop.png
locations__mobile.png
locations__tablet.png
QA-REPORT.md
services_drain-cleaning__desktop.png
services_drain-cleaning__mobile.png
services_drain-cleaning__tablet.png
services_faucet-installation__desktop.png
services_faucet-installation__mobile.png
services_faucet-installation__tablet.png
services_water-heater-repair__desktop.png
services_water-heater-repair__mobile.png
services_water-heater-repair__tablet.png
services__desktop.png
services__mobile.png
services__tablet.png
```
