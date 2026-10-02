// SPRINT 0 MOCK
// Replace with real wallet SDK integration in a future backend/wallet integration sprint.

export type WalletConnector = "browser" | "walletconnect" | "embedded";

export type MockWalletState = {
  connected: boolean;
  address: string;
  connector: WalletConnector | "created";
};

export const WALLET_CONNECTORS: { id: WalletConnector; label: string; description: string }[] = [
  {
    id: "browser",
    label: "Browser Wallet",
    description: "Connect using an extension wallet already installed in your browser.",
  },
  {
    id: "walletconnect",
    label: "WalletConnect",
    description: "Scan a QR code to connect a mobile wallet.",
  },
  {
    id: "embedded",
    label: "Embedded Wallet",
    description: "Spin up a lightweight wallet without leaving the app.",
  },
];

function randomHex(length: number) {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function generateMockAddress() {
  return `0x${randomHex(4)}...${randomHex(4)}`;
}

export const WALLET_STORAGE_KEY = "privai.mock-wallet";
