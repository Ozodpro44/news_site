import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CurrencyWidget = () => {
  // Mock data - in real app, fetch from API
  const currencies = [
    { code: "USD", rate: 12650, change: 0.5, trend: "up" },
    { code: "EUR", rate: 13820, change: -0.3, trend: "down" },
    { code: "RUB", rate: 135, change: 0.1, trend: "up" },
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Valyuta kursi</h3>
      </div>
      
      <div className="space-y-2">
        {currencies.map((currency) => (
          <div key={currency.code} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm w-10">{currency.code}</span>
              <span className="text-sm text-muted-foreground">
                {currency.rate.toLocaleString()}
              </span>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${
                currency.trend === "up" 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {currency.trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(currency.change)}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
