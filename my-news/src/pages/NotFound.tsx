import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const NotFound = () => {
  window.scrollTo(0, 0);
  const texts = {
    uz: {
      pageNotFound: "Sahifa topilmadi",
      sorryMessage:
        "Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.",
      backToHome: "Bosh sahifaga qaytish",
    },
    kr: {
      pageNotFound: "Саҳифа топилмади",
      sorryMessage:
        "Кечирасиз, сиз қидираётган саҳифа мавжуд эмас ёки кўчирилган.",
      backToHome: "Бош саҳифага қайтиш",
    },
  };

  const { language } = useTheme();
  const t = texts[language];
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">{t.pageNotFound}</h2>
        <p className="text-muted-foreground mb-8">
          {t.sorryMessage}
        </p>
        <Link to="/">
          <Button size="lg">
            <Home className="h-5 w-5 mr-2" />
            {t.backToHome}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
