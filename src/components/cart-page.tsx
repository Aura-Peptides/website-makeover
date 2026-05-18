"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { createStripePurchaseLink, type CheckoutErrorCode } from "@/app/actions/checkout";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { clearCart, removeCartItem, setCartItemQuantity, useCartItems } from "@/lib/cart-storage";
import {
  calculateCartPricing,
  formatAud,
  productDisplayName,
  productInitials,
} from "@/lib/products";

type CartPageCopy = typeof import("@/i18n/locales/en.json");

type CartPageProps = {
  copy: CartPageCopy;
};

export function CartPage({ copy }: CartPageProps) {
  const cartItems = useCartItems();
  const [researchAccepted, setResearchAccepted] = useState(false);
  const [checkoutError, setCheckoutError] = useState<CheckoutErrorCode | null>(null);
  const [isPending, startTransition] = useTransition();
  const pricing = calculateCartPricing(cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function checkout() {
    setCheckoutError(null);

    startTransition(async () => {
      const result = await createStripePurchaseLink({
        items: cartItems,
        researchAccepted,
      });

      if (result.ok) {
        clearCart();
        window.location.assign(result.url);
        return;
      }

      setCheckoutError(result.error);
    });
  }

  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} cartCount={cartCount} />
      <section className="page-hero compact-page-hero">
        <p className="eyebrow">{copy.navigation.cart}</p>
        <h1>{copy.cart.title}</h1>
        <p>{pricing.lines.length > 0 ? copy.cart.freeNeedlesLocked : copy.cart.emptyHint}</p>
      </section>

      <section className="cart-page-section">
        {pricing.lines.length === 0 ? (
          <div className="empty-cart cart-page-empty">
            <ShoppingCart aria-hidden="true" />
            <h2>{copy.cart.empty}</h2>
            <p>{copy.cart.emptyHint}</p>
            <Link className="button button-primary" href="/products">
              {copy.cart.continueShopping}
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-page-lines">
              {pricing.lines.map((line) => (
                <article className="cart-page-line" key={line.product.id}>
                  <span className="directory-product-media" aria-hidden="true">
                    {line.product.imageSrc ? (
                      <Image
                        src={line.product.imageSrc}
                        alt=""
                        width={180}
                        height={225}
                        className="product-card-image"
                        unoptimized
                      />
                    ) : (
                      productInitials(line.product)
                    )}
                  </span>
                  <div>
                    <strong>{productDisplayName(line.product)}</strong>
                    {line.product.composition ? <small>{line.product.composition}</small> : null}
                    {line.isFree ? <small>{copy.cart.freeNeedlesUnlocked}</small> : null}
                  </div>
                  <span className="quantity-stepper">
                    <button
                      type="button"
                      aria-label={copy.cart.decrease}
                      title={copy.cart.decrease}
                      onClick={() => setCartItemQuantity(line.product.id, line.quantity - 1)}
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <span aria-label={copy.catalog.quantity}>{line.quantity}</span>
                    <button
                      type="button"
                      aria-label={copy.cart.increase}
                      title={copy.cart.increase}
                      onClick={() => setCartItemQuantity(line.product.id, line.quantity + 1)}
                    >
                      <Plus aria-hidden="true" />
                    </button>
                  </span>
                  <em>{line.isFree ? copy.cart.free : formatAud(line.lineAmountCents)}</em>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={copy.cart.remove}
                    title={copy.cart.remove}
                    onClick={() => removeCartItem(line.product.id)}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>

            <aside className="cart-page-summary">
              <h2>{copy.cart.title}</h2>
              <div className="cart-summary">
                <div>
                  <span>{copy.cart.subtotal}</span>
                  <strong>{formatAud(pricing.subtotalBeforePromosCents)}</strong>
                </div>
                <div>
                  <span>{copy.cart.savings}</span>
                  <strong>{pricing.promoSavingsCents > 0 ? formatAud(pricing.promoSavingsCents) : formatAud(0)}</strong>
                </div>
                <div className="cart-total">
                  <span>{copy.cart.total}</span>
                  <strong>{formatAud(pricing.totalAmountCents)}</strong>
                </div>
              </div>
              <p>{pricing.freeNeedlesQualified ? copy.cart.freeNeedlesUnlocked : copy.cart.freeNeedlesLocked}</p>
              <label className="research-check">
                <input
                  type="checkbox"
                  checked={researchAccepted}
                  onChange={(event) => setResearchAccepted(event.target.checked)}
                />
                <span>{copy.cart.researchConfirm}</span>
              </label>
              {checkoutError ? <p className="checkout-error">{copy.cart.errors[checkoutError]}</p> : null}
              <button className="button button-primary" type="button" disabled={isPending} onClick={checkout}>
                {isPending ? copy.cart.processing : copy.cart.checkout}
              </button>
              <div className="cart-page-actions">
                <Link className="button button-secondary" href="/products">
                  {copy.cart.continueShopping}
                </Link>
                <button className="button button-ghost" type="button" onClick={clearCart}>
                  {copy.cart.clear}
                </button>
              </div>
            </aside>
          </>
        )}
      </section>
      <SiteFooter copy={copy} />
    </main>
  );
}
