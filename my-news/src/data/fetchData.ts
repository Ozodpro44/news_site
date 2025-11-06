import { mockNews, NewsArticle } from "./mockNews";

export async function fetchNews(
  category?: string,
  limit?: number
): Promise<NewsArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredNews = mockNews;

      if (category && category !== "all") {
        filteredNews = mockNews.filter((news) => news.category === category);
      }

      if (limit) {
        filteredNews = filteredNews.slice(0, limit);
      }

      resolve(filteredNews);
    }, 500); // Simulate network delay
  });
}

export async function fetchNewsById(id: string): Promise<NewsArticle | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const news = mockNews.find((article) => article.id === id);
      resolve(news);
    }, 500);
  });
}

export async function fetchBreakingNews(limit?: number): Promise<NewsArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const breakingNews = mockNews.filter((news) => news.isBreaking);
      if (limit) {
        resolve(breakingNews.slice(0, limit));
      }
      resolve(breakingNews);
    }, 500);
  });
}

export async function fetchTrendingNews(limit?: number): Promise<NewsArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trendingNews = mockNews.filter((news) => news.isTrending);
      if (limit) {
        resolve(trendingNews.slice(0, limit));
      }
      resolve(trendingNews);
    }, 500);
  });
}

export async function fetchRelatedNews(
  currentArticleId: string,
  category: string,
  limit: number = 3
): Promise<NewsArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const relatedNews = mockNews
        .filter(
          (news) => news.category === category && news.id !== currentArticleId
        )
        .slice(0, limit);
      resolve(relatedNews);
    }, 500);
  });
}

export async function likeArticle(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockNews.find((news) => news.id === id);
      if (article) {
        article.likes++;
      }
      resolve();
    }, 0);
  });
}

export async function unlikeArticle(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockNews.find((news) => news.id === id);
      if (article && article.likes > 0) {
        article.likes--;
      }
      resolve();
    }, 0);
  });
}

export async function fetchWeather(): Promise<{ temperature: number; condition: string; icon: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const conditions = [
        { condition: "Quyoshli", icon: "Sun" },
        { condition: "Bulutli", icon: "Cloud" },
        { condition: "Yomg'irli", icon: "CloudRain" },
        { condition: "Qorli", icon: "Snowflake" },
      ];
      const randomCondition =
        conditions[Math.floor(Math.random() * conditions.length)];
      resolve({
        temperature: Math.floor(Math.random() * 25) + 5, // 5 to 30 degrees Celsius
        condition: randomCondition.condition,
        icon: randomCondition.icon,
      });
    }, 500);
  });
}

export async function fetchLenta(sortBy: string, limit?: number, offset?: number): Promise<NewsArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let sortedNews = [...mockNews];

      if (sortBy === "latest") {
        sortedNews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (sortBy === "popular") {
        sortedNews.sort((a, b) => b.views - a.views);
      }

      if (offset) {
        sortedNews = sortedNews.slice(offset);
      }

      if (limit) {
        sortedNews = sortedNews.slice(0, limit);
      }
      resolve(sortedNews);
    }, 500);
  });

}

export async function search(query: string, limit?: number): Promise<NewsArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerCaseQuery = query.toLowerCase();
      const searchResults = mockNews.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerCaseQuery) ||
          // article.summary.toLowerCase().includes(lowerCaseQuery) ||
          article.content.toLowerCase().includes(lowerCaseQuery) ||
          article.hashtags.some((tag) =>
            tag.toLowerCase().includes(lowerCaseQuery)
          )
      );

      if (limit) {
        resolve(searchResults.slice(0, limit));
      }
      resolve(searchResults);
    }, 500);
  });
}
