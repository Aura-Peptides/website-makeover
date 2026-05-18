"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, ShoppingCart, X } from "lucide-react";

type SiteCopy = typeof import("@/i18n/locales/en.json");

type SiteHeaderProps = {
  copy: SiteCopy;
  cartCount?: number;
};

function InstagramIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <rect width="17" height="17" x="3.5" y="3.5" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1.25" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M15.7 3c.2 1.8 1.3 3.3 3 4.1.7.3 1.4.5 2.3.6v3.6a8.1 8.1 0 0 1-5-1.6v5.9a5.5 5.5 0 1 1-5.5-5.5c.4 0 .8 0 1.2.1v3.7a2.1 2.1 0 1 0 1.5 2V3h2.5Z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.7 4.3c.4-.2.8.1.7.6l-2.8 14.4c-.1.7-.9 1-1.5.6l-4.3-3.2-2.2 2.2c-.3.3-.9.1-.9-.4l.1-3.2 7.7-7c.3-.3-.1-.7-.5-.5l-9.5 6-4.1-1.4c-.7-.2-.7-1.1 0-1.4L20.7 4.3Z"
      />
    </svg>
  );
}

export function SiteHeader({ copy, cartCount = 0 }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const menuLabel = isMenuOpen ? copy.navigation.closeMenu : copy.navigation.openMenu;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function updateHeaderVisibility() {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setIsHidden(isScrollingDown && currentScrollY > 96);
      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderVisibility);
  }, []);

  return (
    <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}${isHidden && !isMenuOpen ? " is-hidden" : ""}`}>
      <div className="site-header-inner">
        <Link className="brand-mark" href="/" aria-label={copy.hero.title} onClick={() => setIsMenuOpen(false)}>
          <span className="brand-logo" aria-hidden="true">
            <Image
              src="/images/aura-logo.png"
              alt=""
              width={64}
              height={64}
              className="brand-logo-image"
              unoptimized
            />
          </span>
          <span>
            <strong>{copy.hero.title}</strong>
          </span>
        </Link>

        <nav className="site-nav" id="site-navigation" aria-label={copy.navigation.primaryLabel}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            {copy.navigation.home}
          </Link>
          <span className="nav-dropdown">
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>
              {copy.navigation.products}
              <ChevronDown aria-hidden="true" />
            </Link>
            <span className="nav-dropdown-panel">
              <strong>{copy.navigation.categories}</strong>
              <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                {copy.catalog.all}
              </Link>
              <Link href="/products#peptides" onClick={() => setIsMenuOpen(false)}>
                {copy.navigation.peptides}
              </Link>
              <Link href="/products#stacks" onClick={() => setIsMenuOpen(false)}>
                {copy.navigation.stacks}
              </Link>
              <Link href="/products#essentials" onClick={() => setIsMenuOpen(false)}>
                {copy.navigation.essentials}
              </Link>
            </span>
          </span>
          <Link href="/info" onClick={() => setIsMenuOpen(false)}>
            {copy.navigation.info}
          </Link>
          <Link href="/faqs" onClick={() => setIsMenuOpen(false)}>
            {copy.navigation.faqs}
          </Link>
          <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
            {copy.navigation.contact}
          </Link>
        </nav>

        <div className="header-actions">
          <button
            aria-controls="site-navigation"
            aria-expanded={isMenuOpen}
            aria-label={menuLabel}
            className="icon-button menu-toggle"
            onClick={() => setIsMenuOpen((current) => !current)}
            title={menuLabel}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <Link
            className="icon-button cart-button"
            href="/cart"
            aria-label={copy.cart.open}
            title={copy.cart.open}
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart aria-hidden="true" />
            <span>{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ copy }: { copy: SiteCopy }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-disclaimer">
        <h2>{copy.footer.newsletterTitle}</h2>
      </div>
      <div className="footer-links text-2xl">
        {/* links hidden as part of UI reduction or moved here if needed, 
            but the request was to simplify the text to just "Aura Newsletter" and change class */}
      </div>
    </footer>
  );
}
  );
}
