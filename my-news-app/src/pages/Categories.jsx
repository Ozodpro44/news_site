import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/data/mockNews";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";

const Categories = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Kategoriyalar</h1>

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
              const Icon = Icons[category.icon];
              return (
                <Link key={category.slug} to={`/category/${category.slug}`}>
                  <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-l-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      {Icon && <Icon className={`h-10 w-10 ${category.colorClass}`} />}
                      <h3 className="font-semibold text-lg">{category.name}</h3>
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
