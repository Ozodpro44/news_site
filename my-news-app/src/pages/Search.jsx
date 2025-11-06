import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/news/NewsCard";
import { Badge } from "@/components/ui/badge";
import { mockNews } from "@/data/mockNews";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function Search() {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("search-history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      addToHistory(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const addToHistory = (term) => {
    if (!term.trim()) return;
    setSearchHistory((prev) => {
      const newHistory = [term, ...prev.filter((t) => t !== term)].slice(0, 10);
      localStorage.setItem("search-history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      setSearchParams({ q: query });
      addToHistory(query);
      setTimeout(() => setLoading(false), 600);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("search-history");
  };

  const results = query.trim()
    ? mockNews.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.summary.toLowerCase().includes(query.toLowerCase()) ||
          article.hashtags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      )
    : [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6">Qidirish</h1>

          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Yangiliklar, mavzular yoki hashtaglar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 h-12 text-lg"
              autoFocus
            />
          </form>

          {/* Search History */}
          {!query && searchHistory.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Qidiruv tarixi</h3>
                <Button variant="ghost" size="sm" onClick={clearHistory}>
                  <X className="h-4 w-4 mr-1" />
                  Tozalash
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
              {results.length} ta natija topildi "{query}" uchun
            </p>

            {loading ? (
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
            ) : results.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Afsuski, hech narsa topilmadi
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Search;
