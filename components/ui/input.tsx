import * as React from "react"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { FieldError } from "react-hook-form"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  const { pending } = useFormStatus()
  return (
    <>
      <input
        type={type}
        disabled={pending}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 file:disabled:cursor-not-allowed",
          className,
          { "border-destructive": error }
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-sm text-destructive">{error.message}</span>}
    </>
  )
})
Input.displayName = "Input"

export { Input }

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   errors?: string
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, errors, type, ...props }, ref) => {
//   const { pending } = useFormStatus()
//   return (
//     <>
//       <input
//         type={type}
//         disabled={pending}
//         className={cn(
//           "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-base ring-offset-background file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 file:disabled:cursor-not-allowed",
//           className,
//           { "border-red-300": errors }
//         )}
//         ref={ref}
//         {...props}
//       />
//       <span className="text-sm text-red-400">{errors}</span>
//     </>
//   )
// })
// Input.displayName = "Input"

// export { Input }
