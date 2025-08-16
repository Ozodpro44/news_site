import './Pages.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerAPI = 'https://newsbackend-production-7d1f.up.railway.app';

function Home() {
  const navigate = useNavigate();

  const translations = {
    uz: {
      topNews: "Dolzarb habarlar",
      latestNews: "So'nggi yangiliklar",
      loadMore: "Ko'proq yangiliklar",
      currency: "Valyuta kursi",
      weather: "Ob-havo",
      humidity: "Namlik",
      wind: "Shamol",
      tashkent: "Toshkent",
      som: "so'm",
      sunny: "Quyoshli",
      usd: "Dollar",
      eur: "Euro",
      rub: "Rubl", 
      readMore: "Batafsil",
    },
    kr: {
      topNews: "Долзарб хабарлар",
      latestNews: "Сўнгги янгиликлар",
      loadMore: "Кўпроқ янгиликлар",
      currency: "Валюта курси",
      weather: "Об-ҳаво",
      humidity: "Намлик",
      wind: "Шамол",
      tashkent: "Тошкент",
      som: "сўм",
      sunny: "Қуёшли",
      usd: "Доллар",
      eur: "Евро",
      rub: "Рубль", 
      readMore: "Батафсил",
    }
  };

  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
  const t = translations[selectedLanguage];

  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]); // State for latest news
  const [currencyRates, setCurrencyRates] = useState({ USD: '...', EUR: '...', RUB: '...' });
  const [weatherData, setWeatherData] = useState({ temp: '...', description: '...', humidity: '...', wind: '...'});
  // const [loading, setLoading] = useState(true); // Loading state
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);


 useEffect(() => {
  // const limit = window.innerWidth < 768 ? 4 : 6; // <768px → mobile
  
  const cached = localStorage.getItem("homePageData");
  if (cached) {
    const parsed = JSON.parse(cached);
    setTopNews(parsed.topNews);
    setLatestNews(parsed.latestNews);
    setCurrencyRates(parsed.currencyRates);
    setWeatherData(parsed.weatherData);
    setLoadingWeather(parsed.loadingWeather);
    setLoadingNews(parsed.loadingNews);
    return;
  }

  const fetchData = async () => {
    try {
      const limit = window.innerWidth < 768 ? 4 : 6;
      const newsRes = await axios.get(`${ServerAPI}/viewer/articles/limit?offset=0&limit=${limit}`);
      setTopNews(newsRes.data);
      setLatestNews(newsRes.data);

      const [usdRes, eurRes, rubRes] = await Promise.all([
        axios.get(`https://api.exchangerate.host/latest?base=USD&symbols=UZS`),
        axios.get(`https://api.exchangerate.host/latest?base=EUR&symbols=UZS`),
        axios.get(`https://api.exchangerate.host/latest?base=RUB&symbols=UZS`)
      ]);

      setCurrencyRates({
        USD: usdRes.data.rates.UZS.toFixed(2),
        EUR: eurRes.data.rates.UZS.toFixed(2),
        RUB: rubRes.data.rates.UZS.toFixed(2),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNews(false);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const res = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
      const data = await res.json();
      let icon
      if (data.current_condition[0].weatherDesc[0].value === "Sunny") {
        icon = "01d";
      } else if (data.current_condition[0].weatherDesc[0].value === "Partly cloudy") {
        icon = "02d";
      } else if (data.current_condition[0].weatherDesc[0].value === "Overcast") {
        icon = "03d";
      } else if (data.current_condition[0].weatherDesc[0].value === "Mist") {
        icon = "50d";
      } else if (data.current_condition[0].weatherDesc[0].value === "Patchy rain possible") {
        icon = "09d";
      } else if (data.current_condition[0].weatherDesc[0].value === "Patchy snow possible") {
        icon = "13d";
      } else if (data.current_condition[0].weatherDesc[0].value === "Patchy sleet possible") {
        icon = "50d";
      } else {
        icon = "01d";
      }

      setWeatherData({
        temp: data.current_condition[0].temp_C,
        description: data.current_condition[0].weatherDesc[0].value,
        humidity: data.current_condition[0].humidity,
        wind: data.current_condition[0].windspeedKmph,
        icon: icon,
        location: data.nearest_area[0].areaName[0].value,
      });
    } catch (err) {
      console.error("Failed to load weather:", err);
    } finally {
      setLoadingWeather(false);
    }
  }, (err) => {
    console.error("Geolocation error:", err);
    setLoadingWeather(false); // fallback: still stop loading
  });
}, []);
  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const ShimmerCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="w-full h-48 shimmer"></div>
      <div className="p-5 flex-grow">
        <div className="h-6 rounded shimmer w-3/4 mb-2"></div>
        <div className="h-4 rounded shimmer w-1/2"></div>
      </div>
      <div className="p-5 pt-0">
        <div className="h-4 rounded shimmer w-1/4"></div>
      </div>
    </div>
  );

  const ShimmerCurrencyWeather = () => (
    <div className="rounded-2xl shadow-lg p-8 shimmer h-64"></div>
  );

  localStorage.setItem('lstpg', '/');
  if (document.getElementById("searchInput")) {
    document.getElementById("searchInput").value = "";
  }

  function ArticleCard({ article, selectedLanguage, t, navigate }) {
    const [imgError, setImgError] = useState(false);

    const imageUrl = !imgError && article.preview
      ? `${ServerAPI}/${article.preview}`
      : "https://placehold.co/400x200?text=No+Image"; // fallback

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
        <img
          src={imageUrl}
          alt={article[`title_${selectedLanguage}`]}
          className="w-full h-48 object-cover"
          onError={() => setImgError(true)}
        />

        <div className="p-5 flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {article[`title_${selectedLanguage}`]}
          </h3>
        </div>

        <div className="p-5 pt-0">
          <button
            onClick={() => navigate(`/news/${article.lugs}`)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {t.readMore} →
          </button>
        </div>
      </div>
    );
  }




