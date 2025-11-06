import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNews } from "@/data/mockNews";

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroNews = mockNews.filter(n => n.isBreaking || n.isTrending).slice(0, 5); // Ensure only up to 5 news items are used

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroNews.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroNews.length) % heroNews.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroNews.length);
  };

  if (heroNews.length === 0) return null;

  const current = heroNews[currentSlide];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl bg-muted">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${current.images[0]})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
        <div className="max-w-3xl animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {current.category}
            </Badge>
            {current.isBreaking && (
              <Badge className="bg-breaking text-white">Tezkor Xabar</Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-balance">
            {current.title}
          </h1>
          <p className="text-lg text-white/90 mb-6 line-clamp-2">
            {current.summary}
          </p>
          <Link to={`/news/${current.id}`}>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              Ko'proq o'qish
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/20 text-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/20 text-white"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroNews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
