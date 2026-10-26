import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[13px] font-medium transition-colors disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#013274] text-white hover:bg-[#06438d]",
        outline:
          "border border-[#ccd6e3] text-[#013274] bg-white hover:bg-[#eaf1fa]",
        light: "bg-white text-[#013274] hover:bg-[#eaf1fa]",
        ghost: "border border-white/50 text-white hover:bg-white/10",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export function Button({
  className,
  variant,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props} />
  );
}
