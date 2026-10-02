export type AdvantageId = "private-session" | "autonomous-agent" | "agent-controls" | "private-payments";

export type Advantage = {
  id: AdvantageId;
  title: string;
  description: string;
};

export const ADVANTAGES: Advantage[] = [
  {
    id: "private-session",
    title: "Private by default",
    description: "The model reads your words, never your wallet.",
  },
  {
    id: "autonomous-agent",
    title: "Agent that finishes",
    description: "Ask once. It researches, pays, and delivers.",
  },
  {
    id: "agent-controls",
    title: "Limits you set",
    description: "Small payments flow. Big ones wait for you.",
  },
  {
    id: "private-payments",
    title: "Private payments",
    description: "Routed through an agent wallet on Robinhood Chain. Simulated for now.",
  },
];

export const HOW_IT_WORKS = [
  {
    title: "Sign in with your wallet",
    description: "One readable signature. No email, no password, no private key.",
  },
  {
    title: "Get a private session",
    description: "Your address is swapped for a session id before anything reaches the model.",
  },
  {
    title: "Set the agent's limits",
    description: "Fund the agent wallet and cap what it may spend per payment and per day.",
  },
  {
    title: "Ask, approve, verify",
    description: "The agent researches and pays within your limits. Bigger payments wait for you.",
  },
] as const;
