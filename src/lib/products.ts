export type ProductCategory = "peptides" | "stacks" | "essentials";

export type ProductCertificate = {
  src: string;
  title?: string;
};

export type Product = {
  id: string;
  name: string;
  size: string;
  category: ProductCategory;
  unitAmountCents: number;
  composition?: string;
  badge?: string;
  imageSrc?: string;
  coaImages?: readonly ProductCertificate[];
  maxQuantity?: number;
};

export type CartItemInput = {
  productId: string;
  quantity: number;
};

export type PricedCartLine = {
  product: Product;
  quantity: number;
  unitAmountCents: number;
  lineAmountCents: number;
  isFree: boolean;
};

export const FREE_NEEDLES_THRESHOLD_CENTS = 15000;
export const NEEDLES_PRODUCT_ID = "needles-x10";
export const CURRENCY = "aud";

export const products: readonly Product[] = [
  {
    id: "retatrutide-10mg",
    name: "Retatrutide",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 10995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITEeV9nphTjvyaQtlYJIxNTAwCpWhzs2RLBfPc",
  },
  {
    id: "bpc-157-10mg",
    name: "BPC-157",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 7995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITL04X5x69pfANGChyXtxacD4I2FLWBmY5qQ0d",
  },
  {
    id: "ghk-157-100mg",
    name: "GHK-157",
    size: "100mg",
    category: "peptides",
    unitAmountCents: 7995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITHYQnd46loRITyzbGeL0vmwp4C67ht8SONFUs",
  },
  {
    id: "igf1-lr3-1mg",
    name: "IGF1-LR3",
    size: "1mg",
    category: "peptides",
    unitAmountCents: 11995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITFxUpWfVOuYD3BlhWUZjrKVtmHp42EM8znFwy",
  },
  {
    id: "melanotan-2-10mg",
    name: "MELANOTAN-2",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 8495,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITrUjfC5MHdovFmLKq8bBZcwzJANsgSVnX6hel",
  },
  {
    id: "tb500-10mg",
    name: "TB500",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 8995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITr8Yqsc1MHdovFmLKq8bBZcwzJANsgSVnX6he",
  },
  {
    id: "cjc-1295-dac-10mg",
    name: "CJC-1295 w/DAC",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 11995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITzoBgIDFUPJp8GZWKXkaMRE5chjY7S6qC1w20",
  },
  {
    id: "ipamorelin-10mg",
    name: "IPAMORELIN",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 6995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITivpO5hlgrFbYMLQ5oAzHEX2x8N0aVq3OUnvs",
  },
  {
    id: "tesamorelin-10mg",
    name: "TESAMORELIN",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 11995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITXS8NjFfUEazR1slNydVZM35LwivhXHJjBufg",
  },
  {
    id: "sermorelin-10mg",
    name: "SERMORELIN",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 16995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITOwrFk2hVoxFWVScDlreKI53uhCtiZXkNp8jz",
  },
  {
    id: "tirzepatide-10mg",
    name: "TIRZEPATIDE",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 11995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITgbEi25zKBdS79D0G2mnIipYWrZOAJaV6eHlb",
  },
  {
    id: "semaglutide-10mg",
    name: "SEMAGLUTIDE",
    size: "10mg",
    category: "peptides",
    unitAmountCents: 9995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRIT24vD1mtXOraifkpwZhEzFgTCo1Ncv9bxHGeP",
  },
  {
    id: "semax-11mg",
    name: "SEMAX",
    size: "11mg",
    category: "peptides",
    unitAmountCents: 6995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITQpjiYjrhnqHSWX2d9s7oyGAMuVab4Z18RmBg",
  },
  {
    id: "nad-500mg",
    name: "NAD+",
    size: "500mg",
    category: "peptides",
    unitAmountCents: 6995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITKXZ33JW58pbHwr2BTaJR3XSOMWqQhDL1PVkC",
  },
  {
    id: "selank-11mg",
    name: "SELANK",
    size: "11mg",
    category: "peptides",
    unitAmountCents: 6995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITs1IKpwq0kUbwGPrVIu54g9stAaRDflqvjin6",
  },
  {
    id: "bacterial-water-3ml",
    name: "BAC WATER",
    size: "3ml",
    category: "essentials",
    unitAmountCents: 995,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITkTqA4nhJFG1EaTpzSsx9oRCZB5Yy7HiwbIrP",
  },
  {
    id: "bacterial-water-10ml",
    name: "BAC WATER",
    size: "10ml",
    category: "essentials",
    unitAmountCents: 1495,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRIT7pwHfuouwLzysoB4DOMWmEXp5JYVihKxRlqt",
  },
  {
    id: NEEDLES_PRODUCT_ID,
    name: "NEEDLES",
    size: "x10",
    category: "essentials",
    unitAmountCents: 495,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITqo8BvjgVLWBca4kS0M67vAlOHhZXGnDCmxzF",
  },
  {
    id: "sanitary-wipes-x10",
    name: "SANITARY WIPES",
    size: "x10",
    category: "essentials",
    unitAmountCents: 250,
    imageSrc: "https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITTw0lQhBmawWNQMFH9coXVJKPlYDbCx1SZ7en",
  },
] as const;

