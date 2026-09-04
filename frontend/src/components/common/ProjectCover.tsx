import React, { useMemo } from "react";

/**
 * Deterministic "record sleeve" cover art generated from the project slug.
 * Warm palette only — amber / copper / olive / rust — so every card feels
 * like part of the same printed series.
 */

interface ProjectCoverProps {
 slug: string;
 title?: string;
 className?: string;
}

const hashString = (str: string): number => {
 let hash = 0;
 for (let i = 0; i < str.length; i++) {
  hash = (hash << 5) - hash + str.charCodeAt(i);
  hash |= 0;
 }
 return Math.abs(hash);
};

// warm duotone pairs: [hue A, hue B]
const PALETTES: Array<[string, string]> = [
 ["#e9a23b", "#7a4a12"], // amber / burnt
 ["#c98f3d", "#4e3a1a"], // copper / umber
 ["#b9a24a", "#3f3a17"], // olive gold / dark hay
 ["#d97f47", "#5a2e14"], // rust / mahogany
 ["#e0b45c", "#63481c"], // brass / walnut
];

const initialsOf = (title: string): string =>
 title
  .split(/[\s._-]+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((w) => w[0]!.toUpperCase())
  .join("");

export const ProjectCover: React.FC<ProjectCoverProps> = ({ slug, title, className }) => {
 const art = useMemo(() => {
  const h = hashString(slug);
  const palette = PALETTES[h % PALETTES.length];
  const cx = 18 + ((h >> 3) % 64); // glow center x (%)
  const cy = 16 + ((h >> 7) % 58); // glow center y (%)
  const rot = (h >> 11) % 2 === 0 ? 1 : -1; // diagonal direction
  const gridStep = 5 + ((h >> 13) % 4); // 5..8 (%)
  const catalog = `XY-${String((h % 90) + 10)}`;
  return { palette, cx, cy, rot, gridStep, catalog };
 }, [slug]);

 const initials = title ? initialsOf(title) : "";
 const gid = `pc-${slug.replace(/[^a-z0-9]/gi, "")}`;

 return (
  <svg
   viewBox="0 0 800 500"
   className={className}
   preserveAspectRatio="xMidYMid slice"
   role="img"
   aria-label={title ? `${title} cover` : `${slug} cover`}
  >
   <defs>
    <radialGradient id={`${gid}-glow`} cx={`${art.cx}%`} cy={`${art.cy}%`} r="85%">
     <stop offset="0%" stopColor={art.palette[0]} stopOpacity="0.5" />
     <stop offset="45%" stopColor={art.palette[1]} stopOpacity="0.22" />
     <stop offset="100%" stopColor="#0e0c0b" stopOpacity="0" />
    </radialGradient>
    <linearGradient id={`${gid}-base`} x1="0" y1="0" x2="1" y2="1">
     <stop offset="0%" stopColor="#1a1613" />
     <stop offset="100%" stopColor="#0e0c0b" />
    </linearGradient>
    <pattern id={`${gid}-grid`} width={`${art.gridStep}%`} height={`${art.gridStep}%`} patternUnits="userSpaceOnUse">
     <path d={`M ${800 * (art.gridStep / 100)} 0 L 0 0 0 ${500 * (art.gridStep / 100)}`} fill="none" stroke="rgba(237,233,227,0.05)" strokeWidth="1" />
    </pattern>
    <clipPath id={`${gid}-clip`}>
     <rect width="800" height="500" />
    </clipPath>
   </defs>

   <g clipPath={`url(#${gid}-clip)`}>
    <rect width="800" height="500" fill={`url(#${gid}-base)`} />
    <rect width="800" height="500" fill={`url(#${gid}-grid)`} />
    <rect width="800" height="500" fill={`url(#${gid}-glow)`} />

    {/* diagonal registration line */}
    <line
     x1={art.rot > 0 ? 0 : 800}
     y1="500"
     x2={art.rot > 0 ? 800 : 0}
     y2="0"
     stroke={art.palette[0]}
     strokeOpacity="0.14"
     strokeWidth="1.5"
    />
    <line
     x1={art.rot > 0 ? 0 : 800}
     y1={art.rot > 0 ? 440 : 440}
     x2={art.rot > 0 ? 800 : 0}
     y2={art.rot > 0 ? 60 : 60}
     stroke="#ede9e3"
     strokeOpacity="0.05"
     strokeWidth="1"
    />

    {/* ghost monogram — serif italic, clipped to bottom-right */}
    {initials && (
     <text
      x="770"
      y="470"
      textAnchor="end"
      fontFamily="'Instrument Serif', Georgia, serif"
      fontStyle="italic"
      fontSize="300"
      fill={art.palette[0]}
      fillOpacity="0.1"
     >
      {initials}
     </text>
    )}

    {/* catalog number, bottom-left, like a print series code */}
    <text
     x="28"
     y="474"
     fontFamily="'JetBrains Mono', monospace"
     fontSize="15"
     letterSpacing="3"
     fill="#ede9e3"
     fillOpacity="0.35"
    >
     {art.catalog}
    </text>

    {/* crop ticks */}
    <path d="M16 16 h22 M16 16 v22" stroke={art.palette[0]} strokeOpacity="0.7" strokeWidth="2" fill="none" />
    <path d="M784 484 h-22 M784 484 v-22" stroke={art.palette[0]} strokeOpacity="0.7" strokeWidth="2" fill="none" />

    {/* vignette */}
    <rect width="800" height="500" fill="url(#none)" />
    <rect width="800" height="500" fill="#0b0a09" fillOpacity="0.12" />
   </g>
  </svg>
 );
};
