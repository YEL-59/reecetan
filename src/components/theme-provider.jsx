import { createContext, useContext, useEffect } from "react"

const ThemeContext = createContext()

// Simplified Theme Provider - Light Mode Only
export function ThemeProvider({ children, ...props }) {
  useEffect(() => {
    const root = window.document.documentElement

    // Always apply light theme
    root.classList.remove("light", "dark")
    root.classList.add("light")
    root.style.colorScheme = "light"

    // Remove any stored theme preferences
    localStorage.removeItem("vite-ui-theme")
  }, [])

  const value = {
    theme: "light",
    setTheme: () => {
      // No-op since we only support light mode
      console.info("Theme is locked to light mode")
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}