export const productsById = new Map<string, Product>(products.map((product) => [product.id, product]));

export function getRelatedProducts(product: Product, limit = 4) {
  const primaryToken = product.name.toLowerCase().split(/[\s-]+/)[0] ?? "";
  const compositionMatches = products.filter((candidate) => {
    if (candidate.id === product.id || !candidate.composition || !primaryToken) {
      return false;
    }

    return candidate.composition.toLowerCase().includes(primaryToken);
  });
  const categoryMatches = products.filter(
    (candidate) => candidate.id !== product.id && candidate.category === product.category,
  );
  const fallbackMatches = products.filter(
    (candidate) => candidate.id !== product.id && candidate.category !== product.category,
  );

  const related = new Map<string, Product>();

  for (const candidate of [...compositionMatches, ...categoryMatches, ...fallbackMatches]) {
    related.set(candidate.id, candidate);
  }

  return Array.from(related.values()).slice(0, limit);
}

export function formatAud(amountCents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: amountCents % 100 === 0 ? 0 : 2,
  }).format(amountCents / 100);
}

export function productDisplayName(product: Product) {
  return `${product.name} ${product.size}`;
}

export function productInitials(product: Product) {
  return product.name
    .replace(/w\/\s*/i, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function normalizeCartItems(items: CartItemInput[]) {
  const quantities = new Map<string, number>();

  for (const item of items) {
    const product = productsById.get(item.productId);
    if (!product) {
      continue;
    }

    const requestedQuantity = Number.isFinite(item.quantity) ? Math.floor(item.quantity) : 0;
    if (requestedQuantity < 1) {
      continue;
    }

    const maxQuantity = product.maxQuantity ?? 25;
    const currentQuantity = quantities.get(product.id) ?? 0;
    quantities.set(product.id, Math.min(currentQuantity + requestedQuantity, maxQuantity));
  }

  return Array.from(quantities.entries()).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

export function calculateCartPricing(items: CartItemInput[]) {
  const normalizedItems = normalizeCartItems(items);
  const subtotalBeforePromosCents = normalizedItems.reduce((total, item) => {
    const product = productsById.get(item.productId);
    return product ? total + product.unitAmountCents * item.quantity : total;
  }, 0);

  const qualifyingSubtotalCents = normalizedItems.reduce((total, item) => {
    const product = productsById.get(item.productId);
    if (!product || product.id === NEEDLES_PRODUCT_ID) {
      return total;
    }

    return total + product.unitAmountCents * item.quantity;
  }, 0);

  const freeNeedlesQualified = qualifyingSubtotalCents >= FREE_NEEDLES_THRESHOLD_CENTS;

  const lines: PricedCartLine[] = normalizedItems.flatMap((item) => {
    const product = productsById.get(item.productId);
    if (!product) {
      return [];
    }

    const isFree = product.id === NEEDLES_PRODUCT_ID && freeNeedlesQualified;
    const unitAmountCents = isFree ? 0 : product.unitAmountCents;

    return [
      {
        product,
        quantity: item.quantity,
        unitAmountCents,
        lineAmountCents: unitAmountCents * item.quantity,
        isFree,
      },
    ];
  });

  const totalAmountCents = lines.reduce((total, line) => total + line.lineAmountCents, 0);
  const promoSavingsCents = subtotalBeforePromosCents - totalAmountCents;

  return {
    lines,
    normalizedItems,
    qualifyingSubtotalCents,
    subtotalBeforePromosCents,
    totalAmountCents,
    promoSavingsCents,
    freeNeedlesQualified,
  };
}
