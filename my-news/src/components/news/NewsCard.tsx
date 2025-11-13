  import { Link } from "react-router-dom";
  import { useState } from "react";
  import { Heart, Eye, Clock } from "lucide-react";
  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { NewsArticle, likeArticle, unlikeArticle } from "@/data/fetchData";
  import { useLikes } from "@/hooks/useLikes";
  import { useCategories } from "@/contexts/CategoriesContext";
  import { useTheme } from "@/contexts/ThemeContext";
  import { formatDistanceToNow, format } from "date-fns";
  import { uz } from "date-fns/locale";
  // import { useTheme } from "@/contexts/ThemeContext";

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
    const localDate = new Date(currentArticle.date);
    localDate.setHours(localDate.getHours() - 10);

    const timeAgo = formatDistanceToNow(new Date(currentArticle.date), {
      addSuffix: true,
      locale: uz,
    });
    
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
                src={article.preview || article.images[0]}
                alt={language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
                className="w-full h-48 sm:h-full object-cover"
              />
            </Link>
            <CardContent className="p-4 sm:w-2/3 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{categoryName}</Badge>
                {article.isBreaking && (
                  <Badge className="bg-breaking text-white">Tezkor</Badge>
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
                  {timeAgo}
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
        src={article.preview || article.images[0]}
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
              src={article.preview || article.images[0]}
              alt={language === 'uz' ? article.title_uz : article.title_kr || article.title_uz}
              className="w-full h-56 object-cover"
            />
            {article.isBreaking && (
              <Badge className="absolute top-3 right-3 bg-breaking text-white">
                Tezkor
              </Badge>
            )}
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{categoryName}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
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
