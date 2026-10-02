// SPRINT 0 MOCK
// Replace with a real AI API integration in the backend integration sprint.

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  /** Payment moments render as their own block instead of plain text. */
  payment?: { kind: "request" | "receipt"; amount: string; service: string; ref?: string };
};

export const SAMPLE_CONVERSATION: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "Research tokenized assets available on Robinhood Chain.",
  },
  {
    id: "m2",
    role: "assistant",
    content: "On it. I'll search verified sources, compare access models, and prepare a shortlist.",
  },
  {
    id: "m3",
    role: "assistant",
    content: "Search complete — 6 sources found. Comparing asset access and settlement terms now.",
  },
  {
    id: "m4",
    role: "assistant",
    content:
      "Two sources sit behind a paid data service. It costs $0.05 and I can pay it from your agent balance under your spending policy.",
    payment: { kind: "request", amount: "0.05 USDG", service: "Market data API" },
  },
  {
    id: "m5",
    role: "user",
    content: "Approve the $0.05 payment.",
  },
  {
    id: "m6",
    role: "assistant",
    content:
      "Approved. Payment settled on Robinhood Chain. Pulling the final dataset now.",
    payment: { kind: "receipt", amount: "0.05 USDG", service: "Market data API", ref: "0x8b…21e" },
  },
  {
    id: "m7",
    role: "assistant",
    content:
      "Here's the result. Top tokenized assets on Robinhood Chain:\n\n1. USDG — native stablecoin, low-fee settlement.\n2. RWA vaults — fractional treasury and real-estate access.\n3. Chain yield products — automated, verifiable on-chain.\n\nWant me to compare their private-payment fit?",
  },
  {
    id: "m8",
    role: "user",
    content: "Which one fits private payments best?",
  },
  {
    id: "m9",
    role: "assistant",
    content:
      "USDG. It settles natively on Robinhood Chain with minimal fees, so agent payments can stay small and frequent without exposing your primary identity each time. RWA vaults are better for long-term holdings than for routine agent spend.",
  },
];

const KEYWORD_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["zero knowledge", "zero-knowledge", "zk"],
    response:
      "A zero-knowledge proof allows one party to prove that a statement is true without revealing the underlying information used to prove it. In a private-payment context, this is the kind of primitive that could eventually let a transaction be verified as valid without exposing who sent it, to whom, or how much.",
  },
  {
    keywords: ["wallet", "connect"],
    response:
      "Wallets let you authenticate with a keypair instead of an email and password. In this prototype, wallet state is simulated locally — no real connection is made to any network.",
  },
  {
    keywords: ["payment", "pay", "robinhood chain", "crypto"],
    response:
      "Private payments are designed to settle usage without tying every request back to your primary identity. This demo only simulates that flow — no transactions are broadcast anywhere.",
  },
  {
    keywords: ["privacy", "private", "anonymous", "track"],
    response:
      "The goal is to minimize unnecessary identity exposure across conversations, sessions, and payments. This build is a frontend prototype, so no privacy infrastructure is actually running yet — it's here to show the intended experience.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hey — this is a private session. Ask me anything and I'll respond locally, no data leaves this demo.",
  },
];

const FALLBACK_RESPONSES = [
  "Noted. In a private session like this one, your message wouldn't be tied to a persistent identity or used to build a profile.",
  "Got it. This is a simulated response — in the full product, this request would be routed through a privacy-preserving AI gateway.",
  "Understood. This demo can't reach a real model yet, but the interface is built to plug into one without changing how a session feels.",
];

export function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of KEYWORD_RESPONSES) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.response;
    }
  }
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}
