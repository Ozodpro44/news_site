# Caching System Guide

## Overview

The news site implements intelligent client-side caching using localStorage to dramatically improve performance. Data is cached with automatic expiration to ensure users get fresh content while maintaining fast load times.

## How It Works

### Cache Strategy
1. **Check Cache First**: Before making an API request, the system checks if cached data exists and is fresh
2. **If Valid**: Use cached data immediately (instant load)
3. **If Expired/Missing**: Fetch from API and cache the result
4. **Automatic Cleanup**: Expired cache is automatically removed when accessed

## Cache Durations

| Data Type | Duration | Use Case |
|-----------|----------|----------|
| Articles | 5 minutes | Main news feed, categories |
| Single Article | 30 minutes | Detail page (doesn't change often) |
| Categories | 1 hour | Navigation menu |
| Weather | 10 minutes | Weather widget |
| Currency | 30 minutes | Currency exchange rates |
| Hashtags | 1 hour | Trending tags |
| Search Results | 5 minutes | Search queries |

## What Gets Cached

### ✅ Automatically Cached
- All articles (main feed, by category, by lenta)
- Single article details (by slug)
- Categories list
- Weather data
- Currency rates
- Trending hashtags
- Search results

### ❌ Not Cached
- User likes/unlikes (real-time updates)
- Individual views count (real-time)
- User-specific data

## Performance Impact

### Before Caching
```
First Load: ~2-3 seconds
Subsequent Loads: ~2-3 seconds
Network requests: Every interaction
```

### After Caching
```
First Load: ~2-3 seconds
Subsequent Loads: <100ms (instant)
Network requests: Only when cache expires
```

## User Experience

### On First Visit
- API requests are made
- Data is cached automatically
- No user action needed

### On Subsequent Visits (Within Cache Duration)
- Cached data loads instantly
- Console shows: `📦 Using cached [data type]`
- No network latency

### When Cache Expires
- Automatic refresh from API
- New data is cached
- Process repeats

## Manual Cache Management

Users can manually clear cache from Settings → Cache Settings:

1. **View Cache Status**: Check what data is currently cached
2. **Clear All Cache**: Remove all cached data to force fresh API requests
3. **Auto Clear**: Cache automatically clears when expired

## Technical Details

### Cache Storage
- **Location**: Browser localStorage
- **Prefix**: `news_cache_`
- **Format**: JSON with timestamp and expiration
- **Max Size**: Browser dependent (~5-10MB)

### Cache Key Format
```
news_cache_[data_type]_[parameters]

Examples:
- news_cache_articles_all
- news_cache_category_abc123_10_0
- news_cache_weather_41.2995_69.2401
- news_cache_search_toshkent
- news_cache_article_2024_1_15_article-slug
```

### Expiration Check
```typescript
if (Date.now() > cache.expiresAt) {
  // Cache is expired, remove it
  clearCache(key);
  // Fetch fresh data from API
}
```

## For Developers

### Using Cache in Components

```typescript
import { getCache, setCache, CACHE_DURATIONS } from '@/lib/cache';

// Check cache
const cached = getCache<ArticleType[]>('my_data');
if (cached) return cached;

// Fetch from API
const data = await fetchFromAPI();

// Save to cache
setCache('my_data', data, CACHE_DURATIONS.ARTICLES);
```

### Cache Helper Functions

```typescript
// Set cache with duration
setCache(key, data, CACHE_DURATIONS.ARTICLES);

// Get cache (returns null if expired)
const data = getCache(key);

// Clear specific cache
clearCache(key);

// Clear all cache
clearAllCache();

// Get cache info
const info = getCacheInfo(key);
// Returns: { cached: boolean, expiresIn: number }
```

### Generate Cache Keys

```typescript
// For paginated data
getPaginationCacheKey('articles', 10, 0);

// For category data
getCategoryCacheKey(categoryId, 10, 0);

// For search data
getSearchCacheKey('query');

// For single article
getArticleCacheKey(day, month, year, slug);
```

## Best Practices

### When Adding New Data
1. Add cache duration to `CACHE_DURATIONS` in `cache.ts`
2. Check cache before API request
3. Save result after successful fetch
4. Handle cache miss gracefully

### Cache Duration Guidelines
- **Real-time data**: 5-10 minutes
- **Frequently changing**: 10-30 minutes
- **Static data**: 1 hour+
- **User content**: Don't cache or very short

### Error Handling
```typescript
// Always provide fallback if cache/API fails
const data = getCache(key) || await fetchAPI() || defaultData;
```

## Monitoring

### Console Logs
Watch the browser console for cache status:
- `📦 Using cached [type]` - Cache hit
- `No log` - API request in progress

### Performance Timeline
1. Monitor Network tab in DevTools
2. Compare first load vs subsequent loads
3. Check Storage tab to see cached data

## Troubleshooting

### Cache Not Working
1. Check if localStorage is enabled in browser
2. Verify cache duration hasn't expired
3. Check browser console for errors
4. Clear cache and retry

### Stale Data
- Reduce cache duration for that data type
- Or use "Clear Cache" button to force refresh

### Storage Full
- Browser will handle it automatically
- Oldest data is removed first
- Clear cache manually if needed

### Testing Cache
```javascript
// In browser console:
localStorage.getItem('news_cache_articles_all')
// Shows cached data if exists

// Clear specific cache
localStorage.removeItem('news_cache_articles_all')
```

## Future Improvements

- [ ] Add cache statistics dashboard
- [ ] Implement selective cache invalidation
- [ ] Add background sync for updates
- [ ] Service Worker integration for offline support
- [ ] IndexedDB for larger datasets

## Related Files

- `src/lib/cache.ts` - Cache utility functions
- `src/data/fetchData.ts` - Data fetching with caching
- `src/components/home/CacheManager.tsx` - Cache UI component
