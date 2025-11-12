import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLenta, NewsArticle} from "@/data/fetchData";
import { SlidersHorizontal } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Lenta = () => {
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();
  const [sortBy, setSortBy] = useState<"latest" | "famous">("latest");
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  window.scrollTo(0, 0);

  const texts = {
    uz: {
      lenta : "Lenta",
      latestNews : "Yangi",
      popularNews : "Mashhur",
      loadMore : "Ko'proq yuklash",
      loading : "Yuklanmoqda...",
    },
    kr: {
      lenta : "Лента",  
      latestNews : "Янги",
      popularNews : "Машҳур",
      loadMore : "Кўпроқ юклаш",
      loading : "Юкланмоқда...",
    }
  };

  const t = texts[language]; // Default to Uzbek, modify as needed


  // const sortedNews = [...news].sort((a, b) => {
  //   if (sortBy === "latest") {
  //     return new Date(b.date).getTime() - new Date(a.date).getTime();
  //   }
  //   return b.views - a.views;
  // });

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const lenta = await fetchLenta(sortBy, 6, 0);
        setNews(lenta);
      } catch (error) {
        console.error("Failed to fetch lenta:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [sortBy]);
  
  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const lenta = await fetchLenta(sortBy, 6, news.length);
      setNews((prevNews) => [...prevNews, ...lenta]);
    } catch (error) {
      console.error("Failed to load more:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6 sticky top-14 md:top-20 z-10 bg-background/95 backdrop-blur py-4 -mx-4 px-4 border-b">
          <h1 className="text-2xl font-bold">{t.lenta}</h1>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "latest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("latest")}
            >
              {t.latestNews}
            </Button>
            <Button
              variant={sortBy === "famous" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("famous")}
            >
              {t.popularNews}
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-32 w-48 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* News Feed */}
            <div className="grid md:grid-cols-2 gap-6">
              {news.map((article) => (
                <NewsCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              {news.length > 0 && (
                <Button size="lg" variant="outline" onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? t.loading : t.loadMore}
                </Button>
              )}
            </div>
          </>
        )}

      </div>
    </MainLayout>
  );
};

export default Lenta;
