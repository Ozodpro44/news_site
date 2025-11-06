import { Link, useLocation } from "react-router-dom";
import { Search, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { categories } from "@/data/mockNews";

export const DesktopNav = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold">News Platform</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
              >
                Asosiy
              </Button>
            </Link>
            {categories.slice(0, 5).map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`}>
                <Button
                  variant={isActive(`/category/${cat.slug}`) ? "default" : "ghost"}
                  size="sm"
                >
                  {cat.name}
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
