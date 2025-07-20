// import Home from './Home.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Lenta() {
    
  const translations = {
        uz: {
            lenta: "Lenta",
            loadMore: "Ko'proq yuklash",
            loading: "Yuklanmoqda...",
        },
        kr: {
            lenta: "Лента",
            loadMore: "Кўпроқ юклаш",
            loading: "Юкланмоқда...",
        },
        ru: {
            lenta: "Лента",
            loadMore: "Загрузить еще",
            loading: "Загрузка...",
        },
        en: {
            lenta: "Feed",
            loadMore: "Load More",
            loading: "Loading...",
        }
    };

    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
    const t = translations[selectedLanguage];

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchNews = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=latest&pageSize=10&page=${pageNumber}&apiKey=YOUR_API_KEY` // Replace with your actual API key
            );
            setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(1);
    }, []);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
        fetchNews(page + 1);
    };

    const renderArticle = (article, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <img
                src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={article.title}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
            />
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{article.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Read more →</a>
                </div>
            </div>
        </div>
    );

    const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');
    
      useEffect(() => {
        document.documentElement.classList.toggle('dark-mode', darkMode);
      }, [darkMode]);

    localStorage.setItem('lstpg', '/lenta');
    if (document.getElementById("searchInput")) {
    document.getElementById("searchInput").value = "";
    }

  return (
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20" id="mainContent">
        <div id="lentaPage">
                <div class="flex items-center mb-6">
                    <h2 class="text-3xl font-bold text-gray-900">📰 Lenta</h2>
                    <div class="ml-4 h-1 bg-gradient-to-r from-red-500 to-pink-500 flex-1 max-w-32 rounded"></div>
                </div>
                <div id="lentaNews" className="space-y-6">
                    {articles.map(renderArticle)}
                </div>
                {loading && (
                <div id="lentaLoading" className="text-center mt-8">
                    <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-500 bg-white">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.loading}
                    </div>
                </div>
                )}
                {!loading && (
                    <div id="loadMoreContainer" className="text-center mt-8">
                        <button id="loadMoreBtn" onClick={handleLoadMore} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            {t.loadMore}
                        </button>
                    </div>
                )}
            </div>
        </div>
  );
}

export default Lenta;
