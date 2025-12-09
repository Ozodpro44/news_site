import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; // Keep Skeleton import
import { NewsCard } from "@/components/news/NewsCard";
import { Badge } from "@/components/ui/badge";
import { search } from "@/data/fetchData";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const Search = () => {
  const { language } = useTheme();
  window.scrollTo(0, 0);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("search-history");
    return saved ? JSON.parse(saved) : [];
  });

  const texts = {
    uz: {
      search: "Qidirish",
      searchPlaceholder: "Yangiliklar, mavzular yoki hashtaglar...",
      searchResults: 'natija topildi',
      for: "uchun",
      noResults: "Afsuski, hech narsa topilmadi",
      searchHistory: "Qidiruv tarixi",
      clear: "Tozalash",
    },
    kr: {
      search: "Қидириш",
      searchPlaceholder: "Янгиликлар, мавзулар ёки хештеглар...",
      searchResults: 'натижа топилди',
      for: "учун",
      noResults: "Афсуски, ҳеч нарса топилмади",
      searchHistory: "Қидирув тарихи",
      clear: "Тозалаш",
    }
  };

  const t = texts[language];

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q); // Update query state from URL
      setLoading(true);
      searchNews(q); // Call searchNews with the query from URL
    }
    else setLoading(false); // If no query, set loading to false
  }, [searchParams]);

  const searchNews = async (q: string) => {
    const res = await search(q, 10); // Use the passed query 'q'
    if (res) {
      addToHistory(q);
      setSearchResults(res);
      setLoading(false);
    }
  };

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    setSearchHistory((prev) => {
      const newHistory = [term, ...prev.filter((t) => t !== term)].slice(0, 10);
      localStorage.setItem("search-history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      setLoading(true); // Set loading to true immediately on search
      searchNews(query.trim()); // Trigger search
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // if (newQuery.trim() && searchParams.get("q") !== newQuery) {
    //   setSearchParams({ q: newQuery });
    // } else {
    //   setSearchParams({}); // Clear search params if query is empty
    // }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("search-history");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6">{t.search}</h1>
          
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={query}
              onChange={handleInputChange}
              className="pl-10 pr-4 h-12 text-lg"
              autoFocus
            />
          </form>

          {/* Search History */}
          {!query && searchHistory.length > 0 &&(
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{t.searchHistory}</h3>
                <Button variant="ghost" size="sm" onClick={clearHistory}>
                  <X className="h-4 w-4 mr-1" />
                  {t.clear}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((term, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setQuery(term);
                      setSearchParams({ q: term });
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {query && (
          <div>
            <p className="text-muted-foreground mb-6">
              {searchResults.length} {t.searchResults}
            </p>
            
            {loading && query ? ( // Only show skeleton if loading and there's a query
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t.noResults}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
