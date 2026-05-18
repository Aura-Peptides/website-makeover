"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

import { productDisplayName, type Product, type ProductCertificate } from "@/lib/products";

type ProductCoaDialogCopy = typeof import("@/i18n/locales/en.json");

type ProductCoaDialogProps = {
  copy: ProductCoaDialogCopy;
  product: Product;
  coaImages: readonly ProductCertificate[];
};

export function ProductCoaDialog({ copy, product, coaImages }: ProductCoaDialogProps) {
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogTitleId = useId();
  const productName = productDisplayName(product);
  const selectedCertificate = selectedCertificateIndex === null ? null : (coaImages[selectedCertificateIndex] ?? null);

  function openDialog(index: number) {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    setIsClosing(false);
    setSelectedCertificateIndex(index);
  }

  function closeDialog() {
    if (!selectedCertificate || isClosing) {
      return;
    }

    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedCertificateIndex(null);
      setIsClosing(false);
    }, 180);
  }

  useEffect(() => {
    if (!selectedCertificate) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDialog();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedCertificate, isClosing]);

  useEffect(() => {
    if (!selectedCertificate) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCertificate]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  function getCertificateTitle(certificate: ProductCertificate, index: number) {
    return certificate.title ?? `${copy.product.coa}${coaImages.length > 1 ? ` ${index + 1}` : ""}`;
  }

  function getCertificateAlt(certificate: ProductCertificate, index: number) {
    return `${productName} ${getCertificateTitle(certificate, index)}`;
  }

  return (
    <>
      <div className="coa-preview-grid">
        {coaImages.map((coaImage, index) => {
          const certificateTitle = getCertificateTitle(coaImage, index);
          const certificateAlt = getCertificateAlt(coaImage, index);

          return (
            <button
              className="coa-preview-button"
              type="button"
              aria-label={`${copy.product.openCoa}: ${certificateAlt}`}
              key={coaImage.src}
              onClick={() => openDialog(index)}
            >
              <Image
                src={coaImage.src}
                alt={certificateAlt}
                width={560}
                height={720}
                className="coa-preview-image"
                unoptimized
              />
              <span>{certificateTitle}</span>
            </button>
          );
        })}
      </div>

      {selectedCertificate && selectedCertificateIndex !== null ? (
        <div
          className={`coa-dialog-backdrop${isClosing ? " is-closing" : ""}`}
          role="presentation"
          onClick={closeDialog}
        >
          <section
            className="coa-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="coa-dialog-header">
              <h2 id={dialogTitleId}>{copy.product.coa}</h2>
              <button
                className="icon-button coa-dialog-close"
                type="button"
                ref={closeButtonRef}
                aria-label={copy.product.closeCoa}
                title={copy.product.closeCoa}
                onClick={closeDialog}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <Image
              src={selectedCertificate.src}
              alt={getCertificateAlt(selectedCertificate, selectedCertificateIndex)}
              width={867}
              height={1280}
              className="coa-dialog-image"
              unoptimized
            />
          </section>
        </div>
      ) : null}
    </>
  );
}
