import { cn } from "@/lib/utils";
export function Card({ className, ...props }: React.ComponentProps<"article">) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[18px] border border-[#e2e8f0] bg-white",
        className,
      )}
      {...props}
    />
  );
}
