import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { NewsCard } from "../components/news/NewsCard";
import { WeatherWidget } from "../components/home/WeatherWidget";
import { CurrencyWidget } from "../components/home/CurrencyWidget";
import { HashtagBar } from "../components/home/HashtagBar";
import { AdBlock } from "../components/home/AdBlock";
import { Footer } from "../components/Footer";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";
import { mockNews } from "../data/mockNews";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const latestNews = mockNews.slice(0, 6);
  const popularNews = [...mockNews]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6 space-y-8">
          {/* Hero Skeleton */}
          <Skeleton className="w-full h-[500px] md:h-[600px] rounded-2xl" />

          {/* Weather & Currency Skeleton */}
          <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-40 rounded-lg" />
            <Skeleton className="h-40 rounded-lg" />
          </div>

          {/* Hashtags Skeleton */}
          <Skeleton className="h-16 rounded-lg" />

          {/* Latest News Skeleton */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
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
          </section>

          {/* Popular News Skeleton */}
          <section>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-40 rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Weather & Currency */}
        <div className="grid md:grid-cols-2 gap-4">
          <WeatherWidget />
          <CurrencyWidget />
        </div>

        {/* Trending Hashtags */}
        <HashtagBar />

        {/* Latest News */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">So'nggi yangiliklar</h2>
            <Link to="/lenta">
              <Button variant="ghost">Barchasini ko'rish</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Ad Block */}
        <AdBlock variant="horizontal" />

        {/* Popular News */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Mashhur yangiliklar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularNews.map((article) => (
              <NewsCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </MainLayout>
  );
};

export default Index;
