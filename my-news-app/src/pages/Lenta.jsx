import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [page,    setPage] = useState(1);

    useEffect(() => {
        let ignore = false;
        fetchNews(page, ignore);
        return () => { ignore = true };
    }, [page]);

    const fetchNews = async (pageNumber, ignore) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${ServerAPI}/viewer/articles/limit?offset=${(pageNumber - 1) * 10}&limit=10` // Replace with your actual API key
            );
            if (!ignore && response.data) {
                 const newArticles = response.data;

                // Wait for all images to load
                await Promise.all(
                    newArticles.map(article => {
                        return new Promise(resolve => {
                            const img = new Image();
                            img.src = `${ServerAPI}/${article.preview}`;
                            img.onload = resolve;
                            img.onerror = resolve; // still resolve if image fails
                        });
                    })
                );
                
                setArticles(prev => {
                    const merged = [...prev, ...response.data];
                    const unique = merged.filter(
                        (article, index, self) =>
                            index === self.findIndex(a => a.id === article.id)
                    );
                    return unique;
                });
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    let fetching = false;

    const handleScroll = () => {
        if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && 
        !loading && 
        !fetching
        ) {
        fetching = true;
        setPage(prev => prev + 1); // load next page
        setTimeout(() => (fetching = false), 500); // debounce
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);


    const renderArticle = (article, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <img
                src={article.preview 
                    ? `${ServerAPI}/${article.preview}` 
                    : 'https://placehold.co/600x400?text=No+Image'}
                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                alt={article[`title_${selectedLanguage}`]}
                className="w-full md:w-1/3 h-48 md:h-48 object-cover object-center rounded-l-xl"
                loading="eager"
                decoding="async"
            />
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article[`title_${selectedLanguage}`]}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow" onClick={() => navigate(`/news/${new Date(article.created_at).getDate()}/${new Date(article.created_at).getMonth() + 1}/${new Date(article.created_at).getFullYear()}/${article.lugs}`)}>{article[`content_${selectedLanguage}`]}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(article.created_at).toLocaleDateString(selectedLanguage)}</span>
                    <a href={`/news/${new Date(article.created_at).getDate()}/${new Date(article.created_at).getMonth() + 1}/${new Date(article.created_at).getFullYear()}/${article.lugs}`}
                    className="text-blue-600 hover:text-blue-800 font-medium">{t.readMore} →</a>
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
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.loading}
                    </div>
                </div>
                )}
            </div>
        </div>
  );
}

export default Lenta;
