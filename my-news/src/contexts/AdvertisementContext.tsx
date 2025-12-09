import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  const [shownAds, setShownAds] = useState<Record<string, string>>({});

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
  const getRandomAdByPosition = (position: 'top' | 'middle' | 'bottom'): ApiAdvertisement | null => {
    const filtered = advertisements.filter(ad => ad.position === position);
    if (filtered.length === 0) return null;

    // Get the last shown ad for this position
    const lastShownId = shownAds[position];
    
    // Find ads that are not the last shown one
    const availableAds = filtered.filter(ad => ad.id !== lastShownId);
    
    // If all ads were shown, reset and use all ads
    const adsToChooseFrom = availableAds.length > 0 ? availableAds : filtered;
    
    // Pick random ad
    const randomAd = adsToChooseFrom[Math.floor(Math.random() * adsToChooseFrom.length)];
    
    // Mark this ad as shown for this position
    setShownAds(prev => ({
      ...prev,
      [position]: randomAd.id
    }));
    
    return randomAd;
  };

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
