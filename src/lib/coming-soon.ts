export type ComingSoonConfig = {
  enabled: boolean;
  kicker: string;
  title: string;
  message: string;
  launchText: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

function envValue(key: string, fallback: string) {
  const value = process.env[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export function isComingSoonEnabled() {
  return process.env.COMING_SOON_ENABLED === "true" || process.env.NEXT_PUBLIC_COMING_SOON_ENABLED === "true";
}

export function getComingSoonConfig(): ComingSoonConfig {
  return {
    enabled: isComingSoonEnabled(),
    kicker: envValue("COMING_SOON_KICKER", "Launching soon"),
    title: envValue("COMING_SOON_TITLE", "Aura Peptides is almost ready"),
    message: envValue(
      "COMING_SOON_MESSAGE",
      "A cleaner research supply experience is being prepared. Check back soon for product availability and ordering.",
    ),
    launchText: envValue("COMING_SOON_LAUNCH_TEXT", "Australian research supply, coming soon."),
    primaryLabel: envValue("COMING_SOON_PRIMARY_LABEL", "Contact us"),
    primaryHref: envValue("COMING_SOON_PRIMARY_URL", "https://t.me/Aura_Peptides_AU"),
    secondaryLabel: envValue("COMING_SOON_SECONDARY_LABEL", "Instagram"),
    secondaryHref: envValue("COMING_SOON_SECONDARY_URL", "https://www.instagram.com/aura_peptides_au"),
  };
}
