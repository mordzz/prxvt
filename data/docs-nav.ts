// SPRINT 0 MOCK — placeholder docs navigation and content.

export type DocSection = {
  title: string;
  items: { id: string; label: string; comingSoon?: boolean }[];
};

export const DOCS_NAV: DocSection[] = [
  {
    title: "Introduction",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { id: "private-ai", label: "Private AI" },
      { id: "sessions", label: "Sessions" },
      { id: "wallet-auth", label: "Wallet Authentication" },
      { id: "private-payments", label: "Private Payments" },
    ],
  },
  {
    title: "Architecture",
    items: [
      { id: "architecture-overview", label: "Overview" },
      { id: "ai-layer", label: "AI Layer" },
      { id: "payment-layer", label: "Payment Layer" },
      { id: "robinhood-chain", label: "Robinhood Chain" },
    ],
  },
  {
    title: "Developers",
    items: [
      { id: "api", label: "API", comingSoon: true },
      { id: "sdk", label: "SDK", comingSoon: true },
      { id: "examples", label: "Examples", comingSoon: true },
    ],
  },
];

export type DocEntry = {
  title: string;
  status: "live" | "planned";
  summary: string;
  body: string;
  points: string[];
  code?: { label: string; snippet: string };
  comingSoon?: boolean;
};

export const DOCS_CONTENT: Record<string, DocEntry> = {
  introduction: {
    title: "Introduction",
    status: "live",
    summary: "What PRXVT is, and what Sprint 0 actually ships.",
    body: "This documentation describes the architecture and intended developer experience for PRXVT, a privacy-first AI platform prototype. Sprint 0 ships the frontend only — every backend, wallet, and blockchain interaction described here is planned architecture unless explicitly marked otherwise.",
    points: [
      "Frontend prototype built with Next.js, TypeScript, and Tailwind CSS.",
      "No backend, database, or real authentication in this sprint.",
      "All wallet and AI responses are mocked locally in the browser.",
      "Structured so a real backend can be swapped in without a redesign.",
    ],
  },
  "quick-start": {
    title: "Quick Start",
    status: "live",
    summary: "Get from landing page to a private chat in under a minute.",
    body: "Launch the app, create or connect a mock wallet, and start a private session from the chat interface. No API keys or accounts are required in this prototype.",
    points: [
      "Click \"Launch App\" from the top navigation.",
      "Choose Create Wallet or Connect Wallet — both are simulated.",
      "Start typing in the message box to begin a mock private session.",
      "Session and wallet state persist locally via localStorage.",
    ],
    code: {
      label: "Local mock session shape",
      snippet: `type Session = {\n  id: string;\n  title: string;\n  messages: ChatMessage[];\n  createdAt: number;\n};`,
    },
  },
  "private-ai": {
    title: "Private AI",
    status: "planned",
    summary: "How chat requests are meant to avoid identity leakage.",
    body: "Private AI sessions are designed to route requests through a backend gateway that strips unnecessary identity data before reaching a model provider. In Sprint 0, chat responses are generated locally with mock logic.",
    points: [
      "No wallet address or on-chain identity is meant to reach the model provider.",
      "Responses in this prototype are keyword-matched, not model-generated.",
      "Streaming UI is simulated with a typing indicator and short delay.",
    ],
  },
  sessions: {
    title: "Sessions",
    status: "planned",
    summary: "How a conversation is scoped without a permanent profile.",
    body: "A session groups related messages without permanently binding them to a wallet address. Session data in this prototype exists only in local browser state.",
    points: [
      "Each session has its own id and message list.",
      "Sessions are not synced to any server in Sprint 0.",
      "Clearing browser storage clears all session history.",
    ],
  },
  "wallet-auth": {
    title: "Wallet Authentication",
    status: "planned",
    summary: "Connect-and-sign instead of email and password.",
    body: "Wallet authentication is intended to replace traditional email/password login with a connect-and-sign flow. This prototype simulates wallet creation and connection without any real signature or network call.",
    points: [
      "\"Create Wallet\" generates a mock address, no real key is produced.",
      "\"Connect Wallet\" lists mock provider options only — nothing is called.",
      "No private key ever touches the frontend, mocked or real.",
    ],
  },
  "private-payments": {
    title: "Private Payments",
    status: "planned",
    summary: "Usage-based settlement without identity-heavy checkout.",
    body: "Private payments aim to settle AI usage through privacy-focused payment infrastructure rather than traditional identity-heavy checkout. This is planned architecture — not implemented in Sprint 0.",
    points: [
      "No payment provider, card entry, or checkout flow exists yet.",
      "The chat UI includes placeholder usage indicators only.",
      "Phase 1 (post-Sprint-0) targets a normal on-chain payment flow.",
    ],
  },
  "architecture-overview": {
    title: "Architecture Overview",
    status: "planned",
    summary: "The four layers the product is designed around.",
    body: "The intended system is composed of a wallet layer, an AI gateway, a payment layer, and a settlement layer on Robinhood Chain. Sprint 0 implements the frontend surface for this architecture only.",
    points: [
      "Wallet layer — identity and session access.",
      "AI layer — gateway between the user and model providers.",
      "Payment layer — translates usage into settlement requests.",
      "Robinhood Chain — final settlement layer.",
    ],
  },
  "ai-layer": {
    title: "AI Layer",
    status: "planned",
    summary: "The gateway between sessions and model providers.",
    body: "The AI layer is planned to act as a gateway between the user-facing session and one or more model providers, without forwarding wallet identity to those providers.",
    points: [
      "Model routing across multiple providers is planned, not implemented.",
      "Rate limiting and abuse protection live at this layer in the target design.",
    ],
  },
  "payment-layer": {
    title: "Payment Layer",
    status: "planned",
    summary: "Translates usage into privacy-focused settlement.",
    body: "The payment layer is planned to translate AI usage into privacy-focused payment requests, settled on-chain in a later sprint.",
    points: [
      "Usage metering happens before any payment request is created.",
      "Settlement currency and rails are not finalized for Sprint 0.",
    ],
  },
  "robinhood-chain": {
    title: "Robinhood Chain",
    status: "planned",
    summary: "The intended settlement layer.",
    body: "Robinhood Chain is the intended settlement layer for this product. Integration is upcoming — not connected in this prototype.",
    points: [
      "No RPC connection, network switch, or transaction signing exists yet.",
      "Network detection and balance reads are targeted for a future sprint.",
    ],
  },
  api: {
    title: "API",
    status: "planned",
    summary: "Public REST/GraphQL surface for sessions and payments.",
    body: "A public API for private AI sessions and payments will be documented here once the backend is available.",
    points: ["Endpoint reference, auth scheme, and rate limits will be published here."],
    comingSoon: true,
  },
  sdk: {
    title: "SDK",
    status: "planned",
    summary: "Client libraries for wallet auth, sessions, and payments.",
    body: "Client SDKs for integrating wallet auth, private sessions, and payments are planned for a future sprint.",
    points: ["TypeScript SDK is the current target for the first release."],
    comingSoon: true,
  },
  examples: {
    title: "Examples",
    status: "planned",
    summary: "End-to-end integration walkthroughs.",
    body: "End-to-end integration examples will be added once the API and SDK are available.",
    points: ["Examples will cover session creation, chat streaming, and payment settlement."],
    comingSoon: true,
  },
};
