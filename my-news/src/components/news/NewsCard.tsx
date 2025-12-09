  import { Link } from "react-router-dom";
  import { useState } from "react";
  import { Heart, Eye, Clock, ImageOff } from "lucide-react";
  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { NewsArticle, likeArticle, unlikeArticle } from "@/data/fetchData";
  import { useLikes } from "@/hooks/useLikes";
  import { useCategories } from "@/contexts/CategoriesContext";
  import { useTheme } from "@/contexts/ThemeContext";
  import { format, formatDate } from "date-fns";
  import { uz, uzCyrl } from "date-fns/locale";
  import { t } from "@/lib/translations";
  // import { useTheme } from "@/contexts/ThemeContext";

  const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23999' text-anchor='middle' dy='.3em'%3EImage not available%3C/text%3E%3C/svg%3E";

  const getImageSrc = (preview: string | null, images: string[] | undefined): string => {
    if (preview) return preview;
    if (images && images.length > 0) return images[0];
    return PLACEHOLDER_IMAGE;
  };

  interface NewsCardProps {
    article: NewsArticle;
    variant?: "default" | "horizontal" | "compact";
  }

  export const NewsCard = ({ article, variant = "default" }: NewsCardProps) => {
    const { isLiked, toggleLike } = useLikes();
    const [currentArticle, setCurrentArticle] = useState(article);
    const { getCategoryName } = useCategories();
    const { language } = useTheme();
    const liked = isLiked(currentArticle.id);
    const categoryName = getCategoryName(currentArticle.category_id, language); 
    const localDate = article?.date ? new Date(currentArticle.date) : null;
    if (localDate) localDate.setHours(localDate.getHours() - 5 );
    const timeAgouz = localDate ? format(localDate, 'dd MMMM, HH:mm', { locale: uz }) : '';
    const timeAgokr = localDate ? format(localDate, 'dd MMMM, HH:mm', { locale: uzCyrl }) : '';
    
    const breakingText = t('breaking', language);
    
    const handleLike = async (id: string) => {
      try {
        setCurrentArticle((prevArticle) => ({
          ...prevArticle,
          likes: liked ? prevArticle.likes - 1 : prevArticle.likes + 1,
        }));
        (liked ? unlikeArticle(id) : likeArticle(id));
        toggleLike(id);
      } catch (err) {
        console.error('Failed to toggle like', err);
      }
    }; 

    if (variant === "horizontal") {
      return (
        <Card className="overflow-hidden card-hover p-0">
          <div className="flex flex-col sm:flex-row">
            <Link to={`/news/${format(new Date(article.date), 'dd/MM/yyyy')}/${article.slug}`} className="sm:w-1/3">
               <img
                 src={getImageSrc(article.preview, article.images)}
                 alt={language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
                 className="w-full h-48 sm:h-full object-cover"
               />
             </Link>
            <CardContent className="p-4 sm:w-2/3 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{categoryName}</Badge>
                {article.isBreaking && (
                  <Badge className="bg-breaking text-white">{breakingText}</Badge>
                )}
              </div>
              <Link to={`/news/${format(new Date(article.date), 'dd/MM/yyyy')}/${article.slug}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                  {language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {language === 'uz' ? article.content_uz.padEnd(50, ".") : article.content_kr?.padEnd(50, ".") || article.content_uz.padEnd(50, ".")}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {language === 'uz' ? timeAgouz : timeAgokr}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views.toLocaleString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLike(article.id);
                  }}
                  className="ml-auto"
                >
                  <Heart
                    className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span className="ml-1">{currentArticle.likes}</span>
                </Button>
              </div> 
            </CardContent>
          </div>
        </Card>
      );
    }

    if (variant === "compact") {
      return (
        <Card className="overflow-hidden card-hover p-0">
        <Link to={`/news/${format(new Date(article.date), 'dd/MM/yyyy')}/${article.slug}`}>
         <img
         src={getImageSrc(article.preview, article.images)}
         alt={language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
         className="w-full h-40 object-cover"
         />
         </Link>
          <CardContent className="p-3">
            <Badge variant="secondary" className="mb-2">
              {categoryName}
            </Badge>
            <Link to={`/news/${format(new Date(article.date), 'dd/MM/yyyy')}/${article.slug}`}>
              <h4 className="font-semibold text-sm mb-2 hover:text-primary transition-colors line-clamp-2">
                {language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
              </h4>
            </Link>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {article.views.toLocaleString()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(article.id);
                }}
              >
                <Heart
                  className={`h-3 w-3 ${liked ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
            </div> 
          </CardContent>
        </Card>
      );
    }

    return ( 
      <Card className="overflow-hidden card-hover animate-fade-in">
        <Link to={`/news/${format(new Date(article.date), 'dd/MM/yyyy')}/${article.slug}`}>
          <div className="relative">
            <img
              src={getImageSrc(article.preview, article.images)}
              alt={language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
              className="w-full h-56 object-cover"
            />
            {article.isBreaking && (
              <Badge className="absolute top-3 right-3 bg-breaking text-white">
                {breakingText}
              </Badge>
            )}
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{categoryName}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {language === 'uz' ? timeAgouz : timeAgokr}
            </span>
          </div>
          <Link to={`/news/${format(new Date(article.date), 'dd/MM/yyyy')}/${article.slug}`}>
            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
              {language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
            {language === 'uz' ? article.content_uz.padEnd(50, ".") : article.content_kr?.padEnd(100, ".") || article.content_uz.padEnd(50, ".")}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {article.hashtags.slice(0, 3).map((tag) => (
              <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString()}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleLike(article.id);
              }}
            >
              <Heart
                className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="ml-1">{currentArticle.likes}</span>
            </Button>
          </div> 
        </CardContent>
      </Card>
    );
  };
