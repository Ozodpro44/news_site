import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "uz" | "kr";

interface ThemeContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("news-theme");
    return (saved as Theme) || "light";
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("news-language");
    return (saved as Language) || "uz";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("news-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("news-language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, language, setTheme, setLanguage, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
