import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primaryT-400 ring-primaryT-400 text-primaryT-400 hover:bg-primaryT-400/80",
        secondary:
          "bg-primaryT-900 ring-primaryT-900 text-primaryT-900 hover:bg-primaryT-900/80",
        error:
          "bg-errorT-700 ring-errorT-700 text-errorT-700 hover:bg-errorT-700/80",
        success:
          "bg-successT-700 ring-successT-700 text-successT-700 hover:bg-successT-700/80",
        warning:
          "bg-warningT-700 ring-warningT-700 text-warningT-700 hover:bg-warningT-700/80",
      },
      size: {
        default: "h-10 px-16 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      appearance: {
        default: "ring-0 text-white",
        secondary: "bg-white ring-1 hover:bg-white/80",
      },
      shape: {
        default: "rounded-[42px]",
        semiRounded: "rounded-[8px]",
        rectangle: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      appearance: "default",
      shape: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, appearance, shape, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, appearance, shape, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
