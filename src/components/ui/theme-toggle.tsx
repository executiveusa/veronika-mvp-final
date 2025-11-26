import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface ThemeToggleProps {
  className?: string;
  size?: "icon" | "default";
}

export const ThemeToggle = ({ className, size = "icon" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size={size === "icon" ? "icon" : "sm"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "glass-strong border-glass-border text-foreground hover:bg-glass-strong/80",
        "transition-all duration-300",
        size === "default" && "px-3 py-2 gap-2 flex items-center",
        className
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {size === "default" && (
        <span className="text-sm font-medium">{isDark ? "Light" : "Dark"}</span>
      )}
    </Button>
  );
};
