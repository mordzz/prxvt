# PRXVT Landing Page Simplification Design

## Objective

Reshape the PRXVT landing page into a shorter, clearer product story that moves visitors from the private AI proposition to the interactive prototype without repeating the same privacy claims across multiple sections.

The redesign keeps the existing dark Web3 visual language, uses only deterministic prototype data, and does not change the `/app` journey or add external integrations.

## Page Structure

The landing page contains four sections, in this order:

1. Hero with a compact Private AI Experience mockup
2. Interactive product advantages
3. Three-step How It Works timeline
4. Combined FAQ and final CTA

The separate Privacy Value, Private AI Experience, Why This Product, Robinhood Chain, and Final CTA sections are removed from the page composition. Their essential content is absorbed into the four remaining sections. Components that become unreferenced may be removed after repository-wide reference checks.

## Visual Direction

- Preserve the obsidian background, restrained glass surfaces, fine borders, and localized emerald or cyan status signals.
- Continue using Plus Jakarta Sans for product copy and monospace only for addresses, balances, transaction state, hashes, and agent telemetry.
- Reduce the landing page's horizontal padding to one quarter of its current values: `4px` on mobile and `6px` from the `sm` breakpoint upward. Apply this consistently to the landing sections, marketing navbar, and footer. Do not change `/app` padding.
- Keep copy short: one clear claim per heading and no more than one or two concise sentences per supporting block.
- Make the changing product visualization in the advantages section the signature visual of the page.
- Respect `prefers-reduced-motion` and keep translucent content readable without excessive nested blur.

## Hero

The hero uses a two-column layout on large screens and a stacked layout on small screens.

The left side contains:

- A concise headline positioning PRXVT as a private AI agent
- One sentence covering private conversation, agent action, and onchain payment
- A primary `Launch Private AI` CTA
- A secondary CTA that links to How It Works

Remove the `Sprint 0` eyebrow and the repeated trust badges. Prototype limitations remain visible where they are directly relevant rather than competing with the main message.

The right side replaces the existing small `HeroChatMock` with a compact version of the current Private AI Experience. It shows the recognizable chat workspace, session privacy state, and a useful example interaction without reproducing the full application shell. The separate Private AI Experience section is removed.

## Interactive Product Advantages

### Content

The section presents six advantages:

1. **Private AI Sessions** — conversation identity remains separate from wallet identity.
2. **Autonomous AI Agent** — the agent can research, use tools, and complete multi-step tasks.
3. **Wallet-Native Access** — access is designed around wallet authentication rather than a traditional account.
4. **Controlled Agent Wallet** — users control balance, transaction limits, daily limits, assets, and network permissions.
5. **Private Onchain Payments** — the agent can pay for services without directly exposing the user's primary identity.
6. **Robinhood Chain Settlement** — agent activity and payments are designed to settle verifiably on Robinhood Chain.

Copy must distinguish implemented prototype behavior from future production architecture. Do not claim cryptographic privacy, real payments, live chain settlement, or production wallet security where the prototype only simulates them.

### Desktop Interaction

- Display a vertical list of six tabs on the left and one large visualization card on the right.
- Each tab includes an index and title.
- The active tab expands to show its full description and a progress indicator.
- Automatically advance to the next tab every four seconds.
- Clicking or focusing a tab activates it immediately.
- Pause automatic rotation while the user hovers over or focuses the tab interface, then resume after interaction ends.
- Animate the visualization change with restrained opacity and position transitions.

### Mobile Interaction

- Place a horizontally scrollable tab list above the visualization card.
- Keep the active tab visible and expose its full description below the tab controls.
- Preserve manual selection and automatic rotation without forcing page-level horizontal overflow.

### Accessibility and Fallback

- Implement the control with appropriate tab semantics, accessible names, and an active state that is not communicated by color alone.
- Support Arrow keys, `Home`, and `End` for tab navigation.
- Stop automatic rotation and remove nonessential transitions when reduced motion is requested.
- The first advantage and its complete content remain useful before client hydration or if client-side scripting fails.

