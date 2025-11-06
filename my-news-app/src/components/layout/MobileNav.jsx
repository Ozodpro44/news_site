import { Link, useLocation } from "react-router-dom";
import { Home, Grid3x3, Newspaper, Settings, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: Home, label: "Asosiy" },
    { path: "/categories", icon: Grid3x3, label: "Kategoriyalar" },
    { path: "/lenta", icon: Newspaper, label: "Lenta" },
    { path: "/saved", icon: Heart, label: "Saqlangan" },
    { path: "/settings", icon: Settings, label: "Sozlamalar" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="grid grid-cols-5 gap-1 p-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link key={path} to={path}>
            <Button
              variant={isActive(path) ? "default" : "ghost"}
              size="sm"
              className="w-full h-14 flex flex-col items-center justify-center gap-1"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};
