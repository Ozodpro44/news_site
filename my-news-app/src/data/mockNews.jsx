export const categories = [
  { slug: "jamiyat", name: "Jamiyat", icon: "Users", colorClass: "text-blue-600" },
  { slug: "texnologiya", name: "Texnologiya", icon: "Cpu", colorClass: "text-purple-600" },
  { slug: "iqtisodiyot", name: "Iqtisodiyot", icon: "TrendingUp", colorClass: "text-green-600" },
  { slug: "sport", name: "Sport", icon: "Trophy", colorClass: "text-orange-600" },
  { slug: "madaniyat", name: "Madaniyat", icon: "Palette", colorClass: "text-pink-600" },
  { slug: "dunyo", name: "Dunyo", icon: "Globe", colorClass: "text-cyan-600" },
  { slug: "siyosat", name: "Siyosat", icon: "Building", colorClass: "text-red-600" },
  { slug: "fan", name: "Fan", icon: "Microscope", colorClass: "text-indigo-600" },
];

export const mockNews = [
  {
    id: "1",
    title: "O'zbekistonda sun'iy intellekt markazlari ochilmoqda",
    summary: "Toshkent shahrida yangi zamonaviy AI tadqiqot markazi o'z eshiklarini ochdi. Markaz o'zbek tilida ishlash uchun maxsus modellar yaratadi.",
    content: `
      <p>Bugun Toshkent shahrida O'zbekiston birinchi sun'iy intellekt tadqiqot markazi o'z faoliyatini boshladi. Markaz mahalliy va xalqaro mutaxassislarni birlashtiradi.</p>
      <p>Markaz asosiy yo'nalishlari:</p>
      <ul>
        <li>O'zbek tili uchun til modellari yaratish</li>
        <li>Ta'lim sohasida AI tatbiqlari</li>
        <li>Sog'liqni saqlashda sun'iy intellekt</li>
        <li>Qishloq xo'jaligida zamonaviy texnologiyalar</li>
      </ul>
      <p>Markaz rahbari ta'kidlashicha, 2025-yil oxirigacha 500 dan ortiq mutaxassis tayyorlanadi.</p>
    `,
    category: "texnologiya",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "2025-01-15T10:30:00",
    views: 15420,
    likes: 892,
    hashtags: ["Texnologiya", "AI", "Innovatsiya"],
    isBreaking: true,
    isTrending: true,
  },
  {
    id: "2",
    title: "O'zbekiston futbol terma jamoasi jahon chempionati uchun tayyorgarlik ko'rmoqda",
    summary: "Milliy jamoa navbatdagi uchrashuvga intensiv mashg'ulotlar olib bormoqda. Murabbiylar yangi strategiya ishlab chiqdi.",
    content: `
      <p>O'zbekiston futbol terma jamoasi 2026-yilgi Jahon chempionatiga saralash bosqichiga tayyorgarlik ko'rmoqda.</p>
      <p>Bosh murabbiy Srečko Katanec yangi o'yinchilar tarkibini e'lon qildi. Jamoa kelasi oy ikki do'stona o'yin o'tkazadi.</p>
    `,
    category: "sport",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80"
    ],
    date: "2025-01-15T09:15:00",
    views: 12340,
    likes: 765,
    hashtags: ["Sport", "Futbol", "JahonaChempionati"],
    isTrending: true,
  },
  {
    id: "3",
    title: "Yangi iqtisodiy islohotlar: tadbirkorlar uchun imkoniyatlar kengaymoqda",
    summary: "Hukumat kichik va o'rta biznes uchun yangi imtiyozlar paketini taqdim etdi. Soliq yuklari kamayadi.",
    content: `
      <p>O'zbekiston hukumati kichik va o'rta biznesni qo'llab-quvvatlash bo'yicha yangi dasturni e'lon qildi.</p>
      <p>Asosiy o'zgarishlar:</p>
      <ul>
        <li>Soliq stavkalari 30% kamayadi</li>
        <li>Startup'lar uchun grantlar ajratiladi</li>
        <li>Eksport yo'nalishiga katta e'tibor</li>
      </ul>
    `,
    category: "iqtisodiyot",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    ],
    date: "2025-01-15T08:00:00",
    views: 9876,
    likes: 543,
    hashtags: ["Iqtisodiyot", "Biznes", "Islohotlar"],
  },
  {
    id: "4",
    title: "Toshkent shahrida yangi metro liniyasi ochildi",
    summary: "Shahar aholisi uchun transport muammosi hal qilindi. Yangi liniya 15 bekatni birlashtiradi.",
    content: `
      <p>Bugun Toshkent metrosining yangi "Chilonzor-2" liniyasi rasman ochildi. Liniya 15 bekatni o'z ichiga oladi.</p>
      <p>Yangi liniya shaharning janubiy qismini shimoliy qismi bilan bog'laydi va kuniga 100 mingdan ortiq yo'lovchiga xizmat ko'rsatishi kutilmoqda.</p>
    `,
    category: "jamiyat",
    images: [
      "https://images.unsplash.com/photo-1580479408339-53f93de1a3f9?w=800&q=80"
    ],
    date: "2025-01-14T16:45:00",
    views: 18765,
    likes: 1234,
    hashtags: ["Jamiyat", "Transport", "Metro"],
    isBreaking: true,
  },
  {
    id: "5",
    title: "O'zbek kinoси xalqaro festivalda mukofot oldi",
    summary: "Milliy kino asari Kannda nufuzli mukofotga sazovor bo'ldi. Bu tarixiy yutuq hisoblanadi.",
    content: `
      <p>"Oq qo'tan" filmi Kann kinofestivalida "Eng yaxshi rejissura" mukofotini qo'lga kiritdi.</p>
      <p>Film O'zbekistonning zamonaviy hayoti haqida hikoya qiladi va xalqaro tanqidchilar tomonidan yuqori baholandi.</p>
    `,
    category: "madaniyat",
    images: [
      "https://images.unsplash.com/photo-1574267432644-f410f8ec3a3f?w=800&q=80"
    ],
    date: "2025-01-14T14:20:00",
    views: 7654,
    likes: 432,
    hashtags: ["Madaniyat", "Kino", "Mukofot"],
  },
  {
    id: "6",
    title: "Xalqaro hamkorlik: O'zbekiston va Koreya yangi shartnoma imzoladi",
    summary: "Ikki mamlakat o'rtasida texnologiya va ta'lim sohasida keng qamrovli shartnoma tuzildi.",
    content: `
      <p>O'zbekiston va Janubiy Koreya o'rtasida strategik hamkorlik to'g'risida muhim hujjat imzolandi.</p>
      <p>Shartnoma asosida yangi zavod, universitetlar va tadqiqot markazlari ochiladi.</p>
    `,
    category: "dunyo",
    images: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
    ],
    date: "2025-01-14T11:30:00",
    views: 6543,
    likes: 321,
    hashtags: ["Dunyo", "Hamkorlik", "Koreya"],
  },
  {
    id: "7",
    title: "Ta'lim tizimida yangi dasturlar joriy qilinmoqda",
    summary: "Maktablarda STEM yo'nalishida ta'lim kuchaytiriladi. Zamonaviy uskunalar bilan jihozlanmoqda.",
    content: `
      <p>O'zbekiston ta'lim vazirligi maktablarda STEM (Science, Technology, Engineering, Mathematics) ta'limini rivojlantirish dasturini boshladi.</p>
      <p>Dastur doirasida 1000 dan ortiq maktab zamonaviy laboratoriyalar bilan jihozlanadi.</p>
    `,
    category: "jamiyat",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    date: "2025-01-14T10:00:00",
    views: 8900,
    likes: 567,
    hashtags: ["Jamiyat", "Talim", "STEM"],
  },
  {
    id: "8",
    title: "Yoshlar ishsizligi kamaymoqda: yangi statistika",
    summary: "Mehnat vazirligi ma'lumotlariga ko'ra, yoshlar bandligi 15% oshdi.",
    content: `
      <p>2024-yil davomida yoshlar bandligi sezilarli darajada yaxshilandi. Yangi ish o'rinlari yaratildi.</p>
      <p>Hukumat yoshlarni qo'llab-quvvatlash dasturini davom ettirmoqda.</p>
    `,
    category: "jamiyat",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
    ],
    date: "2025-01-13T15:20:00",
    views: 7200,
    likes: 445,
    hashtags: ["Jamiyat", "Ish", "Yoshlar"],
  },
  {
    id: "9",
    title: "Ekologik transport: elektrokarlar kengaymoqda",
    summary: "Toshkentda elektromobillar uchun zaryadlash stansiyalari ko'paymoqda.",
    content: `
      <p>Shahar hokimligi ekologik toza transport tizimini rivojlantirish rejasini e'lon qildi.</p>
      <p>2025-yilda 50 ta yangi zaryadlash stansiyasi ochilishi rejalashtirilgan.</p>
    `,
    category: "jamiyat",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"
    ],
    date: "2025-01-13T12:00:00",
    views: 6800,
    likes: 389,
    hashtags: ["Jamiyat", "Ekologiya", "Transport"],
  },
  {
    id: "10",
    title: "5G tarmoqlari O'zbekistonda ishga tushirilmoqda",
    summary: "Telekommunikatsiya operatorlari yangi avlod mobil tarmoqlarini joriy qilmoqda.",
    content: `
      <p>Uchinchi mobil operator 5G texnologiyasini sinov rejimida ishga tushirdi.</p>
      <p>Yangi texnologiya internet tezligini 10 barobar oshiradi.</p>
    `,
    category: "texnologiya",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80"
    ],
    date: "2025-01-13T09:30:00",
    views: 9500,
    likes: 678,
    hashtags: ["Texnologiya", "5G", "Internet"],
  },
  {
    id: "11",
    title: "O'zbekiston basketbol chempionati boshlandi",
    summary: "Milliy ligada 12 jamoa ishtirok etmoqda. Birinchi o'yinlar hayajonli o'tdi.",
    content: `
      <p>2025-yil mavsumi rasman boshlandi. Toshkent "Olympik" jamoasi ilk g'alabasini qo'lga kiritdi.</p>
      <p>Chempionat 6 oy davom etadi va may oyida yakunlanadi.</p>
    `,
    category: "sport",
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80"
    ],
    date: "2025-01-12T18:00:00",
    views: 5400,
    likes: 287,
    hashtags: ["Sport", "Basketbol", "Chempionat"],
  },
  {
    id: "12",
    title: "Milliy parklar: yangi turizm marshrutlari ochildi",
    summary: "Tabiat sevarlarga yangi yo'nalishlar taqdim etilmoqda.",
    content: `
      <p>Ekologiya vazirligi milliy parklarda yangi turizm yo'nalishlarini taqdim etdi.</p>
      <p>Marshrutlar tabiiy go'zallik va noyob hayvonot dunyosini ko'rishga imkon beradi.</p>
    `,
    category: "jamiyat",
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    ],
    date: "2025-01-12T14:30:00",
    views: 4900,
    likes: 312,
    hashtags: ["Jamiyat", "Turizm", "Tabiat"],
  },
];

export const trendingHashtags = [
  "#Texnologiya",
  "#Sport",
  "#Iqtisodiyot",
  "#Jamiyat",
  "#AI",
  "#Innovatsiya",
  "#Toshkent",
  "#Madaniyat",
];
