import { cn } from "@/lib/utils";
export const inputClass =
  "w-full min-h-12 rounded-[9px] border border-[#cbd5e1] bg-white px-3.5 py-3 text-sm text-[#17263c] placeholder:text-[#64748b] focus:border-[#1b67c9] aria-invalid:border-[#a42323]";
export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(inputClass, className)} {...props} />;
}
export function Select({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return <select className={cn(inputClass, className)} {...props} />;
}
export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(inputClass, "min-h-24 resize-y", className)}
      {...props}
    />
  );
}
