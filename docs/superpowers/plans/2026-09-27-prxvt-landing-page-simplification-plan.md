# PRXVT Landing Page Simplification Implementation Plan

## Goal

Implement the approved four-section PRXVT landing page redesign while preserving the existing `/app` prototype flow and clearly labeling simulated behavior.

## Constraints

- Follow Next.js 16 App Router guidance from the repository's installed documentation.
- Keep static landing content in Server Components and isolate only interactive behavior behind narrow Client Component boundaries.
- Use deterministic local data only.
- Preserve unrelated user changes in the dirty worktree.
- Apply `4px` mobile and `6px` `sm+` horizontal padding only to the marketing landing shell, navbar, and footer.
- Do not add packages.

## Task 1: Establish Landing Feature Boundaries

Files:

- Create `components/features/landing/landing-content.ts`
- Move or recreate the retained landing sections under `components/features/landing/`
- Update `app/(marketing)/page.tsx`

Steps:

1. Define deterministic copy and the six product advantages in `landing-content.ts`.
2. Compose only Hero, Product Advantages, How It Works, and FAQ/CTA in the landing page.
3. Keep `app/(marketing)/page.tsx` as a Server Component.
4. Confirm the route renders its first meaningful content without client-side state.

## Task 2: Replace the Hero Mockup

Files:

- Create `components/features/landing/hero.tsx`
- Create `components/features/landing/private-ai-preview.tsx`

Steps:

1. Replace the Sprint 0 label and repeated badges with a short headline, one supporting sentence, and two CTAs.
2. Build a compact non-interactive private workspace preview from deterministic markup rather than importing the stateful application chat hook.
3. Show session privacy, one user prompt, agent tool activity, and a concise result state.
4. Use a two-column desktop layout and stacked mobile layout.
5. Ensure the preview is visually meaningful without motion.

## Task 3: Build Interactive Product Advantages

Files:

- Create `components/features/landing/product-advantages.tsx`
- Create `components/features/landing/advantage-tabs.tsx`
- Create `components/features/landing/advantage-visual.tsx`

Steps:

1. Render the section heading and static first advantage in the Server Component shell.
2. Implement the six-tab interface in a narrow Client Component.
3. Add manual selection, Arrow key navigation, `Home`, and `End`.
4. Rotate tabs every four seconds.
5. Pause rotation during pointer hover or keyboard focus and resume afterward.
6. Disable automatic rotation and nonessential transitions under reduced motion.
7. Render the active tab's full description and progress bar.
8. Build six distinct deterministic visual states: privacy session, agent tools, wallet authentication, spending controls, payment receipt, and chain settlement.
9. Use vertical tabs plus a large visualization on desktop and horizontally scrollable tabs above the visualization on mobile.
10. Verify hidden panels are not focusable and active state is exposed semantically and visually.

## Task 4: Simplify How It Works

Files:

- Create `components/features/landing/how-it-works.tsx`

Steps:

1. Implement the approved two-column layout.
2. Render the three-step vertical timeline with connected circular markers.
3. Keep each step to one title and one supporting sentence.
4. Retain the simulated-state disclosure within the relevant payment step.

## Task 5: Combine FAQ and CTA

Files:

- Create `components/features/landing/faq-cta.tsx`
- Update `data/mockFaq.ts`
- Reuse or minimally improve `components/ui/faq-accordion.tsx`

Steps:

1. Replace the ten FAQ entries with the four approved questions and direct answers.
2. Place the accordion and CTA in one cohesive responsive section.
3. Include Launch Private AI and Read the Docs actions.
4. Include a concise prototype disclosure without repeating product copy.
5. Preserve correct button semantics, expanded state, and visible focus behavior.

## Task 6: Simplify Navigation and Footer

Files:

- Update `lib/site-config.ts`
- Update `components/layout/navbar.tsx`
- Update `components/layout/footer.tsx`

Steps:

1. Keep Product, How It Works, and FAQ in landing navigation; keep Docs as a separate functional destination if appropriate to the existing header.
2. Keep Launch App.
3. Apply the approved `4px`/`6px` horizontal shell padding.
4. Remove the footer Legal column and all placeholder links.
5. Keep only identity, Product, How It Works, FAQ, Docs, and Launch App.
6. Ensure the mobile menu closes after navigation and retains accessible controls.

## Task 7: Remove Superseded Landing Modules

Files:

- Remove obsolete modules under `components/landing/` only after reference checks
- Preserve `components/landing/page-hero.tsx` if the Docs route still imports it, or move it and update the Docs import deliberately

Steps:

1. Search the repository for every old landing component reference.
2. Remove only HeroChatMock, PrivacyValue, old ProductSection, old HowItWorksPreview, PrivateAiExperience, WhyThisProduct, RobinhoodChainSection, old FaqSection, and FinalCta once no imports remain.
3. Keep the Docs page working.
4. Confirm no broken aliases or stale exports remain.

## Task 8: Verify Quality and Regression Safety

Commands and checks:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Start the local app and inspect `/` at mobile, tablet, and desktop widths.
4. Verify all six tabs manually and through one complete automatic cycle.
5. Verify keyboard tab navigation and focus visibility.
6. Verify reduced-motion behavior.
7. Verify all four FAQ items and CTA links.
8. Verify navbar and footer links.
9. Inspect the browser console for hydration and runtime errors.
10. Exercise the existing `/app` prototype journey and confirm no behavior changed.
11. Review `git diff` to ensure unrelated user changes were not modified.

## Expected Outcome

The landing page communicates the product through four focused sections, presents six advantages through an accessible rotating tab interface, uses the full private AI workspace preview in the hero, and removes redundant claims and placeholder footer links without altering the application prototype.
