---
name: prxvt-implementation
description: Implement or continue the approved PRXVT Web3 clickable prototype in this repository. Use for building, refining, testing, or completing the unified landing page and private AI workspace described by docs/PRD.md and the approved design specification. Do not use for real Supabase, wallet, blockchain, payment, or AI-provider integration unless the user separately expands the scope.
---

# PRXVT Implementation

Implement the approved dummy-data prototype as one cohesive Web3 product. Preserve clear boundaries between global UI primitives, reusable PRXVT components, feature modules, and future service adapters.

## Read First

Before changing code, read:

1. `AGENTS.md`
2. `docs/PRD.md`
3. `docs/superpowers/specs/2026-09-27-prxvt-clickable-prototype-design.md`
4. Relevant guides in `node_modules/next/dist/docs/`, especially project structure, layouts and pages, Server and Client Components, navigation, CSS, fonts, metadata, and error handling.

The approved design specification controls scope and interactions. The PRD supplies broader product context. If they conflict, follow the approved specification unless the user explicitly changes it.

## Scope

Build a complete clickable prototype with deterministic local data and simulated asynchronous states. Do not install or configure Supabase, connect a wallet extension, call an LLM, use an RPC endpoint, or submit a real transaction. Clearly identify simulated transactions wherever confusion is possible.

Do not split px402, prxvt.ai, HushKit, ERC-8183, or privacy payments into separate landing pages. Present them only as capabilities inside PRXVT.

## Visual Direction

Create an unmistakably Web3-native experience without generic crypto decoration.

- Use layered obsidian glass, localized acid-green and cyan signals, fine grid geometry, transaction pulses, chain activity, wallet state, and separated identity domains.
- Make the hero an interactive private-agent command center.
- Give wallet connection, signing, funding, payment approval, and receipts one coherent on-chain visual language.
- Keep blockchain detail secondary to the familiar private AI workflow.
- Avoid floating coins, NFT-card motifs, excessive neon, token-logo wallpaper, and repeated identical glass cards.
- Spend visual boldness on the privacy veil and active transaction path; keep surrounding surfaces restrained.
- Use sentence case and reserve monospace for addresses, amounts, hashes, chain state, and agent telemetry.

Before coding, state a compact design plan covering tokens, typography, layout, and the signature visual. Revise anything that resembles a generic SaaS or crypto template.

## Architecture

Maintain these responsibility boundaries:

- `components/ui`: product-agnostic accessible primitives.
- `components/shared`: reusable PRXVT brand, identity, network, privacy, and shell components.
- `components/features/landing`: landing composition and story.
- `components/features/auth`: simulated wallet connection and signing.
- `components/features/chat`: conversations, messages, composer, and suggestions.
- `components/features/agent`: task progress, tools, policy, and results.
- `components/features/wallet`: balance, funding, limits, asset, and network state.
- `components/features/payments`: requests, approvals, receipts, and activity.
- `components/features/privacy`: identity separation and privacy controls.
- `lib/types`: distinct domain types for wallet, session, conversation, agent, and payment identities.
- `lib/demo`: deterministic fixtures and scenario builders.
- `lib/adapters`: interfaces for future external implementations.
- `lib/config`: stable product content and configuration.

Keep static landing content in Server Components. Add `"use client"` only at narrow interaction boundaries. Components call domain actions such as `connectWallet`, `signIn`, `sendMessage`, `fundAgent`, and `approvePayment`; do not coordinate the scenario through scattered raw state setters.

## Required Journey

Implement and preserve this complete path:

1. Launch private AI from the unified landing page.
2. Choose a wallet, simulate connection, and cover cancellation and wrong-network states.
3. Sign a readable message and explain identity separation.
4. Enter chat and send the main research prompt.
5. Show agent tool activity and a paid-service request.
6. Detect insufficient balance, fund the agent, and record the activity.
7. Approve the service payment within policy.
8. Deduct the balance, show a receipt, resume the task, and render the result.
9. Support no-history mode, conversation deletion, and demo reset.

Implement the remaining error and empty states defined by the approved specification.

## Quality and Verification

- Use semantic HTML, visible focus, accessible names, and focus-safe dialogs.
- Do not communicate state by color alone.
- Keep translucent surfaces readable and avoid excessive nested blur.
- Design desktop, tablet, and mobile layouts intentionally.
- Respect `prefers-reduced-motion`.
- Avoid hydration-sensitive random values and time-dependent server output.
- Add dependencies only when they materially improve the approved experience.
- Run lint and the production build.
- Exercise the full wallet-to-result journey at desktop and mobile widths.
- Check keyboard navigation and browser console output.
- Confirm the prototype requires no external accounts, keys, extensions, or services.

Fix in-scope issues found during verification. Report remaining limitations precisely and distinguish simulated behavior from future integrations.
