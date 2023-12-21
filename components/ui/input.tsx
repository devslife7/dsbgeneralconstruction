import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, errors, type, ...props }, ref) => {
  return (
    <>
      <input
        type={type}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-none border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <span className="text-sm text-red-400">{errors}</span>
    </>
  )
})
Input.displayName = "Input"

export { Input }
