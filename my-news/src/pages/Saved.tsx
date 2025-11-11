import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/news/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useLikes } from "@/hooks/useLikes";
import { fetchNewsById, NewsArticle } from "@/data/fetchData";
import { Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Saved = () => {
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(true);
  const { likedArticles } = useLikes();
  const { language} = useTheme();
  const [savedNews, setSavedNews] = useState<NewsArticle[]>([]);

  const texts = {
    uz: {
      savedNews : "Saqlangan yangiliklar",
      noSavedNews : "Hozircha saqlangan yangiliklar yo'q",
      viewSavedNews : "Yoqtirgan yangiklaringizni bu yerda ko'rishingiz mumkin",
    },
    kr: {
      savedNews : "Сақланган янгиликлар",
      noSavedNews : "Ҳозирча сақланган янгиликлар йўқ",
      viewSavedNews : "Ёқтирган янгиликларингизни бу ерда кўришингиз мумкин",
    }
  };

  const t = texts[language];

  useEffect(() => {
    const loadSavedNews = async () => {
      try {
        setLoading(true);
        const newsPromises = Array.from(likedArticles).map(id => fetchNewsById(id));
        const newsResults = await Promise.all(newsPromises);
        const validNews = newsResults.filter((article): article is NewsArticle => article !== undefined);
        setSavedNews(validNews);
      } catch (error) {
        console.error("Failed to fetch saved news:", error);
        setSavedNews([]);
      } finally {
        setLoading(false);
      }
    };
    loadSavedNews();
  }, [likedArticles]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          <h1 className="text-3xl font-bold">{t.savedNews}</h1>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : savedNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {t.noSavedNews}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t.viewSavedNews}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Saved;
