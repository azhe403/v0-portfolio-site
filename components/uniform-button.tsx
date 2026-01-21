import React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface UniformButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  asChild?: boolean
  children: React.ReactNode
}

const UniformButton = forwardRef<HTMLButtonElement, UniformButtonProps>(
  ({ className, variant = "default", asChild = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variantStyles = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    }

    const uniformStyles = "h-9 px-3 py-2 text-sm leading-5"

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(baseStyles, variantStyles[variant], uniformStyles, className),
        ref,
        ...props,
      })
    }

    return (
      <button className={cn(baseStyles, variantStyles[variant], uniformStyles, className)} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

UniformButton.displayName = "UniformButton"

export { UniformButton }
