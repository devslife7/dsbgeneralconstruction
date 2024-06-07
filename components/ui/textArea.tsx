import * as React from "react"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
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
