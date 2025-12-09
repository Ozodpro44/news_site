import { Link } from "react-router-dom";
import { Search, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MobileHeader = memo(() => {
  const { theme, language, setLanguage, toggleTheme} = useTheme();

  return (
    <header className="md:hidden sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
           <img src="/IMG_0785.PNG" alt="Chust 24/7 Logo" className="h-7 w-autorounded-md object-cover" decoding="async" />
         </Link>

        <div className="flex items-center space-x-2">
          <Link to="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
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
        </div>
      </div>
    </header>
  );
});

MobileHeader.displayName = 'MobileHeader';
