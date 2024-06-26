/*
    variant(primary, secondary, danger, cancel):  determines the overall style
    size(sm, md, lg): determines the style size
    mobile(true, false): determines the full width in small screens
*/
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"

const buttonStyles = cva(
  "inline-flex cursor-pointer items-center gap-2 justify-center w-auto px-auto transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-transparent disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-600 hover:bg-primary-600 focus-visible:ring-custom-white",
        secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200 ",
        danger: "bg-red-100 text-red-600 hover:bg-red-200",
        cancel: "text-gray-700",
        inverted:
          "border border-2 border-primary text-primary hover:bg-primary-600 hover:bg-primary-600 hover:text-white focus-visible:ring-custom-white"
      },
      size: {
        sm: "px-6 py-1 text-base",
        md: "px-6 py-2",
        lg: "px-8 py-2"
      },
      responsive: { true: "w-full" }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, responsive, className, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonStyles({ variant, size, responsive, className }))} {...props} />
    )
  }
)
Button.displayName = "Button"

export default Button
export { buttonStyles }
