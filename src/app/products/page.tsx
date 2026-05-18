import Image from "next/image";

import { ProductDirectory } from "@/components/product-directory";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import copy from "@/i18n/locales/en.json";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} />
      <section className="page-hero compact-page-hero products-page-hero">
        <div>
          <h1>{copy.navigation.products}</h1>
        </div>
        <div className="products-page-hero-logo" aria-hidden="true">
          <Image
            src="/images/aura-logo.png"
            alt=""
            width={360}
            height={360}
            priority
            className="hero-logo-primary"
            unoptimized
          />
        </div>
      </section>
      <ProductDirectory copy={copy} products={products} />
      <SiteFooter copy={copy} />
    </main>
  );
}
