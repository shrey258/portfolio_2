import { useEffect, useState } from "react";

const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });

// Darjeeling time, ticking twice a minute.
export function LocalTime() {
  const [time, setTime] = useState(now);
  useEffect(() => {
    const id = setInterval(() => setTime(now()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} IST</span>;
}
