import { useQuery } from "@tanstack/react-query";
import { getCache, setCache, CACHE_DURATIONS, getPaginationCacheKey, getCategoryCacheKey, getSearchCacheKey, getArticleCacheKey } from "@/lib/cache";

const API_BASE = (import.meta as any).env.VITE_API_URL || 'https://newsbackend-production-7d1f.up.railway.app';

// Backend API types
export type ApiImage = {
  id: string;
  url: string;
  article_id?: string;
};

export type ApiArticle = {
  id: string;
  slug: string;
  title_uz: string;
  title_kr: string;
  content_uz: string;
  content_kr: string;
  category_id: string;
  views: number;
  preview: string;
  images?: ApiImage[];
  hashtags?: string[];
  video_url?: string;
  likes?: number;
  is_breaking?: boolean;
  is_trending?: boolean;
  created_at: string;
  updated_at?: string;
};

export type ApiCategory = {
  id: string;
  slug?: string;
  name_uz: string;
  name_kr: string;
  color?: string;
  articlesCount?: number;
  created_at?: string;
  updated_at?: string;
};

export interface NewsArticle {
  id: string;
  slug?: string;
  title_uz: string;
  title_kr?: string;
  content_uz: string;
  content_kr?: string;
  category_id: string;
  preview: string;
  images: string[];
  videoUrl?: string;
  date: string;
  views: number;
  likes: number;
  hashtags: string[];
  isBreaking?: boolean;
  isTrending?: boolean;
  created_at?: string;
}

// Transform API article to NewsArticle format
function transformArticle(apiArticle: ApiArticle): NewsArticle {
  return {
    id: apiArticle.id,
    slug: apiArticle.slug,
    title_uz: apiArticle.title_uz,
    title_kr: apiArticle.title_kr,
    content_uz: apiArticle.content_uz,
    content_kr: apiArticle.content_kr,
    category_id: apiArticle.category_id,
    preview: apiArticle.preview,
    images: apiArticle.images?.map(img => img.url) || [],
    videoUrl: apiArticle.video_url,
    date: apiArticle.created_at,
    views: apiArticle.views || 0,
    likes: apiArticle.likes || 0,
    hashtags: apiArticle.hashtags || [],
    isBreaking: apiArticle.is_breaking,
    isTrending: apiArticle.is_trending,
    created_at: apiArticle.created_at
  };
}

