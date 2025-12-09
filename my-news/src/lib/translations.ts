export const translations = {
  breaking: {
    uz: 'Tezkor',
    kr: 'Тезкор',
  },
  uncategorized: {
    uz: 'Kategoriyasiz',
    kr: 'Категориясиз',
  },
  readMore: {
    uz: "O'qish",
    kr: 'Ўқиш',
  },
  views: {
    uz: 'Ko\'rishlar',
    kr: 'Кўришлар',
  },
  noResults: {
    uz: 'Natijalar topilmadi',
    kr: 'Натижалар топилмади',
  },
  search: {
    uz: 'Qidirish',
    kr: 'Қидиш',
  },
  loading: {
    uz: 'Yuklanyapti...',
    kr: 'Юкланмоқда...',
  },
  error: {
    uz: 'Xato yuz berdi',
    kr: 'Хато юз берди',
  },
};

export const t = (key: keyof typeof translations, language: 'uz' | 'kr') => {
  return translations[key][language] || '';
};
