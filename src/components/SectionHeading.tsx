import { Star } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SectionHeadingProps {
  pill: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  pill,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center max-w-2xl mx-auto", className)}>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6EEFB] px-3.5 py-1.5 text-[12px] font-extrabold text-[#2453E0] tracking-wide mb-3">
        <Star className="h-3.5 w-3.5 fill-[#2453E0] text-[#2453E0]" aria-hidden="true" />
        <span>{pill}</span>
      </span>
      <h2 className="font-display text-[30px] md:text-[36px] leading-[1.15] font-extrabold text-[#1B2347] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-[#4B5578] font-semibold">
          {subtitle}
        </p>
      )}
    </div>
  );
}
