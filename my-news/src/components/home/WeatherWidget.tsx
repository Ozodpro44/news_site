import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Droplets, Wind, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
// import { fetchWeather } from "@/data/fetchData";

interface WeatherWidgetProps {
  data: any
}

export const WeatherWidget = ({data}: WeatherWidgetProps) => {
  const [weather, setWeather] = useState({
    city: "",
    temp: 0,
    condition: "-",
    icon: "sun",
    humidity: 0,
    wind: 0,
  });

  useEffect(() => {
 if (data) {
 setWeather(data);
 }
  }, [data]);
  
  if (!data || !weather.icon) {
    return (
      <Skeleton className="h-40 rounded-lg" /> 
    );
  }
  const getIconComponent = (iconName: string): LucideIcon => {
    switch (iconName) {
      case "rain": return CloudRain;
      case "cloud": return Cloud;
      default: return Sun;
    }
  };

  const Icon = weather.icon;
  
  // Dynamic background based on weather
  const weatherBg = {
    sun: "from-amber-400 via-orange-400 to-orange-500",
    rain: "from-slate-500 via-slate-600 to-slate-700",
    cloud: "from-gray-400 via-gray-500 to-gray-600"
  }[weather.icon] || "from-sky-400 to-blue-500";

  const CurrentIcon = getIconComponent(weather.icon);

  return (
    <Card className="overflow-hidden border-0">
      <div className={`bg-gradient-to-br ${weatherBg} h-full p-5 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm font-medium opacity-90 mb-1">{weather.city}</div>
            <div className="md:text-5xl text-3xl font-bold tracking-tight">{weather.temp}°</div>
          </div>
          <CurrentIcon className="md:h-16 md:w-16 h-12 w-12 opacity-90" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-base md:text-lg text-sm font-medium opacity-95">{weather.condition}</div>
          
          <div className="flex gap-4 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <Droplets className="md:h-4 md:w-4 h-3 w-3" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="md:h-4 md:w-4 h-3 w-3" />
              <span>{weather.wind} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
