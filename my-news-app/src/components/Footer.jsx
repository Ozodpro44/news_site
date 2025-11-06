import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">Platforma</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Aloqa
                </Link>
              </li>
              <li>
                <Link to="/advertising" className="hover:text-foreground transition-colors">
                  Reklama
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Kategoriyalar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/category/jamiyat" className="hover:text-foreground transition-colors">
                  Jamiyat
                </Link>
              </li>
              <li>
                <Link to="/category/texnologiya" className="hover:text-foreground transition-colors">
                  Texnologiya
                </Link>
              </li>
              <li>
                <Link to="/category/sport" className="hover:text-foreground transition-colors">
                  Sport
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Foydalanuvchilar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/saved" className="hover:text-foreground transition-colors">
                  Saqlangan
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-foreground transition-colors">
                  Sozlamalar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Qo'shimcha</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Foydalanish shartlari
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Maxfiylik siyosati
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} News Platform. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer(styles);