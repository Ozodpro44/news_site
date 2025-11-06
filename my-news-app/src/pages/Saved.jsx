import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/news/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useLikes } from "@/hooks/useLikes";
import { mockNews } from "@/data/mockNews";
import { Heart } from "lucide-react";

function Saved() {
  const [loading, setLoading] = useState(true);
  const { likedArticles } = useLikes();
  const savedNews = mockNews.filter((article) => likedArticles.has(article.id));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          <h1 className="text-3xl font-bold">Saqlangan yangiliklar</h1>
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
              Hozircha saqlangan yangiliklar yo'q
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Yoqtirgan yangiliklaringizni bu yerda ko'rishingiz mumkin
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Saved;
