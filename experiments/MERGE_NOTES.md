# Merge Notes: Project-Alpha into Experiments

**Branch:** `merge/project-alpha-into-experiments`  
**Date:** 2026-01-08  

---

## Summary

This merge integrates the React SPA hero section and projects data from `Project-Alpha` into the Next.js `experiments` project while maintaining all existing structure, pipelines, and build logic.

---

## Files Modified

### 1. `src/app/page.tsx`
**Action:** Complete replacement of hero section  
**Rationale:**
- Adapted `HeroSection.tsx` from Project-Alpha
- Converted `react-router-dom` navigation (`useNavigate`) to Next.js (`useRouter` from `next/navigation`)
- Replaced Project-Alpha's `MagneticButton` with experiments' existing component at `@/content/magnetic-button/magnetic-button`
- Removed `Navbar` import (per explicit removal constraint)
- Wrapped touch device detection in `useEffect` for SSR safety
- Changed color classes from hardcoded colors (e.g., `text-white`, `bg-neutral-900`) to Tailwind theme tokens (`text-foreground`, `bg-card`, `border-border`)
- Kept `framer-motion` animations intact

### 2. `src/app/vault/page.tsx`
**Action:** Added Projects filter and inline project data  
**Rationale:**
- Added "Projects" to the filter chips
- Inlined project metadata from `ProjectsPage.tsx` as static data (no external URL resolution needed)
- Projects render as non-link cards since they don't have external URLs
- Used existing `VaultCard` pattern with minor adaptation for local images

### 3. `src/lib/vault/resolve-links.ts`
**Action:** Extended VaultType union  
**Rationale:**
- Added `"Projects"` to `VaultType` to support project entries in the vault filtering system

---

## Assets Copied

| Source | Destination |
|--------|-------------|
| `Project-Alpha/public/assets/ForSiteMainWhite.png` | `experiments/public/SiteImages/ForSiteMainWhite.png` |
| `Project-Alpha/public/assets/ProjectImages/cloudcore.png` | `experiments/public/SiteImages/cloudcore.png` |

---

## Files Explicitly NOT Ported (Per Constraints)

| File | Reason |
|------|--------|
| `AboutMe.tsx` | Explicit removal directive |
| `IntentionalTextReveal.tsx` | Explicit removal directive |
| `MagneticButton.tsx` | Explicit removal (experiments has its own version) |
| `Navbar.tsx` | Explicit removal directive |
| `SimpleTextReveal.tsx` | Explicit removal directive |

---

## Font Strategy

**Decision:** Use **Zigato Sans** as the single primary font (already present in experiments)  
**Rationale:** Per user instruction, no additional fonts (Migra, Saans) were ported from Project-Alpha.

---

## Dependencies

**No new dependencies added.** All required packages (`framer-motion`, `gsap`) already exist in experiments.

---

## API Conversions

| Project-Alpha | Experiments |
|---------------|-------------|
| `useNavigate()` | `useRouter()` from `next/navigation` |
| `navigate('/path')` | `router.push('/path')` |
| `<img src={...}>` | Kept as `<img>` for external/dynamic paths |
| `window.open(...)` | Unchanged (client component) |
| Hardcoded white/black colors | Tailwind theme tokens |

---

## QA Checklist

- [ ] Home page loads without console errors
- [ ] Hero animations play on page load
- [ ] Social buttons have magnetic hover effect
- [ ] Profile image hover shows preview tooltip
- [ ] "See more..." link navigates to /vault
- [ ] Vault page shows "Projects" filter chip
- [ ] Projects filter shows 3 project cards
- [ ] CloudCore project shows image thumbnail
- [ ] All other vault filters work correctly
- [ ] Dark mode styling applied correctly

---

## Rollback Instructions

If issues arise, revert to the previous commit:
```bash
git checkout main
git branch -D merge/project-alpha-into-experiments
```
