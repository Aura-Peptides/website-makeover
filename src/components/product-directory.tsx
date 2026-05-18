"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  formatAud,
  productDisplayName,
  productInitials,
  type Product,
} from "@/lib/products";

type ProductDirectoryCopy = typeof import("@/i18n/locales/en.json");

type ProductDirectoryProps = {
  copy: ProductDirectoryCopy;
  products: readonly Product[];
};

const productGroups = [
  {
    id: "peptides",
    label: (copy: ProductDirectoryCopy) => copy.navigation.peptides,
    filter: (product: Product) => product.category === "peptides" && product.id !== "cjc-1295-dac-10mg",
  },
  {
    id: "stacks",
    label: (copy: ProductDirectoryCopy) => copy.navigation.stacks,
    filter: (product: Product) => product.id === "cjc-1295-dac-10mg",
  },
  {
    id: "essentials",
    label: (copy: ProductDirectoryCopy) => copy.navigation.essentials,
    filter: (product: Product) =>
      product.id.startsWith("bacterial-water") ||
      product.id === "needles-x10" ||
      product.id === "sanitary-wipes-x10",
  },
] as const;

const sortOptions = [
  { id: "default", label: (copy: ProductDirectoryCopy) => copy.catalog.sortDefault },
  { id: "name", label: (copy: ProductDirectoryCopy) => copy.catalog.sortName },
  { id: "price-low", label: (copy: ProductDirectoryCopy) => copy.catalog.sortPriceLow },
  { id: "price-high", label: (copy: ProductDirectoryCopy) => copy.catalog.sortPriceHigh },
] as const;

type ProductGroupId = "all" | (typeof productGroups)[number]["id"];
type ProductGroup = (typeof productGroups)[number];
type SortId = (typeof sortOptions)[number]["id"];

