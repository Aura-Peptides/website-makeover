import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Truck } from "lucide-react";

import { ComingSoonPage } from "@/components/coming-soon-page";
import { HomePopularProducts } from "@/components/home-popular-products";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import copy from "@/i18n/locales/en.json";
import { getComingSoonConfig } from "@/lib/coming-soon";

const trustIcons = [ShieldCheck, Truck, MessageCircle];

export default function Home() {
  const comingSoonConfig = getComingSoonConfig();

  if (comingSoonConfig.enabled) {
    return <ComingSoonPage config={comingSoonConfig} />;
  }

  return (
    <main className="storefront-shell landing-page">
      <SiteHeader copy={copy} />
      <section className="hero-band" id="top" aria-label={copy.hero.title}>
        <Image
          src="https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITVXayDK7xfnQrk7i69mPtpwNCXIugb5OZhsS8"
          alt="Aura Peptides"
          width={2545}
          height={578}
          priority
          className="hero-banner-image"
          unoptimized
        />
        <Link className="button button-secondary hero-banner-cta px-[30px] py-0 my-[5px]" href="/products">
          Search Inventory
        </Link>
      </section>

      <HomePopularProducts copy={copy} />

      <section className="trust-row">
        {copy.home.trust.map((item, index) => {
          const Icon = trustIcons[index] ?? ShieldCheck;
          return (
            <article key={item.title}>
              <Icon aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="where-aura-leads">
        <div>
          <h2>Where Aura Leads</h2>
          <p>
            Aura Peptides is built for Australian research teams who need focused access to emerging peptide
            materials before they become broadly available. Our catalog is shaped around high-demand research
            compounds, responsive product sourcing, and a commitment to batch-tested quality that supports confident
            laboratory purchasing.
          </p>
          <Link className="button button-primary" href="/products">
            Search Inventory
          </Link>
        </div>
        <Image
          src="https://ddeti5s7lf.ufs.sh/f/Hg8H2R6loRITx2mA80weDaFx0irg9yB1m8XjHk3Qud5VhULW"
          alt=""
          width={1272}
          height={720}
          className="where-aura-leads-image"
          unoptimized
        />
      </section>
      <SiteFooter copy={copy} />
    </main>
  );
}
