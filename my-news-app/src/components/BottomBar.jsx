import './Comps.css'
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BottomBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const translations = {
        uz: {
            home: "Bosh sahifa",
            lenta: "Lenta",
            settings: "Sozlamalar",
        },
        kr: {
            home: "Бош саҳифа",
            lenta: "Лента",
            settings: "Созламалар",
        }
    };

    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
    const t = translations[selectedLanguage];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
            <button onClick={() => navigate('/')} id="homeTab" className={`nav-tab flex flex-col items-center justify-center flex-1 py-2 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-500'}`}>
                <span class="text-xl mb-1">🏠</span>
                <span className="text-xs font-medium">{t.home}</span>
            </button>
            <button onClick={() => navigate('/lenta')} id="lentaTab" className={`nav-tab flex flex-col items-center justify-center flex-1 py-2 ${location.pathname === '/lenta' ? 'text-blue-600' : 'text-gray-500'}`}>
                <span class="text-xl mb-1">📰</span>
                <span className="text-xs font-medium">{t.lenta}</span>
            </button>
            <button onClick={() => navigate('/settings')} id="sozlamalarTab" className={`nav-tab flex flex-col items-center justify-center flex-1 py-2 ${location.pathname === '/settings' ? 'text-blue-600' : 'text-gray-500'}`}>
                <span class="text-xl mb-1">⚙️</span>
                <span className="text-xs font-medium">{t.settings}</span>
            </button>
        </div>
    </nav>
  );
}

export default BottomBar;
