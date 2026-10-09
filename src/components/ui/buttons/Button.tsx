import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", fullWidth, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-sans font-semibold uppercase tracking-[0.12em]",
                    "transition-all duration-200 ease-out",
                    "active:scale-[0.97] active:duration-75",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                    "disabled:opacity-50 disabled:pointer-events-none select-none",
                    {
                        "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-primary/30 hover:-translate-y-0.5": variant === "primary",
                        "bg-gold text-white hover:bg-gold/90 shadow-md hover:shadow-gold/30 hover:-translate-y-0.5": variant === "secondary",
                        "border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary": variant === "outline",
                        "hover:bg-gray-100 dark:hover:bg-white/10": variant === "ghost",

                        "px-4 py-2 text-xs": size === "sm",
                        "px-6 py-3 text-sm": size === "md",
                        "px-8 py-4 text-base": size === "lg",

                        "w-full": fullWidth,
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
