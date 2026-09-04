import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
 children: ReactNode;
 as?: ElementType;
 /** stagger delay in ms */
 delay?: number;
 className?: string;
}

/**
 * Scroll-reveal wrapper. Pure CSS transition (see [data-reveal] in index.css),
 * IntersectionObserver only toggles the class once. Reduced-motion safe.
 */
export const Reveal: React.FC<RevealProps> = ({
 children,
 as: Tag = "div",
 delay = 0,
 className = "",
}) => {
 const ref = useRef<HTMLElement | null>(null);

 useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const io = new IntersectionObserver(
   ([entry]) => {
    if (entry.isIntersecting) {
     el.classList.add("is-visible");
     io.disconnect();
    }
   },
   { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
  );
  io.observe(el);
  return () => io.disconnect();
 }, []);

 return (
  <Tag
   ref={ref}
   data-reveal=""
   className={className}
   style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
  >
   {children}
  </Tag>
 );
};
