import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { NewsCard } from "../components/news/NewsCard";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { mockNews } from "../data/mockNews";
import { SlidersHorizontal } from "lucide-react";

const Lenta = () => {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const sortedNews = [...mockNews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.views - a.views;
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [sortBy]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6 sticky top-16 md:top-20 z-10 bg-background/95 backdrop-blur py-4 -mx-4 px-4 border-b">
          <h1 className="text-2xl font-bold">Lenta</h1>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "newest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("newest")}
            >
              Yangi
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("popular")}
            >
              Mashhur
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
              {sortedNews.map((article) => (
                <NewsCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button size="lg" variant="outline">
                Ko'proq yuklash
              </Button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Lenta;
