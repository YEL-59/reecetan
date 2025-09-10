import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const SheetContext = React.createContext({ open: false, setOpen: () => { } })

const Sheet = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback((newOpen) => {
    if (isControlled) {
      onOpenChange?.(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }, [isControlled, onOpenChange])

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

const SheetContent = React.forwardRef(({ className, side = "right", children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SheetContext)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => {
        document.body.style.overflow = 'unset'
        clearTimeout(timer)
      }
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = 'unset'
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleClose = () => setOpen(false)

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!open && !isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={handleBackdropClick}
      />

      {/* Sheet Content */}
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-white shadow-2xl transition-all duration-300 ease-in-out",
          side === "right" && "top-0 right-0 h-full w-full sm:max-w-sm border-l",
          side === "left" && "top-0 left-0 h-full w-full sm:max-w-sm border-r",
          side === "top" && "top-0 left-0 right-0 max-h-[50vh] border-b",
          side === "bottom" && "bottom-0 left-0 right-0 max-h-[50vh] border-t",
          side === "right" && (open ? "translate-x-0" : "translate-x-full"),
          side === "left" && (open ? "translate-x-0" : "-translate-x-full"),
          side === "top" && (open ? "translate-y-0" : "-translate-y-full"),
          side === "bottom" && (open ? "translate-y-0" : "translate-y-full"),
          className
        )}
        {...props}
      >
        {children}
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

const SheetHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
))
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

export { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle }