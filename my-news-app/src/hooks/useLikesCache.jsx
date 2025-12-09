import { useState, useEffect, useCallback } from 'react';
import { cache } from '@/services/cache';

const LIKES_CACHE_KEY = 'user_liked_articles';
const LIKES_CACHE_TTL = 10; // 10 minutes

/**
 * Hook for managing liked articles with caching
 * Caches user's liked articles for 10 minutes
 * 
 * @returns {object} { isLiked, toggleLike, likedArticles, clearLikes }
 */
export const useLikesCache = () => {
  const [likedArticles, setLikedArticles] = useState(new Set());

  // Initialize from cache or localStorage
  useEffect(() => {
    // Check cache first (fresh data)
    let cachedLikes = cache.get(LIKES_CACHE_KEY);
    
    // Fall back to localStorage for persistence
    if (!cachedLikes) {
      const stored = localStorage.getItem(LIKES_CACHE_KEY);
      cachedLikes = stored ? JSON.parse(stored) : [];
    }

    setLikedArticles(new Set(cachedLikes));
  }, []);

  // Sync to cache and localStorage whenever likes change
  useEffect(() => {
    const likesArray = Array.from(likedArticles);
    
    // Update cache
    cache.set(LIKES_CACHE_KEY, likesArray, LIKES_CACHE_TTL);
    
    // Update localStorage for persistence
    localStorage.setItem(LIKES_CACHE_KEY, JSON.stringify(likesArray));
  }, [likedArticles]);

  const isLiked = useCallback((articleId) => {
    return likedArticles.has(String(articleId));
  }, [likedArticles]);

  const toggleLike = useCallback((articleId) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      const idStr = String(articleId);
      
      if (newSet.has(idStr)) {
        newSet.delete(idStr);
      } else {
        newSet.add(idStr);
      }
      
      return newSet;
    });
  }, []);

  const addLike = useCallback((articleId) => {
    setLikedArticles(prev => new Set([...prev, String(articleId)]));
  }, []);

  const removeLike = useCallback((articleId) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      newSet.delete(String(articleId));
      return newSet;
    });
  }, []);

  const clearLikes = useCallback(() => {
    setLikedArticles(new Set());
    cache.clear(LIKES_CACHE_KEY);
    localStorage.removeItem(LIKES_CACHE_KEY);
  }, []);

  const getLikesCount = useCallback(() => {
    return likedArticles.size;
  }, [likedArticles]);

  return {
    isLiked,
    toggleLike,
    addLike,
    removeLike,
    likedArticles: Array.from(likedArticles),
    clearLikes,
    likesCount: getLikesCount(),
  };
};

export default useLikesCache;
