const EVENTS = [
  { text: "Session opened", value: "anon·k2f9" },
  { text: "Research task completed", value: "14 sources" },
  { text: "Paid API call", value: "0.40 USDG", paid: true },
  { text: "Policy check passed", value: "daily $5.00" },
  { text: "Signature verified", value: "no transaction" },
  { text: "Image model call", value: "0.12 USDG", paid: true },
  { text: "Conversation deleted", value: "by owner" },
  { text: "Approval requested", value: "1.20 USDG > cap", paid: true },
];

export function ActivityTicker() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {EVENTS.map((e) => (
        <li key={e.text} className="flex items-center gap-3 whitespace-nowrap text-sm">
          <span className={`size-1.5 rounded-full ${e.paid ? "bg-seal" : "bg-cipher"}`} aria-hidden="true" />
          <span className="text-bone/80">{e.text}</span>
          <span className={`font-mono text-xs ${e.paid ? "text-seal" : "text-fog"}`}>{e.value}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Simulated agent activity" className="ticker relative py-5">
      <p className="sr-only">Example events from the simulated agent workspace.</p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="ticker-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
