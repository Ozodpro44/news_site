import { Link, useLocation } from "react-router-dom";
import { Home, Grid3x3, Settings, Heart, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const MobileNav = () => {
  const location = useLocation();
  const {language} = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", icon: Home, label_uz: "Asosiy", label_kr: "Асосий" },
    { path: "/categories", icon: Grid3x3, label_uz: "Kategoriyalar", label_kr: "Категортялар" },
    { path: "/lenta", icon: Newspaper, label_uz: "Lenta" , label_kr: "Лента" },
    { path: "/saved", icon: Heart, label_uz: "Saqlangan", label_kr: "Сақланган" },
    { path: "/settings", icon: Settings, label_uz: "Sozlamalar", label_kr: "Созламалар"  },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="grid grid-cols-5 gap-1 p-2">
        {navItems.map(({ path, icon: Icon, label_uz, label_kr }) => (
          <Link key={path} to={path}>
            <Button
              variant={isActive(path) ? "default" : "ghost"}
              size="sm"
              className="w-full h-14 flex flex-col items-center justify-center gap-1"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{language === "uz" ? label_uz : label_kr}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};
