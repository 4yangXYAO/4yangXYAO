import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
 children: React.ReactNode;
 className?: string;
 /** ms */
 delay?: number;
 /** up = rise+fade (default), mask = clip-path wipe, scale = zoom-in */
 variant?: "up" | "mask" | "scale";
 as?: "div" | "section" | "li" | "article" | "header" | "figure";
}

/**
 * Lightweight scroll-reveal: IntersectionObserver + CSS transitions.
 * Children stay mounted (SEO-safe); only the `is-visible` class toggles.
 */
export const Reveal: React.FC<RevealProps> = ({
 children,
 className,
 delay = 0,
 variant = "up",
 as: Tag = "div",
}) => {
 const ref = useRef<HTMLElement | null>(null);
 const [visible, setVisible] = useState(false);

 useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const observer = new IntersectionObserver(
   ([entry]) => {
    if (entry.isIntersecting) {
     setVisible(true);
     observer.disconnect();
    }
   },
   { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  observer.observe(el);
  return () => observer.disconnect();
 }, []);

 return (
  <Tag
   ref={ref as never}
   data-reveal={variant}
   className={`${className ?? ""}${visible ? " is-visible" : ""}`}
   style={{ ["--reveal-delay" as never]: `${delay}ms` }}
  >
   {children}
  </Tag>
 );
};
