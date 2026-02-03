import * as React from "react"
import { cn } from "@/lib/utils"
import { FieldError } from "react-hook-form"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground placeholder:opacity-60 placeholder:transition-opacity placeholder:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:placeholder:opacity-40 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            className,
            { "border-destructive focus-visible:ring-destructive": error }
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="mt-1 block text-sm text-destructive">{error.message}</span>}
      </>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

// export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
//   errors?: string
// }

// const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
//   ({ className, errors, ...props }, ref) => {
//     const { pending } = useFormStatus()
//     return (
//       <>
//         <textarea
//           className={cn(
//             "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-none border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
//             className,
//             { "border-red-300": errors }
//           )}
//           ref={ref}
//           aria-disabled={pending}
//           disabled={pending}
//           {...props}
//         />
//         <span className="text-sm text-red-400">{errors}</span>
//       </>
//     )
//   }
// )
// TextArea.displayName = "TextArea"

// export { TextArea }
