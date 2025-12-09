import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { ApiAdvertisement, fetchActiveAdvertisements } from '@/data/fetchData';

interface AdvertisementContextType {
  allAdvertisements: ApiAdvertisement[];
  isLoading: boolean;
  getRandomAdByPosition: (position: 'top' | 'middle' | 'bottom') => ApiAdvertisement | null;
}

const AdvertisementContext = createContext<AdvertisementContextType | undefined>(undefined);

export const AdvertisementProvider = ({ children }: { children: ReactNode }) => {
  const [advertisements, setAdvertisements] = useState<ApiAdvertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Track which ads have been recently shown per position (queue of 3 ads)
  const shownAdsRef = useRef<Record<string, string[]>>({
    top: [],
    middle: [],
    bottom: [],
  });

  useEffect(() => {
    const loadAds = async () => {
      try {
        setIsLoading(true);
        const ads = await fetchActiveAdvertisements();
        setAdvertisements(ads);
      } catch (err) {
        console.error('Failed to load advertisements', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAds();
  }, []);

  // Get one random ad per position, avoiding recently shown ads
  const getRandomAdByPosition = useCallback(
    (position: 'top' | 'middle' | 'bottom'): ApiAdvertisement | null => {
      const filtered = advertisements.filter(ad => ad.position === position);
      if (filtered.length === 0) return null;

      // Get recently shown ads for this position
      const recentlyShown = shownAdsRef.current[position] || [];
      
      // Find ads that are not in the recently shown list
      const availableAds = filtered.filter(ad => !recentlyShown.includes(ad.id));
      
      // If all ads were shown recently, reset the list
      const adsToChooseFrom = availableAds.length > 0 ? availableAds : filtered;
      
      // Pick random ad
      const randomAd = adsToChooseFrom[Math.floor(Math.random() * adsToChooseFrom.length)];
      
      // Add to recently shown list and keep only last 3
      const updated = [randomAd.id, ...recentlyShown].slice(0, 3);
      shownAdsRef.current[position] = updated;
      
      return randomAd;
    },
    [advertisements]
  );

  const value: AdvertisementContextType = {
    allAdvertisements: advertisements,
    isLoading,
    getRandomAdByPosition,
  };

  return (
    <AdvertisementContext.Provider value={value}>
      {children}
    </AdvertisementContext.Provider>
  );
};

export const useAdvertisements = () => {
  const context = useContext(AdvertisementContext);
  if (!context) {
    throw new Error('useAdvertisements must be used within AdvertisementProvider');
  }
  return context;
};
