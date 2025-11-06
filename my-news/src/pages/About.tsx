import { MainLayout } from "@/components/layout/MainLayout";
import { useScrollStore } from "@/hooks/useScrollStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const About = () => {
  const { pathname } = useLocation();
  const savePosition = useScrollStore((state) => state.savePosition);
  const getPosition = useScrollStore((state) => state.getPosition);
  const { language } = useTheme();

  const texts = {
    uz: {
      back: "Orqaga",
      aboutUs: "Biz haqimizda",
      ourGoal: "Bizning maqsadimiz",
      ourTeam: "Bizning jamoa",
      ourValues: "Bizning qadriyatlarimiz",
      aboutUsText: "Chust 24/7 - O'zbekiston va dunyo bo'ylab eng muhim yangiliklar va voqealarni tez va ishonchli tarzda yetkazib beruvchi zamonaviy axborot portali. Biz har bir foydalanuvchiga sifatli, tahliliy va ob'ektiv ma'lumot taqdim etishga intilamiz.",
      ourTeamText: "Bizning jamoamiz tajribali jurnalistlar, muharrirlar va texnologiya mutaxassislaridan iborat. Har bir yangilik ehtiyotkorlik bilan tayyorlanadi va tasdiqlanadi. Biz professional standartlarga rioya qilishga va auditoriyamizga ishonchli ma'lumot berishga alohida e'tibor beramiz.",
      ourValuesText: "• Ishonchlilik: Faqat tasdiklangan va to'g'ri ma'lumotlar\n• Ob'ektivlik: Xolislik va barcha nuqtai nazarlarni ko'rsatish\n• Tezkorlik: Muhim voqealarni darhol yetkazib berish\n• Sifat: Yuqori darajadagi jurnalistika standartlari",
    },
    kr: {
      back: "Орқага",
      aboutUs: "Биз ҳақимизда",
      ourGoal: "Бизнинг мақсадимиз",
      ourTeam: "Бизнинг жамоа",
      ourValues: "Бизнинг қадриятларимиз",
      aboutUsText: "Чуст 24/7 - Ўзбекистон ва дунё бўйлаб энг муҳим янгиликлар ва воқеаларни тез ва ишончли тарзда етказиб берувчи замонавий ахборот портали. Биз ҳар бир фойдаланувчига сифатли, таҳлилий ва объектив маълумот тақдим этишга интиламиз.",
      ourTeamText: "Бизнинг жамоамиз тажрибали журналистлар, муҳаррирлар ва технология мутахассисларидан иборат. Ҳар бир янгилик эҳтиёткорлик билан тайёрланади ва тасдиқланади. Биз профессионал стандартларга риоя қилишга ва аудиториямизга ишончли маълумот беришга алоҳида эътибор берамиз.",
      ourValuesText: "• Ишончлилик: Фақат тасдиқланган ва тўғри маълумотлар\n• Объективлик: Холислик ва барча нуқтаи назарларни кўрсатиш\n• Тезкорлик: Муҳим воқеаларни дарҳол етказиб бериш\n• Сифат: Юқори даражадаги журналистика стандартлари",
    }
  };

  const t = texts[language];

  // Например, при уходе со страницы — сохраняем скролл
  useEffect(() => {
    return () => {
      savePosition(pathname, window.scrollY);
    };
  }, [pathname]);

  // При открытии — возвращаем на старую позицию
  useEffect(() => {
    window.scrollTo(0, getPosition(pathname));
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">{t.aboutUs}</h1>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Target className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">{t.ourGoal}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.aboutUsText}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">{t.ourTeam}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.ourTeamText}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-3">Bizning qadriyatlarimiz</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t.ourValuesText}
                </p>
                {/* <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Ishonchlilik:</strong> Faqat tasdiklangan va to'g'ri ma'lumotlar</li>
                  <li>• <strong>Ob'ektivlik:</strong> Xolislik va barcha nuqtai nazarlarni ko'rsatish</li>
                  <li>• <strong>Tezkorlik:</strong> Muhim voqealarni darhol yetkazib berish</li>
                  <li>• <strong>Sifat:</strong> Yuqori darajadagi jurnalistika standartlari</li>
                </ul> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