async function request<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(API_BASE + path, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`);
  }
  return (await res.json()) as T;
}

export async function fetchNews(): Promise<NewsArticle[]> {
  const cacheKey = 'articles_all';
  
  // Check cache first
  const cached = getCache<NewsArticle[]>(cacheKey);
  if (cached) {
    console.log('📦 Using cached articles');
    return cached;
  }

  // Fetch from API
  const articles = await request<ApiArticle[]>(`/viewer/articles`);
  const transformed = articles.map(article => transformArticle(article));
  
  // Cache the result
  setCache(cacheKey, transformed, CACHE_DURATIONS.ARTICLES);
  
  return transformed;
}

export async function fetchNewsByCategory(
  categoryId: string,
  limit?: number,
  offset?: number
): Promise<NewsArticle[]> {
  const cacheKey = getCategoryCacheKey(categoryId, limit, offset);
  
  // Check cache first
  const cached = getCache<NewsArticle[]>(cacheKey);
  if (cached) {
    console.log(`📦 Using cached category articles: ${categoryId}`);
    return cached;
  }

  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());

  const articles = await request<ApiArticle[]>(`/viewer/articles/category/${categoryId}?${params.toString()}`);
  const transformed = articles.map(article => transformArticle(article));
  
  // Cache the result
  setCache(cacheKey, transformed, CACHE_DURATIONS.ARTICLES);
  
  return transformed;
}

export async function fetchNewsById(id: string): Promise<NewsArticle | undefined> {
  try {
    const article = await request<ApiArticle>(`/viewer/articles/id/${id}`);
    // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
    return transformArticle(article);
  } catch (err) {
    console.error('Failed to fetch article', err);
    return undefined;
  }
}

export async function fetchNewsBySlug(day: number, month: number, year: number, slug: string): Promise<NewsArticle | undefined> {
  try {
    const cacheKey = getArticleCacheKey(day, month, year, slug);
    
    // Check cache first
    const cached = getCache<NewsArticle>(cacheKey);
    if (cached) {
      console.log(`📦 Using cached article: ${slug}`);
      return cached;
    }

    const article = await request<ApiArticle>(`/viewer/articles/${day}/${month}/${year}/${slug}`);
    const transformed = transformArticle(article);
    
    // Cache the result
    setCache(cacheKey, transformed, CACHE_DURATIONS.SINGLE_ARTICLE);
    
    return transformed;
  } catch (err) {
    console.error('Failed to fetch article by slug', err);
    return undefined;
  }
}

export async function fetchBreakingNews(limit?: number): Promise<NewsArticle[]> {
  const articles = await request<ApiArticle[]>(`/viewer/articles`);
  let breakingNews = articles.filter((article) => article.is_breaking);
  
  if (limit) {
    breakingNews = breakingNews.slice(0, limit);
  }
  
  // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
  return breakingNews.map(article => transformArticle(article));
}

export async function fetchTrendingNews(limit?: number): Promise<NewsArticle[]> {
  const articles = await request<ApiArticle[]>(`/viewer/articles`);
  let trendingNews = articles.filter((article) => article.is_trending);
  
  if (limit) {
    trendingNews = trendingNews.slice(0, limit);
  }
  
  // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
  return trendingNews.map(article => transformArticle(article));
}

export async function fetchRelatedNews(
  currentArticleId: string,
  category: string,
  limit: number = 3
): Promise<NewsArticle[]> {
  try {
    const articles = await request<ApiArticle[]>(
      `/viewer/articles/related?article_id=${currentArticleId}&category_id=${category}&limit=${limit}`
    );
    // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
    return articles.map(article => transformArticle(article));
  } catch (err) {
    console.error('Failed to fetch related articles', err);
    return [];
  }
}

export async function likeArticle(id: string): Promise<void> {
  await request(`/viewer/articles/like/${id}`, { method: 'POST' });
}

export async function unlikeArticle(id: string): Promise<void> {
  await request(`/viewer/articles/unlike/${id}`, { method: 'POST' });
}

export async function fetchWeather(
  lat?: number,
  lon?: number
): Promise<{
  temp: number;
  condition: string;
  humidity: number;
  icon: string;
  city: string;
  wind: number;
}> {
  const cacheKey = `weather_${lat || '41.2995'}_${lon || '69.2401'}`;
  
  // Check cache first
  const cached = getCache<{
    temp: number;
    condition: string;
    humidity: number;
    icon: string;
    city: string;
    wind: number;
  }>(cacheKey);
  if (cached) {
    console.log('📦 Using cached weather');
    return cached;
  }

  try {
    const coords = lat && lon ? `?lat=${lat}&lon=${lon}` : "?lat=41.2995&lon=69.2401";

    const data = await request<any>(`/viewer/weather${coords}`);

    const current = data.current_condition?.[0];
    const city = data.nearest_area?.[0];

    if (current) {
      const parsed = {
        temp: parseInt(current.temp_C || "0"),
        condition: current.weatherDesc?.[0]?.value || "Unknown",
        humidity: parseInt(current.humidity || "0"),
        icon: current.weatherCode || "113",
        city: city?.areaName?.[0]?.value || "Unknown",
        wind: parseInt(current.windspeedKmph || "0"),
      };

      // Cache the result
      setCache(cacheKey, parsed, CACHE_DURATIONS.WEATHER);
      
      return parsed;
    }

    throw new Error("Invalid weather data");
  } catch (err) {
    console.error("Failed to fetch weather", err);
    return {
      temp: 20,
      condition: "Quyoshli",
      humidity: 20,
      icon: "Sun",
      city: "Tashkent",
      wind: 2,
    };
  }
}


// Weather condition translations
const WEATHER_TRANSLATIONS: Record<string, Record<'uz' | 'kr', string>> = {
  'Sunny': { uz: 'Quyoshli', kr: 'Қуёшли' },
  'Clear': { uz: 'Tiniq', kr: 'Тинож' },
  'Partly cloudy': { uz: 'Qisman bulutli', kr: 'Қисман булутли' },
  'Cloudy': { uz: 'Bulutli', kr: 'Булутли' },
  'Overcast': { uz: 'Juda bulutli', kr: 'Жуда булутли' },
  'Mist': { uz: 'Tumanli', kr: 'Туманли' },
  'Patchy rain possible': { uz: 'Yomg\'ir ehtimoli', kr: 'Ёмғир эҳтимоли' },
  'Patchy snow possible': { uz: 'Qor ehtimoli', kr: 'Қор эҳтимоли' },
  'Patchy sleet possible': { uz: 'Qor yomg\'ir ehtimoli', kr: 'Қор ёмғир эҳтимоли' },
  'Patchy freezing drizzle possible': { uz: 'Muzligan tomchi ehtimoli', kr: 'Музлиган томчи эҳтимоли' },
  'Thundery outbreaks possible': { uz: 'Chaqnash ehtimoli', kr: 'Чақниш эҳтимоли' },
  'Blowing snow': { uz: 'Qor shamoli', kr: 'Қор шамоли' },
  'Blizzard': { uz: 'Qor shamoli', kr: 'Қор шамоли' },
  'Fog': { uz: 'Tumanli', kr: 'Туманли' },
  'Freezing fog': { uz: 'Muzligan tumanli', kr: 'Музлиган туманли' },
  'Patchy light drizzle': { uz: 'Engil tomchila yomg\'ir', kr: 'Энгил томчила ёмғир' },
  'Light drizzle': { uz: 'Engil tomchila yomg\'ir', kr: 'Энгил томчила ёмғир' },
  'Freezing drizzle': { uz: 'Muzligan tomchila yomg\'ir', kr: 'Музлиган томчила ёмғир' },
  'Heavy freezing drizzle': { uz: 'Kuchli muzligan yomg\'ir', kr: 'Кучли музлиган ёмғир' },
  'Patchy light rain': { uz: 'Engil yomg\'ir', kr: 'Энгил ёмғир' },
  'Light rain': { uz: 'Engil yomg\'ir', kr: 'Энгил ёмғир' },
  'Moderate rain at times': { uz: 'O\'rtacha yomg\'ir', kr: 'Ўртача ёмғир' },
  'Moderate rain': { uz: 'O\'rtacha yomg\'ir', kr: 'Ўртача ёмғир' },
  'Heavy rain at times': { uz: 'Kuchli yomg\'ir', kr: 'Кучли ёмғир' },
  'Heavy rain': { uz: 'Kuchli yomg\'ir', kr: 'Кучли ёмғир' },
  'Light freezing rain': { uz: 'Engil muzligan yomg\'ir', kr: 'Энгил музлиган ёмғир' },
  'Moderate or heavy freezing rain': { uz: 'Muzligan yomg\'ir', kr: 'Музлиган ёмғир' },
  'Patchy light snow': { uz: 'Engil qor', kr: 'Энгил қор' },
  'Light snow': { uz: 'Engil qor', kr: 'Энгил қор' },
  'Patchy moderate snow': { uz: 'O\'rtacha qor', kr: 'Ўртача қор' },
  'Moderate snow': { uz: 'O\'rtacha qor', kr: 'Ўртача қор' },
  'Patchy heavy snow': { uz: 'Kuchli qor', kr: 'Кучли қор' },
  'Heavy snow': { uz: 'Kuchli qor', kr: 'Кучли қор' },
  'Sleet': { uz: 'Qor yomg\'ir', kr: 'Қор ёмғир' },
  'Light sleet': { uz: 'Engil qor yomg\'ir', kr: 'Энгил қор ёмғир' },
  'Moderate or heavy sleet': { uz: 'Qor yomg\'ir', kr: 'Қор ёмғир' },
  'Patchy light rain with thunder': { uz: 'Chaqnashli engil yomg\'ir', kr: 'Чақнашли энгил ёмғир' },
  'Moderate or heavy rain with thunder': { uz: 'Chaqnashli kuchli yomg\'ir', kr: 'Чақнашли кучли ёмғир' },
  'Patchy light snow with thunder': { uz: 'Chaqnashli engil qor', kr: 'Чақнашли энгил қор' },
  'Moderate or heavy snow with thunder': { uz: 'Chaqnashli kuchli qor', kr: 'Чақнашли кучли қор' },
};

function getWeatherIcon(code: string): string {
  const codeMap: Record<string, string> = {
    '113': 'Sun',
    '116': 'Cloud',
    '119': 'CloudRain',
    '122': 'CloudRain',
    '143': 'CloudFog',
    '176': 'CloudRain',
    '179': 'CloudSnow',
    '182': 'CloudSnow',
    '185': 'CloudSnow',
    '200': 'CloudLightning',
    '227': 'CloudSnow',
    '230': 'Snowflake',
    '248': 'CloudFog',
    '260': 'CloudFog',
    '263': 'CloudRain',
    '266': 'CloudRain',
    '281': 'CloudSnow',
    '284': 'CloudSnow',
    '293': 'CloudRain',
    '296': 'CloudRain',
    '299': 'CloudRain',
    '302': 'CloudRain',
    '305': 'CloudRain',
    '308': 'CloudRain',
    '311': 'CloudSnow',
    '314': 'CloudSnow',
    '317': 'CloudSnow',
    '320': 'Snowflake',
    '323': 'Snowflake',
    '326': 'Snowflake',
    '329': 'Snowflake',
    '332': 'Snowflake',
    '335': 'Snowflake',
    '338': 'Snowflake',
    '350': 'CloudSnow',
    '353': 'CloudRain',
    '356': 'CloudRain',
    '359': 'CloudRain',
    '362': 'CloudSnow',
    '365': 'CloudSnow',
    '368': 'CloudSnow',
    '371': 'Snowflake',
    '374': 'CloudSnow',
    '377': 'CloudSnow',
    '386': 'CloudLightning',
    '389': 'CloudLightning',
    '392': 'CloudLightning',
    '395': 'CloudLightning',
  };
  return codeMap[code] || 'Cloud';
}

function translateWeatherCondition(condition: string, language: 'uz' | 'kr' = 'uz'): string {
  return WEATHER_TRANSLATIONS[condition]?.[language] || condition;
}

export async function fetchLenta(sortBy: string, limit?: number, offset?: number): Promise<NewsArticle[]> {
  const cacheKey = getPaginationCacheKey(`lenta_${sortBy}`, limit, offset);
  
  // Check cache first
  const cached = getCache<NewsArticle[]>(cacheKey);
  if (cached) {
    console.log(`📦 Using cached lenta: ${sortBy}`);
    return cached;
  }

  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());

  const articles = await request<ApiArticle[]>(`/viewer/articles/limit?sortBy=${sortBy}&${params.toString()}`);
  const transformed = articles.map(article => transformArticle(article));
  
  // Cache the result
  setCache(cacheKey, transformed, CACHE_DURATIONS.ARTICLES);
  
  return transformed;
}

export async function search(query: string, limit?: number): Promise<NewsArticle[]> {
  try {
    const cacheKey = getSearchCacheKey(query);
    
    // Check cache first
    const cached = getCache<NewsArticle[]>(cacheKey);
    if (cached) {
      console.log(`📦 Using cached search: ${query}`);
      let results = cached;
      if (limit) {
        results = results.slice(0, limit);
      }
      return results;
    }

    const articles = await request<ApiArticle[]>(`/viewer/articles/search?q=${encodeURIComponent(query)}`);
    let results = articles.map(article => transformArticle(article));
    
    // Cache the result
    setCache(cacheKey, results, CACHE_DURATIONS.SEARCH);
    
    if (limit) {
      results = results.slice(0, limit);
    }
    
    return results;
  } catch (err) {
    console.error('Failed to search articles', err);
    return [];
  }
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const cacheKey = 'categories_all';
  
  // Check cache first
  const cached = getCache<ApiCategory[]>(cacheKey);
  if (cached) {
    console.log('📦 Using cached categories');
    return cached;
  }

  const categories = await request<ApiCategory[]>(`/viewer/categories`);
  
  // Cache the result
  setCache(cacheKey, categories, CACHE_DURATIONS.CATEGORIES);
  
  return categories;
}

export function useCategories() {
 return useQuery<ApiCategory[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}

export async function fetchTrendingHashtags(): Promise<{ tag: string; count: number }[]> {
  try {
    const cacheKey = 'hashtags_trending';
    
    // Check cache first
    const cached = getCache<{ tag: string; count: number }[]>(cacheKey);
    if (cached) {
      console.log('📦 Using cached trending hashtags');
      return cached;
    }

    const data = await request<{ hashtag: string; usage_count: number }[]>(`/viewer/trending/hashtags`);
    const transformed = data.map(item => ({ tag: item.hashtag, count: item.usage_count }));
    
    // Cache the result
    setCache(cacheKey, transformed, CACHE_DURATIONS.HASHTAGS);
    
    return transformed;
  } catch (err) {
    console.error('Failed to fetch trending hashtags', err);
    return [];
  }
}

export type GetCurrency = {
  usd: number;
  eur: number;
  rub: number;
}

export async function fetchCurrency(): Promise<GetCurrency> {
  const cacheKey = 'currency_rates';
  
  // Check cache first
  const cached = getCache<GetCurrency>(cacheKey);
  if (cached) {
    console.log('📦 Using cached currency rates');
    return cached;
  }

  const currency = await request<GetCurrency>(`/viewer/currency`);
  
  // Cache the result
  setCache(cacheKey, currency, CACHE_DURATIONS.CURRENCY);
  
  return currency;
}

export { translateWeatherCondition };

