import ProductDetailClient from "./_components/ProductDetailClient";
import type { Target } from "@/lib/api/types";

type PageProps = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parseTarget(v: string | string[] | undefined): Target | null {
  const raw = Array.isArray(v) ? v[0] : v;
  if (raw === "PREGNANT" || raw === "TEEN" || raw === "DIETER") return raw;
  return null;
}

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const { productId } = await params;
  const sp = await searchParams;

  const idNum = Number(productId);
  const target = parseTarget(sp.target);

  return <ProductDetailClient productId={idNum} target={target} />;
}
