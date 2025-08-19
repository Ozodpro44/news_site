import './Pages.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { motion } from "framer-motion";

const ServerAPI = 'https://newsbackend-production-7d1f.up.railway.app';

function Home() {
  const navigate = useNavigate();

  const translations = {
    uz: { // Default categories, will be replaced by fetched ones
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
  const [selectedCategory] = useState("Barchasi");
  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({ USD: "...", EUR: "...", RUB: "..." }); // Initial state for currency rates
  const [weatherData, setWeatherData] = useState(null);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);

  // 🔹 Fetch news by category
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch categories first
        const categoryRes = await axios.get(`${ServerAPI}/viewer/categories`);
        const fetchedCategories = categoryRes.data.map(cat => cat[`name_${selectedLanguage}`]);
        setCategories(["Barchasi", ...fetchedCategories]);

        const limit = window.innerWidth < 768 ? 4 : 6;
        const catParam = selectedCategory !== "Barchasi" ? `&category=${selectedCategory}` : "";
        const res = await axios.get(`${ServerAPI}/viewer/articles/limit?offset=0&limit=${limit}${catParam}`);
        setTopNews(res.data.slice(0, 3));
        setLatestNews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        // Ensure categories are set even if news fetching fails
        if (categories.length === 0) {
          const categoryRes = (await axios.get(`${ServerAPI}/viewer/categories`)).data;
          setCategories([{id: "all", name_uz: "Barchasi", name_kr: "Барчаси"}, ...categoryRes]);
        }

        setLoadingNews(false);
      }
    }; 
    fetchNews();
  }, [selectedCategory, selectedLanguage, categories.length]);

  // 🔹 Fetch currency
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get("https://www.floatrates.com/daily/uzs.json");
        setCurrencyRates({
          USD: res.data.usd.inverseRate.toFixed(2),
          EUR: res.data.eur.inverseRate.toFixed(2),
          RUB: res.data.rub.inverseRate.toFixed(2),
        });
      } catch (err) {
        console.error("Failed to fetch currency rates:", err);
      }
    };
    fetchRates();
  }, []);

  // 🔹 Fetch weather
   useEffect(() => {
    const weatherCodes = {
      0: selectedLanguage === 'uz' ? "Ochiq osmon" : "Очиқ осмон",
      1: selectedLanguage === 'uz' ? "Asosan ochiq" : "Асосан очиқ",
      2: selectedLanguage === 'uz' ? "Qisman bulutli" : "Қисман булутли",
      3: selectedLanguage === 'uz' ? "Bulutli" : "Булутли",
      45: selectedLanguage === 'uz' ? "Tuman" : "Туман",
      48: selectedLanguage === 'uz' ? "Qirovli tuman" : "Қировли туман",
      51: selectedLanguage === 'uz' ? "Yengil maydalash" : "Енгил майдалаш",
      53: selectedLanguage === 'uz' ? "O'rtacha maydalash" : "Ўртача майдалаш",
      55: selectedLanguage === 'uz' ? "Kuchli maydalash" : "Кучли майдалаш",
      56: selectedLanguage === 'uz' ? "Yengil muzli maydalash" : "Енгил музли майдалаш",
      57: selectedLanguage === 'uz' ? "Kuchli muzli maydalash" : "Кучли музли майдалаш",
      61: selectedLanguage === 'uz' ? "Yengil yomg'ir" : "Енгил ёмғир",
      63: selectedLanguage === 'uz' ? "O'rtacha yomg'ir" : "Ўртача ёмғир",
      65: selectedLanguage === 'uz' ? "Kuchli yomg'ir" : "Кучли ёмғир",
      66: selectedLanguage === 'uz' ? "Yengil muzli yomg'ir" : "Енгил музли ёмғир",
      67: selectedLanguage === 'uz' ? "Kuchli muzli yomg'ir" : "Кучли музли ёмғир",
      71: selectedLanguage === 'uz' ? "Yengil qor" : "Енгил қор",
      73: selectedLanguage === 'uz' ? "O'rtacha qor" : "Ўртача қор",
      75: selectedLanguage === 'uz' ? "Kuchli qor" : "Кучли қор",
      77: selectedLanguage === 'uz' ? "Qor donalari" : "Қор доналари",
      80: selectedLanguage === 'uz' ? "Yengil yomg'ir shiddati" : "Енгил ёмғир шиддати",
      81: selectedLanguage === 'uz' ? "O'rtacha yomg'ir shiddati" : "Ўртача ёмғир шиддати",
      82: selectedLanguage === 'uz' ? "Kuchli yomg'ir shiddati" : "Кучли ёмғир шиддати",
      85: selectedLanguage === 'uz' ? "Yengil qor shiddati" : "Енгил қор шиддати",
      86: selectedLanguage === 'uz' ? "Kuchli qor shiddati" : "Кучли қор шиддати",
      95: selectedLanguage === 'uz' ? "Momaqaldiroq" : "Момақалдироқ",
      96: selectedLanguage === 'uz' ? "Yengil do'l bilan momaqaldiroq" : "Енгил дўл билан момақалдироқ",
      99: selectedLanguage === 'uz' ? "Kuchli do'l bilan momaqaldiroq" : "Кучли дўл билан момақалдироқ",
    };
    const weatherIcon = {
      0: "01d",1:"02d",2:"03d",3:"04d",45:"50d",48:"50d",56:"13d",57:"13d",61:"09d",63:"09d",65:"09d",66:"13d",67:"13d",71:"13d",73:"13d",
      75:"13d",77:"13d",80:"09d",81:"09d",82:"09d",85:"13d",86:"13d",
      95:"11d",96:"11d",99:"11d"
    }

    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // Reverse geocode for location name
        const locRes = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const town = locRes.data.address.town || locRes.data.address.city || locRes.data.address.village || "Unknown";

        // Weather from Open-Meteo
        const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const current = weatherRes.data.current_weather;

        setWeatherData({
          temp: current.temperature,
          wind: current.windspeed,
          description: weatherCodes[current.weathercode] || (selectedLanguage === 'uz' ? "Noma'lum" : "Номаълум"),
          humidity: weatherRes.data.current_weather.relativehumidity_2m,
          icon: weatherIcon[current.weathercode] || "01d", // Default icon if not found
          location: town
        });
      } catch (err) {
        console.error("Weather fetch failed:", err);
      } finally { setLoadingWeather(false); }
    });
  }, [selectedLanguage]);

  // Dark mode
  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');
  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // 🔹 Shimmer loader (skeleton)
  const ShimmerCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col animate-pulse">
      <div className="w-full h-48 bg-gray-200 "></div>
      <div className="p-5 flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="p-5 pt-0">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  // Shimmer loader for categories
  const ShimmerCategory = () => (
    <div className="px-4 py-2 rounded-full bg-gray-200 animate-pulse w-24 h-10"></div>
  );

  // 🔹 Shimmer loader for news cards
  // (Already defined as ShimmerCard)


  // 🔹 Article card with animation & hover
  const ArticleCard = ({ article, index }) => (
    <div
      whileHover={{ scale: 1.03, boxShadow: "0 20px 30px rgba(0,0,0,0.2)" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform"
    >
      <img
        src={article.preview ? `${ServerAPI}/${article.preview}` : "https://placehold.co/400x200?text=No+Preview+Image"}
        alt={article[`title_${selectedLanguage}`]}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.src = "https://placehold.co/400x200?text=No+Preview+Image"; }}
      />
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {article[`title_${selectedLanguage}`]}
        </h3>
      </div>
      <div className="p-5 pt-0">
        <button
          onClick={() => navigate(`/news/${article.lugs}`)}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          {t.readMore} →
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* 🔹 Categories */}
      <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar mb-6 mt-4" id="categories">
        {loadingNews ? (
          Array.from({ length: 5 }).map((_, i) => <ShimmerCategory key={i} />)
        ) : (
          categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(`/lenta?category=${encodeURIComponent(cat.id)}`)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-transform duration-200 ${selectedCategory === cat.id ? "bg-blue-600 text-white scale-105" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {cat["name_" + selectedLanguage]}
            </button>
          ))
        )}
      </div>

      {/* 🔹 Top News */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-x">
            {t.topNews}
          </h2>
          <div className="ml-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-1 max-w-32 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingNews ? Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)
 : topNews.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
        </div>
      </section>

      {/* 🔹 Latest News */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 animate-gradient-x">
            {t.latestNews}
          </h2>
          <div className="ml-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 flex-1 max-w-32 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingNews ? Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)
 : latestNews.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
        </div>
        {!loadingNews && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate(`/lenta`)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {t.loadMore}
            </button>
          </div>
        )}
      </section>

      {/* 🔹 Currency & Weather */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="currency-card text-white rounded-2xl p-8 bg-gradient-to-r from-blue-500 to-purple-500">
          <h3 className="text-2xl font-bold mb-6">💱 {t.currency}</h3>
          <div className="space-y-4">
            <div className="flex justify-between bg-white bg-opacity-20 rounded-lg p-4">
              <span className="font-medium">USD</span>
              <span className="font-bold">{currencyRates.USD} {t.som}</span>
            </div>
            <div className="flex justify-between bg-white bg-opacity-20 rounded-lg p-4">
              <span className="font-medium">EUR</span>
              <span className="font-bold">{currencyRates.EUR} {t.som}</span>
            </div>
            <div className="flex justify-between bg-white bg-opacity-20 rounded-lg p-4">
              <span className="font-medium">RUB</span>
              <span className="font-bold">{currencyRates.RUB} {t.som}</span>
            </div>
          </div>
        </div>

        {!loadingWeather && weatherData && (
          <div className="weather-card text-white rounded-2xl p-8 bg-gradient-to-r from-yellow-500 to-orange-500">
            <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold"> {t.weather}</h3>
            <div className="text-sm opacity-75">{weatherData.location}</div>
          </div>
            <div className="text-center">
              <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather" className="w-20 h-20 mx-auto"/>
              <div className="text-4xl font-bold">{weatherData.temp}°C</div>
              <div className="opacity-80">{weatherData.description}</div>
            </div>
            <div className="flex justify-between mt-6">
              <div>{t.humidity}: <b>{weatherData.humidity}%</b></div>
              <div>{t.wind}: <b>{weatherData.wind} m/s</b></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
