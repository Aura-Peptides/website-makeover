import { ComingSoonPage } from "@/components/coming-soon-page";
import { getComingSoonConfig } from "@/lib/coming-soon";

export default function ComingSoonRoute() {
  return <ComingSoonPage config={getComingSoonConfig()} />;
}
