"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";

import { createStripePurchaseLink, type CheckoutErrorCode } from "@/app/actions/checkout";
import { ProductCoaDialog } from "@/components/product-coa-dialog";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { addCartItem, useCartItems } from "@/lib/cart-storage";
import {
  formatAud,
  getRelatedProducts,
  productDisplayName,
  productInitials,
  type Product,
} from "@/lib/products";

type ProductDetailCopy = typeof import("@/i18n/locales/en.json");

type ProductDetailProps = {
  copy: ProductDetailCopy;
  product: Product;
};

function productGroupLabel(copy: ProductDetailCopy, product: Product) {
  if (product.category === "stacks") {
    return copy.navigation.stacks;
  }

  if (product.id.startsWith("bacterial-water")) {
    return copy.navigation.bacWater;
  }

  if (product.id === "needles-x10" || product.id === "sanitary-wipes-x10") {
    return copy.navigation.needlesWipes;
  }

  return copy.navigation.powders;
}

export function ProductDetail({ copy, product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [researchAccepted, setResearchAccepted] = useState(false);
  const [checkoutError, setCheckoutError] = useState<CheckoutErrorCode | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const cartItems = useCartItems();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const maxQuantity = product.maxQuantity ?? 25;
  const relatedProducts = getRelatedProducts(product);
  const coaImages = product.coaImages ?? [];
  const showDocumentation = product.category !== "essentials";
  const materialValue =
    product.composition ??
    (product.category === "essentials" ? copy.product.laboratorySupply : copy.product.singleMaterial);
  const formatValue = product.category === "essentials" ? copy.product.laboratorySupply : copy.product.lyophilizedPowder;
  const properties = [
    [copy.product.productLabel, productDisplayName(product)],
    [copy.product.size, product.size],
    [copy.product.category, copy.catalog[product.category]],
    [product.composition ? copy.product.compositionLabel : copy.product.materialLabel, materialValue],
    [copy.product.formatLabel, formatValue],
    [copy.product.termsLabel, copy.product.researchUseTerms],
  ];

  function setSafeQuantity(nextQuantity: number) {
    setQuantity(Math.max(1, Math.min(Math.floor(nextQuantity), maxQuantity)));
  }

  function checkout() {
    setCheckoutError(null);

    startTransition(async () => {
      const result = await createStripePurchaseLink({
        items: [{ productId: product.id, quantity }],
        researchAccepted,
      });

      if (result.ok) {
        window.location.assign(result.url);
        return;
      }

      setCheckoutError(result.error);
    });
  }

  function addToCart() {
    addCartItem(product.id, quantity);
    setCartAdded(true);
    window.setTimeout(() => setCartAdded(false), 1800);
  }

  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} cartCount={cartCount} />
      <section className="product-detail-hero">
        <div className="product-detail-art">
          {product.imageSrc ? (
            <Image
              src={product.imageSrc}
              alt={productDisplayName(product)}
              width={700}
              height={875}
              className="product-detail-image"
              priority
              unoptimized
            />
          ) : (
            <div className="product-detail-fallback" aria-hidden="true">
              <div className="vial-cap" />
              <div className="vial-body">
                <span>{productInitials(product)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="product-detail-copy">
          <Link className="back-link" href="/products">
            <ArrowLeft aria-hidden="true" />
            {copy.product.backToProducts}
          </Link>
          <p className="eyebrow">{copy.catalog[product.category]}</p>
          <h1>{productDisplayName(product)}</h1>
          <p>{product.composition ?? copy.product.researchNotice}</p>
          {product.badge ? <em>{product.badge}</em> : null}
          <dl className="product-detail-facts">
            <div>
              <dt>{copy.product.size}</dt>
              <dd>{product.size}</dd>
            </div>
            <div>
              <dt>{copy.product.category}</dt>
              <dd>{copy.catalog[product.category]}</dd>
            </div>
            <div>
              <dt>{copy.product.price}</dt>
              <dd>{formatAud(product.unitAmountCents)}</dd>
            </div>
          </dl>
          <div className="product-checkout-panel">
            <label>
              {copy.product.quantity}
              <span className="quantity-stepper">
                <button
                  type="button"
                  aria-label={copy.cart.decrease}
                  title={copy.cart.decrease}
                  onClick={() => setSafeQuantity(quantity - 1)}
                >
                  <Minus aria-hidden="true" />
                </button>
                <span aria-label={copy.catalog.quantity}>{quantity}</span>
                <button
                  type="button"
                  aria-label={copy.cart.increase}
                  title={copy.cart.increase}
                  onClick={() => setSafeQuantity(quantity + 1)}
                >
                  <Plus aria-hidden="true" />
                </button>
              </span>
            </label>
            <label className="research-check">
              <input
                type="checkbox"
                checked={researchAccepted}
                onChange={(event) => setResearchAccepted(event.target.checked)}
              />
              <span>{copy.cart.researchConfirm}</span>
            </label>
            {cartAdded ? <p className="cart-added-message">{copy.cart.added}</p> : null}
            {checkoutError ? <p className="checkout-error">{copy.cart.errors[checkoutError]}</p> : null}
            <div className="product-purchase-actions">
              <button className="button button-secondary" type="button" onClick={addToCart}>
                <ShoppingCart aria-hidden="true" />
                {copy.product.addToCart}
              </button>
              <Link className="button button-ghost" href="/cart">
                {copy.cart.viewCart}
              </Link>
              <button className="button button-primary" type="button" disabled={isPending} onClick={checkout}>
                <ShoppingCart aria-hidden="true" />
                {isPending ? copy.cart.processing : copy.product.checkout}
              </button>
            </div>
            <p className="payment-method-note">{copy.product.paymentMethods}</p>
          </div>
        </div>
      </section>
      <section className="product-information-section">
        <article className="product-info-card product-description-card">
          <p className="eyebrow">{copy.product.descriptionTitle}</p>
          <h2>{productDisplayName(product)}</h2>
          <p>
            <strong>{productDisplayName(product)}</strong> {copy.product.descriptionBody}
          </p>
        </article>

        <div className={showDocumentation ? "product-info-grid" : "product-info-grid is-single"}>
          {showDocumentation ? (
            <article className="product-info-card product-coa-card">
              <h2>{copy.product.coa}</h2>
              {coaImages.length > 0 ? (
                <ProductCoaDialog copy={copy} product={product} coaImages={coaImages} />
              ) : (
                <p>{copy.product.availableOnRequest}</p>
              )}
            </article>
          ) : null}
          <article className="product-info-card">
            <h2>{copy.product.propertiesTitle}</h2>
            <dl className="product-properties-list">
              {properties.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <section className="related-products-section" aria-labelledby="related-products-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.product.relatedTitle}</p>
              <h2 id="related-products-title">{copy.product.relatedTitle}</h2>
              <p>{copy.product.relatedBody}</p>
            </div>
          </div>
          <div className="store-product-grid">
            {relatedProducts.map((relatedProduct) => (
              <article className="store-product-card" key={relatedProduct.id}>
                <Link className="store-product-link" href={`/products/${relatedProduct.id}`}>
                  <span className="store-product-media" aria-hidden="true">
                    {relatedProduct.imageSrc ? (
                      <Image
                        src={relatedProduct.imageSrc}
                        alt=""
                        width={360}
                        height={450}
                        className="product-card-image"
                        unoptimized
                      />
                    ) : (
                      <span className="store-product-initials">{productInitials(relatedProduct)}</span>
                    )}
                  </span>
                  <span className="store-product-copy">
                    <small>{productGroupLabel(copy, relatedProduct)}</small>
                    <strong>{productDisplayName(relatedProduct)}</strong>
                    {relatedProduct.composition ? <span>{relatedProduct.composition}</span> : null}
                    {relatedProduct.badge ? <em>{relatedProduct.badge}</em> : null}
                  </span>
                  <span className="store-product-footer">
                    <strong>{formatAud(relatedProduct.unitAmountCents)}</strong>
                    <span>{copy.catalog.viewProduct}</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
      <section className="research-section" id="research">
        <p className="eyebrow">{copy.navigation.terms}</p>
        <h2>{copy.hero.researchOnly}</h2>
        <p>{copy.footer.disclaimer}</p>
      </section>
      <SiteFooter copy={copy} />
    </main>
  );
}
