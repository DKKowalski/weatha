import { createContext, ReactNode, useContext, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme() ?? "light";
  const [theme, setTheme] = useState<ThemeType>("system");

  // effective theme: system preference OR manual override
  const effectiveTheme =
    theme === "system" ? (systemScheme as "light" | "dark") : theme;

  return (
    <ThemeContext.Provider value={{ theme: effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
