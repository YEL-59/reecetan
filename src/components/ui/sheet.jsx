import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const SheetContext = React.createContext({ open: false, setOpen: () => { } })

const Sheet = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
  const { setOpen } = React.useContext(SheetContext)

  const handleClick = (e) => {
    if (props.onClick) props.onClick(e)
    setOpen(true)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: cn(children.props.className, className),
      onClick: (e) => {
        if (children.props.onClick) children.props.onClick(e)
        handleClick(e)
      },
    })
  }

  return (
    <button ref={ref} className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </button>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef(({ className, side = "right", children }, ref) => {
  const { open, setOpen } = React.useContext(SheetContext)

  const handleClose = () => setOpen(false)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={handleClose} />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out",
          side === "right" && "top-0 right-0 h-full border-l",
          side === "left" && "top-0 left-0 h-full border-r",
          side === "top" && "top-0 left-0 right-0 border-b",
          side === "bottom" && "bottom-0 left-0 right-0 border-t",
          "translate-x-0 translate-y-0",
          className
        )}
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
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>
    </>
  )
})
SheetContent.displayName = "SheetContent"

const SheetClose = React.forwardRef(({ className, asChild, children, ...props }, ref) => {
  const { setOpen } = React.useContext(SheetContext)

  const handleClick = (e) => {
    if (props.onClick) props.onClick(e)
    setOpen(false)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: cn(children.props.className, className),
      onClick: (e) => {
        if (children.props.onClick) children.props.onClick(e)
        handleClick(e)
      },
    })
  }

  return (
    <button ref={ref} className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </button>
  )
})
SheetClose.displayName = "SheetClose"

export { Sheet, SheetTrigger, SheetContent, SheetClose }