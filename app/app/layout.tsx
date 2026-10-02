export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-vault text-bone">{children}</div>;
}
