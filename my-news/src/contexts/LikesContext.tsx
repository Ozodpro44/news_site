import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LikesContextType {
  likedArticles: Set<string>;
  toggleLike: (articleId: string) => void;
  isLiked: (articleId: string) => boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export const LikesProvider = ({ children }: { children: ReactNode }) => {
  const [likedArticles, setLikedArticles] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("liked-articles");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("liked-articles", JSON.stringify(Array.from(likedArticles)));
  }, [likedArticles]);

  const toggleLike = (articleId: string) => {
    setLikedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const isLiked = (articleId: string) => likedArticles.has(articleId);

  return (
    <LikesContext.Provider value={{ likedArticles, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within LikesProvider");
  }
  return context;
};
