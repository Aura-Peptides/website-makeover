import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/product-detail";
import copy from "@/i18n/locales/en.json";
import { productDisplayName, products, productsById } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = productsById.get(productId);

  if (!product) {
    return {
      title: copy.product.notFound,
    };
  }

  return {
    title: `${productDisplayName(product)} | Aura Peptides`,
    description: `${productDisplayName(product)} supplied for laboratory research use only.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = productsById.get(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetail copy={copy} product={product} />;
}
