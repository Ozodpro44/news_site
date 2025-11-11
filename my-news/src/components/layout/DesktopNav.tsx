import { Link, useLocation } from "react-router-dom";
import { Search, Settings, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/contexts/CategoriesContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DesktopNav = () => {
  const location = useLocation();
  const { theme, language, setLanguage, toggleTheme } = useTheme();
  const { categories } = useCategories();

  const texts = {
    uz: {
      home: "Asosiy",
    },
    kr: {
      home: "Асосий",
    },
  };

  const t = texts[language];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold">Chust 24/7</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1">
            <Link to="/" className="border-r-2 pr-2 color">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
              >
                {t.home}
              </Button>
            </Link>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`}>
                <Button
                  variant={isActive(`/category/${cat.slug}`) ? "default" : "ghost"}
                  size="sm"
                >
                  {language === 'uz' ? cat.name_uz : cat.name_kr}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("uz")}>
                {language === "uz" && "✓ "}Lotincha
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("kr")}>
                {language === "kr" && "✓ "}Кирилча
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
