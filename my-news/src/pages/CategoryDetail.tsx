import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { NewsCard} from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCategories, NewsArticle, ApiCategory, fetchNewsByCategory, useCategories } from "@/data/fetchData";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const CategoryDetail = () => {
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<ApiCategory | null>(null);
  const [categoryNews, setCategoryNews] = useState<NewsArticle[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { language } = useTheme();

  const texts = {
    uz: {
      backToCategories : "Kategoriyalarga qaytish",
      notFound : "Kategoriya topilmadi",
      noNews : "Bu kategoriyada hozircha yangiliklar yo'q",
       loadMore: "Ko'proq yuklash",
      loading: "Yuklanmoqda...",
    },
    kr: {
      backToCategories : "Категорияларга қайтиш",
      notFound : "Категория топилмади",
      noNews : "Бу категорияда ҳозирча янгиликлар йўқ",
      loadMore: "Ko'proq yuklash",
      loading: "Yuklanmoqda...",
    }
  };

  const t = texts[language];

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true);
        const categories = await fetchCategories();
        const foundCategory = categories.find((c) => c.slug === slug);
        setCategory(foundCategory || null);
        
        if (foundCategory) {
          const news = await fetchNewsByCategory(foundCategory.id, 6, 0);
          setCategoryNews(news);
          setOffset(6);
          setHasMore(news.length === 6);
        }
      } catch (error) {
        console.error("Failed to fetch category data:", error);
        setCategoryNews([]);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [slug]);
  
  const loadMoreNews = async () => {
    if (!category) return;
    setLoading(true);
    try {
      const newNews = await fetchNewsByCategory(category.id, 6, offset);
      setCategoryNews((prevNews) => [...prevNews, ...newNews]);
      setOffset((prevOffset) => prevOffset + newNews.length);
      setHasMore(newNews.length === 6);
    } catch (error) {
      console.error("Failed to load more news:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  if (!category && !loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <p>{t.notFound}</p>
        </div>
      </MainLayout>
    );
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/categories">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToCategories}
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">{category ? (language === 'uz' ? category.name_uz : category.name_kr) : ''}</h1>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {categoryNews.length === 0 && !loading && (
          <div className="text-center text-muted-foreground py-12">
            <p>{t.noNews}</p>
          </div>
        )}

        {hasMore && categoryNews.length !== 0 && (
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" onClick={loadMoreNews} disabled={loading}>
              {loading ? t.loading : t.loadMore}
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryDetail;
