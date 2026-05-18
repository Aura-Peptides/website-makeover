"use server";

import Stripe from "stripe";

import copy from "@/i18n/locales/en.json";
import {
  CURRENCY,
  calculateCartPricing,
  productDisplayName,
  type CartItemInput,
} from "@/lib/products";

export type CheckoutInput = {
  items: CartItemInput[];
  researchAccepted: boolean;
};

export type CheckoutErrorCode =
  | "empty_cart"
  | "research_required"
  | "missing_stripe_key"
  | "stripe_error";

export type CheckoutResult =
  | {
      ok: true;
      url: string;
    }
  | {
      ok: false;
      error: CheckoutErrorCode;
    };

export async function createStripePurchaseLink(input: CheckoutInput): Promise<CheckoutResult> {
  if (!input.researchAccepted) {
    return { ok: false, error: "research_required" };
  }

  const pricing = calculateCartPricing(input.items);

  if (pricing.lines.length === 0) {
    return { ok: false, error: "empty_cart" };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { ok: false, error: "missing_stripe_key" };
  }

  const stripe = new Stripe(secretKey);
  const baseUrl = getBaseUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["AU"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: CURRENCY,
            },
            display_name: copy.stripe.shippingName,
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      line_items: pricing.lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: CURRENCY,
          unit_amount: line.unitAmountCents,
          product_data: {
            name: productDisplayName(line.product),
            description: line.product.composition ?? copy.stripe.productDescription,
            metadata: {
              productId: line.product.id,
              category: line.product.category,
              researchUseOnly: "true",
              freePromoApplied: String(line.isFree),
            },
          },
        },
      })),
      metadata: {
        source: "aurapeptides.com.au",
        researchAccepted: "true",
        cart: pricing.lines
          .map((line) => `${line.quantity}x ${line.product.id}`)
          .join(", ")
          .slice(0, 500),
      },
      custom_text: {
        submit: {
          message: copy.stripe.researchMessage,
        },
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    if (!session.url) {
      return { ok: false, error: "stripe_error" };
    }

    return { ok: true, url: session.url };
  } catch (error) {
    console.error("Stripe checkout session creation failed", error);
    return { ok: false, error: "stripe_error" };
  }
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
