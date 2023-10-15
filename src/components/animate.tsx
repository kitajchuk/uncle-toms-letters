import { useEffect, useRef } from "react";

export function Animate({ children }) {
  const obRef = useRef<IntersectionObserver>();

  useEffect(() => {
    let animated = 0;
    const elements = document.querySelectorAll(".anim");

    if (elements) {
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
  }, [children]);

  return children;
}
