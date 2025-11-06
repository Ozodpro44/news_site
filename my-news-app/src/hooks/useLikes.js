import { useState, useEffect } from "react";

export const useLikes = () => {
  const [likedArticles, setLikedArticles] = useState(() => {
    const saved = localStorage.getItem("liked-articles");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("liked-articles", JSON.stringify(Array.from(likedArticles)));
  }, [likedArticles]);

  const toggleLike = (articleId) => {
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

  const isLiked = (articleId) => likedArticles.has(articleId);

  return { likedArticles, toggleLike, isLiked };
};
