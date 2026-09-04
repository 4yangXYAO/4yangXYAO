/**
 * Deterministic abstract cover generated from the project slug.
 * Replaces generic Unsplash photos: zero network cost, zero "AI stock photo" smell.
 */

const hashString = (s: string): number => {
 let h = 0;
 for (let i = 0; i < s.length; i++) {
  h = (h * 31 + s.charCodeAt(i)) | 0;
 }
 return Math.abs(h);
};

const initialsOf = (label: string): string =>
 label
  .split(/[\s_\-.]+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((w) => w[0]!.toUpperCase())
  .join("");

interface ProjectCoverProps {
 /** stable seed — usually the slug */
 seed: string;
 /** project title, used for the monogram */
 label: string;
 className?: string;
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
 seed,
 label,
 className = "",
}) => {
 const h = hashString(seed || label);
 const hue = h % 360;
 const hue2 = (hue + 28 + (h % 50)) % 360;
 const angle = (h % 8) * 22.5;
 const initials = initialsOf(label);
 const gid = `pc-g-${h}`;
 const pid = `pc-p-${h}`;

 return (
  <svg
   viewBox="0 0 400 240"
   className={className}
   role="img"
   aria-label={label}
   preserveAspectRatio="xMidYMid slice"
  >
   <defs>
    <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
     <stop offset="0%" stopColor={`hsl(${hue} 32% 13%)`} />
     <stop offset="100%" stopColor={`hsl(${hue2} 38% 9%)`} />
    </linearGradient>
    <pattern
     id={pid}
     width="12"
     height="12"
     patternUnits="userSpaceOnUse"
     patternTransform={`rotate(${angle})`}
    >
     <line x1="0" y1="0" x2="0" y2="12" stroke={`hsl(${hue} 45% 55%)`} strokeOpacity="0.14" strokeWidth="1" />
    </pattern>
   </defs>
   <rect width="400" height="240" fill={`url(#${gid})`} />
   <rect width="400" height="240" fill={`url(#${pid})`} />
   {/* horizon arc */}
   <circle
    cx={80 + (h % 240)}
    cy={300}
    r="180"
    fill="none"
    stroke={`hsl(${hue2} 60% 60%)`}
    strokeOpacity="0.25"
    strokeWidth="1"
   />
   <text
    x="24"
    y="212"
    fontFamily="'Bricolage Grotesque', Georgia, serif"
    fontSize="120"
    fontWeight="700"
    fill={`hsl(${hue} 40% 70%)`}
    fillOpacity="0.16"
    letterSpacing="-6"
   >
    {initials}
   </text>
  </svg>
 );
};
