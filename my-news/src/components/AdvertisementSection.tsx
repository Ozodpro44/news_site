import { useEffect, useState, useRef } from 'react';
import { useAdvertisements } from '@/contexts/AdvertisementContext';
import { AdvertisementCard } from './AdvertisementCard';
import { ApiAdvertisement } from '@/data/fetchData';

interface AdvertisementSectionProps {
  position: 'top' | 'middle' | 'bottom';
  language: 'uz' | 'kr';
}

export const AdvertisementSection = ({ position, language }: AdvertisementSectionProps) => {
  const { isLoading, getRandomAdByPosition } = useAdvertisements();
  const [ad, setAd] = useState<ApiAdvertisement | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Only select ad once when component mounts
    if (!mountedRef.current) {
      const selectedAd = getRandomAdByPosition(position);
      setAd(selectedAd);
      mountedRef.current = true;
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!ad) {
    return null;
  }

  return (
    <div className="w-full">
      {position === 'top' && (
        <div className="mb-4 sm:mb-6">
          <AdvertisementCard ad={ad} language={language} />
        </div>
      )}

      {position === 'middle' && (
        <div className="my-4 sm:my-6 max-w-full sm:max-w-2xl">
          <AdvertisementCard ad={ad} language={language} />
        </div>
      )}

      {position === 'bottom' && (
        <div className="mt-4 sm:mt-6">
          <AdvertisementCard ad={ad} language={language} />
        </div>
      )}
    </div>
  );
};
