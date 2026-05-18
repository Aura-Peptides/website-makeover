import Image from "next/image";

import copy from "@/i18n/locales/en.json";
import type { ComingSoonConfig } from "@/lib/coming-soon";

type ComingSoonPageProps = {
  config: ComingSoonConfig;
};

export function ComingSoonPage({ config }: ComingSoonPageProps) {
  return (
    <main className="coming-soon-shell">
      <section className="coming-soon-panel" aria-labelledby="coming-soon-title">
        <div className="coming-soon-brand">
          <Image
            src="/images/aura-logo.png"
            alt="Aura Peptides"
            width={130}
            height={130}
            priority
            className="coming-soon-logo"
            unoptimized
          />
          <p className="eyebrow">{config.kicker}</p>
          <h1 id="coming-soon-title">{config.title}</h1>
          <p>{config.message}</p>
        </div>

        <div className="coming-soon-status">
          <span>{config.launchText}</span>
          <strong>{copy.hero.researchOnly}</strong>
        </div>

        <div className="coming-soon-actions">
          <a className="button button-primary" href={config.primaryHref}>
            {config.primaryLabel}
          </a>
          <a className="button button-secondary" href={config.secondaryHref}>
            {config.secondaryLabel}
          </a>
        </div>
      </section>

      <footer className="coming-soon-footer">
        <span>{copy.footer.abn}</span>
      </footer>
    </main>
  );
}
