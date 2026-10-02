import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Product", href: "/#product" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Launch App", href: "/app" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-vault">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-display text-[15px] font-semibold text-bone">{SITE_NAME}</span>
            <p className="max-w-[220px] text-sm text-fog">
              Privacy-first AI infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-14">
            {COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <span className="text-sm font-medium text-bone">
                  {column.title}
                </span>
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-fog transition-colors hover:text-cipher"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-white/[0.07] pt-6 text-xs text-fog">
          <span>&copy; {new Date().getFullYear()} {SITE_NAME}. Interactive prototype.</span>
        </div>
      </div>
    </footer>
  );
}
