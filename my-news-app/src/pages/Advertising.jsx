import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Eye, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Advertising = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">Reklama imkoniyatlari</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Millionlab foydalanuvchilarga o'z brendingizni yetkazib bering
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <Users className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Keng auditoriya</h3>
            <p className="text-muted-foreground">
              Har kuni 500,000+ faol foydalanuvchi platformamizga tashrif buyuradi
            </p>
          </Card>

          <Card className="p-6">
            <Eye className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Yuqori ko'rinish</h3>
            <p className="text-muted-foreground">
              Sizning reklamangiz eng ko'p o'qiladigan joylarda joylashtiriladi
            </p>
          </Card>

          <Card className="p-6">
            <Target className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Maqsadli auditoriya</h3>
            <p className="text-muted-foreground">
              Kategoriyalar va demografiya bo'yicha aniq targeting
            </p>
          </Card>

          <Card className="p-6">
            <TrendingUp className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Natijaga yo'naltirilgan</h3>
            <p className="text-muted-foreground">
              Tahlil va statistika bilan kampaniyangiz samaradorligini kuzating
            </p>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Reklama turlari</h2>
          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">Banner reklama</h3>
              <p className="text-muted-foreground text-sm">
                Saytning turli qismlarida ko'rsatiladigan vizual bannerlar
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">Homiylik maqolalari</h3>
              <p className="text-muted-foreground text-sm">
                Brendingiz haqida to'liq maqolalar va tahlillar
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">Video reklama</h3>
              <p className="text-muted-foreground text-sm">
                Yangiliklar orasida ko'rsatiladigan qisqa video reklamalar
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">Maxsus loyihalar</h3>
              <p className="text-muted-foreground text-sm">
                Sizning ehtiyojlaringizga moslashtirilgan individual reklama yechimlar
              </p>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Hamkorlik uchun murojaat qiling</h3>
            <p className="text-muted-foreground mb-4">
              Bizning reklama bo'limi mutaxassislari sizga eng mos variantni tanlashda yordam beradi
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Email:</strong> ads@newsplatform.uz
              </p>
              <p className="text-sm">
                <strong>Telefon:</strong> +998 71 123 45 67
              </p>
            </div>
            <Button size="lg" className="mt-4">
              Aloqaga chiqish
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Advertising;
