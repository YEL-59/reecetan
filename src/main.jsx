import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { router } from '@/routes/router'
import './index.css'
import AOS from 'aos'
import Lenis from '@studio-freight/lenis'

function AppRoot() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 60,
    })

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.12,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
)
