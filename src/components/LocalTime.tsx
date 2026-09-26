import { useEffect, useState } from "react";

const now = (timeZone: string) =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });

export function LocalTime({ timeZone = "Asia/Kolkata", label = "IST" }: { timeZone?: string; label?: string }) {
  const [time, setTime] = useState(() => now(timeZone));
  useEffect(() => {
    const id = setInterval(() => setTime(now(timeZone)), 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <span className="tabular-nums">{time} {label}</span>;
}
