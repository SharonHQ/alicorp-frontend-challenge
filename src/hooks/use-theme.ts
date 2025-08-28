"use client"

import { useEffect, useState } from "react"
import { useTheme as useThemeContext } from "@/components/Theme/ThemeProvider"

export function useTheme() {
  const { theme, setTheme } = useThemeContext()
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      setResolvedTheme(systemTheme)
    } else {
      setResolvedTheme(theme)
    }
  }, [theme])

  return {
    theme,
    setTheme,
    resolvedTheme,
    mounted,
  }
}
