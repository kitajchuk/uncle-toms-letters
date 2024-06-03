"use client";

import type { BasePost } from "@/types";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Props = {
  posts?: BasePost[];
};

export default function Animate({ posts = [] }: Props) {
  const obRef = useRef<IntersectionObserver>();
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll(".anim:not(.is-animated)");

    if (elements) {
      let animated = 0;

      obRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            obRef.current.unobserve(entry.target);
            entry.target.classList.add("is-animated");
            animated++;

            if (animated === elements.length) {
              obRef.current.disconnect();
            }
          }
        });
      });

      elements.forEach((element) => {
        obRef.current.observe(element);
      });

      return function cleanup() {
        if (obRef.current) {
          obRef.current.disconnect();
        }
      };
    }
  }, [pathname, posts]);

  return null;
}
