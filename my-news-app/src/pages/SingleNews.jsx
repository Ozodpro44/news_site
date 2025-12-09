import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/news/NewsCard";
import { mockNews } from "@/data/mockNews";
import { ArrowLeft, Heart, Share2, Eye, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLikes } from "@/hooks/useLikes";
import { formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";
import { AdBlock } from "@/components/home/AdBlock";

const SingleNews = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const article = mockNews.find((n) => n.id === id);
  const { isLiked, toggleLike } = useLikes();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    setCurrentImageIndex(0);
    setAutoScroll(true);
    return () => clearTimeout(timer);
  }, [id]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!autoScroll || !article?.images || article.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === article.images.length - 1 ? 0 : prev + 1));
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [autoScroll, article?.images]);

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <p>Yangilik topilmadi</p>
        </div>
      </MainLayout>
    );
  }

  const liked = isLiked(article.id);
  const timeAgo = formatDistanceToNow(new Date(article.date), {
    addSuffix: true,
    locale: uz,
  });

  const recommendedNews = mockNews
    .filter((n) => n.category === article.category && n.id !== article.id)
    .sort((a, b) => {
      // Prioritize recent articles with images and high views
      const aScore = (new Date(b.date) - new Date(a.date)) + (b.views || 0) * 100 + (b.images?.length || 0) * 50;
      const bScore = (new Date(a.date) - new Date(b.date)) + (a.views || 0) * 100 + (a.images?.length || 0) * 50;
      return bScore - aScore;
    })
    .slice(0, 6);

  if (loading) {
    return (
      <MainLayout>
        <article className="container mx-auto px-4 py-6 max-w-4xl">
          <Skeleton className="h-9 w-24 mb-6" />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>

            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-3/4 mb-4" />

            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>

          <div className="space-y-3 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </article>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            {article.isBreaking && (
              <Badge className="bg-breaking text-white">Tezkor</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {timeAgo}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString()} ko'rildi
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={liked ? "default" : "outline"}
              size="sm"
              onClick={() => toggleLike(article.id)}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
              {article.likes}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Ulashish
            </Button>
          </div>
        </div>

        {/* Article Images Carousel */}
        <div className="mb-6">
          <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
            {!imagesLoaded[currentImageIndex] && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse z-10" />
            )}
            <img
              src={article.images[currentImageIndex]}
              alt={`${article.title} - ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
                imagesLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImagesLoaded((prev) => ({ ...prev, [currentImageIndex]: true }))}
              onError={() => setImagesLoaded((prev) => ({ ...prev, [currentImageIndex]: true }))}
              onClick={() => setSelectedImage(currentImageIndex)}
            />
            
            {article.images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    setAutoScroll(false);
                    setCurrentImageIndex((prev) => (prev === 0 ? article.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    setAutoScroll(false);
                    setCurrentImageIndex((prev) => (prev === article.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                  {article.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setAutoScroll(false);
                        setCurrentImageIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Image Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={article.images[selectedImage]}
                alt={`${article.title} - ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              {article.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === 0 ? article.images.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === article.images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Video */}
        {article.videoUrl && (
          <div className="mb-6 aspect-video">
            <iframe
              src={article.videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.hashtags.map((tag) => (
            <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}>
              <Badge variant="outline">#{tag}</Badge>
            </Link>
          ))}
        </div>

        {/* Ad */}
        <div className="mb-12">
          <AdBlock variant="horizontal" />
        </div>

        {/* Recommended News */}
        {recommendedNews.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Tavsiya etilgan yangiliklar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedNews.map((news) => (
                <NewsCard key={news.id} article={news} />
              ))}
            </div>
          </section>
        )}
      </article>
    </MainLayout>
  );
};

export default SingleNews;
