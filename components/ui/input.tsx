import * as React from "react";
import { FieldError } from "react-hook-form/dist/types/errors";

import { cn } from "src/utils/utils";

import { MdError } from "react-icons/md";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error: FieldError | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "placeholder:text-muted-foreground flex h-10 w-full rounded-md border-2 bg-background p-4 text-sm text-secondaryT-400 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-primaryT-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50" +
              " " +
              (error ? "border-errorT-500" : "border-primaryT-400"),
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <MdError className="absolute fill-errorT-500 top-[30%] right-[2%]" />}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
