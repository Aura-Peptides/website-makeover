"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { ShoppingCart } from "lucide-react";

import { createStripePurchaseLink } from "@/app/actions/checkout";
import { addCartItem } from "@/lib/cart-storage";
import { formatAud, productDisplayName, productInitials, products } from "@/lib/products";

type HomePopularProductsCopy = typeof import("@/i18n/locales/en.json");

type HomePopularProductsProps = {
  copy: HomePopularProductsCopy;
};

const popularProducts = products.filter((product) => product.imageSrc).slice(0, 4);

export function HomePopularProducts({ copy }: HomePopularProductsProps) {
  const [isPending, startTransition] = useTransition();

  function checkoutNow(productId: string) {
    startTransition(async () => {
      const result = await createStripePurchaseLink({
        items: [{ productId, quantity: 1 }],
        researchAccepted: true,
      });

      if (result.ok) {
        window.location.assign(result.url);
      }
    });
  }

  return (
    <section className="popular-products" aria-labelledby="popular-products-title">
      <div className="section-heading popular-products-heading">
        <h2 id="popular-products-title">Best Sellers</h2>
      </div>
      <div className="popular-product-grid">
        {popularProducts.map((product) => (
          <article className="popular-product-card" key={product.id}>
            <Link className="popular-product-link" href={`/products/${product.id}`}>
              <span className="popular-product-media" aria-hidden="true">
                {product.imageSrc ? (
                  <Image
                    src={product.imageSrc}
                    alt=""
                    width={360}
                    height={450}
                    className="product-card-image"
                    unoptimized
                  />
                ) : (
                  <span className="popular-product-mark">{productInitials(product)}</span>
                )}
              </span>
              <span className="popular-product-info">
                <strong>{productDisplayName(product)}</strong>
                {product.composition ? (
                  <small>{product.composition}</small>
                ) : (
                  <small>{copy.product.researchNotice}</small>
                )}
              </span>
            </Link>
            <em>{formatAud(product.unitAmountCents)}</em>
            <div className="popular-product-actions">
              <button className="button button-secondary" type="button" onClick={() => addCartItem(product.id, 1)}>
                <ShoppingCart aria-hidden="true" />
                {copy.product.addToCart}
              </button>
              <button
                className="button button-primary"
                type="button"
                disabled={isPending}
                onClick={() => checkoutNow(product.id)}
              >
                {copy.product.checkout}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
