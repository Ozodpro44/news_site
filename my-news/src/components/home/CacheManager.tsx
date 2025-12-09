import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Trash2, RefreshCw } from 'lucide-react';
import { clearAllCache, getCacheInfo } from '@/lib/cache';

interface CacheStats {
  articles: number;
  categories: number;
  weather: number;
  currency: number;
  hashtags: number;
  search: number;
}

export const CacheManager = ({ language }: { language: 'uz' | 'kr' }) => {
  const [cacheStats, setCacheStats] = useState<Partial<CacheStats>>({});
  const [cleared, setCleared] = useState(false);

  const texts = {
    uz: {
      cacheSettings: 'Kesh Sozlamalari',
      clearCache: 'Keshni Tozalash',
      cacheSize: 'Kesh Hajmi',
      lastCleared: 'Oxirgi Tozalash',
      cacheStatus: 'Kesh Holati',
      noCache: 'Kesh yo\'q',
      cached: 'Keshlanmagan',
      clearSuccess: 'Kesh muvaffaqiyatli tozalandi',
      description: 'Ma\'lumotlar keshga saqlash tezligini oshiradi',
    },
    kr: {
      cacheSettings: 'Кеш Созламалари',
      clearCache: 'Кешни Tozalash',
      cacheSize: 'Кеш Ҳажми',
      lastCleared: 'Охирги Tozalash',
      cacheStatus: 'Кеш Ҳолати',
      noCache: 'Кеш йўқ',
      cached: 'Кешланмаган',
      clearSuccess: 'Кеш муваффақиятли тозаланди',
      description: 'Маълумотлар кешга сақлаш тезлигини оширади',
    },
  };

  const t = texts[language];

  const handleClearCache = () => {
    clearAllCache();
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  const checkCacheSize = () => {
    const stats: Partial<CacheStats> = {};
    
    const keys = ['articles_all', 'categories_all', 'weather_41.2995_69.2401', 'currency_rates', 'hashtags_trending'];
    keys.forEach(key => {
      const info = getCacheInfo(key);
      if (info?.cached) {
        stats[key as keyof CacheStats] = Math.round(info.expiresIn / 1000); // Convert to seconds
      }
    });

    setCacheStats(stats);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">{t.cacheSettings}</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={checkCacheSize}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {t.cacheStatus}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">{t.description}</p>

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex gap-2">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-300">
          Kesh automat ravishda muddati tugaganda tozalanadi. Qo'lbola tozalashtirish tez qidiruv uchun.
        </p>
      </div>

      {cleared && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-800 dark:text-green-300">✓ {t.clearSuccess}</p>
        </div>
      )}

      <div className="space-y-2">
        {Object.keys(cacheStats).length > 0 ? (
          Object.entries(cacheStats).map(([key, value]) => (
            <div key={key} className="flex justify-between text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded">
              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="text-muted-foreground">
                {value ? `${value}s` : t.noCache}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground text-center py-4">{t.noCache}</p>
        )}
      </div>

      <Button
        onClick={handleClearCache}
        variant="destructive"
        size="sm"
        className="w-full gap-2"
      >
        <Trash2 className="h-4 w-4" />
        {t.clearCache}
      </Button>
    </div>
  );
};
