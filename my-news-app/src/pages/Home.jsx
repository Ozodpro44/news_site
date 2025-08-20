import './Pages.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerAPI = 'https://newsbackend-production-7d1f.up.railway.app';

function Home() {
  const navigate = useNavigate();

  const translations = {
    uz: {
      categories: ["Barchasi"],
      topNews: "Dolzarb habarlar",
      latestNews: "So'nggi yangiliklar",
      loadMore: "Ko'proq yangiliklar",
      currency: "Valyuta kursi",
      weather: "Ob-havo",
      humidity: "Namlik",
      wind: "Shamol",
      readMore: "Batafsil",
      som: "so'm"
    },
    kr: {
      categories: ["Барчаси"],
      topNews: "Долзарб хабарлар",
      latestNews: "Сўнгги янгиликлар",
      loadMore: "Кўпроқ янгиликлар",
      currency: "Валюта курси",
      weather: "Об-ҳаво",
      humidity: "Намлик",
      wind: "Шамол",
      readMore: "Батафсил",
      som: "сўм"
    }
  };

  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
  const t = translations[selectedLanguage];

  const [categories, setCategories] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({ USD: "...", EUR: "...", RUB: "..." });
  const [weatherData, setWeatherData] = useState(null); 
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);

  // fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const categoryRes = await axios.get(`${ServerAPI}/viewer/categories`);
        const fetchedCategories = categoryRes.data.map(cat => cat[`name_${selectedLanguage}`]);
        setCategories(["Barchasi", ...fetchedCategories]);

        const res = await axios.get(`${ServerAPI}/viewer/articles/limit?offset=0&limit=8`);
        setTopNews(res.data.slice(0, 3));
        setLatestNews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingNews(false);
      }
    }; 
    fetchNews();
  }, [selectedLanguage]);

  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // fetch currency
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get("https://www.floatrates.com/daily/uzs.json");
        setCurrencyRates({
          USD: res.data.usd.inverseRate.toFixed(2),
          EUR: res.data.eur.inverseRate.toFixed(2),
          RUB: res.data.rub.inverseRate.toFixed(2),
        });
      } catch {}
    };
    fetchRates();
  }, []);

  // fetch weather
