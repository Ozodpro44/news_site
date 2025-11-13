import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApiCategory, fetchBreakingNews, fetchTrendingNews, NewsArticle } from "@/data/fetchData";
import { useTheme } from "@/contexts/ThemeContext";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface HeroCarouselProps {
  categories: ApiCategory[];
}

export const HeroCarousel = ({categories}: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroNews, setHeroNews] = useState<NewsArticle[]>([]);
  const { language } = useTheme();
  
  const { data: heroNewsData } = useQuery({
    queryKey: ['heroNews'],
    queryFn: async () => {
        const [breaking, trending] = await Promise.all([
          fetchBreakingNews(3),
          fetchTrendingNews(2)
        ]);
      return [...breaking, ...trending].slice(0, 5);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  useEffect(() => {
    if (heroNewsData) setHeroNews(heroNewsData);
  }, [heroNewsData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroNews.length]);
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const goToPrevious = () => {
    setCurrentSlide(prev => (prev - 1 + heroNews.length) % heroNews.length);
  };
  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % heroNews.length);
  };
  if (heroNews.length === 0) return (<Skeleton className="w-full h-[500px] md:h-[600px] rounded-2xl" />);
  const current = heroNews[currentSlide];
  return <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl bg-muted">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{
      backgroundImage: `url(${current.preview || current.images[0]})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
        <div className="max-w-3xl animate-fade-in mx-0 sm:mx-[50px]">
          <div className="flex items-center gap-2 mb-4 mx-0">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {language === 'uz' ? categories.find(cat => cat.id === current.category_id)?.name_uz : categories.find(cat => cat.id === current.category_id)?.name_kr || ""}
            </Badge>
            {current.isBreaking && <Badge className="bg-breaking text-white">Tezkor Xabar</Badge>}
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-4 text-balance mx-0">
            {language === 'uz' ? current.title_uz : current.title_kr || current.title_uz}
          </h1>
          <p className="text-sm md:text-lg text-white/90 md:mb-6 mb-4 line-clamp-2">
            {language === 'uz' ? current.content_uz.padEnd(50, ".") : current.content_kr?.padEnd(50, ".") || current.content_uz.padEnd(50, ".")}
          </p>
          <Link to={`/news/${format(new Date(current.date), 'dd/MM/yyyy')}/${current.slug}`}>
            <Button className="bg-white p-2 md:p-4 text-black hover:bg-white/90">
              Ko'proq o'qish
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button variant="ghost" size="icon" className="absolute left-4 bottom-3/4 md:top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/20 text-white" onClick={goToPrevious}>
        <ChevronLeft className="md:h-6 md:w-6 h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="absolute right-4 bottom-3/4 md:top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/20 text-white" onClick={goToNext}>
        <ChevronRight className="md:h-6 md:w-6 h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroNews.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"}`} />)}
      </div>
    </div>;
};