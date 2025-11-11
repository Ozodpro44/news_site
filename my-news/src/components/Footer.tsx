import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { ApiCategory } from "@/data/fetchData";

interface FooterProps {
  categories: ApiCategory[];
}

export const Footer = ({categories}: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const {language} = useTheme();

  const texts = {
    uz: {
      platform: "Platforma",
      aboutUs: "Biz haqimizda",
      contact: "Aloqa",
      advertising: "Reklama",
      categories: "Kategoriyalar",
      users: "Foydalanuvchilar",
      saved: "Saqlangan",
      settings: "Sozlamalar",
      additional: "Qo'shimcha",
      termsOfUse: "Foydalanish shartlari",
      privacyPolicy: "Maxfiylik siyosati",
      allRightsReserved: "Barcha huquqlar himoyalangan."
    },
    kr: {
      platform: "Платформа",
      aboutUs: "Биз ҳақимизда",
      contact: "Алоқа",
      advertising: "Реклама",
      categories: "Категориялар",
      users: "Фойдаланувчилар",
      saved: "Сақланган",
      settings: "Созламалар",
      additional: "Қўшимча",
      termsOfUse: "Фойдаланиш шартлари",
      privacyPolicy: "Махфийлик сиёсати",
      allRightsReserved: "Барча ҳуқуқлар ҳимояланган."
    }
  }

  const t = texts[language]

  return (
    <footer className="border-t bg-card mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">{t.platform}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link to="/advertising" className="hover:text-foreground transition-colors">
                  {t.advertising}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">{t.categories}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.slice(-4).map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`} className="hover:text-foreground transition-colors">
                    {language === 'uz' ? category.name_uz : category.name_kr}
                </Link>
              </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">{t.users}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/saved" className="hover:text-foreground transition-colors">
                  {t.saved}
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-foreground transition-colors">
                  {t.settings}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Chust24/7. {t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};
