import { useState, useEffect, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { NewsCard } from "@/components/news/NewsCard";
import { WeatherWidget } from "@/components/home/WeatherWidget";
import { CurrencyWidget } from "@/components/home/CurrencyWidget";
import { HashtagBar } from "@/components/home/HashtagBar";
import { AdBlock } from "@/components/home/AdBlock";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNews, fetchWeather, NewsArticle} from "@/data/fetchData";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollStore } from "@/hooks/useScrollStore";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [popularNews, setPopularNews] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const { pathname } = useLocation();
  const savePosition = useScrollStore((state) => state.savePosition);
  const getPosition = useScrollStore((state) => state.getPosition);
  const { language } = useTheme();
  const [weatherData, setWeatherData] = useState<any>();

  const texts = {
    uz: {
      latestNews : "So'nggi yangiliklar",
      allWarch : "Barchasini ko'rish",
      popularNews : "Mashhur yangiliklar",
    },
    kr: {
      latestNews : "Сўнгги янгиликлар",
      allWarch : "Барчасини кўриш",
      popularNews : "Машҳур янгиликлар",
    }
  };

  const t = texts[language];

  const fetchWeatherData = useCallback(async () => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeather(latitude, longitude);
          resolve(data);
        } catch (fetchError) {
          reject(fetchError);
        }
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  });
  }, []);
    
    const { data: weatherDataQuery } = useQuery({
      queryKey: ['weather'],
      queryFn: () => fetchWeatherData(),
      staleTime: 1000 * 60 * 30, // 5 minutes
    gcTime: 1000 * 60 * 40, // 10 minutes
    retry: 1,
  });
  
  useEffect(() => {
    if (weatherDataQuery) setWeatherData(weatherDataQuery);
  }, [weatherDataQuery]);

  // Save scroll position on unmount
  useEffect(() => {
    return () => {
      savePosition(pathname, window.scrollY);
    };
  }, [pathname, savePosition]);
  // Restore scroll position on mount
  useEffect(() => {
    window.scrollTo(0, getPosition(pathname));
  }, [getPosition, pathname]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { fetchCategories } = await import('@/data/fetchData');
        const [articles, cats] = await Promise.all([
          fetchNews(),
          fetchCategories()
        ]);
        if (mounted) {
          setCategories(cats);
          setLatestNews(articles.slice(0, 6));
          setPopularNews([...articles].sort((a, b) => b.views - a.views).slice(0, 4));
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load news', err);
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
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
        <HeroCarousel categories={categories} />

        {/* Weather & Currency */}
        <div className="grid md:grid-cols-2 gap-4">
          <WeatherWidget data={weatherData}/>
          <CurrencyWidget />
        </div>

        {/* Trending Hashtags */}
        <HashtagBar />

        {/* Latest News */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t.latestNews}</h2>
            <Link to="/lenta">
              <Button variant="default">{t.allWarch}</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Ad Block */}
        {/* <AdBlock variant="horizontal" /> */}

        {/* Popular News */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t.popularNews}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularNews.map((article) => (
              <NewsCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </section>

        <Footer categories={categories}/>
      </div>
    </MainLayout>
  );
};

export default Index;