### Visualization Cards

Each advantage has a distinct product-oriented visual rather than a decorative illustration:

- Private session and separated identity status
- Agent task and tool activity
- Wallet authentication state
- Balance and spending-policy controls
- Payment request and receipt
- Robinhood Chain settlement status

All values are deterministic demo data. Simulated states are labeled wherever a visitor could mistake them for live activity.

## How It Works

Use the structural rhythm of the public PRXVT reference without copying its text or brand assets:

- A concise introduction occupies the left column.
- A vertical three-step timeline occupies the right column.
- A fine line connects restrained circular markers.
- Each step contains a short title and one supporting sentence.

The three steps are:

1. **Connect and separate identity** — connect a wallet and establish a conversation identity that is not unnecessarily exposed to the AI provider.
2. **Ask the agent to act** — chat normally while the agent researches, uses tools, and requests approval when a paid service is needed.
3. **Approve, pay, and verify** — apply wallet limits, approve the simulated payment, and show a verifiable settlement result.

Remove the current seven-card sequence, duplicate architecture diagram, and separate roadmap presentation.

## Combined FAQ and CTA

Place the FAQ and final CTA in one cohesive section. The FAQ contains exactly four items:

1. How does PRXVT keep conversations private?
2. Does PRXVT ever request or store my private key?
3. How do the agent wallet and spending limits work?
4. What can the AI Agent do?

The fourth answer covers research, tool use, paid-service requests, and result delivery under user-defined approvals and spending limits.

Keep answers direct and avoid repeating entire feature descriptions. The adjacent or concluding CTA includes `Launch Private AI`, a short prototype disclosure, and a secondary `Read the Docs` link.

## Navigation and Footer

Simplify landing navigation to anchors that still exist:

- Product
- How It Works
- FAQ

Keep the Launch App action. Update anchors to match the new sections.

The footer contains only the PRXVT identity and functional links for Product, How It Works, FAQ, Docs, and Launch App. Remove the Legal column entirely. Remove placeholder Privacy, Terms, Status, and other links that lead to unrelated anchors.

## Component Boundaries

- `app/(marketing)/page.tsx` composes only the four landing sections.
- Place the four redesigned landing sections and their landing-specific subcomponents in `components/features/landing`, matching the approved PRXVT architecture. Move only landing modules touched by this redesign; do not migrate unrelated UI, layout, or application components.
- Keep static hero and How It Works copy in Server Components where practical.
- Isolate the product tab timer, progress, and keyboard behavior in the narrowest possible Client Component.
- Reuse product-agnostic primitives from `components/ui` rather than duplicating card, button, or focus behavior.
- Keep deterministic product content in a stable configuration or data structure so tab labels, descriptions, and visual states remain synchronized.

## Error and Edge States

- Client hydration must not change the initial content unexpectedly.
- Timer cleanup must prevent updates after unmount.
- Hidden tab panels must not remain focusable.
- Long descriptions and labels must wrap without overlapping the visualization.
- Mobile tab scrolling must not create page-level overflow.
- If animation is unavailable, content switches immediately and remains understandable.

## Verification

Before completion:

1. Run lint and a production build.
2. Inspect the landing page at desktop, tablet, and mobile widths.
3. Verify all six advantages through automatic rotation and manual selection.
4. Verify tab navigation with keyboard only, including Arrow keys, `Home`, and `End`.
5. Verify reduced-motion behavior.
6. Confirm the four FAQ items and combined CTA layout.
7. Confirm navigation and footer links target existing destinations.
8. Confirm no removed landing component remains referenced.
9. Exercise the existing `/app` wallet-to-result journey to ensure the landing refactor did not alter it.
10. Check the browser console for hydration, accessibility, and runtime errors.

## Out of Scope

- Real wallet, Supabase, blockchain, payment, privacy-pool, or AI-provider integration
- Changes to the existing `/app` scenario or its domain behavior
- New legal pages or placeholder legal links
- Copying images, code, or brand assets from either reference website
