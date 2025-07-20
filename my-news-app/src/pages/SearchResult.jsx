
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

    const translations = {
        uz: {
            back: "Orqaga",
            searchResults: "Qidiruv natijalari",
            noResults: "Hech narsa topilmadi",
            tryOtherKeywords: "Boshqa kalit so'zlar bilan qidirib ko'ring",
            backToHome: "Bosh sahifaga qaytish"
        },
        kr: {
            back: "Ортга",
            searchResults: "Қидирув натижалари",
            noResults: "Ҳеч нарса топилмади",
            tryOtherKeywords: "Бошқа калит сўзлар билан қидириб кўринг",
            backToHome: "Бош саҳифага қайтиш"
        },
        ru: {
            back: "Назад",
            searchResults: "Результаты поиска",
            noResults: "Ничего не найдено",
            tryOtherKeywords: "Попробуйте другие ключевые слова",
            backToHome: "Вернуться на главную"
        },
        en: {
            back: "Back",
            searchResults: "Search Results",
            noResults: "Nothing found",
            tryOtherKeywords: "Try other keywords",
            backToHome: "Back to Home"
        }
    };

  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
  const t = translations[selectedLanguage];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
      axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`) // Replace with your actual API key
        .then(res => {
          if (res.data.articles.length === 0) {
            setNoResults(true);
          } else {
            setSearchResults(res.data.articles);
            setNoResults(false);
          }
        })
        .catch(err => {
          console.error(err);
          setNoResults(true);
        });
    } else {
      // navigate(localStorage.getItem('lstpg')); // Redirect to home if no query
    }
  }, [location.search, navigate]);

  const goBack = () => {
    // document.getElementById("searchInput").value = "";
    navigate(localStorage.getItem('lstpg'));
  };

  const goHome = () => {
    navigate('/');
  }

  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);


  return (
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20" id="mainContent">
        <div id="searchResultsPage" className="fade-in"> 
            <div class="flex items-center mb-6">
                <button onClick={goBack} class="back-button flex items-center text-blue-600 hover:text-blue-800 mr-4 font-medium">
                    ← {t.back}
                </button>
                <h2 class="text-3xl font-bold text-gray-900">🔍 {t.searchResults}</h2>
                <div class="ml-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-1 max-w-32 rounded"></div>
            </div>
            <div id="searchQuery" class="mb-6 text-lg text-gray-600 bg-blue-50 p-4 rounded-lg">
              {t.searchResults} <span class="font-semibold text-gray-600">"{searchQuery}"</span>
            </div>
            {noResults ? (
              <div id="noResults" class="text-center py-16">
                <div class="text-8xl mb-6">🔍</div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-3">{t.noResults}</h3>
                <p class="text-gray-600 text-lg">{t.tryOtherKeywords}</p>
                <button onClick={goHome} class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    {t.backToHome}
                </button>
              </div>
            ) : (
              <div id="searchResults" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((article, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <img src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="p-5 flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
                    </div>
                    <div className="p-5 pt-0">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Read more →</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
  );
}

export default SearchResult;