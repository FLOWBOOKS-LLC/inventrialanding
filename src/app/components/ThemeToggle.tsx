import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        isDark
          ? "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 transition-colors"
          : "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0b3574]/25 bg-[#0b3574]/5 text-[#0b3574] hover:bg-[#0b3574]/10 hover:border-[#0b3574]/40 transition-colors"
      }
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

