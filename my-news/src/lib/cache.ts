/**
 * Cache management utility for storing and retrieving data from localStorage
 * with automatic expiration support
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const CACHE_PREFIX = 'news_cache_';

// Cache durations (in milliseconds)
export const CACHE_DURATIONS = {
  ARTICLES: 1000 * 60 * 2, // 2 minutes
  CATEGORIES: 1000 * 60 * 60, // 1 hour
  WEATHER: 1000 * 60 * 10, // 10 minutes
  CURRENCY: 1000 * 60 * 30, // 30 minutes
  HASHTAGS: 1000 * 60 * 60, // 1 hour
  SEARCH: 1000 * 60 * 2, // 2 minutes
  SINGLE_ARTICLE: 1000 * 60 * 10, // 10 minutes
};

/**
 * Set cache with automatic expiration
 */
export function setCache<T>(key: string, data: T, duration: number = CACHE_DURATIONS.ARTICLES): void {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + duration,
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch (error) {
    console.warn('Failed to set cache:', error);
  }
}

/**
 * Get cache if it exists and hasn't expired
 */
export function getCache<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    
    // Check if expired
    if (Date.now() > entry.expiresAt) {
      clearCache(key);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.warn('Failed to get cache:', error);
    return null;
  }
}

/**
 * Clear specific cache entry
 */
export function clearCache(key: string): void {
  try {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}

/**
 * Clear all cache entries
 */
export function clearAllCache(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to clear all cache:', error);
  }
}

/**
 * Get cache info for debugging
 */
export function getCacheInfo(key: string): { cached: boolean; expiresIn: number } | null {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const entry = JSON.parse(cached);
    const expiresIn = entry.expiresAt - Date.now();

    return {
      cached: expiresIn > 0,
      expiresIn: Math.max(0, expiresIn),
    };
  } catch (error) {
    return null;
  }
}

/**
 * Generate cache key for paginated requests
 */
export function getPaginationCacheKey(baseKey: string, limit?: number, offset?: number): string {
  if (!limit && !offset) return baseKey;
  return `${baseKey}_${limit || 'all'}_${offset || 0}`;
}

/**
 * Generate cache key for category-based requests
 */
export function getCategoryCacheKey(categoryId: string, limit?: number, offset?: number): string {
  return getPaginationCacheKey(`category_${categoryId}`, limit, offset);
}

/**
 * Generate cache key for search requests
 */
export function getSearchCacheKey(query: string): string {
  return `search_${query.toLowerCase().replace(/\s+/g, '_')}`;
}

/**
 * Generate cache key for single article
 */
export function getArticleCacheKey(day: number, month: number, year: number, slug: string): string {
  return `article_${year}_${month}_${day}_${slug}`;
}
