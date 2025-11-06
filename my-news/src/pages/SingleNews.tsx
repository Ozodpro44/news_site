import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/news/NewsCard";
import { fetchNewsById, fetchRelatedNews, likeArticle, unlikeArticle } from "@/data/fetchData";
import { ArrowLeft, Heart, Eye, Clock } from "lucide-react";
import { useLikes } from "@/hooks/useLikes"; // import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";
import { AdBlock } from "@/components/home/AdBlock";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
// import { useToast } from "@/hooks/use-toast";

const SingleNews = () => {
  const { language} = useTheme();
  window.scrollTo(0, 0);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const { isLiked, toggleLike } = useLikes();
  const [article, setArticle] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([])
  const liked = isLiked(article?.id);
  const [copied, setCopied] = useState(false);
  const texts = {
    uz: {
      notFound : "Yangilik topilmadi",
      back : "Orqaga",
      recommendedNews : "Tavsiya etilgan yangiliklar",
      breaking : "Tezkor",
      shareSuccess : "Nusxa olindi",
      share : "Ulashish",
    },
    kr: {
      notFound : "Yангилик топилмади",
      back : "Орқага",
      recommendedNews : "Тавсия этилган янгиликлар",
      breaking : "Тезкор",
      shareSuccess : "Копияланди",
      share : "Улашиш",
    }
  };
  
  const t = texts[language];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const news = await fetchNewsById(id);
      setArticle(news);
      if (news) {
        const relateds = await fetchRelatedNews(news.id, news.category, 3);
        setRelatedNews(relateds);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

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
          title: article?.title || "Chust 24/7",
          text: article?.title || "Yangiliklarni Chust 24/7 saytidan o'qing",
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
    toggleLike(id); // Update the local state after the API call
    // Optionally, refetch the article to update like count
    fetchNewsById(id).then((news) => setArticle(news));
  };

  const timeAgo = article?.date ? formatDistanceToNow(new Date(article.date), { addSuffix: true, locale: uz }) : '';

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
            {t.back}
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            {article.isBreaking && (
              <Badge className="bg-breaking text-white">{t.breaking}</Badge>
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
              onClick={(e) => {
                e.preventDefault();
                handleLike(article.id);
              }}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
              {article.likes}
            </Button>
            <Button variant="outline" size="sm" onClick={copyUrl} disabled={copied}>
              {copied ? t.shareSuccess : t.share}
            </Button>
          </div>
        </div>

        {/* Article Images */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {article.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${article.title} - ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>

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
        <div className="mb-6">
          <p className="whitespace-pre-line">
          {article.content}
          </p>
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.hashtags.map((tag) => (
            <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}>
              <Badge variant="outline">#{tag}</Badge>
            </Link>
          ))}
        </div>

        {/* Ad */}
        {/* <div className="mb-12">
          <AdBlock variant="horizontal" />
        </div> */}

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
      </article>
    </MainLayout>
  );
};

export default SingleNews;
