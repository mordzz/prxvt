"use client";

import { motion } from "framer-motion";
import { Check, Coins } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/data/mock-chats";

const ENTER = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

function PaymentBlock({ payment }: { payment: NonNullable<ChatMessageType["payment"]> }) {
  const receipt = payment.kind === "receipt";
  return (
    <div className="mt-3 flex items-center gap-4 rounded-xl border border-seal/25 px-4 py-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-seal/12 text-seal">
        {receipt ? <Check className="size-4" aria-hidden="true" /> : <Coins className="size-4" aria-hidden="true" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-bone">{receipt ? "Paid" : "Payment request"} · {payment.service}</p>
        <p className="mt-0.5 text-xs text-fog">
          {receipt ? `Receipt ${payment.ref} · simulated` : "Within your $1 per-transaction cap"}
        </p>
      </div>
      <span className="shrink-0 text-sm font-semibold tabular-nums text-seal">{payment.amount}</span>
    </div>
  );
}

export function ChatMessage({ message }: { message: ChatMessageType }) {
  if (message.role === "user") {
    return (
      <motion.div {...ENTER} className="flex justify-end">
        <div className="max-w-[70%] rounded-2xl rounded-br-md bg-white/[0.07] px-4 py-2.5 text-[15px] leading-relaxed text-bone">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...ENTER} className="flex gap-3">
      <span aria-hidden="true" className="mt-1 grid size-6 shrink-0 place-items-center rounded-md border border-cipher/40">
        <span className="h-px w-3 bg-cipher" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="whitespace-pre-wrap text-[15px] leading-7 text-bone/90">{message.content}</p>
        {message.payment && <PaymentBlock payment={message.payment} />}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3" role="status" aria-label="Agent is thinking">
      <span aria-hidden="true" className="grid size-6 place-items-center rounded-md border border-cipher/40">
        <span className="h-px w-3 bg-cipher" />
      </span>
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-cipher motion-safe:animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </div>
  );
}
