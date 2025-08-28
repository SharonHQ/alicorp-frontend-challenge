"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value as "light" | "dark" | "system")
      }}
      className="border bg-background"
    >
      <ToggleGroupItem
        value="light"
        size="sm"
        className="px-2"
        title="Light mode"
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        size="sm"
        className="px-2"
        title="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="system"
        size="sm"
        className="px-2"
        title="System mode"
      >
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
