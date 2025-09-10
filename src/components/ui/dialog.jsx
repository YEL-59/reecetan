import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const DialogContext = React.createContext({ open: false, setOpen: () => { } })

const Dialog = ({ children, open: controlledOpen, onOpenChange }) => {
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

    // Lock body scroll when dialog is open
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.width = '100%'
            return () => {
                document.body.style.overflow = 'unset'
                document.body.style.position = 'unset'
                document.body.style.width = 'unset'
            }
        }
    }, [open])

    // Handle escape key
    React.useEffect(() => {
        if (!open) return

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, setOpen])

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    )
}

const DialogTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
    const { setOpen } = React.useContext(DialogContext)

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
DialogTrigger.displayName = "DialogTrigger"

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DialogContext)

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false)
        }
    }

    if (!open) return null

    const dialogContent = (
        <>
            {/* Portal-like overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm dialog-overlay"
                onClick={handleBackdropClick}
                style={{
                    zIndex: 2147483647, // Maximum safe z-index value
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
                data-dialog-overlay
            />

            {/* Dialog Content Container */}
            <div
                className="fixed inset-0 flex items-center justify-center p-4"
                style={{
                    zIndex: 2147483647, // Maximum safe z-index value
                    position: 'fixed',
                    pointerEvents: 'none' // Allow clicks to pass through to backdrop
                }}
            >
                {/* Dialog Content */}
                <div
                    ref={ref}
                    className={cn(
                        "relative w-full max-w-lg max-h-[85vh] overflow-y-auto",
                        "bg-white rounded-xl shadow-2xl border border-gray-100",
                        "animate-in fade-in-0 zoom-in-95 duration-300",
                        "transform-gpu dialog-content", // Hardware acceleration
                        "my-8", // Ensure margin from top and bottom
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        zIndex: 2147483647, // Maximum safe z-index value
                        pointerEvents: 'auto' // Enable clicks on the dialog
                    }}
                    data-dialog-content
                    {...props}
                >
                    {children}
                </div>
            </div>
        </>
    )

    // Render to body to ensure it's above everything
    return typeof document !== 'undefined' ? createPortal(dialogContent, document.body) : null
})
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-6", className)}
        {...props}
    />
))
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = "DialogDescription"

const DialogClose = React.forwardRef(({ className, asChild, children, ...props }, ref) => {
    const { setOpen } = React.useContext(DialogContext)

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
DialogClose.displayName = "DialogClose"

const DialogFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0", className)}
        {...props}
    />
))
DialogFooter.displayName = "DialogFooter"

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
}
