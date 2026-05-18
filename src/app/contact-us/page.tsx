import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import copy from "@/i18n/locales/en.json";

export default function ContactUsPage() {
  return (
    <main className="storefront-shell">
      <SiteHeader copy={copy} />
      <section className="page-hero compact-page-hero">
        <p className="eyebrow">{copy.navigation.support}</p>
        <h1>{copy.pages.contact.title}</h1>
        <p>{copy.pages.contact.limitationsBody}</p>
      </section>
      <section className="contact-layout">
        <div className="support-panel">
          <h2>{copy.pages.contact.supportInfo}</h2>
          <h3>{copy.pages.contact.responseTitle}</h3>
          <p>{copy.pages.contact.responseBody}</p>
          <h3>{copy.pages.contact.helpTitle}</h3>
          <p>{copy.pages.contact.helpBody}</p>
          <div className="quick-links">
            <Link href="/faqs">{copy.navigation.faqs}</Link>
            <Link href="/products">{copy.navigation.products}</Link>
            <a href={`https://t.me/${copy.footer.telegram.replace("@", "")}`}>{copy.footer.telegram}</a>
          </div>
        </div>
        <form className="support-form">
          <label>
            {copy.pages.contact.email}
            <input name="email" type="email" required />
          </label>
          <label>
            {copy.pages.contact.order}
            <input name="order" type="text" />
          </label>
          <label>
            {copy.pages.contact.issue}
            <select name="issue">
              {copy.pages.contact.issueOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            {copy.pages.contact.message}
            <textarea name="message" rows={5} />
          </label>
          <div className="notice-box">
            <h3>{copy.pages.contact.noticeTitle}</h3>
            <p>{copy.pages.contact.noticeBody}</p>
            <h3>{copy.pages.contact.policyTitle}</h3>
            <p>{copy.pages.contact.policyBody}</p>
            <label className="research-check">
              <input type="checkbox" />
              <span>{copy.pages.contact.acknowledge}</span>
            </label>
          </div>
          <a className="button button-primary" href={`https://t.me/${copy.footer.telegram.replace("@", "")}`}>
            {copy.pages.contact.telegramAction}
          </a>
        </form>
      </section>
      <SiteFooter copy={copy} />
    </main>
  );
}
