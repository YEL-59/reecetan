import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const Sheet = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

const SheetTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp ref={ref} className={cn(className)} {...props}>
      {children}
    </Comp>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef(({
  className,
  side = "right",
  children,
  onClose,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(true)
    return () => setIsOpen(false)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out",
          side === "right" && "top-0 right-0 h-full border-l",
          side === "left" && "top-0 left-0 h-full border-r",
          side === "top" && "top-0 left-0 right-0 border-b",
          side === "bottom" && "bottom-0 left-0 right-0 border-t",
          isOpen ? "translate-x-0 translate-y-0" :
            side === "right" ? "translate-x-full" :
              side === "left" ? "-translate-x-full" :
                side === "top" ? "-translate-y-full" : "translate-y-full",
          className
        )}
        {...props}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={handleClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  )
})
SheetContent.displayName = "SheetContent"

const SheetClose = React.forwardRef(({ className, asChild, children, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp ref={ref} className={cn(className)} {...props}>
      {children}
    </Comp>
  )
})
SheetClose.displayName = "SheetClose"

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
}