import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { FaqAccordion } from "@/components/faq-accordion";
import copy from "@/i18n/locales/en.json";

export default function FaqsPage() {
  const faqItems = copy.pages.faq.sections.flatMap((section) => section.items);
  const defaultOpenIndexes = faqItems.flatMap((item, index) => (item.title.includes("Research") ? [index] : []));

  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} />
      <section className="faq-page">
        <div className="faq-page-heading">
          <p className="eyebrow">{copy.pages.faq.kicker}</p>
          <h1>{copy.pages.faq.headline}</h1>
          <p>{copy.pages.faq.intro}</p>
        </div>
        <FaqAccordion items={faqItems} defaultOpenIndexes={defaultOpenIndexes} />
      </section>
      <SiteFooter copy={copy} />
    </main>
  );
}
