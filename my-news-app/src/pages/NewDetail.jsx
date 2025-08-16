import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServerAPI = 'https://newsbackend-production-7d1f.up.railway.app';

function NewDetail() {
    const { day, month, year,  lugs } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendedNews, setRecommendedNews] = useState([]);
    const navigate = useNavigate();

    const translations = {
        uz: {
            backToHome: "Orqaga qaytish",
            recommended: "Tavsiya etiladigan yangiliklar",
            views: "ko'rishlar",
            today: "Bugun",
            yesterday: "Kecha",
            daysAgo: "kun oldin",
            noArticleFound: "Maqola topilmadi",
        },
        kr: {
            backToHome: "Ортга қайтиш",
            recommended: "Тавсия этиладиган янгиликлар",
            views: "кўришлар",
            today: "Бугун",
            yesterday: "Кеча",
            daysAgo: "кун олдин",
            noArticleFound: "Мақола топилмади",
        }
    };

    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
    const t = translations[selectedLanguage];

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${ServerAPI}/viewer/articles/${day}/${month}/${year}/${lugs}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
                setArticle(null); // Set to null to indicate not found
            } finally {
                setLoading(false);
            }
        };

        const fetchRecommendedNews = async () => {
            try {
                const response = await axios.get(`${ServerAPI}/viewer/articles/limit?offset=0&limit=3`); // Fetch 3 latest articles as recommendations
                setRecommendedNews(response.data);
            } catch (error) {
                console.error('Error fetching recommended news:', error);
            } 
        };

        fetchArticle();
        fetchRecommendedNews();
    }, [day, month, year, lugs]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();

        // Adjust for Tashkent time (GMT+5)
        const tashkentOffset = 5 * 60; // 5 hours in minutes
        const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
        const adjustedDate = new Date(date.getTime() + (tashkentOffset + localOffset) * 60 * 1000);

        const time = adjustedDate.toLocaleTimeString(selectedLanguage, { hour: '2-digit', minute: '2-digit' });

        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return `${t.today}, ${time}`;
        if (diffDays === 1) return t.yesterday;
        return `${diffDays} ${t.daysAgo}`;
    };

    const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        document.documentElement.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    localStorage.setItem('lstpg', `/news/${day}/${month}/${year}/${lugs}`);
    if (document.getElementById("searchInput")) {
        document.getElementById("searchInput").value = "";
    }

    if (loading) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }


    if (!article) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 text-center">
                <p className="text-xl font-semibold text-gray-700">{t.noArticleFound}</p>
                <button onClick={() => navigate(-1)} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    {t.backToHome}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20" id="mainContent">
            <div id="newsDetailPage">
                <button onClick={() => navigate(-1)} className="back-button flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
                    ← {t.backToHome}
                </button>

                <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <img
                        src={article.preview ? `${ServerAPI}/${article.preview}` : 'https://placehold.co/600x400?text=No+Image'}
                        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                        alt={article[`title_${selectedLanguage}`]}
                        className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="p-6 md:p-8">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span id="newsDetailDate">{formatDate(article.created_at)}</span>
                            <span className="mx-2">•</span>
                            <span id="newsDetailViews">{article.views} {t.views}</span>
                        </div>
                        <h1 id="newsDetailTitle" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            {article[`title_${selectedLanguage}`]}
                        </h1>
                        <div
                            id="newsDetailContent"
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: article[`content_${selectedLanguage}`] }}
                        ></div>
                    </div>
                </article>

                {/* <!-- Recommendations --> */}
                <section className="fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.recommended}</h3>
                    <div id="recommendedNews" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {recommendedNews.map((recArticle) => (
                            <div key={recArticle.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                                <img
                                    src={recArticle.preview ? `${ServerAPI}/${recArticle.preview}` : 'https://placehold.co/600x400?text=No+Image'}
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                                    alt={recArticle[`title_${selectedLanguage}`]}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5 flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{recArticle[`title_${selectedLanguage}`]}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{recArticle[`content_${selectedLanguage}`]}</p>
                                </div>
                                <div className="p-5 pt-0">
                                    <a href={`/news/${day}/${month}/${year}/${recArticle.lugs}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm" onClick={() => navigate(`/news/${recArticle.lugs}`)}>Read more →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default NewDetail;
