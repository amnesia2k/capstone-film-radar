import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export function SwitchToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="themeToggle"
        checked={theme === "dark"}
        onClick={toggleTheme}
      />
      <Label htmlFor="themeToggle">
        {theme === "dark" ? (
          <Sun className="h-[20px] w-[20px]" />
        ) : (
          <Moon className="h-[20px] w-[20px]" />
        )}
      </Label>
    </div>
  );
}
