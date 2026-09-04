import type { SVGProps } from "react";

/**
 * Inline stroke icons (lucide-style), replacing the Material Symbols webfont.
 * One less render-blocking external request; icons inherit currentColor.
 */

const paths: Record<string, React.ReactNode> = {
 menu: <path d="M4 6h16M4 12h16M4 18h16" />,
 x: <path d="M18 6 6 18M6 6l12 12" />,
 "arrow-right": <path d="M5 12h14m-7-7 7 7-7 7" />,
 "arrow-left": <path d="M19 12H5m7 7-7-7 7-7" />,
 "arrow-up-right": <path d="M7 17 17 7M7 7h10v10" />,
 external: (
  <>
   <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
   <path d="M15 3h6v6M10 14 21 3" />
  </>
 ),
 github: (
  <>
   <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
   <path d="M9 18c-4.51 2-5-2-7-2" />
  </>
 ),
 linkedin: (
  <>
   <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
   <rect width="4" height="12" x="2" y="9" />
   <circle cx="4" cy="4" r="2" />
  </>
 ),
 mail: (
  <>
   <rect width="20" height="16" x="2" y="4" rx="2" />
   <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </>
 ),
 globe: (
  <>
   <circle cx="12" cy="12" r="10" />
   <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
  </>
 ),
 "chevron-down": <path d="m6 9 6 6 6-6" />,
 search: (
  <>
   <circle cx="11" cy="11" r="8" />
   <path d="m21 21-4.35-4.35" />
  </>
 ),
 code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
 "pen-tool": (
  <>
   <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
   <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L2.35 15.879a1 1 0 0 0 .776.746L10 18" />
   <path d="m2.3 2.3 7.286 7.286" />
   <circle cx="11" cy="11" r="2" />
  </>
 ),
 sparkles: (
  <>
   <path d="M12 3l1.9 5.7a1 1 0 0 0 .64.64L20.2 11.3l-5.66 1.96a1 1 0 0 0-.64.64L12 19.6l-1.9-5.7a1 1 0 0 0-.64-.64L3.8 11.3l5.66-1.96a1 1 0 0 0 .64-.64z" />
   <path d="M19 3v4M17 5h4" />
  </>
 ),
 wifi: (
  <>
   <path d="M12 20h.01" />
   <path d="M2 8.82a15 15 0 0 1 20 0" />
   <path d="M5 12.859a10 10 0 0 1 14 0" />
   <path d="M8.5 16.429a5 5 0 0 1 7 0" />
  </>
 ),
 server: (
  <>
   <rect width="20" height="8" x="2" y="2" rx="2" />
   <rect width="20" height="8" x="2" y="14" rx="2" />
   <path d="M6 6h.01M6 18h.01" />
  </>
 ),
 shield: (
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
 ),
 monitor: (
  <>
   <rect width="20" height="14" x="2" y="3" rx="2" />
   <path d="M8 21h8M12 17v4" />
  </>
 ),
 database: (
  <>
   <ellipse cx="12" cy="5" rx="9" ry="3" />
   <path d="M3 5v14a9 3 0 0 0 18 0V5" />
   <path d="M3 12a9 3 0 0 0 18 0" />
  </>
 ),
 cpu: (
  <>
   <rect width="16" height="16" x="4" y="4" rx="2" />
   <rect width="6" height="6" x="9" y="9" rx="1" />
   <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
  </>
 ),
 layers: (
  <>
   <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
   <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.49-1.59" />
   <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.49-1.59" />
  </>
 ),
 terminal: <path d="m4 17 6-6-6-6M12 19h8" />,
 "hard-drive": (
  <>
   <line x1="22" x2="2" y1="12" y2="12" />
   <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
   <path d="M6 16h.01M10 16h.01" />
  </>
 ),
 send: <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />,
 check: <path d="M20 6 9 17l-5-5" />,
 alert: (
  <>
   <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
   <path d="M12 9v4m0 4h.01" />
  </>
 ),
 "map-pin": (
  <>
   <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
   <circle cx="12" cy="10" r="3" />
  </>
 ),
 calendar: (
  <>
   <path d="M8 2v4M16 2v4" />
   <rect width="18" height="18" x="3" y="4" rx="2" />
   <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
  </>
 ),
 zap: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
 "book-open": (
  <>
   <path d="M12 7v14" />
   <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </>
 ),
 message: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
 user: (
  <>
   <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
   <circle cx="12" cy="7" r="4" />
  </>
 ),
 folder: (
  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
 ),
 star: (
  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.75a.53.53 0 0 1 .294.904l-3.734 3.638a2.12 2.12 0 0 0-.613 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.613-1.879L2.16 9.79a.53.53 0 0 1 .294-.906l5.166-.75a2.12 2.12 0 0 0 1.595-1.16z" />
 ),
 download: (
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
 ),
 phone: (
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
 ),
 network: (
  <>
   <rect x="16" y="16" width="6" height="6" rx="1" />
   <rect x="2" y="16" width="6" height="6" rx="1" />
   <rect x="9" y="2" width="6" height="6" rx="1" />
   <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" />
  </>
 ),
 clock: (
  <>
   <circle cx="12" cy="12" r="10" />
   <path d="M12 6v6l4 2" />
  </>
 ),
 heart: (
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
 ),
 "quote-open": (
  <path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4" />
 ),
};

export type IconName = keyof typeof paths;

interface IconProps extends SVGProps<SVGSVGElement> {
 name: IconName | string;
 size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, ...props }) => {
 const glyph = paths[name];
 if (!glyph) return null;
 return (
  <svg
   viewBox="0 0 24 24"
   width={size}
   height={size}
   fill="none"
   stroke="currentColor"
   strokeWidth={1.75}
   strokeLinecap="round"
   strokeLinejoin="round"
   aria-hidden="true"
   {...props}
  >
   {glyph}
  </svg>
 );
};
