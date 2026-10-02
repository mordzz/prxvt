export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "How does PRXVT keep conversations private?",
    answer:
      "PRXVT is designed to keep conversation identity separate from wallet and payment identity. This prototype demonstrates the boundary with local demo data; production privacy infrastructure is not connected yet.",
  },
  {
    question: "Does PRXVT ever request or store my private key?",
    answer:
      "No. A wallet signature can prove access without revealing the private key. The current prototype simulates connection and signing locally and never asks for a secret phrase or private key.",
  },
  {
    question: "How do the agent wallet and spending limits work?",
    answer:
      "You define the agent balance, maximum transaction, daily limit, asset, and network. A paid step must fit that policy and can still pause for your approval.",
  },
  {
    question: "What can the AI Agent do?",
    answer:
      "The agent can research, use approved tools, request a paid service, and return a result. User-defined approvals and spending limits remain in control throughout the workflow.",
  },
];
