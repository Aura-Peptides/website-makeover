import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import copy from "@/i18n/locales/en.json";

export default function InfoPage() {
  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} />
      <section className="page-hero compact-page-hero">
        <p className="eyebrow">{copy.hero.eyebrow}</p>
        <h1>{copy.navigation.info}</h1>
        <p>{copy.pages.faq.intro}</p>
      </section>
      <section className="faq-layout info-layout">
        <article className="faq-section">
          <h2>{copy.hero.researchOnly}</h2>
          <div>
            <p>{copy.footer.disclaimer}</p>
            <p>{copy.footer.compliance}</p>
          </div>
        </article>
        <article className="faq-section">
          <h2>{copy.pages.contact.supportInfo}</h2>
          <div>
            <p>{copy.pages.contact.responseBody}</p>
            <p>{copy.pages.contact.limitationsBody}</p>
          </div>
        </article>
      </section>
      <SiteFooter copy={copy} />
    </main>
  );
}