function getProductGroup(product: Product): ProductGroup {
  return productGroups.find((group) => group.filter(product)) ?? productGroups[0];
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

export function ProductDirectory({ copy, products }: ProductDirectoryProps) {
  const [activeGroupId, setActiveGroupId] = useState<ProductGroupId>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortId, setSortId] = useState<SortId>("default");
  const normalizedSearchTerm = normalizeSearchValue(searchTerm);

  function matchesSearch(product: Product) {
    if (!normalizedSearchTerm) {
      return true;
    }

    const searchableText = [
      product.name,
      product.size,
      product.category,
      product.composition,
      product.badge,
      product.id.replaceAll("-", " "),
      getProductGroup(product).label(copy),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearchTerm);
  }

  const productsMatchingSearch = useMemo(
    () => products.filter((product) => matchesSearch(product)),
    [products, normalizedSearchTerm],
  );

  const filteredProducts = useMemo(() => {
    const categoryProducts =
      activeGroupId === "all"
        ? productsMatchingSearch
        : productsMatchingSearch.filter((product) => {
            const group = productGroups.find((candidate) => candidate.id === activeGroupId);
            return group?.filter(product) ?? false;
          });

    return [...categoryProducts].sort((firstProduct, secondProduct) => {
      if (sortId === "name") {
        return productDisplayName(firstProduct).localeCompare(productDisplayName(secondProduct));
      }

      if (sortId === "price-low") {
        return firstProduct.unitAmountCents - secondProduct.unitAmountCents;
      }

      if (sortId === "price-high") {
        return secondProduct.unitAmountCents - firstProduct.unitAmountCents;
      }

      return products.indexOf(firstProduct) - products.indexOf(secondProduct);
    });
  }, [activeGroupId, products, productsMatchingSearch, sortId]);

  const activeGroupLabel =
    activeGroupId === "all"
      ? copy.catalog.all
      : productGroups.find((group) => group.id === activeGroupId)?.label(copy) ?? copy.catalog.all;

  const resultsSummary = copy.catalog.showingTemplate
    .replace("{count}", filteredProducts.length.toString())
    .replace("{total}", products.length.toString());

  useEffect(() => {
    function setFilterFromHash() {
      const hashValue = window.location.hash.replace("#", "");
      const matchingGroup = productGroups.find((group) => group.id === hashValue);

      if (matchingGroup) {
        setActiveGroupId(matchingGroup.id);
      }
    }

    setFilterFromHash();
    window.addEventListener("hashchange", setFilterFromHash);

    return () => window.removeEventListener("hashchange", setFilterFromHash);
  }, []);

  return (
    <section className="catalog-section product-directory" id="products">
      <div className="section-heading catalog-heading">
        <div>
          <p>{copy.catalog.subtitle}</p>
        </div>
        <div className="catalog-stat-strip" aria-label={copy.catalog.catalogSummary}>
          <span>
            <strong>{products.length}</strong>
            {copy.catalog.totalProducts}
          </span>
          <span>
            <strong>{productGroups.length}</strong>
            {copy.navigation.categories}
          </span>
        </div>
      </div>

      <div className="storefront-catalog-layout">
        <aside className="catalog-filter-panel" aria-label={copy.catalog.filtersTitle}>
          <div>
            <p className="eyebrow">{copy.catalog.filtersTitle}</p>
            <h3>{copy.navigation.categories}</h3>
          </div>
          <div className="category-tabs product-filter-tabs" aria-label={copy.catalog.activeFilters}>
            <button
              className={activeGroupId === "all" ? "is-active" : ""}
              type="button"
              aria-pressed={activeGroupId === "all"}
              onClick={() => setActiveGroupId("all")}
            >
              <span>{copy.catalog.all}</span>
              <small>{productsMatchingSearch.length}</small>
            </button>
            {productGroups.map((group) => {
              const groupProductCount = productsMatchingSearch.filter(group.filter).length;

              return (
                <button
                  className={activeGroupId === group.id ? "is-active" : ""}
                  id={group.id}
                  type="button"
                  aria-pressed={activeGroupId === group.id}
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                >
                  <span>{group.label(copy)}</span>
                  <small>{groupProductCount}</small>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="catalog-results-panel">
          <div className="catalog-tools">
            <label className="catalog-search" htmlFor="product-search">
              <span>{copy.catalog.searchLabel}</span>
              <Search aria-hidden="true" />
              <input
                id="product-search"
                name="product-search"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={copy.catalog.searchPlaceholder}
                type="search"
                value={searchTerm}
              />
            </label>
            <label className="catalog-sort" htmlFor="product-sort">
              <span>{copy.catalog.sortBy}</span>
              <select
                id="product-sort"
                name="product-sort"
                onChange={(event) => setSortId(event.target.value as SortId)}
                value={sortId}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label(copy)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="catalog-results-bar">
            <div>
              <span>{activeGroupLabel}</span>
              <p>{resultsSummary}</p>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="store-product-grid">
              {filteredProducts.map((product) => {
                const group = getProductGroup(product);

                return (
                  <article className="store-product-card" key={product.id}>
                    <Link className="store-product-link" href={`/products/${product.id}`}>
                      <span className="store-product-media" aria-hidden="true">
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
                          <span className="store-product-initials">{productInitials(product)}</span>
                        )}
                      </span>
                      <span className="store-product-copy">
                        <small>{group.label(copy)}</small>
                        <strong>{productDisplayName(product)}</strong>
                        {product.composition ? <span>{product.composition}</span> : null}
                        {product.badge ? <em>{product.badge}</em> : null}
                      </span>
                      <span className="store-product-footer">
                        <strong>{formatAud(product.unitAmountCents)}</strong>
                        <span>{copy.catalog.viewProduct}</span>
                      </span>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state catalog-empty-state">
              <Search aria-hidden="true" />
              <h3>{copy.catalog.noResults}</h3>
              {normalizedSearchTerm ? (
                <button className="button button-secondary" type="button" onClick={() => setSearchTerm("")}>
                  {copy.catalog.clearSearch}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
