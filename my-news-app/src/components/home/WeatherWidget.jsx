import { Cloud, CloudRain, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WeatherWidget = () => {
  // Mock data - in real app, fetch from API
  const weather = {
    city: "Toshkent",
    temp: 18,
    condition: "Quyoshli",
    icon: "sun",
  };

  const Icon = weather.icon === "sun" ? Sun : weather.icon === "rain" ? CloudRain : Cloud;

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{weather.city}</p>
          <p className="text-3xl font-bold">{weather.temp}°C</p>
          <p className="text-sm opacity-90">{weather.condition}</p>
        </div>
        <Icon className="h-12 w-12 opacity-90" />
      </div>
    </Card>
  );
};

export default WeatherWidget;
