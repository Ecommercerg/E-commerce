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
            "p-y-4 flex h-10 w-full rounded-md border bg-background pl-4 pr-4 text-sm text-secondaryT-400 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondaryT-300 focus-visible:border-2 focus-visible:border-primaryT-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:pr-6",
            error ? "border-errorT-500" : "border-secondaryT-100",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <MdError className="absolute right-[2%] top-[30%] fill-errorT-500" />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
