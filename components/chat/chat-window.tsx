"use client";

import { useEffect, useRef } from "react";
import { ChatMessage, TypingIndicator } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { useMockChat } from "@/hooks/use-mock-chat";
import { SAMPLE_CONVERSATION } from "@/data/mock-chats";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Research tokenized assets on Robinhood Chain",
  "Explain how my agent wallet limits work",
  "Find a paid data API under $0.50",
];

export function ChatWindow({
  className,
  seed = SAMPLE_CONVERSATION,
  placeholder,
}: {
  className?: string;
  seed?: typeof SAMPLE_CONVERSATION;
  placeholder?: string;
}) {
  const { messages, isTyping, sendMessage } = useMockChat(seed);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const empty = messages.length === 0;

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto" aria-live="polite">
        {empty ? (
          <div className="flex h-full flex-col justify-center px-4 sm:px-8 lg:px-12">
            <h1 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight tracking-[-0.03em] text-bone">
              What should your agent do?
            </h1>
            <p className="mt-3 text-[15px] text-fog">This session is not linked to your wallet address.</p>
            <div className="mt-8 flex flex-col gap-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-xl px-4 py-3 text-left text-[15px] text-bone/85 transition-colors hover:bg-white/[0.05] hover:text-bone"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-7 px-4 py-8 sm:px-8 lg:px-12">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        )}
      </div>
      <div className="w-full px-4 pb-4 sm:px-8 lg:px-12">
        <ChatInput onSend={sendMessage} disabled={isTyping} placeholder={placeholder} />
        <p className="mt-2 text-center text-xs text-fog/80">Demo responses. No data leaves your browser.</p>
      </div>
    </div>
  );
}
