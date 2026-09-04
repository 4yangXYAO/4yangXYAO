import React, { useEffect, useState } from "react";

/** Live Asia/Jakarta wall clock — a small human detail for the hero. */
export const LocalClock: React.FC<{ className?: string }> = ({ className }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(now);

  return (
    <span className={`tnum ${className ?? ""}`} suppressHydrationWarning>
      {time} WIB
    </span>
  );
};
