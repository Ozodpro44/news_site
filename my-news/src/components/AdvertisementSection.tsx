import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const selectedAd = getRandomAdByPosition(position);
    setAd(selectedAd);
  }, [position, getRandomAdByPosition]);

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
        <div className="mb-6">
          <AdvertisementCard ad={ad} language={language} />
        </div>
      )}

      {position === 'middle' && (
        <div className="my-6 max-w-2xl">
          <AdvertisementCard ad={ad} language={language} />
        </div>
      )}

      {position === 'bottom' && (
        <div className="mt-6">
          <AdvertisementCard ad={ad} language={language} />
        </div>
      )}
    </div>
  );
};
