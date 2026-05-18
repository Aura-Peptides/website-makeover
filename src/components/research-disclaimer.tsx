"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import copy from "@/i18n/locales/en.json";

const consentKey = "aura-peptides-research-consent";

export function ResearchDisclaimer() {
  const [state, setState] = useState<"loading" | "accepted" | "pending" | "blocked">("loading");

  useEffect(() => {
    setState(window.localStorage.getItem(consentKey) === "accepted" ? "accepted" : "pending");
  }, []);

  function accept() {
    window.localStorage.setItem(consentKey, "accepted");
    setState("accepted");
  }

  if (state === "loading" || state === "accepted") {
    return null;
  }

  return (
    <div className="research-gate" role="dialog" aria-modal="true" aria-labelledby="research-gate-title">
      <div className="research-gate-panel">
        <Image src="/images/aura-logo.png" alt="" width={92} height={92} className="research-gate-logo" unoptimized />
        <h2 id="research-gate-title">{copy.researchGate.title}</h2>
        {state === "blocked" ? (
          <p className="research-gate-blocked">{copy.researchGate.blocked}</p>
        ) : (
          <>
            <p>
              <strong>{copy.researchGate.lead}</strong>
              <br />
              {copy.researchGate.body}
            </p>
            <p>{copy.researchGate.confirmLabel}</p>
            <ul>
              {copy.researchGate.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </>
        )}
        <div className="research-gate-actions">
          <button className="button button-primary" type="button" onClick={accept}>
            {copy.researchGate.agree}
          </button>
          <button className="button button-secondary" type="button" onClick={() => setState("blocked")}>
            {copy.researchGate.disagree}
          </button>
        </div>
      </div>
    </div>
  );
}
