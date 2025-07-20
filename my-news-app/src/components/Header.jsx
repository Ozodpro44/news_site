import React from 'react';
import {useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const translations = {
            uz: {
                subtitle: "Yangiliklar portali",
                searchPlaceholder: "Yangiliklar qidirish...",
            },
            kr: {
                subtitle: "Янгиликлар портали",
                searchPlaceholder: "Янгиликлар қидириш...",
            },
            ru: {
                subtitle: "Новостной портал",
                searchPlaceholder: "Поиск новостей...",
            },
            en: {
                subtitle: "News Portal",
                searchPlaceholder: "Search news...",
            }
        };

    const [currentDate, setCurrentDate] = React.useState('');

    const [selectedLanguage ] = React.useState(localStorage.getItem('selectedLanguage') || 'uz');

    // Function to handle language change
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value; // Get the selected language value
        localStorage.setItem('selectedLanguage', selectedLanguage); // Store the selected language in localStorage
        // setSelectedLanguage(selectedLanguage); // Update the state
        window.location.reload(); // Reload the page to apply the new language
        // updateLanguage();
    };
    var lang = 'uz-Uz'

    switch (selectedLanguage) {
        case "uz":
            lang = "uz-Uz";
            break;
        case "kr":
            lang = "uz-Cyrl-UZ"; // Correct locale for Cyrillic Uzbek
            break;
        case "ru":
            lang = "ru-RU";
            break;
        case "en":
            lang = "en-US";
            break;
        default:
            lang = "uz-Uz";
    }

    React.useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, [lang]);

    const [darkMode] = React.useState(localStorage.getItem('darkMode') === 'true' ? true : false);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const searchHistoryList = () => {
        const history = localStorage.getItem("searchHistory");
        if (history) {
            const historyListElement = document.getElementById("history-list");
            if (historyListElement) { // Check if the element exists before manipulating it
                historyListElement.classList.remove("hidden");
                const historyList = JSON.parse(history);
                historyListElement.innerHTML = "";
                historyList.forEach(item => {
                    const listItem = document.createElement("li");
                    listItem.className = "p-2 hover:bg-gray-100 cursor-pointer text-gray-900";
                    listItem.innerHTML = `<span class="font-medium">${item}</span>`;
                    historyListElement.appendChild(listItem);
                });
            }
        }
    }
    
  return (
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-14 sm:h-16 gap-4">
                <div class="flex items-center min-w-0" onClick={() => window.location.href = '/'}>
                    <h1 class="text-xl sm:text-2xl font-bold text-blue-600 cursor-pointer truncate" onclick="goHome()">MyNews</h1>
                    <span class="ml-2 text-xs sm:text-sm text-gray-500 hidden sm:inline">{translations[selectedLanguage].subtitle}</span>
                </div>
                
                {/* <!-- Search Bar --> */}
                <div class="flex-1 max-w-md mx-4 relative">
                    <div class="relative" onChange={(e) => {
                            const query = e.target.value;
                            if (query) {
                                navigate(`/search?query=${query}`); // This will trigger a re-render of SearchResult
                            } else {
                                navigate(localStorage.getItem('lstpg'));
                            }
                    }}>
                        <input type="text" id="searchInput" placeholder={translations[selectedLanguage].searchPlaceholder} onClick={searchHistoryList} onBlur={() => document.getElementById("history-list").classList.add("hidden")}
                               class="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                        <ul id="history-list" className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full shadow-lg hidden z-10 max-h-60 overflow-y-auto">
                            {/* History items will be dynamically added here */}
                        </ul>
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    {/* <!-- Language Selector --> */}
                    <div class="relative" >
                        <select id="languageSelect" onChange={handleLanguageChange} class="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer" value={selectedLanguage} >
                            <option value="uz" >O'zbekcha</option>
                            <option value="kr" >Ўзбекча</option>
                            <option value="ru" >Русский</option>
                            <option value="en" >English</option>
                        </select>
                    </div>

                    <div class="text-xs sm:text-sm text-gray-500 flex-shrink-0 hidden sm:block" id="currentDate">
                        {currentDate}
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}

