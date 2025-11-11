import { useQuery } from "@tanstack/react-query";
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

export async function fetchNews(
  
): Promise<NewsArticle[]> {
  const articles = await request<ApiArticle[]>(`/viewer/articles`);
  let filtered = articles;

  // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
  return filtered.map(article => transformArticle(article));
}

export async function fetchNewsByCategory(
  categoryId: string,
  limit?: number,
  offset?: number
): Promise<NewsArticle[]> {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());

  const articles = await request<ApiArticle[]>(`/viewer/articles/category/${categoryId}?${params.toString()}`);
  // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
  return articles.map(article => transformArticle(article));
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
    const article = await request<ApiArticle>(`/viewer/articles/${day}/${month}/${year}/${slug}`);
    // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
    return transformArticle(article);
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

export async function fetchLenta(sortBy: string, limit?: number, offset?: number): Promise<NewsArticle[]> {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());

  const articles = await request<ApiArticle[]>(`/viewer/articles/lenta?sortBy=${sortBy}&${params.toString()}`);
  return articles.map(article => transformArticle(article));
}

export async function search(query: string, limit?: number): Promise<NewsArticle[]> {
  try {
    const articles = await request<ApiArticle[]>(`/viewer/articles/search?q=${encodeURIComponent(query)}`);
    // const language = (localStorage.getItem('news-language') as 'uz' | 'kr') || 'uz';
    let results = articles.map(article => transformArticle(article));
    
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
  return request<ApiCategory[]>(`/viewer/categories`);
}

export function useCategories() {
 return useQuery<ApiCategory[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}

export async function fetchTrendingHashtags(): Promise<{ tag: string; count: number }[]> {
  try {
    const data = await request<{ hashtag: string; usage_count: number }[]>(`/viewer/trending/hashtags`);
    return data.map(item => ({ tag: item.hashtag, count: item.usage_count }));
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
  return request<GetCurrency>(`/viewer/currency`);
}

