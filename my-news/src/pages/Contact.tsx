import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { add } from "date-fns";

const Contact = () => {
  window.scrollTo(0, 0);
  const { language } = useTheme();
  const texts = {
    uz: {
      back: "Orqaga",
      contactUs: "Biz bilan bog'lanish",
      email: "Elektron pochta",
      phone: "Telefon",
      address: "Manzil",
      sendMessage: "Xabar yuborish",
      yourName: "Ismingiz",
      yourEmail: "Email",
      subject: "Mavzu",
      message: "Xabar",
      addressText: "Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi, 123-uy",
    },
    kr: {
      back: "Орқага",
      contactUs: "Биз билан боғланиш",
      email: "Электрон почта",
      phone: "Телефон",
      address: "Манзил",
      sendMessage: "Хабар юбориш",
      yourName: "Исмингиз",
      yourEmail: "Email",
      subject: "Мавзу",
      message: "Хабар",
      addressText: "Тошкент шаҳри, Юнусобод тумани, Амир Темур кўчаси, 123-уй",
    }
  };

  const t = texts[language]; // Default to Uzbek, modify as needed
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">{t.contactUs}</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <Mail className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">{t.email}</h3>
            <Link to="mailto:info@newsplatform.uz">
              <p className="text-muted-foreground underline">info@newsplatform.uz</p>
            </Link>
            <Link to="mailto:support@newsplatform.uz">
              <p className="text-muted-foreground underline">support@newsplatform.uz</p>
            </Link>
          </Card>

          <Card className="p-6">
            <Phone className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">{t.phone}</h3>
            <Link to="tel:+998711234567">
            <p className="text-muted-foreground underline">
              +998 71 123 45 67
            </p>
            </Link>
            <Link to="tel:+998901234567">
              <p className="text-muted-foreground underline">+998 90 123 45 67</p>
            </Link>
          </Card>

          <Card className="p-6 md:col-span-2">
            <MapPin className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">{t.address}</h3>
            <p className="text-muted-foreground">
              {t.addressText}
            </p>
          </Card>
        </div>

        {/* <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Xabar yuborish</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Ismingiz</Label>
              <Input id="name" placeholder="Ismingizni kiriting" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
            <div>
              <Label htmlFor="subject">Mavzu</Label>
              <Input id="subject" placeholder="Xabar mavzusi" />
            </div>
            <div>
              <Label htmlFor="message">Xabar</Label>
              <Textarea
                id="message"
                placeholder="Xabaringizni yozing..."
                rows={6}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Xabar yuborish
            </Button>
          </form>
        </Card> */}
      </div>
    </MainLayout>
  );
};

export default Contact;
