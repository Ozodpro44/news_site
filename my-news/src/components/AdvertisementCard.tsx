import { ApiAdvertisement } from '@/data/fetchData';
import { ExternalLink } from 'lucide-react';

interface AdvertisementCardProps {
  ad: ApiAdvertisement;
  language: 'uz' | 'kr';
}

export const AdvertisementCard = ({ ad, language }: AdvertisementCardProps) => {
  const title = language === 'uz' ? ad.title_uz : ad.title_kr;
  const description = language === 'uz' ? ad.description_uz : ad.description_kr;

  return (
    <a
      href={ad.link_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      {ad.image_url && (
        <div className="relative h-40 overflow-hidden bg-gray-200">
          <img
            src={ad.image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{description}</p>
            )}
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary flex-shrink-0 mt-1 transition-colors" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none group-hover:ring-2 group-hover:ring-primary/20 rounded-lg transition-all duration-300"></div>
    </a>
  );
};
