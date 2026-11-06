import { notFound } from "next/navigation";
import SeasonDetail from "@/components/SeasonDetail";
import { getSeason, seasons } from "@/lib/seasons";

export function generateStaticParams() { return seasons.map((s) => ({ slug: s.slug })); }

export default async function SeasonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSeason(slug);
  if (!s) notFound();
  return <SeasonDetail s={s} />;
}
