import { Suspense } from "react";
import StudioClient from "./StudioClient";

export function generateStaticParams() {
  return [
    { domain: "jewellery" },
    { domain: "footwear" },
    { domain: "optical" },
  ];
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] p-4 text-center">Loading Studio...</div>}>
      <StudioClient domain={domain} />
    </Suspense>
  );
}
