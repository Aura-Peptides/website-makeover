import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

import copy from "@/i18n/locales/en.json";

export default function CheckoutCancelPage() {
  return (
    <main className="status-page">
      <section className="status-panel">
        <ArrowLeftCircle aria-hidden="true" className="status-icon" />
        <p className="eyebrow">{copy.footer.domain}</p>
        <h1>{copy.checkout.cancelTitle}</h1>
        <p>{copy.checkout.cancelBody}</p>
        <Link className="button button-primary" href="/">
          {copy.checkout.backHome}
        </Link>
      </section>
    </main>
  );
}