// function updateLanguage() {
    // const translations = {
    //         uz: {
    //             title: "MyNews",
    //             subtitle: "Yangiliklar portali",
    //             topNews: "Dolzarb habarlar",
    //             latestNews: "So'nggi yangiliklar",
    //             lenta: "Lenta",
    //             settings: "Sozlamalar",
    //             home: "Bosh sahifa",
    //             loadMore: "Ko'proq yangiliklar",
    //             loading: "Yuklanmoqda...",
    //             views: "ko'rishlar",
    //             today: "Bugun",
    //             yesterday: "Kecha",
    //             daysAgo: "kun oldin",
    //             languageSettings: "Til sozlamalari",
    //             designSettings: "Dizayn sozlamalari",
    //             darkMode: "Tungi rejim",
    //             contact: "Aloqa",
    //             sendMessage: "Murojat yo'llash",
    //             aboutSite: "Sayt haqida",
    //             backToHome: "Orqaga qaytish",
    //             recommended: "Tavsiya etiladigan yangiliklar",
    //             currency: "Dollar kursi",
    //             weather: "Ob-havo",
    //             humidity: "Namlik",
    //             wind: "Shamol",
    //             searchPlaceholder: "Yangiliklar qidirish...",
    //             searchResults: "Qidiruv natijalari",
    //             searchFor: "uchun qidiruv natijalari",
    //             noResults: "Hech narsa topilmadi",
    //             tryOtherKeywords: "Boshqa kalit so'zlar bilan qidirib ko'ring",
    //             back: "Orqaga"
    //         },
    //         kr: {
    //             title: "MyNews",
    //             subtitle: "Янгиликлар портали",
    //             topNews: "Долзарб хабарлар",
    //             latestNews: "Сўнгги янгиликлар",
    //             lenta: "Лента",
    //             settings: "Созламалар",
    //             home: "Бош саҳифа",
    //             loadMore: "Кўпроқ янгиликлар",
    //             loading: "Юкланмоқда...",
    //             views: "кўришлар",
    //             today: "Бугун",
    //             yesterday: "Кеча",
    //             daysAgo: "кун олдин",
    //             languageSettings: "Тил созламалари",
    //             designSettings: "Дизайн созламалари",
    //             darkMode: "Тунги режим",
    //             contact: "Алоқа",
    //             sendMessage: "Мурожаат йўллаш",
    //             aboutSite: "Сайт ҳақида",
    //             backToHome: "Ортга қайтиш",
    //             recommended: "Тавсия этиладиган янгиликлар",
    //             currency: "Доллар курси",
    //             weather: "Об-ҳаво",
    //             humidity: "Намлик",
    //             wind: "Шамол",
    //             searchPlaceholder: "Янгиликлар қидириш...",
    //             searchResults: "Қидирув натижалари",
    //             searchFor: "учун қидирув натижалари",
    //             noResults: "Ҳеч нарса топилмади",
    //             tryOtherKeywords: "Бошқа калит сўзлар билан қидириб кўринг",
    //             back: "Ортга"
    //         },
    //         ru: {
    //             title: "MyNews",
    //             subtitle: "Новостной портал",
    //             topNews: "Актуальные новости",
    //             latestNews: "Последние новости",
    //             lenta: "Лента",
    //             settings: "Настройки",
    //             home: "Главная",
    //             loadMore: "Больше новостей",
    //             loading: "Загрузка...",
    //             views: "просмотров",
    //             today: "Сегодня",
    //             yesterday: "Вчера",
    //             daysAgo: "дней назад",
    //             languageSettings: "Языковые настройки",
    //             designSettings: "Настройки дизайна",
    //             darkMode: "Темный режим",
    //             contact: "Контакты",
    //             sendMessage: "Отправить сообщение",
    //             aboutSite: "О сайте",
    //             backToHome: "Вернуться назад",
    //             recommended: "Рекомендуемые новости",
    //             currency: "Курс доллара",
    //             weather: "Погода",
    //             humidity: "Влажность",
    //             wind: "Ветер",
    //             searchPlaceholder: "Поиск новостей...",
    //             searchResults: "Результаты поиска",
    //             searchFor: "результаты поиска для",
    //             noResults: "Ничего не найдено",
    //             tryOtherKeywords: "Попробуйте другие ключевые слова",
    //             back: "Назад"
    //         },
    //         en: {
    //             title: "MyNews",
    //             subtitle: "News Portal",
    //             topNews: "Top News",
    //             latestNews: "Latest News",
    //             lenta: "Feed",
    //             settings: "Settings",
    //             home: "Home",
    //             loadMore: "Load More News",
    //             loading: "Loading...",
    //             views: "views",
    //             today: "Today",
    //             yesterday: "Yesterday",
    //             daysAgo: "days ago",
    //             languageSettings: "Language Settings",
    //             designSettings: "Design Settings",
    //             darkMode: "Dark Mode",
    //             contact: "Contact",
    //             sendMessage: "Send Message",
    //             aboutSite: "About Site",
    //             backToHome: "Go Back",
    //             recommended: "Recommended News",
    //             currency: "Dollar Rate",
    //             weather: "Weather",
    //             humidity: "Humidity",
    //             wind: "Wind",
    //             searchPlaceholder: "Search news...",
    //             searchResults: "Search Results",
    //             searchFor: "search results for",
    //             noResults: "Nothing found",
    //             tryOtherKeywords: "Try other keywords",
    //             back: "Back"
    //         }
    //     };
    //         const t = translations[currentLanguage];
            
    //         // Update header
    //         document.querySelector('h1').textContent = t.title;
    //         document.querySelector('h1').nextElementSibling.textContent = t.subtitle;
            
    //         // Update search placeholder
    //         document.getElementById('searchInput').placeholder = t.searchPlaceholder;
            
    //         // Update section titles
    //         document.querySelector('#homePage h2').textContent = t.topNews;
    //         document.querySelectorAll('#homePage h2')[1].textContent = t.latestNews;
    //         document.querySelector('#lentaPage h2').textContent = `📰 ${t.lenta}`;
    //         document.querySelector('#sozlamalarPage h2').textContent = `⚙️ ${t.settings}`;
    //         document.querySelector('#searchResultsPage h2').textContent = `🔍 ${t.searchResults}`;
            
    //         // Update navigation
    //         document.querySelector('#homeTab .text-xs').textContent = t.home;
    //         document.querySelector('#lentaTab .text-xs').textContent = t.lenta;
    //         document.querySelector('#sozlamalarTab .text-xs').textContent = t.settings;
            
    //         // Update buttons
    //         document.querySelectorAll('button').forEach(btn => {
    //             if (btn.textContent.includes('Ko\'proq yangiliklar') || btn.textContent.includes('Больше новостей') || btn.textContent.includes('Load More News')) {
    //                 btn.textContent = t.loadMore;
    //             }
    //             if (btn.textContent.includes('Ko\'proq yuklash') || btn.textContent.includes('Загрузить еще') || btn.textContent.includes('Load More')) {
    //                 btn.textContent = t.loadMore;
    //             }
    //             if (btn.textContent.includes('Orqaga') || btn.textContent.includes('Назад') || btn.textContent.includes('Back')) {
    //                 btn.innerHTML = `← ${t.back}`;
    //             }
    //         });
            
    //         // Update search results page
    //         const noResultsTitle = document.querySelector('#noResults h3');
    //         const noResultsText = document.querySelector('#noResults p');
    //         if (noResultsTitle) noResultsTitle.textContent = t.noResults;
    //         if (noResultsText) noResultsText.textContent = t.tryOtherKeywords;
            
    //         // Update settings page
    //         const settingsTexts = document.querySelectorAll('#sozlamalarPage h3');
    //         if (settingsTexts[0]) settingsTexts[0].textContent = `🌐 ${t.languageSettings}`;
    //         if (settingsTexts[1]) settingsTexts[1].textContent = `🎨 ${t.designSettings}`;
    //         if (settingsTexts[2]) settingsTexts[2].textContent = `📞 ${t.contact}`;
            
    //         // Update dark mode label
    //         const darkModeLabel = document.querySelector('#darkModeToggle').parentElement.previousElementSibling;
    //         if (darkModeLabel) darkModeLabel.textContent = t.darkMode;
            
    //         // Update contact buttons
    //         const contactButtons = document.querySelectorAll('#sozlamalarPage button span');
    //         if (contactButtons[1]) contactButtons[1].textContent = t.sendMessage;
    //         if (contactButtons[3]) contactButtons[3].textContent = t.aboutSite;
            
    //         // Update currency and weather titles
    //         const currencyTitle = document.querySelector('.currency-card h3');
    //         const weatherTitle = document.querySelector('.weather-card h3');
    //         if (currencyTitle) currencyTitle.textContent = `💱 ${t.currency}`;
    //         if (weatherTitle) weatherTitle.textContent = `🌤️ ${t.weather}`;
    //     }

export default Header;
