import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { trendingHashtags } from "@/data/mockNews";

export const HashtagBar = () => {
  return (
    <div className="py-4">
      <h3 className="font-semibold mb-3">Trendda</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {trendingHashtags.map((tag) => (
          <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}>
            <Badge
              variant="secondary"
              className="whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default HashtagBar;
