import React from "react"
import { Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simplified Theme Toggle - Light Mode Only (Optional Display)
export function ThemeToggle() {
  return (
    <Button variant="ghost" size="sm" className="h-8 w-8 px-0" disabled>
      <Sun className="h-4 w-4 text-yellow-500" />
      <span className="sr-only">Light mode active</span>
    </Button>
  )
}

// Alternative version that's completely hidden
export function ThemeToggleHidden() {
  return null // Completely hidden
}

// Use this if you want to show light mode is active
export function ThemeToggleDisplay() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Sun className="h-4 w-4 text-yellow-500" />
      <span>Light Mode</span>
    </div>
  )
}