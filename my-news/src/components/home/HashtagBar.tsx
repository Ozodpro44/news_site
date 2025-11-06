import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { trendingHashtags } from "@/data/mockNews";
import { TrendingUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext"

export const HashtagBar = () => {
  const { language } = useTheme();
  const texts = {
    uz: {
      trend: "Trendda",
    },
    kr: {
      trend: "Трендда"
    }
  }
  const t = texts[language];

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">{t.trend}</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {trendingHashtags.map((tag) => (
          <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}>
            <Badge
              variant="secondary"
              className="whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              #{tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};
