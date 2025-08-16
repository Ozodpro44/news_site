import './Pages.css';
import React, {useEffect} from 'react';


function Settings() {
    const [selectedLanguage, setSelectedLanguage] = React.useState(localStorage.getItem('selectedLanguage') || 'uz');
    const [darkMode, setDarkMode] = React.useState(localStorage.getItem('darkMode'));

    const translations = {
        uz: {
            settings: "Sozlamalar",
            languageSettings: "Til sozlamalari",
            designSettings: "Dizayn sozlamalari",
            darkMode: "Tungi rejim",
            contact: "Aloqa",
            sendMessage: "Murojat yo'llash",
            aboutSite: "Sayt haqida",
        },
        kr: {
            settings: "Созламалар",
            languageSettings: "Тил созламалари",
            designSettings: "Дизайн созламалари",
            darkMode: "Тунги режим",
            contact: "Алоқа",
            sendMessage: "Мурожаат йўллаш",
            aboutSite: "Сайт ҳақида",
        }
    };

    const t = translations[selectedLanguage];

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        localStorage.setItem('selectedLanguage', newLanguage);
        setSelectedLanguage(newLanguage);
        window.location.reload(); // Reload to apply language changes across the app
    };
    useEffect(() => {
        document.getElementById("darkModeToggle").checked = localStorage.getItem("darkMode") === "true" ? true : false;
        if (localStorage.getItem("darkMode") === "true") {
        document.documentElement.classList.add('dark-mode');
        } else if (localStorage.getItem("darkMode") === "false") {
        document.documentElement.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const handleDarkModeToggle = (e) => {
        if (e.target.checked) {
            setDarkMode(e.target.value);
            localStorage.setItem('darkMode', true);
            document.documentElement.classList.add('dark-mode');
            document.getElementById("darkModeToggle").checked = true;
        } else {
            setDarkMode(e.target.value);
            localStorage.setItem('darkMode', false);
            document.documentElement.classList.remove('dark-mode');
            document.getElementById("darkModeToggle").checked = false;
        }
    };

    localStorage.setItem('lstpg', '/settings');
    if (document.getElementById("searchInput")) {
    document.getElementById("searchInput").value = "";
    }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20" id="mainContent">
        <div id="sozlamalarPage" >
                <div className="flex items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">⚙️ {t.settings}</h2>
                    <div className="ml-4 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 flex-1 max-w-32 rounded"></div>
                </div>
                
                <div className="space-y-6">
                    {/* <!-- Language Settings --> */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🌐 {t.languageSettings}</h3>
                        <div className="space-y-3" onChange={handleLanguageChange}>
                            <label className="flex items-center"><input type="radio" name="language" value="uz" checked={selectedLanguage === 'uz'} className="mr-3 text-blue-600" /><span>O'zbekcha</span></label>
                            <label className="flex items-center"><input type="radio" name="language" value="kr" checked={selectedLanguage === 'kr'} className="mr-3 text-blue-600" /><span>Ўзбекча</span></label>
                        </div>
                    </div>

                    {/* <!-- Theme Settings --> */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 {t.designSettings}</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">{t.darkMode}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="darkModeToggle" className="sr-only peer" onChange={handleDarkModeToggle} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* <!-- Contact and About --> */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Aloqa</h3>
                        <div className="space-y-3"> {/* Removed onclick handlers as they are not defined in React context */}
                            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                                <span className="mr-3">📧</span>
                                <span>{t.sendMessage}</span>
                                <span className="ml-auto">→</span>
                            </button>
                            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                                <span className="mr-3">ℹ️</span>
                                <span>{t.aboutSite}</span>
                                <span className="ml-auto">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Settings;
