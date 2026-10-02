"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { ReasoningSelector } from "@/components/chat/reasoning-selector";

export function ChatInput({
  onSend,
  disabled,
  placeholder = "Ask privately...",
}: {
  onSend: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (ref.current) ref.current.style.height = "";
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        submit();
      }}
      className="rounded-2xl border border-white/[0.1] bg-panel transition-colors duration-300 focus-within:border-cipher/50"
    >
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <textarea
        id="chat-input"
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          e.target.style.height = "";
          e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="block w-full resize-none bg-transparent px-4 pt-4 pb-2 text-[15px] leading-6 text-bone caret-cipher placeholder:text-fog/70 focus:outline-none"
      />
      <div className="flex items-center justify-between px-2.5 pb-2.5">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-fog transition-colors hover:bg-white/[0.05] hover:text-bone"
        >
          <Paperclip className="size-4" aria-hidden="true" />
          Attach
        </button>
        <div className="flex items-center gap-3">
          <ReasoningSelector />
          <button
            type="submit"
            aria-label="Send message"
            disabled={disabled || !value.trim()}
            className="grid size-9 place-items-center rounded-full bg-bone text-vault transition-[transform,opacity,background-color] duration-200 hover:bg-white active:scale-90 disabled:opacity-25"
          >
            <ArrowUp className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </form>
  );
}
