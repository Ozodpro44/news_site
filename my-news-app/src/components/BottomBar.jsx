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

    const navItems = [
        { id: 'home', path: '/', icon: '🏠', label: t.home },
        { id: 'lenta', path: '/lenta', icon: '📰', label: t.lenta },
        { id: 'settings', path: '/settings', icon: '⚙️', label: t.settings }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div className="flex justify-around items-center h-14">
                {navItems.map(item => {
                    const active = location.pathname === item.path;
                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`nav-tab flex flex-col items-center justify-center flex-1 py-1 relative 
                              ${active ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
                        >
                            {/* Активная линия сверху */}
                            {active && (
                                <span className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600"></span>
                            )}
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-[11px] mt-0.5">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default BottomBar;
