import { Link } from "react-router-dom";
import { Heart, Eye, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewsArticle } from "@/data/mockNews";
import { useLikes } from "@/hooks/useLikes";
import { formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";

export const NewsCard = ({ article, variant = "default" }) => {
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(article.id);

  const timeAgo = formatDistanceToNow(new Date(article.date), {
    addSuffix: true,
    locale: uz,
  });

  if (variant === "horizontal") {
    return (
      <Card className="overflow-hidden card-hover">
        <div className="flex flex-col sm:flex-row">
          <Link to={`/news/${article.id}`} className="sm:w-1/3">
            <img
              src={article.images[0]}
              alt={article.title}
              className="w-full h-48 sm:h-full object-cover"
            />
          </Link>
          <div className="p-4 sm:w-2/3 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{article.category}</Badge>
              {article.isBreaking && (
                <Badge className="bg-breaking text-white">Tezkor</Badge>
              )}
            </div>
            <Link to={`/news/${article.id}`}>
              <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {article.summary}
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
                  toggleLike(article.id);
                }}
                className="ml-auto"
              >
                <Heart
                  className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
                />
                <span className="ml-1">{article.likes}</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden card-hover">
        <Link to={`/news/${article.id}`}>
          <img
            src={article.images[0]}
            alt={article.title}
            className="w-full h-40 object-cover"
          />
        </Link>
        <div className="p-3">
          <Badge variant="secondary" className="mb-2">
            {article.category}
          </Badge>
          <Link to={`/news/${article.id}`}>
            <h4 className="font-semibold text-sm mb-2 hover:text-primary transition-colors line-clamp-2">
              {article.title}
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
                toggleLike(article.id);
              }}
            >
              <Heart
                className={`h-3 w-3 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden card-hover animate-fade-in">
      <Link to={`/news/${article.id}`}>
        <div className="relative">
          <img
            src={article.images[0]}
            alt={article.title}
            className="w-full h-56 object-cover"
          />
          {article.isBreaking && (
            <Badge className="absolute top-3 right-3 bg-breaking text-white">
              Tezkor
            </Badge>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
        </div>
        <Link to={`/news/${article.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {article.summary}
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
              toggleLike(article.id);
            }}
          >
            <Heart
              className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="ml-1">{article.likes}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
