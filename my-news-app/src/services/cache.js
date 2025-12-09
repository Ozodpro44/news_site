/**
 * Cache Manager Service
 * Handles caching of API responses with TTL (Time To Live)
 * 
 * Usage:
 * - cache.set('articles', data, 10) // cache for 10 minutes
 * - cache.get('articles') // returns cached data if valid, null otherwise
 * - cache.clear('articles') // clear specific cache
 * - cache.clearAll() // clear all caches
 */

const DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Set cache with TTL
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} ttlMinutes - Time to live in minutes (default: 10)
   */
  set(key, data, ttlMinutes = 10) {
    const ttl = ttlMinutes * 60 * 1000;
    const expiresAt = Date.now() + ttl;

    this.cache.set(key, {
      data,
      expiresAt,
      createdAt: Date.now(),
    });

    // Auto-cleanup expired cache
    this.scheduleCleanup(key, ttl);
  }

  /**
   * Get cache if valid
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if expired/not found
   */
  get(key) {
    const cached = this.cache.get(key);

    if (!cached) {
      return null;
    }

    // Check if expired
    if (Date.now() > cached.expiresAt) {
      this.clear(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Check if cache exists and is valid
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Clear specific cache
   * @param {string} key - Cache key
   */
  clear(key) {
    this.cache.delete(key);
  }

  /**
   * Clear all caches
   */
  clearAll() {
    this.cache.clear();
  }

  /**
   * Get cache info (for debugging)
   * @param {string} key - Cache key
   * @returns {object|null}
   */
  getInfo(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const expiresIn = cached.expiresAt - Date.now();
    const isExpired = expiresIn <= 0;

    return {
      key,
      createdAt: new Date(cached.createdAt).toISOString(),
      expiresAt: new Date(cached.expiresAt).toISOString(),
      expiresInSeconds: Math.floor(expiresIn / 1000),
      isExpired,
      dataType: typeof cached.data,
    };
  }

  /**
   * Get all cache keys
   * @returns {string[]}
   */
  getKeys() {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache statistics
   * @returns {object}
   */
  getStats() {
    const keys = this.getKeys();
    const validCaches = keys.filter(k => this.has(k));

    return {
      totalCaches: this.cache.size,
      validCaches: validCaches.length,
      expiredCaches: this.cache.size - validCaches.length,
      cacheKeys: keys,
    };
  }

  /**
   * Schedule cleanup for expired cache
   * @private
   */
  scheduleCleanup(key, ttl) {
    setTimeout(() => {
      if (this.cache.has(key)) {
        const cached = this.cache.get(key);
        if (Date.now() > cached.expiresAt) {
          this.clear(key);
        }
      }
    }, ttl + 100); // Add small buffer
  }

  /**
   * Update existing cache without changing TTL
   * @param {string} key - Cache key
   * @param {any} data - New data
   */
  update(key, data) {
    const cached = this.cache.get(key);
    if (cached && Date.now() <= cached.expiresAt) {
      cached.data = data;
      cached.createdAt = Date.now();
    }
  }

  /**
   * Extend TTL of existing cache
   * @param {string} key - Cache key
   * @param {number} additionalMinutes - Minutes to add
   */
  extend(key, additionalMinutes = 5) {
    const cached = this.cache.get(key);
    if (cached) {
      cached.expiresAt += additionalMinutes * 60 * 1000;
    }
  }
}

// Export singleton instance
export const cache = new CacheManager();

export default cache;
