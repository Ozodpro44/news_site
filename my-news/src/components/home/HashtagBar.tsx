import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { fetchTrendingHashtags } from "@/data/fetchData";
import { TrendingUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext"

export const HashtagBar = () => {
  const { language } = useTheme();
  const [trendingHashtags, setTrendingHashtags] = useState<{ tag: string; count: number }[]>([]);
  
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const tags = await fetchTrendingHashtags();
        if (mounted) setTrendingHashtags(tags);
      } catch (err) {
        console.error('Failed to load trending hashtags', err);
      }
    })();
    return () => { mounted = false };
  }, []);
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
        {trendingHashtags.map((item) => (
          <Link key={item.tag} to={`/search?q=${encodeURIComponent(item.tag)}`}>
            <Badge
              variant="secondary"
              className="whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              #{item.tag} <span className="ml-1 text-xs opacity-70">({item.count})</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};
