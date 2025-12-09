import { cache } from './cache';
import { mockNews, categories } from '@/data/mockNews';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://newsbackend-production-7d1f.up.railway.app';
const CACHE_TTL = 10; // 10 minutes

/**
 * News API Service with built-in caching
 */
class NewsApiService {
  /**
   * Get all articles with caching
   */
  async getArticles() {
    const cacheKey = 'articles_all';
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // Try to fetch from backend
      const response = await fetch(`${API_BASE_URL}/viewer/articles`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        cache.set(cacheKey, data, CACHE_TTL);
        return data;
      }
    } catch (error) {
      console.error('Failed to fetch articles from API, using mock data:', error);
    }

    // Fallback to mock data
    cache.set(cacheKey, mockNews, CACHE_TTL);
    return mockNews;
  }

  /**
   * Get single article by ID with caching
   */
  async getArticleById(id) {
    const cacheKey = `article_${id}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/viewer/articles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        cache.set(cacheKey, data, CACHE_TTL);
        return data;
      }
    } catch (error) {
      console.error(`Failed to fetch article ${id} from API, using mock data:`, error);
    }

    // Fallback to mock data
    const article = mockNews.find(a => a.id === id);
    if (article) {
      cache.set(cacheKey, article, CACHE_TTL);
      return article;
    }

    return null;
  }

  /**
   * Search articles with caching
   */
  async searchArticles(query) {
    const cacheKey = `search_${query.toLowerCase()}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/viewer/articles/search?q=${encodeURIComponent(query)}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.ok) {
        const data = await response.json();
        cache.set(cacheKey, data, CACHE_TTL);
        return data;
      }
    } catch (error) {
      console.error('Failed to search articles from API, using mock data:', error);
    }

    // Fallback to mock data search
    const results = mockNews.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase())
    );
    
    cache.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  /**
   * Get articles by category with caching
   */
  async getArticlesByCategory(categorySlug) {
    const cacheKey = `articles_category_${categorySlug}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/viewer/articles/category/${categorySlug}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.ok) {
        const data = await response.json();
        cache.set(cacheKey, data, CACHE_TTL);
        return data;
      }
    } catch (error) {
      console.error(`Failed to fetch category ${categorySlug} from API, using mock data:`, error);
    }

    // Fallback to mock data
    const results = mockNews.filter(a => a.category === categorySlug);
    cache.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  /**
   * Get all categories with caching
   */
  async getCategories() {
    const cacheKey = 'categories_all';
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/viewer/categories`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        cache.set(cacheKey, data, CACHE_TTL);
        return data;
      }
    } catch (error) {
      console.error('Failed to fetch categories from API, using mock data:', error);
    }

    // Fallback to mock data
    cache.set(cacheKey, categories, CACHE_TTL);
    return categories;
  }

  /**
   * Invalidate specific cache
   */
  invalidateCache(cacheKey) {
    cache.clear(cacheKey);
  }

  /**
   * Invalidate article caches (after like, comment, etc)
   */
  invalidateArticleCache(articleId) {
    cache.clear(`article_${articleId}`);
    cache.clear('articles_all');
    cache.clear('articles_category_*'); // Should clear all category caches
  }

  /**
   * Invalidate all caches
   */
  invalidateAllCaches() {
    cache.clearAll();
  }

  /**
   * Get cache stats (for debugging)
   */
  getCacheStats() {
    return cache.getStats();
  }

  /**
   * Get specific cache info (for debugging)
   */
  getCacheInfo(cacheKey) {
    return cache.getInfo(cacheKey);
  }
}

// Export singleton instance
export const newsApi = new NewsApiService();

export default newsApi;
