"use client";

import { useEffect } from "react";

/**
 * Mount once (in the root layout). Watches for any element with a
 * data-reveal attribute anywhere on the page — including ones added
 * later by client-side navigation — and adds "is-revealed" once it
 * scrolls into view. Reveals once per element and then stops watching
 * it, so scrolling back up doesn't re-trigger the animation.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    function observeAll() {
      document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => {
        if (prefersReducedMotion) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    }

    observeAll();

    // Re-scan on route changes (App Router swaps content without a full reload).
    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}