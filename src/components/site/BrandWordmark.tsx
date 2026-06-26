import type { BrandWordmark as BrandWordmarkType } from "@/lib/cms-types";

type Props = {
  wordmark: BrandWordmarkType;
  className?: string;
  line1ClassName?: string;
  line2ClassName?: string;
};

export function BrandWordmark({ wordmark, className = "", line1ClassName = "font-display text-base", line2ClassName = "text-[10px] tracking-[0.2em]" }: Props) {
  return (
    <div className={`leading-tight ${className}`}>
      <div className={line1ClassName} style={{ color: wordmark.line1_color }}>{wordmark.line1}</div>
      <div className={line2ClassName} style={{ color: wordmark.line2_color }}>{wordmark.line2}</div>
    </div>
  );
}
