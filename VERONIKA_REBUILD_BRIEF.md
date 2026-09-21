# Veronika — Landing Strip / Rebuild Brief

Date: 2026-09-20
Branch: `design/landing-strip-2026-09-20`

## Mode
Brownfield.

## Outcome
Replace the existing marketing-heavy public homepage with a mobile-first editorial shell that can accept final biography, positioning, proof, imagery, and contact content later without carrying forward the old visual language.

## Constraints
- Preserve existing auth/dashboard routes and backend behavior.
- Do not deploy directly to production from this pass.
- Public presentation is English only.
- Preserve Veronika Dimitrova's identity/name.
- Reuse the local portrait asset already in the repo.
- No speculative copy.
- No additional dependencies.
- Keep rollback as a single branch/PR revert.

## Benchmark direction
Use high-end personal portfolio principles rather than SaaS/consulting landing-page patterns:
- one dominant identity statement;
- editorial composition;
- strong typography;
- restrained two-tone palette;
- photography as content, not decoration;
- visible grid and spacing discipline;
- minimal navigation;
- mobile layout designed directly, not collapsed from desktop;
- interaction only when it clarifies hierarchy.

Useful Awwwards references inspected:
- Pedro Matos Chaves — personal portfolio, black/off-white palette, hero/about/selected projects/footer.
- Takafumi Senda — personal portfolio with explicit responsive/mobile presentation.

## Visual violations removed from the public homepage
- multicolor gradient typography;
- glowing radial gradient backgrounds;
- glassmorphism cards;
- floating decorative orbs;
- looping bob/pulse animations;
- icon badges/pills;
- hover-lift cards;
- repeated CTA buttons;
- testimonial cards;
- four-step process blocks;
- alternating dark/light marketing sections;
- excessive border-radius styling;
- language switcher;
- translated marketing copy;
- unsupported trust claims in the hero;
- remote LinkedIn image dependency.

## New public information architecture
1. Identity / portrait
2. About
3. Selected work
4. Contact
5. Minimal footer

The sections intentionally contain almost no copy in this pass. Their purpose is to lock hierarchy, rhythm, proportion, and responsive behavior before content is written.

## Mobile rules
- 320px minimum supported width.
- No horizontal scrolling.
- Navigation remains short enough to stay visible without a hamburger.
- Hero uses stacked editorial regions instead of a cramped two-column collapse.
- Use `svh` for viewport-height sections.
- Minimum 20px side padding at small widths.
- Content order remains identity → portrait → about → work → contact.
- No hover-dependent information.
- No auto-running decorative animation.
- Large type uses `clamp()` and short line lengths.
- Project placeholders use fixed aspect ratios.

## Next content pass
Do not add generic consultant copy. Collect and approve only:
- one-sentence identity/positioning;
- concise biography;
- 3–5 selected work/proof items;
- one primary contact action;
- final owned portrait/editorial photography;
- optional LinkedIn link.

## Security / sovereignty follow-up
The repository contains committed environment files. Do not print or expose them. Before any final production release, audit tracked secrets, rotate anything sensitive if required, and move production configuration to the deployment environment.

## Rollback
Delete the branch or revert the landing-page commit. No dashboard/auth/backend files were changed in this strip pass.
