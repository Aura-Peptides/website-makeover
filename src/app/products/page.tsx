import Image from "next/image";

import { ProductDirectory } from "@/components/product-directory";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import copy from "@/i18n/locales/en.json";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} />
      <section className="hero-band" aria-label={copy.navigation.products}>
        <Image
          src="https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITegQp3YRss2bQtFeoiOLnRmj6du7rhGqzUWkl"
          alt={copy.navigation.products}
          width={2545}
          height={578}
          priority
          className="hero-banner-image hero-banner-image-desktop"
          unoptimized
        />
        <Image
          src="https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITo8oT1TLCDcOEtyfaW1PgeRVqTvd2xZs6LAlz"
          alt={copy.navigation.products}
          width={1080}
          height={1920}
          priority
          className="hero-banner-image hero-banner-image-mobile"
          unoptimized
        />
      </section>
      <ProductDirectory copy={copy} products={products} />
      <SiteFooter copy={copy} />
    </main>
  );
}