return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20" id="mainContent">
    <div id="homePage">
      {loadingNews ? (
        <>
          {/* Top News */}
          <section className="mb-12 fade-in">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{t.topNews}</h2>
              <div className="ml-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-1 max-w-32 rounded"></div>
            </div>
            <div id="topNews" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)}
            </div>
          </section>

          {/* Latest News */}
          <section className="mb-12 fade-in">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{t.latestNews}</h2>
              <div className="ml-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 flex-1 max-w-32 rounded"></div>
            </div>
            <div id="latestNews" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ShimmerCard key={i} />
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate(`/lenta`)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {t.loadMore}
              </button>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Top News */}
          <section className="mb-12 fade-in">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{t.topNews}</h2>
              <div className="ml-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-1 max-w-32 rounded"></div>
            </div>
            <div id="topNews" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topNews.map(topNews => (
                <ArticleCard
                  key={topNews.id}
                  article={topNews}
                  selectedLanguage={selectedLanguage}
                  t={t}
                  navigate={navigate}
                />
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section className="mb-12 fade-in">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{t.latestNews}</h2>
              <div className="ml-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 flex-1 max-w-32 rounded"></div>
            </div>
            <div id="latestNews" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map(latestNews => (
                <ArticleCard
                  key={latestNews.id}
                  article={latestNews}
                  selectedLanguage={selectedLanguage}
                  t={t}
                  navigate={navigate}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate(`/lenta`)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {t.loadMore}
              </button>
            </div>
          </section>
        </>
      )}
      {/* Additional Info Section */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
  {/* Currency */}
  {loadingNews ? (
      <ShimmerCurrencyWeather />
    ) : (
      <div className="currency-card text-white rounded-2xl p-8 slide-in-left">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">💱 {t.currency}</h3>
          <div className="text-sm opacity-75" id="currencyDate">
            {new Date().toLocaleDateString(selectedLanguage)}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
            <span className="font-medium">{t.usd}</span>
            <div className="text-right">
              <div className="text-2xl font-bold" id="usdRate">{currencyRates.USD}</div>
              <div className="text-sm opacity-75">{t.som}</div>
            </div>
          </div>
          <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
            <span className="font-medium">{t.eur}</span>
            <div className="text-right">
              <div className="text-2xl font-bold" id="eurRate">{currencyRates.EUR}</div>
              <div className="text-sm opacity-75">{t.som}</div>
            </div>
          </div>
          <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
            <span className="font-medium">{t.rub}</span>
            <div className="text-right">
              <div className="text-2xl font-bold" id="rubRate">{currencyRates.RUB}</div>
              <div className="text-sm opacity-75">{t.som}</div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Weather */}
    {loadingWeather ? (
      <ShimmerCurrencyWeather />
    ) : (
      <div className="weather-card text-white rounded-2xl p-8 slide-in-right">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">🌤️ {t.weather}</h3>
          <div className="text-sm opacity-75">{weatherData.location}</div>
        </div>
        <div className="text-center mb-6">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
            alt="Weather icon"
            className="w-24 h-24 mx-auto"
          />
          <div className="text-4xl font-bold mb-2">{weatherData.temp}°C</div>
          <div className="text-lg opacity-75">{weatherData.description}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-sm opacity-75">{t.humidity}</div>
            <div className="text-xl font-bold">{weatherData.humidity}%</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-sm opacity-75">{t.wind}</div>
            <div className="text-xl font-bold">{weatherData.wind} km/h</div>
          </div>
        </div>
      </div>
    )}
  </section>
    </div>
  </div>
);
}


export default Home;
