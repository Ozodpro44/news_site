import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Info, Phone, Briefcase, Moon, Sun, Globe } from "lucide-react";
import { Link } from "react-router-dom";

function Settings() {
  const { theme, language, toggleTheme, setLanguage } = useTheme();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Sozlamalar</h1>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "light" ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
                <div>
                  <Label htmlFor="theme-toggle" className="text-base font-semibold">
                    Tungi rejim
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Qorong'i rejimni yoqish yoki o'chirish
                  </p>
                </div>
              </div>
              <Switch
                id="theme-toggle"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </Card>

          {/* Language Selector */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary mt-1" />
              <div className="flex-1">
                <Label className="text-base font-semibold mb-3 block">Til</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Ilovaning tilini tanlang
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={language === "uz" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setLanguage("uz")}
                  >
                    🇺🇿 O'zbekcha
                  </Button>
                  <Button
                    variant={language === "ru" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setLanguage("ru")}
                  >
                    🇷🇺 Русский
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setLanguage("en")}
                  >
                    🇬🇧 English
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Links */}
          <div className="space-y-3">
            <Link to="/about">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Biz haqimizda</p>
                    <p className="text-sm text-muted-foreground">
                      Platforma haqida ma'lumot
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/contact">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Biz bilan bog'lanish</p>
                    <p className="text-sm text-muted-foreground">
                      Aloqa ma'lumotlari
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/advertising">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Reklama</p>
                    <p className="text-sm text-muted-foreground">
                      Biznes hamkorlik
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>© 2025 News Platform</p>
            <p>Barcha huquqlar himoyalangan</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
