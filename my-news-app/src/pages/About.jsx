import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Biz haqimizda</h1>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Target className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Bizning maqsadimiz</h2>
                <p className="text-muted-foreground leading-relaxed">
                  News Platform — O'zbekiston va dunyo bo'ylab eng muhim yangiliklar va voqealarni
                  tez va ishonchli tarzda yetkazib beruvchi zamonaviy axborot portali. Biz har bir
                  foydalanuvchiga sifatli, tahliliy va ob'ektiv ma'lumot taqdim etishga intilamiz.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Bizning jamoa</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bizning jamoamiz tajribali jurnalistlar, muharrirlar va texnologiya mutaxassislaridan
                  iborat. Har bir yangilik ehtiyotkorlik bilan tayyorlanadi va tasdiqlanadi. Biz
                  professional standartlarga rioya qilishga va auditoriyamizga ishonchli ma'lumot
                  berishga alohida e'tibor beramiz.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Bizning qadriyatlarimiz</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Ishonchlilik:</strong> Faqat tasdiklangan va to'g'ri ma'lumotlar</li>
                  <li>• <strong>Ob'ektivlik:</strong> Xolislik va barcha nuqtai nazarlarni ko'rsatish</li>
                  <li>• <strong>Tezkorlik:</strong> Muhim voqealarni darhol yetkazib berish</li>
                  <li>• <strong>Sifat:</strong> Yuqori darajadagi jurnalistika standartlari</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
