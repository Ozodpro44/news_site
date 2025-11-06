import { Cloud, CloudRain, Sun, Droplets, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WeatherWidget = () => {
  // Mock data - in real app, fetch from API
  const weather = {
    city: "Toshkent",
    temp: 18,
    condition: "Quyoshli",
    icon: "sun",
    humidity: 65,
    wind: 12,
  };

  const Icon = weather.icon === "sun" ? Sun : weather.icon === "rain" ? CloudRain : Cloud;
  
  // Dynamic background based on weather
  const weatherBg = {
    sun: "from-amber-400 via-orange-400 to-orange-500",
    rain: "from-slate-500 via-slate-600 to-slate-700",
    cloud: "from-gray-400 via-gray-500 to-gray-600"
  }[weather.icon] || "from-sky-400 to-blue-500";

  return (
    <Card className="overflow-hidden border-0">
      <div className={`bg-gradient-to-br ${weatherBg} h-full p-5 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm font-medium opacity-90 mb-1">{weather.city}</div>
            <div className="md:text-5xl text-3xl font-bold tracking-tight">{weather.temp}°</div>
          </div>
          <Icon className="md:h-16 md:w-16 h-12 w-12 opacity-90" />
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
