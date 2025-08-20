import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ServerAPI = 'https://newsbackend-production-7d1f.up.railway.app';

function Lenta() {
  const translations = {
    uz: {
      lenta: "Lenta",
      loadMore: "Ko'proq yuklash",
      loading: "Yuklanmoqda...",
      readMore: "Batafsil",
    },
    kr: {
      lenta: "Лента",
      loadMore: "Кўпроқ юклаш",
      loading: "Юкланмоқда...",
      readMore: "Батафсил",
    }
  };

  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
  const t = translations[selectedLanguage];

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    let ignore = false;
    const fetchNews = async () => {
      setLoading(true);
      try {
        const catParam = category ? `&category=${encodeURIComponent(category)}` : "";
        const response = await axios.get(
          `${ServerAPI}/viewer/articles/limit?offset=${(page - 1) * 10}&limit=10${catParam}`
        );
        if (!ignore && response.data) {
          const newArticles = response.data;

          await Promise.all(
            newArticles.map(article => new Promise(resolve => {
              const img = new Image();
              img.src = `${ServerAPI}/${article.preview}`;
              img.onload = resolve;
              img.onerror = resolve;
            }))
          );

          setArticles(prev => {
            const merged = [...prev, ...newArticles];
            const unique = merged.filter(
              (article, index, self) =>
                index === self.findIndex(a => a.id === article.id)
            );
            return unique;
          });
          setHasMore(newArticles.length > 0);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews(page, ignore);
    return () => { ignore = true; };
  }, [page, category]);

  useEffect(() => {
    let fetching = false;
    const handleScroll = async () => {
      if (
        document.body &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 140 &&
        !loading && !fetching && hasMore
      ) {
        fetching = true;
        setPage(prev => prev + 1);
        setTimeout(() => (fetching = false), 500);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');
  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const SkeletonArticle = () => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  const renderArticle = (article) => (
    <div
      key={article.id}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition duration-200"
    >
      <img
        src={article.preview ? `${ServerAPI}/${article.preview}` : 'https://placehold.co/600x400?text=No+Image'}
        alt={article[`title_${selectedLanguage}`]}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {article[`title_${selectedLanguage}`]}
        </h3>
        <p
          className="text-gray-700 text-sm line-clamp-3 mb-4 flex-grow cursor-pointer"
          onClick={() => navigate(`/news/${new Date(article.created_at).getDate()}/${new Date(article.created_at).getMonth() + 1}/${new Date(article.created_at).getFullYear()}/${article.lugs}`)}
        >
          {article[`content_${selectedLanguage}`]}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span>{new Date(article.created_at).toLocaleDateString(selectedLanguage)}</span>
          <a
            href={`/news/${new Date(article.created_at).getDate()}/${new Date(article.created_at).getMonth() + 1}/${new Date(article.created_at).getFullYear()}/${article.lugs}`}
            className="text-blue-600 hover:text-indigo-600 font-medium transition-colors"
          >
            {t.readMore} →
          </a>
        </div>
      </div>
    </div>
  );

  localStorage.setItem('lstpg', '/lenta');
  if (document.getElementById("searchInput")) document.getElementById("searchInput").value = "";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 bg-gray-100 min-h-screen" id="mainContent">
      <div id="lentaPage">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {t.lenta}
          </h2>
          <div className="ml-4 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 flex-1 max-w-32 rounded"></div>
        </div>

        {/* Grid-style лента, как у Яндекс */}
        <div id="lentaNews" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && articles.length === 0 ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonArticle key={i} />)}
              <div className="text-center py-4">
                <p className="text-gray-500">{t.loading}</p>
              </div>
            </>
          ) : (
            articles.map(renderArticle)
          )}
        </div>
      </div>
    </div>
  );
}

export default Lenta;
