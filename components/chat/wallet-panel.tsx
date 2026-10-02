"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, X } from "lucide-react";
import { WALLET_CONNECTORS, type MockWalletState, type WalletConnector } from "@/data/mock-wallet";

type Mode = "start" | "connect";

const ROW =
  "flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-white/[0.05]";

export function WalletPanel({
  open,
  onClose,
  wallet,
  onCreate,
  onConnect,
  onDisconnect,
}: {
  open: boolean;
  onClose: () => void;
  wallet: MockWalletState | null;
  onCreate: () => void;
  onConnect: (connector: WalletConnector) => void;
  onDisconnect: () => void;
}) {
  const [mode, setMode] = useState<Mode>("start");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-vault/80 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-title"
            initial={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-panel p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="wallet-title" className="font-display text-xl font-medium tracking-[-0.02em] text-bone">
                  {wallet ? "Wallet connected" : mode === "connect" ? "Choose a wallet" : "Sign in with a wallet"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-fog">
                  {wallet
                    ? "Your address stays out of every conversation."
                    : "One signature proves it's you. No password, no private key."}
                </p>
              </div>
              <button onClick={onClose} aria-label="Close" className="grid size-9 shrink-0 place-items-center rounded-lg text-fog hover:bg-white/[0.05] hover:text-bone">
                <X className="size-4" />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={wallet ? "done" : mode}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="-mx-4 mt-6"
              >
                {wallet ? (
                  <div className="px-4">
                    <div className="flex items-center gap-3 border-y border-white/[0.07] py-4">
                      <span className="grid size-8 place-items-center rounded-full bg-cipher/15 text-cipher">
                        <Check className="size-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-sm text-bone">{wallet.address}</span>
                    </div>
                    <button
                      onClick={() => {
                        onDisconnect();
                        setMode("start");
                      }}
                      className="mt-4 text-sm text-fog underline-offset-4 hover:text-bone hover:underline"
                    >
                      Disconnect wallet
                    </button>
                  </div>
                ) : mode === "start" ? (
                  <div className="flex flex-col">
                    <button onClick={() => setMode("connect")} className={ROW}>
                      <span>
                        <span className="block text-[15px] font-medium text-bone">Connect existing wallet</span>
                        <span className="mt-0.5 block text-sm text-fog">Browser, mobile, or embedded</span>
                      </span>
                      <ChevronRight className="size-4 text-fog" aria-hidden="true" />
                    </button>
                    <button onClick={onCreate} className={ROW}>
                      <span>
                        <span className="block text-[15px] font-medium text-bone">Create a new wallet</span>
                        <span className="mt-0.5 block text-sm text-fog">Ready in one step</span>
                      </span>
                      <ChevronRight className="size-4 text-fog" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {WALLET_CONNECTORS.map((c) => (
                      <button key={c.id} onClick={() => onConnect(c.id)} className={ROW}>
                        <span>
                          <span className="block text-[15px] font-medium text-bone">{c.label}</span>
                          <span className="mt-0.5 block text-sm text-fog">{c.description}</span>
                        </span>
                        <ChevronRight className="size-4 shrink-0 text-fog" aria-hidden="true" />
                      </button>
                    ))}
                    <button
                      onClick={() => setMode("start")}
                      className="mx-4 mt-2 flex items-center gap-1.5 self-start text-sm text-fog hover:text-bone"
                    >
                      <ArrowLeft className="size-4" aria-hidden="true" /> Back
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 text-xs text-fog/80">Demo only. No real wallet is created or connected.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