useEffect(() => {
  navigator.geolocation.getCurrentPosition(async pos => {
    try {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      );
      const current = weatherRes.data.current_weather;

      // Map weather codes → description + emoji/icon
      const weatherCodeMap = {
        0: { desc: "Clear sky", icon: "01d" },
        1: { desc: "Mainly clear", icon: "02d"},
        2: { desc: "Partly cloudy", icon: "03d" },
        3: { desc: "Overcast", icon: "04d" },
        45: { desc: "Fog", icon: "50d" },
        48: { desc: "Depositing rime fog", icon: "50d" },
        51: { desc: "Drizzle: Light", icon: "09d" },
        53: { desc: "Drizzle: Moderate", icon: "09d" },
        55: { desc: "Drizzle: Dense", icon: "09d" },
        56: { desc: "Freezing Drizzle: Light", icon: "09d" },
        57: { desc: "Freezing Drizzle: Dense", icon: "09d" },
        61: { desc: "Rain: Light", icon: "10d" },
        63: { desc: "Rain: Moderate", icon: "10d" },
        65: { desc: "Rain: Heavy", icon: "10d" },
        66: { desc: "Freezing Rain: Light", icon: "10d" },
        67: { desc: "Freezing Rain: Heavy", icon: "10d" },
        71: { desc: "Snow fall: Light", icon: "13d" },
        73: { desc: "Snow fall: Moderate", icon: "13d" },
        75: { desc: "Snow fall: Heavy", icon: "13d" },
        77: { desc: "Snow grains", icon: "13d" },
        80: { desc: "Rain showers: Light", icon: "09d" },
        81: { desc: "Rain showers: Moderate", icon: "09d" },
        82: { desc: "Rain showers: Violent", icon: "09d" },
        85: { desc: "Snow showers: Light", icon: "13d" },
        86: { desc: "Snow showers: Heavy", icon: "13d" },
        95: { desc: "Thunderstorm", icon: "11d" },
        96: { desc: "Thunderstorm with slight hail", icon: "11d" },
        99: { desc: "Thunderstorm with heavy hail", icon: "11d" },
      };

      const codeInfo = weatherCodeMap[current.weathercode] || { desc: "Unknown", icon: "❔" };

      // Find nearest humidity value
      const timeIndex = weatherRes.data.hourly.time.indexOf(current.time);
      const humidity = timeIndex >= 0 ? weatherRes.data.hourly.relativehumidity_2m[timeIndex] : null;

      // Reverse geocode for city name
      const locationRes = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=uz`
      );

      setWeatherData({
        temp: current.temperature,
        wind: current.windspeed,
        description: codeInfo.desc,
        humidity: humidity ? humidity.toString() : "N/A",
        icon: codeInfo.icon,
        location: locationRes.data.city,
      });
    } catch {
    } finally {
      setLoadingWeather(false);
    }
  });
}, []);


  // Article row
  const ArticleRow = ({ article }) => (
    <div
      onClick={() => navigate(`/news/${article.lugs}`)}
      className="flex gap-4 items-start cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 py-4 px-4 mb-4 hover:shadow-lg transition"
    >
      <img
        src={article.preview ? `${ServerAPI}/${article.preview}` : "https://placehold.co/160x100?text=No+Image"}
        alt={article[`title_${selectedLanguage}`]}
        className="w-40 h-24 object-cover rounded-lg flex-shrink-0"
        onError={(e) => { e.target.src = 'https://placehold.co/160x100?text=No+Image'; }}
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {article[`title_${selectedLanguage}`]}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {article[`content_${selectedLanguage}`]}
        </p>
      </div>
    </div>
  );

  // Skeletons
  const SkeletonArticleRow = () => (
    <div className="flex gap-4 items-start bg-white rounded-xl overflow-hidden border py-4 px-4 mb-4 animate-pulse">
      <div className="w-40 h-24 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  const SkeletonTopNewsCard = () => (
    <div className="bg-white rounded-xl overflow-hidden border animate-pulse">
      <div className="w-full h-40 bg-gray-200"></div>
      <div className="p-4"><div className="h-6 bg-gray-200 rounded w-3/4"></div></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 bg-gray-100 min-h-screen">
      {/* Categories */}
      {loadingNews ? (
        <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar mb-6 mt-2 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-4 py-2 rounded-full bg-gray-200 h-10 w-24"></div>
          ))}
        </div>
      ) : (
        <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar mb-6 mt-2">
          {categories.map(cat => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Top News */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.topNews}</h2>
        {loadingNews ? (
          <div className="grid md:grid-cols-3 gap-6">
            <SkeletonTopNewsCard /><SkeletonTopNewsCard /><SkeletonTopNewsCard />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {topNews.map(article => (
              <div
                key={article.id}
                onClick={() => navigate(`/news/${article.lugs}`)}
                className="cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                <img
                  src={article.preview ? `${ServerAPI}/${article.preview}` : "https://placehold.co/400x200?text=No+Image"}
                  alt={article[`title_${selectedLanguage}`]}
                  className="w-full h-40 object-cover"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x200?text=No+Image'; }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">{article[`title_${selectedLanguage}`]}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Latest News */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.latestNews}</h2>
        <div>
          {loadingNews ? (
            <>
              <SkeletonArticleRow /><SkeletonArticleRow /><SkeletonArticleRow /><SkeletonArticleRow />
              <SkeletonArticleRow /><SkeletonArticleRow /><SkeletonArticleRow /><SkeletonArticleRow />
            </>
          ) : (
            latestNews.map(article => <ArticleRow key={article.id} article={article} />)
          )}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/lenta')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {t.loadMore}
          </button>
        </div>
      </section>

      {/* Currency & Weather */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl overflow-hidden p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-4 text-gray-900">💱 {t.currency}</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between"><span>USD</span> <span>{currencyRates.USD} {t.som}</span></li>
            <li className="flex justify-between"><span>EUR</span> <span>{currencyRates.EUR} {t.som}</span></li>
            <li className="flex justify-between"><span>RUB</span> <span>{currencyRates.RUB} {t.som}</span></li>
          </ul>
        </div>
        {loadingWeather ? (
          <div className="bg-white rounded-xl overflow-hidden border p-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          </div>
        ) : (
          weatherData && (
            <div className="bg-white rounded-xl overflow-hidden p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center"> 
                <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather icon" className="inline-block w-12 h-12 -ml-2 -mt-2"></img>{t.weather}
              </h3>
              <div className="text-3xl font-bold text-blue-600">{weatherData.temp}°C</div>
              <div className='text-gray-600'>{t.humidity} {weatherData.humidity}% | {t.wind} {weatherData.wind} m/s</div>
              <div className="text-gray-600">{weatherData.location}</div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default Home;
