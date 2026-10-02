"use client";

import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export function WalletButton({
  address,
  onClick,
  className,
}: {
  address?: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-2 rounded-full px-4 text-sm transition-[background-color,border-color,color] duration-300",
        address
          ? "border border-white/[0.1] text-bone hover:border-cipher/50"
          : "bg-bone font-semibold text-vault hover:bg-white",
        className
      )}
    >
      {address ? (
        <>
          <span className="size-1.5 rounded-full bg-cipher" aria-hidden="true" />
          <span className="font-mono text-xs">{address}</span>
        </>
      ) : (
        <>
          <Wallet className="size-4" aria-hidden="true" />
          Connect wallet
        </>
      )}
    </button>
  );
}
