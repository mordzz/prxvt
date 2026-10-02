"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { AppSidebar, AppSidebarToggle } from "@/components/chat/app-sidebar";
import { WalletButton } from "@/components/chat/wallet-button";
import { WalletPanel } from "@/components/chat/wallet-panel";
import { ChatWindow } from "@/components/chat/chat-window";
import { ModelSelector } from "@/components/chat/model-selector";
import { SessionRail } from "@/components/chat/session-rail";
import { useMockWallet } from "@/hooks/use-mock-wallet";
import { SAMPLE_CONVERSATION } from "@/data/mock-chats";

const INITIAL_SESSIONS = ["Tokenized assets on Robinhood", "Private payment research", "Agent spending policy"];
const SESSION_KEYS = ["anon · k2f9 7c1e a04b", "anon · 9d3a e6f2 51c8", "anon · 4b7e 0a9d c3f1", "anon · 61ce b20f 7d94"];

export default function AppPage() {
  const { wallet, hydrated, createWallet, connectWallet, disconnect } = useMockWallet();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [activeSession, setActiveSession] = useState(0);
  const [panelOverride, setPanelOverride] = useState<boolean | null>(null);

  // Auto-open the wallet panel once hydrated if no wallet exists yet,
  // unless the user has explicitly opened/closed it already.
  const walletPanelOpen = panelOverride ?? (hydrated && !wallet);
  // Only the first sample conversation carries seeded history; others and new chats start empty.
  const seed = activeSession === sessions.length - INITIAL_SESSIONS.length ? SAMPLE_CONVERSATION : [];

  return (
    <div className="flex h-full">
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenWallet={() => setPanelOverride(true)}
        onNewChat={() => {
          setSessions((s) => ["New chat", ...s]);
          setActiveSession(0);
          setSidebarOpen(false);
        }}
        sessions={sessions}
        activeSession={activeSession}
        onSelectSession={(i) => {
          setActiveSession(i);
          setSidebarOpen(false);
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] px-3 sm:px-5">
          <div className="flex items-center gap-2">
            <AppSidebarToggle onClick={() => setSidebarOpen(true)} />
            <ModelSelector />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs text-cipher sm:flex xl:hidden">
              <Lock className="size-3.5" aria-hidden="true" /> Private session
            </span>
            <WalletButton address={wallet?.address} onClick={() => setPanelOverride(true)} />
          </div>
        </header>

        <ChatWindow
          key={`${sessions.length}-${activeSession}`}
          className="flex-1"
          seed={seed}
          placeholder="Message your agent privately"
        />
      </div>

      <SessionRail connected={!!wallet} sessionKey={SESSION_KEYS[activeSession % SESSION_KEYS.length]} />

      <WalletPanel
        open={walletPanelOpen}
        onClose={() => setPanelOverride(false)}
        wallet={wallet}
        onCreate={createWallet}
        onConnect={connectWallet}
        onDisconnect={disconnect}
      />
    </div>
  );
}
