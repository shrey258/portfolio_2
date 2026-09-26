import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

type CopyEmailProps = Omit<ComponentProps<"button">, "children" | "onClick"> & { email: string };

export function CopyEmail({ email, className = "", ...props }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`pressable grid min-h-11 cursor-copy items-center text-left ${className}`}
      aria-label={`Copy ${email}`}
      {...props}
    >
      <span className="swap link col-start-1 row-start-1" data-hidden={copied}>
        {email}
      </span>
      <span className="swap col-start-1 row-start-1 text-accent" data-hidden={!copied} aria-hidden>
        Copied to clipboard ✓
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
