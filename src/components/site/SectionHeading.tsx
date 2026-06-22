import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl uppercase leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {children && (
        <p className={`mt-4 max-w-2xl text-muted-foreground ${align === "center" ? "mx-auto" : ""}`}>
          {children}
        </p>
      )}
    </div>
  );
}
