import './Pages.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();

  const translations = {
    uz: {
      topNews: "Dolzarb habarlar",
      latestNews: "So'nggi yangiliklar",
      loadMore: "Ko'proq yangiliklar",
      currency: "Dollar kursi",
      weather: "Ob-havo",
      humidity: "Namlik",
      wind: "Shamol",
      tashkent: "Toshkent",
      som: "so'm",
      sunny: "Quyoshli",
    },
    kr: {
      topNews: "Долзарб хабарлар",
      latestNews: "Сўнгги янгиликлар",
      loadMore: "Кўпроқ янгиликлар",
      currency: "Доллар курси",
      weather: "Об-ҳаво",
      humidity: "Намлик",
      wind: "Шамол",
      tashkent: "Тошкент",
      som: "сўм",
      sunny: "Қуёшли",
    },
    ru: {
      topNews: "Актуальные новости",
      latestNews: "Последние новости",
      loadMore: "Больше новостей",
      currency: "Курс доллара",
      weather: "Погода",
      humidity: "Влажность",
      wind: "Ветер",
      tashkent: "Ташкент",
      som: "сум",
      sunny: "Солнечно",
    },
    en: {
      topNews: "Top News",
      latestNews: "Latest News",
      loadMore: "Load More News",
      currency: "Dollar Rate",
      weather: "Weather",
      humidity: "Humidity",
      wind: "Wind",
      tashkent: "Tashkent",
      som: "som",
      sunny: "Sunny",
    }
  };

  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
  const t = translations[selectedLanguage];

  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({ USD: '...', EUR: '...', RUB: '...' });
  const [weatherData, setWeatherData] = useState({ temp: '...', description: '...', humidity: '...', wind: '...' });

  useEffect(() => {
    // Fetch Top News (example, replace with actual API calls)
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=YOUR_API_KEY`)
      .then(res => setTopNews(res.data.articles))
      .catch(err => console.error("Error fetching top news:", err));

    // Fetch Latest News (example, replace with actual API calls)
    axios.get(`https://newsapi.org/v2/everything?q=latest&pageSize=6&apiKey=YOUR_API_KEY`)
      .then(res => setLatestNews(res.data.articles))
      .catch(err => console.error("Error fetching latest news:", err));

    // Fetch Currency Rates (example, replace with actual API calls)
    // This is a placeholder, as a real currency API would be needed.
    // For demonstration, using static values or a mock API.
    setCurrencyRates({ USD: '12,350', EUR: '13,420', RUB: '135' });

    // Fetch Weather Data (example, replace with actual API calls)
    // Using OpenWeatherMap API as an example
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=YOUR_OPENWEATHER_API_KEY&units=metric`)
      .then(res => {
        setWeatherData({
          temp: res.data.main.temp.toFixed(0),
          description: res.data.weather[0].description,
          humidity: res.data.main.humidity,
          wind: res.data.wind.speed.toFixed(1),
        });
      })
      .catch(err => console.error("Error fetching weather data:", err));
  }, []);

  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  localStorage.setItem('lstpg', '/');
  if (document.getElementById("searchInput")) {
    document.getElementById("searchInput").value = "";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20" id="mainContent">
      <div id="homePage">
        {/* <!-- Top News Section --> */}
        <section className="mb-12 fade-in">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{t.topNews}</h2>
            <div className="ml-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-1 max-w-32 rounded"></div>
          </div>
          <div id="topNews" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topNews.map((article, index) => (
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
        </section>

        {/* <!-- Latest News Section --> */}
        <section className="mb-12 fade-in">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{t.latestNews}</h2>
            <div className="ml-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 flex-1 max-w-32 rounded"></div>
          </div>
          <div id="latestNews" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article, index) => (
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
          <div className="text-center mt-8">
            <button onClick={() => navigate(`/lenta`)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              {t.loadMore}
            </button>
          </div>
        </section>

        {/* <!-- Additional Info Section --> */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* <!-- Dollar Exchange Rate --> */}
          <div className="currency-card text-white rounded-2xl p-8 slide-in-left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">💱 {t.currency}</h3>
              <div className="text-sm opacity-75" id="currencyDate">{new Date().toLocaleDateString(selectedLanguage)}</div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
                <span className="font-medium">USD/UZS</span>
                <div className="text-right">
                  <div className="text-2xl font-bold" id="usdRate">{currencyRates.USD}</div>
                  <div className="text-sm opacity-75">{t.som}</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
                <span className="font-medium">EUR/UZS</span>
                <div className="text-right">
                  <div className="text-2xl font-bold" id="eurRate">{currencyRates.EUR}</div>
                  <div className="text-sm opacity-75">{t.som}</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
                <span className="font-medium">RUB/UZS</span>
                <div className="text-right">
                  <div className="text-2xl font-bold" id="rubRate">{currencyRates.RUB}</div>
                  <div className="text-sm opacity-75">{t.som}</div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Weather --> */}
          <div className="weather-card text-white rounded-2xl p-8 slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">🌤️ {t.weather}</h3>
              <div className="text-sm opacity-75" id="weatherLocation">{t.tashkent}</div>
            </div>
            <div className="text-center mb-6">
              <div className="text-6xl mb-2" id="weatherIcon">☀️</div> {/* You might want to change this based on weather description */}
              <div className="text-4xl font-bold mb-2" id="temperature">{weatherData.temp}°C</div>
              <div className="text-lg opacity-75" id="weatherDescription">{weatherData.description}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-sm opacity-75">{t.humidity}</div>
                <div className="text-xl font-bold" id="humidity">{weatherData.humidity}%</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-sm opacity-75">{t.wind}</div>
                <div className="text-xl font-bold" id="windSpeed">{weatherData.wind} km/h</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
