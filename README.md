# Aura Peptides Storefront

Next.js storefront for Aura Peptides, built for Vercel with Stripe Checkout.

## Local Setup

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Stripe Setup

Create a Stripe secret key and add it to Vercel:

```bash
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://aurapeptides.com.au
```

Checkout is created by the server action in `src/app/actions/checkout.ts`. The browser sends product IDs and quantities only; prices, free-needle eligibility, currency, shipping address collection, and Stripe line items are recalculated on the server from `src/lib/products.ts`.

## Product Source

The catalog is based on `Aura Peptides Pricelist.pdf` supplied with the project brief. All prices are AUD.
