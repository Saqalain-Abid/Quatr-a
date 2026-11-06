import type { Metadata } from "next";
import CollectionList from "@/components/CollectionList";

export const metadata: Metadata = { title: "Collection" };

export default function CollectionPage() {
  return (
    <div className="px-6 pb-32 pt-44 md:px-12">
      <p className="eyebrow text-muted">The collection · Four eaux de parfum</p>
      <h1 className="mt-6 font-display text-[clamp(4rem,14vw,13rem)] font-light italic leading-[0.85]">
        One for<br /><span className="outline-text">every season</span>
      </h1>
      <div className="mt-24"><CollectionList /></div>
    </div>
  );
}
