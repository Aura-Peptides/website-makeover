"use client";

import { useId, useState } from "react";

type FaqItem = {
  title: string;
  body: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
  defaultOpenIndexes?: readonly number[];
};

export function FaqAccordion({ items, defaultOpenIndexes = [] }: FaqAccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(
    () => new Set(defaultOpenIndexes),
  );

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <div className="faq-accordion-list">
      {items.map((item, index) => {
        const itemId = `${baseId}-${index}`;
        const isOpen = openItems.has(index);

        return (
          <article className="faq-accordion-item" data-open={isOpen} key={item.title}>
            <button
              aria-controls={`${itemId}-answer`}
              aria-expanded={isOpen}
              className="faq-accordion-trigger"
              id={`${itemId}-trigger`}
              onClick={() => toggleItem(index)}
              type="button"
            >
              <span>{item.title}</span>
              <span className="faq-toggle-icon" aria-hidden="true" />
            </button>
            <div
              aria-hidden={!isOpen}
              aria-labelledby={`${itemId}-trigger`}
              className="faq-accordion-answer"
              id={`${itemId}-answer`}
              role="region"
            >
              <div>
                <p>{item.body}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
