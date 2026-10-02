"use client";

import { useState } from "react";
import { getMockResponse, type ChatMessage } from "@/data/mock-chats";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}-${Date.now()}`;
}

export function useMockChat(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  function sendMessage(content: string) {
    const userMessage: ChatMessage = { id: nextId(), role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: nextId(),
        role: "assistant",
        content: getMockResponse(content),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 900 + Math.random() * 400);
  }

  return { messages, isTyping, sendMessage };
}
