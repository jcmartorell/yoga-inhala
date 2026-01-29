import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
}

export function SectionHeading({ title, subtitle, className, center = true }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", center && "text-center", className)}>
      {subtitle && (
        <span className="block text-primary text-sm font-medium tracking-widest uppercase mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">
        {title}
      </h2>
      <div className={cn("h-1 w-20 bg-primary/30 mt-6 rounded-full", center && "mx-auto")} />
    </div>
  );
}
