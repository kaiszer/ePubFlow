import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-full items-center gap-1">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full border-none cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          theme === "light" 
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100" 
            : "bg-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
        aria-label="Modo Claro"
        title="Modo Claro"
      >
        <Sun size={16} />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full border-none cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          theme === "system" 
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100" 
            : "bg-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
        aria-label="Tema del Sistema"
        title="Tema del Sistema"
      >
        <Monitor size={16} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full border-none cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          theme === "dark" 
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100" 
            : "bg-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
        aria-label="Modo Oscuro"
        title="Modo Oscuro"
      >
        <Moon size={16} />
      </button>
    </div>
  );
}
