import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Info, Phone, Moon, Sun, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { theme, language, toggleTheme, setLanguage } = useTheme();
  window.scrollTo(0, 0);
  const texts = {
    uz: {
      settings: "Sozlamalar",
      darkMode: "Tungi rejim",
      darkModeDesc: "Qorong'i rejimni yoqish yoki o'chirish",
      language: "Til",
      selectLanguage: "Ilovaning tilini tanlang",
      latin: "Lotincha",
      cyrillic: "Кирилча",
      aboutUs: "Biz haqimizda",
      aboutUsDesc: "Platforma haqida ma'lumot",
      contactUs: "Biz bilan bog'lanish",
      contactUsDesc: "Aloqa ma'lumotlari",
      copyright: "Barcha huquqlar himoyalangan",
    },
    kr: {
      settings: "Созламалар",
      darkMode: "Тунги режим",
      darkModeDesc: "Қоронғи режимни ёқиш ёки ўчириш",
      language: "Тил",
      selectLanguage: "Илованинг тилини танланг",
      latin: "Лотинча",
      cyrillic: "Кирилча",
      aboutUs: "Биз ҳақимизда",
      aboutUsDesc: "Платформа ҳақида маълумот",
      contactUs: "Биз билан боғланиш",
      contactUsDesc: "Алоқа маълумотлари",
      copyright: "Барча ҳуқуқлар ҳимояланган",
    },
  };

  const t = texts[language];
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">{t.settings}</h1>

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
                    {t.darkMode}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t.darkModeDesc}
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
                <Label className="text-base font-semibold mb-3 block">{t.language}</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  {t.selectLanguage}
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={language === "uz" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setLanguage("uz")}
                  >
                    {t.latin}
                  </Button>
                  <Button
                    variant={language === "kr" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setLanguage("kr")}
                  >
                    {t.cyrillic}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Links */}
          <div className="space-y-3">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <Link to="/settings/about">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{t.aboutUs}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.aboutUsDesc}
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <Link to="/settings/contact">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{t.contactUs}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.contactUsDesc}
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>© 2025 Chust 24/7</p>
            <p>{t.copyright}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
