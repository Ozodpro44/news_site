import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCategories, ApiCategory } from "@/data/fetchData";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Categories = () => {
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const { language } = useTheme();

  const texts = {
    uz: {
      categories : "Kategoriyalar",
    },
    kr: {
      categories : "Категориялар",
    }
  };

  const t = texts[language];

  // Icon mapping based on category name
  const getIcon = (name: string): keyof typeof Icons => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('jamiyat') || lowerName.includes('жамият')) return 'Users';
    if (lowerName.includes('texnologiya') || lowerName.includes('технология')) return 'Cpu';
    if (lowerName.includes('iqtisodiyot') || lowerName.includes('иқтисодиёт')) return 'TrendingUp';
    if (lowerName.includes('sport')) return 'Trophy';
    if (lowerName.includes('madaniyat') || lowerName.includes('маданият')) return 'Palette';
    if (lowerName.includes('dunyo') || lowerName.includes('дунё')) return 'Globe';
    if (lowerName.includes('siyosat') || lowerName.includes('сиёсат')) return 'Building';
    if (lowerName.includes('fan')) return 'Microscope';
    return 'FileText';
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">{t.categories}</h1>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="p-6 space-y-3">
                <Skeleton className="h-10 w-10 mx-auto rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const categoryName = language === 'uz' ? category.name_uz : category.name_kr;
              const iconName = getIcon(categoryName);
              const Icon = Icons[iconName] as any;
              
              return (
                <Link key={category.id} to={`/category/${category.slug}`}>
                  <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-l-4" style={{ borderLeftColor: category.color || '#3b82f6' }}>
                    <div className="flex flex-col items-center text-center gap-3">
                      {Icon && <Icon className="h-10 w-10" style={{ color: category.color || '#3b82f6' }} />}
                      <h3 className="font-semibold text-lg">{categoryName}</h3>
                      {category.articlesCount !== undefined && (
                        <p className="text-sm text-muted-foreground">{category.articlesCount} {language === 'uz' ? 'ta yangilik' : 'та янгилик'}</p>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Categories;
