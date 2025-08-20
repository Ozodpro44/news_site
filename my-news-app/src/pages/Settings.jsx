import './Pages.css';
import React, { useState } from 'react';

function Settings() {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'uz');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === "true");

  const translations = {
    uz: {
      settings: "Sozlamalar",
      languageSettings: "Til sozlamalari",
      designSettings: "Dizayn",
      darkMode: "Tungi rejim",
      contact: "Aloqa",
      sendMessage: "Murojaat yo'llash",
      aboutSite: "Sayt haqida",
    },
    kr: {
      settings: "Созламалар",
      languageSettings: "Тил созламалари",
      designSettings: "Дизайн",
      darkMode: "Тунги режим",
      contact: "Алоқа",
      sendMessage: "Мурожаат йўллаш",
      aboutSite: "Сайт ҳақида",
    }
  };

  const t = translations[selectedLanguage];

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    localStorage.setItem('selectedLanguage', newLang);
    setSelectedLanguage(newLang);
    window.location.reload();
  };

  const handleDarkModeToggle = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem('darkMode', newVal);
    if (newVal) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);



  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Заголовок */}
        <h1 className="text-2xl font-bold mb-6">{t.settings}</h1>

        {/* Язык */}
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <h3 className="px-4 py-3 text-gray-700 font-semibold border-b">{t.languageSettings}</h3>
          <div className="divide-y">
            <label className="flex items-center px-4 py-3">
              <input
                type="radio"
                name="lang"
                value="uz"
                checked={selectedLanguage === "uz"}
                onChange={handleLanguageChange}
                className="mr-3 form-radio text-blue-600 focus:ring-blue-500"
              />
              <span>O‘zbekcha</span>
            </label>
            <label className="flex items-center px-4 py-3">
              <input
                type="radio"
                name="lang"
                value="kr"
                checked={selectedLanguage === "kr"}
                onChange={handleLanguageChange}
                className="mr-3 form-radio text-blue-600 focus:ring-blue-500"
              />
              <span>Ўзбекча</span>
            </label>
          </div>
        </div>

        {/* Дизайн */}
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <h3 className="px-4 py-3 text-gray-700 font-semibold border-b">{t.designSettings}</h3>
          <div className="flex items-center justify-between px-4 py-3">
            <span>{t.darkMode}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-blue-300 
                peer-focus:ring 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all 
                peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {/* Контакты */}
        <div className="bg-white rounded-xl overflow-hidden">
          <h3 className="px-4 py-3 text-gray-700 font-semibold border-b">{t.contact}</h3>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center">
            📧 <span className="ml-3">{t.sendMessage}</span>
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center">
            ℹ️ <span className="ml-3">{t.aboutSite}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
