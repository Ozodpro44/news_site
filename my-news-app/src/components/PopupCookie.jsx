import React from 'react';

function PopupCookie() {
  const [showPopup, setShowPopup] = React.useState(false); // Changed initial state to true
 
  const translations = {
    uz: {
      cookieTitle: "Cookie-lardan foydalanish",
      cookieText: "Saytimizdan foydalanishni yaxshilash uchun cookie-lardan foydalanamiz.",
      accept: "Qabul qilish",
      decline: "Rad etish",
    },
    kr: {
      cookieTitle: "Cookie-лардан фойдаланиш",
      cookieText: "Сайтимиздан фойдаланишни яхшилаш учун кукие-лардан фойдаланамиз.",
      accept: "Қабул қилиш",
      decline: "Рад этиш",
    },
  };
  React.useEffect(() => { 
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) { 
      setShowPopup(true); 
    }
  }, []);

  const acceptCookieConsent = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setShowPopup(false);
  };

  const declineCookieConsent = () => {
    setShowPopup(false);
  };

  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
  const t = translations[selectedLanguage];

  if (!showPopup) return null;

  return (
     <div id="cookiePopup" className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 cookie-popup z-40">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div class="mb-4 sm:mb-0">
                <p className="text-gray-700">
                    <span class="font-medium">🍪 {t.cookieTitle}</span><br />
                    <span class="text-sm">{t.cookieText}</span>
                </p>
            </div>
            <div class="flex space-x-3">
                <button id="acceptCookies" onClick={acceptCookieConsent} class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">{t.accept}</button>
                <button id="declineCookies" onClick={declineCookieConsent} class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">{t.decline}</button>
            </div>
        </div>
    </div>
  );
}

export default PopupCookie;
