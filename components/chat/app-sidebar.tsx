"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plus, Settings, Wallet, X } from "lucide-react";
import { SITE_NAME } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function AppSidebar({
  open,
  onClose,
  onOpenWallet,
  onNewChat,
  sessions,
  activeSession,
  onSelectSession,
}: {
  open: boolean;
  onClose: () => void;
  onOpenWallet: () => void;
  onNewChat: () => void;
  sessions: string[];
  activeSession: number;
  onSelectSession: (i: number) => void;
}) {
  const content = (
    <div className="flex h-full flex-col p-3">
      <div className="flex h-11 items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-bone">
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
            <rect x="1" y="1" width="18" height="18" rx="5" fill="none" stroke="#8fa8ff" strokeWidth="1.5" />
            <path d="M1 10h18" stroke="#ece9e1" strokeWidth="1.5" />
          </svg>
          {SITE_NAME}
        </Link>
        <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-fog hover:text-bone md:hidden" aria-label="Close menu">
          <X className="size-4" />
        </button>
      </div>

      <button
        onClick={onNewChat}
        className="mt-4 flex h-10 items-center gap-2 rounded-xl border border-white/[0.1] px-3 text-sm font-medium text-bone transition-colors hover:border-cipher/50 hover:text-cipher"
      >
        <Plus className="size-4" aria-hidden="true" />
        New chat
      </button>

      <nav aria-label="Conversations" className="mt-6 min-h-0 flex-1 overflow-y-auto">
        <p className="px-3 text-xs text-fog">Recent</p>
        <ul className="mt-2 flex flex-col gap-0.5">
          {sessions.map((session, i) => {
            const active = activeSession === i;
            return (
              <li key={`${session}-${i}`} className="relative">
                {active && (
                  <motion.span
                    layoutId="session-active"
                    className="absolute inset-0 rounded-lg bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <button
                  onClick={() => onSelectSession(i)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative w-full truncate rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    active ? "text-bone" : "text-fog hover:text-bone"
                  )}
                >
                  {session}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-0.5 border-t border-white/[0.07] pt-3">
        <button
          onClick={onOpenWallet}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-fog transition-colors hover:bg-white/[0.05] hover:text-bone"
        >
          <Wallet className="size-4" aria-hidden="true" /> Wallet
        </button>
        <button className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-fog transition-colors hover:bg-white/[0.05] hover:text-bone">
          <Settings className="size-4" aria-hidden="true" /> Settings
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.07] md:block">{content}</aside>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-vault/80 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-72 border-r border-white/[0.08] bg-vault"
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export function AppSidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="grid size-9 place-items-center rounded-lg text-fog transition-colors hover:bg-white/[0.05] hover:text-bone md:hidden"
      aria-label="Open menu"
    >
      <Menu className="size-5" />
    </button>
  );
}
