"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  generateMockAddress,
  WALLET_STORAGE_KEY,
  type MockWalletState,
  type WalletConnector,
} from "@/data/mock-wallet";

type Listener = () => void;
const listeners = new Set<Listener>();

let cachedRaw: string | null = null;
let cachedValue: MockWalletState | null = null;

function readWallet(): MockWalletState | null {
  try {
    const raw = localStorage.getItem(WALLET_STORAGE_KEY);
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    cachedValue = raw ? (JSON.parse(raw) as MockWalletState) : null;
    return cachedValue;
  } catch {
    return null;
  }
}

function writeWallet(next: MockWalletState | null) {
  try {
    if (next) localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(WALLET_STORAGE_KEY);
  } catch {
    // ignore storage errors (private browsing, quota, etc.)
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getServerSnapshot(): MockWalletState | null {
  return null;
}

export function useMockWallet() {
  const wallet = useSyncExternalStore(subscribe, readWallet, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribe,
    useCallback(() => true, []),
    useCallback(() => false, [])
  );

  function createWallet() {
    writeWallet({ connected: true, address: generateMockAddress(), connector: "created" });
  }

  function connectWallet(connector: WalletConnector) {
    writeWallet({ connected: true, address: generateMockAddress(), connector });
  }

  function disconnect() {
    writeWallet(null);
  }

  return { wallet, hydrated, createWallet, connectWallet, disconnect };
}
