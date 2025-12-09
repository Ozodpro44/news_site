import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/news/NewsCard";
import { fetchNewsBySlug, fetchRelatedNews, likeArticle, unlikeArticle } from "@/data/fetchData";
import { AdvertisementSection } from "@/components/AdvertisementSection";
import { ArrowLeft, Heart, Eye, Clock, Share2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLikes } from "@/hooks/useLikes";
import { format} from "date-fns";
import { uz, uzCyrl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/contexts/CategoriesContext";

const SingleNews = () => {
  const { language} = useTheme();
  const { day, month, year, slug } = useParams<{ day: string; month: string; year: string; slug: string; }>();
  const [loading, setLoading] = useState(true);
  const { isLiked, toggleLike } = useLikes();
  const [article, setArticle] = useState<any>(null);
  const { getCategoryName } = useCategories();
  const [relatedNews, setRelatedNews] = useState<any[]>([])
  const liked = isLiked(article?.id);
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [autoScroll, setAutoScroll] = useState(true);
  // const localDate = new Date(article.date);
  //   localDate.setHours(localDate.getHours() + 5);
  const texts = {
    uz: {
      notFound : "Yangilik topilmadi",
      back : "Orqaga",
      recommendedNews : "Tavsiya etilgan yangiliklar",
      breaking : "Tezkor",
      shareSuccess : "Nusxa olindi",
      share : "Ulashish",
      viewed : "ko'rildi"
    },
    kr: {
      notFound : "Yангилик топилмади",
      back : "Орқага",
      recommendedNews : "Тавсия этилган янгиликлар",
      breaking : "Тезкор",
      shareSuccess : "Копияланди",
      share : "Улашиш",
      viewed : "кўрилди"
    }
  };
  
  const t = texts[language];
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      const news = await fetchNewsBySlug(parseInt(day), parseInt(month), parseInt(year), slug);
      setArticle(news);
      if (news) {
        const relateds = await fetchRelatedNews(news.id, news.category_id, 3);
        setRelatedNews(relateds);
      }
   // Initialize likes after fetching the article
      setLoading(false);
    };
    fetchData();
    setCurrentImageIndex(0);
    setAutoScroll(true);
  }, [day, month, year, slug]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!autoScroll || !article?.images || article.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === article.images.length - 1 ? 0 : prev + 1));
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [autoScroll, article?.images]);

  if (!article && !loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <p>{t.notFound}</p>
        </div>
      </MainLayout>
    );
  }

  const copyUrl = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title_uz || "Chust 24/7",
          text: article?.title_uz || "Yangiliklarni Chust 24/7 saytidan o'qing",
          url,
        });
      } catch (err) {
        console.error("Share cancelled or failed:", err);
      }
    } else if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      } catch (err) {
        console.error("Clipboard write failed:", err);
      }
    } else {
      // fallback (for older iOS)
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.top = "-999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };


  const handleLike = async (id: string) => { // eslint-disable-next-line react-hooks/exhaustive-deps
    await (liked ? unlikeArticle(id) : likeArticle(id));
    setArticle((prevArticle) => ({
      ...prevArticle,
      likes: liked ? prevArticle.likes - 1 : prevArticle.likes + 1,
    }));
    toggleLike(id); // Update the local state after the API call
    
  };

  const convertToEmbed = (url: string) => {
    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };


  const localDate = article?.date ? new Date(article.date) : null;
  if (localDate) localDate.setHours(localDate.getHours() - 5);

  const timeAgouz = localDate ? format(localDate, 'dd MMMM, HH:mm', { locale: uz }) : '';
  const timeAgokr = localDate ? format(localDate, 'dd MMMM, HH:mm', { locale: uzCyrl }) : '';

  if (loading) {
    return (
      <MainLayout>
        <article className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Back Button Skeleton */}
          <Skeleton className="h-9 w-24 mb-6" />
          
          {/* Article Header Skeleton */}
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

          {/* Images Carousel Skeleton */}
          <Skeleton className="aspect-video mb-6 rounded-lg" />

          {/* Content Text Skeleton */}
          <div className="space-y-3 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Video Skeleton */}
          <Skeleton className="aspect-video mb-6 rounded-lg" />

          {/* Hashtags Skeleton */}
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
      <Helmet>
        <title>{language === "uz" ? article.title_uz : article.title_kr || article.title_uz}</title>

        <meta
          name="description"
          content={
            (language === "uz"
              ? article.content_uz
              : article.content_kr || article.content_uz
            )?.substring(0, 50)
          }
        />

        {article.hashtags?.length > 0 && (
          <meta name="keywords" content={article.hashtags.join(", ")} />
        )}

        <meta
          property="og:title"
          content={language === "uz" ? article.title_uz : article.title_kr || article.title_uz}
        />

        <meta
          property="og:description"
          content={
            (language === "uz"
              ? article.content_uz
              : article.content_kr || article.content_uz
            )?.substring(0, 50)
          }
        />

        <meta property="og:image" content={article.preview || article.images?.[0]} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <article className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{getCategoryName(article.category_id, language)}</Badge>
            {article.isBreaking && (
              <Badge className="bg-breaking text-white">{t.breaking}</Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {language === 'uz' ? article.title_uz : article.title_kr}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {language === 'uz' ? timeAgouz : timeAgokr}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString()} {t.viewed}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={liked ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleLike(article.id);
              }}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
              {article.likes}
            </Button>
            <Button variant="outline" size="sm" onClick={copyUrl} disabled={copied}>
              <Share2 className="h-4 w-4 mr-2"/>
              {copied ? t.shareSuccess : t.share}
            </Button>
          </div>
        </div>

        {/* Article Images Carousel */}
        {article.images && article.images.length > 0 && (
        <div className="mb-6">
          <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
            {/* Peek of previous image */}
            {article.images.length > 1 && (
              <div className="absolute inset-0 flex items-center">
                <img
                  src={article.images[currentImageIndex === 0 ? article.images.length - 1 : currentImageIndex - 1]}
                  alt="Previous"
                  className="absolute left-0 h-full w-1/4 object-cover opacity-30"
                />
              </div>
            )}
            
            {!imagesLoaded[currentImageIndex] && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse z-10" />
            )}
            <img
              src={article.images[currentImageIndex]}
              alt={`${article.title} - ${currentImageIndex + 1}`}
              className={`relative w-full h-full object-cover cursor-pointer transition-opacity duration-300 z-20 ${
                imagesLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImagesLoaded((prev: any) => ({ ...prev, [currentImageIndex]: true }))}
              onError={() => setImagesLoaded((prev: any) => ({ ...prev, [currentImageIndex]: true }))}
              onClick={() => setSelectedImage(currentImageIndex)}
            />
            
            {/* Peek of next image */}
            {article.images.length > 1 && (
              <div className="absolute inset-0 flex items-center">
                <img
                  src={article.images[currentImageIndex === article.images.length - 1 ? 0 : currentImageIndex + 1]}
                  alt="Next"
                  className="absolute right-0 h-full w-1/4 object-cover opacity-30"
                />
              </div>
            )}
            
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
                  {article.images.map((_: any, index: number) => (
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
        )}

        {/* Image Lightbox */}
        {article.images && article.images.length > 0 && selectedImage !== null && (
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

        {/* Article Content */}
        <div className="mb-6">
          <p className="whitespace-pre-line">
          {language === 'uz' ? article.content_uz : article.content_kr}
          </p>
        </div>

        {/* Video */}
        {article.videoUrl && (
          <div className="mb-6 aspect-video">
            <iframe
              src={convertToEmbed(article.videoUrl)}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.hashtags.map((tag) => (
            <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}>
              <Badge variant="outline">#{tag}</Badge>
            </Link>
          ))}
        </div>

        {/* Middle Advertisements */}
        <AdvertisementSection position="middle" language={language} />

        {/* Recommended News */}
        {relatedNews.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">{t.recommendedNews}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <NewsCard key={news.id} article={news} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom Advertisements */}
        <AdvertisementSection position="bottom" language={language} />
      </article>
    </MainLayout>
  );
};

export default SingleNews;

