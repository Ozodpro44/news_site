import React from 'react';

function PopupCookie() {
  const [showPopup, setShowPopup] = React.useState(false);

  const translations = {
    uz: {
      cookieTitle: "Cookie-lardan foydalanish",
      cookieText: "Biz cookie-lardan foydalanamiz, bu sayt ishini yaxshilashga yordam beradi.",
      accept: "Qabul qilish",
      decline: "Rad etish",
    },
    kr: {
      cookieTitle: "Cookie-лардан фойдаланиш",
      cookieText: "Биз cookie-лардан фойдаланамиз, бу сайт ишини яхшилашга ёрдам беради.",
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
    <div
      id="cookiePopup"
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[500px] bg-white border border-gray-200 rounded-2xl shadow-lg p-5 z-50 animate-slideUp"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-gray-900 font-semibold text-sm mb-1">🍪 {t.cookieTitle}</p>
          <p className="text-gray-600 text-sm">{t.cookieText}</p>
        </div>
        <div className="flex space-x-2">
          <button
            id="acceptCookies"
            onClick={acceptCookieConsent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {t.accept}
          </button>
          <button
            id="declineCookies"
            onClick={declineCookieConsent}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {t.decline}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupCookie;
