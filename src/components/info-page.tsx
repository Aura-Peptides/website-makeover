import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import copy from "@/i18n/locales/en.json";

type PageSection = {
  title: string;
  body: string;
};

type InfoPageProps = {
  title: string;
  intro: string;
  sections: readonly PageSection[];
};

export function InfoPage({ title, intro, sections }: InfoPageProps) {
  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} />
      <section className="page-hero">
        <p className="eyebrow">{copy.footer.domain}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="policy-list">
        {sections.map((section) => (
          <article className="policy-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
      <SiteFooter copy={copy} />
    </main>
  );
}
