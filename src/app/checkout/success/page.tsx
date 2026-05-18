import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import copy from "@/i18n/locales/en.json";

export default function CheckoutSuccessPage() {
  return (
    <main className="status-page">
      <section className="status-panel">
        <CheckCircle2 aria-hidden="true" className="status-icon" />
        <p className="eyebrow">{copy.footer.domain}</p>
        <h1>{copy.checkout.successTitle}</h1>
        <p>{copy.checkout.successBody}</p>
        <Link className="button button-primary" href="/">
          {copy.checkout.backHome}
        </Link>
      </section>
    </main>
  );
}
