import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const translations = {
    uz: {
      subtitle: "Yangiliklar portali",
      searchPlaceholder: "Qidiruv...",
    },
    kr: {
      subtitle: "Янгиликлар портали",
      searchPlaceholder: "Қидирув...",
    }
  };

  const [currentDate, setCurrentDate] = React.useState('');
  const [selectedLanguage] = React.useState(localStorage.getItem('selectedLanguage') || 'uz');

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    localStorage.setItem('selectedLanguage', lang);
    window.location.reload();
  };

  React.useEffect(() => {
    const date = new Date();
    let lang = selectedLanguage === "kr" ? "uz-Cyrl-UZ" : "uz-Uz";
    setCurrentDate(date.toLocaleDateString(lang, {
      weekday: 'long', month: 'long', day: 'numeric'
    }));
  }, [selectedLanguage]);

  const searchHistoryList = () => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      const historyListElement = document.getElementById("history-list");
      if (historyListElement) {
        historyListElement.classList.remove("hidden");
        const historyList = JSON.parse(history);
        historyListElement.innerHTML = "";
        historyList.forEach(item => {
          const listItem = document.createElement("li");
          listItem.className = "px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-900";
          listItem.innerHTML = `<span>${item}</span>`;
          historyListElement.appendChild(listItem);
        });
      }
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-3">

          {/* Лого / Название */}
          <div className="flex items-center cursor-pointer min-w-0"
            onClick={() => window.location.href = '/'}>
            <h1 className="text-xl font-bold text-blue-600 truncate">
              MyNews
            </h1>
            <span className="ml-2 text-xs text-gray-500 hidden sm:inline">
              {translations[selectedLanguage].subtitle}
            </span>
          </div>

          {/* Поиск */}
          <div className="flex-1 max-w-xl mx-4 relative">
            <div className="relative">
              <input
                type="text"
                id="searchInput"
                placeholder={translations[selectedLanguage].searchPlaceholder}
                onClick={searchHistoryList}
                onBlur={() => document.getElementById("history-list").classList.add("hidden")}
                onChange={(e) => {
                  const query = e.target.value;
                  if (query) navigate(`/search?query=${query}`);
                  else navigate(localStorage.getItem('lstpg'));
                }}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <ul id="history-list"
                className="absolute bg-white border border-gray-200 rounded-lg mt-1 w-full shadow-md hidden z-10 max-h-60 overflow-y-auto text-sm">
              </ul>
            </div>
          </div>

          {/* Язык + Дата */}
          <div className="flex items-center gap-3">
            <select
              id="languageSelect"
              onChange={handleLanguageChange}
              value={selectedLanguage}
              className="appearance-none bg-gray-50 border border-gray-300 rounded-md px-2 py-1 text-sm cursor-pointer hover:border-blue-400 focus:ring-1 focus:ring-blue-500"
            >
              <option value="uz">O'zbekcha</option>
              <option value="kr">Ўзбекча</option>
            </select>

            <div className="hidden sm:block text-xs text-gray-500 whitespace-nowrap">
              {currentDate}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
