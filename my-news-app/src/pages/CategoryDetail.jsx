import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { mockNews, categories } from "@/data/mockNews";
import { ArrowLeft } from "lucide-react";

const CategoryDetail = () => {
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const categoryNews = mockNews.filter((n) => n.category === slug);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!category) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <p>Kategoriya topilmadi</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/categories">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kategoriyalarga qaytish
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">{category.name}</h1>

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
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {categoryNews.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Bu kategoriyada hozircha yangiliklar yo'q
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryDetail;
