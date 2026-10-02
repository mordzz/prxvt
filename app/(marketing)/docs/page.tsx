import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site-config";
import { DocsView } from "./docs-view";

export const metadata: Metadata = { title: `Docs — ${SITE_NAME}` };

export default function DocsPage() {
  return <DocsView />;
}
