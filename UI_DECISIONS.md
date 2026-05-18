# Aura Peptides UI Decisions

This file documents the current design direction for the Aura Peptides storefront. Keep future UI work aligned with these constraints, especially when using AI-assisted code generation.

## Brand Direction

- The visual system is clean, professional, and research-supply focused.
- Primary palette is white/light UI surfaces with black and gold brand accents.
- Buttons use solid colors, not gradients. Primary buttons use Aura gold with a darker gold hover state.
- The logo should be shown without an artificial background container wherever possible.
- Avoid heavy gradients, decorative orbs, bokeh blobs, and overly dark one-note sections unless the section is intentionally brand/hero focused.
- Keep typography friendly and polished. Do not fall back to plain Arial-like styling.

## Layout Rules

- The site should feel like a usable store first, not a marketing landing page.
- Use full-width sections with constrained inner content. Do not nest cards inside cards.
- Cards should be softly rounded and have restrained shadows. Avoid large shadows that get clipped by parent containers.
- Product detail pages should be centered and constrained, not stretched across the entire viewport.
- Mobile layouts should stack cleanly, with stable dimensions for product media, buttons, filters, and cart rows.

## Header And Navigation

- The header is a floating pill-style header.
- Header nav labels are: Home, Products, Info, FAQ, Contact Us.
- Products has a dropdown with: Powders, BAC Water, Needles & Wipes.
- Dropdowns must have a hover bridge so the menu does not disappear while moving the cursor from the trigger to the menu.
- Product dropdown links should point to `/products#powders`, `/products#bac-water`, and `/products#needles-wipes`.

## Pages

- `/` is the home page. It should not list the full catalog.
- Home page product cards should only show products that currently have uploaded product images.
- `/products` is the product listing/filter page.
- `/info` is informational only and should not duplicate the product directory.
- `/faqs` uses a Raena-style FAQ layout: centered heading and clean accordion rows.
- `/cart` is the cart review page with quantity controls, remove, clear cart, totals, research confirmation, and checkout.
- `/products/[productId]` is the dynamic product detail page.

## Product Listing

- The product page title should be `Products`, not `Product directory`.
- Product filters should be a clean segmented control, not separate shadow-heavy cards.
- Product filter options are: All, Powders, BAC Water, Needles & Wipes.
- Product cards should show uploaded images when available and use initials as fallback.

## Product Detail

- Product detail pages should include:
  - Product image or fallback mark
  - Price, size, and category facts
  - Quantity control
  - Research-use confirmation
  - Add to cart
  - View cart
  - Checkout Now
  - Accepted payment note: Visa, Mastercard, Amex, and crypto
  - Product information and related products
- The direct checkout button text is `Checkout Now`.
- Quantity controls should be clear but not overly bold.
- The research confirmation checkbox must have strong contrast and be easy to read.
- BAC water, needles, and sanitary wipes do not show documentation blocks.
- Do not invent exact SDS, COA, CAS, formula, purity, or lot data unless the business provides it.

## Cart

- Cart state is client-side localStorage-backed.
- Header cart icon links to `/cart` when there are items.
- Cart checkout uses the existing Stripe server action and pricing rules.
- Keep the research-use acknowledgement visible before checkout.

## Reviews

- Rotating reviews should continue moving on hover.
- Reviews can be 4 or 5 stars; do not hard-code every review to 5 stars.

## Footer

- Footer social links are icon buttons using the gold brand color.
- Footer includes ABN `86 124 687 890`.
- Keep the research-use disclaimer and compliance copy visible.
