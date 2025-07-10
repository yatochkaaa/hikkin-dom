"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  function toggleTheme(e?: React.MouseEvent | React.ChangeEvent) {
    e?.stopPropagation();
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center justify-between gap-4 w-full cursor-pointer py-[6px] px-2"
    >
      <div className="flex items-center gap-2">
        {isDark ? <Moon /> : <Sun />}
        <span>Toggle Theme</span>
      </div>

      <Switch
        checked={isDark}
        onClick={(e) => {
          e.stopPropagation();
          toggleTheme(e);
        }}
        aria-label="Toggle theme"
        className="cursor-pointer"
      />
    </div>
  );
}
