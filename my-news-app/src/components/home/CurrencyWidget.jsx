import { TrendingUp, TrendingDown } from "lucide-react";
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
      <h3 className="font-semibold mb-3">Valyuta kursi</h3>
      <div className="space-y-2">
        {currencies.map((currency) => (
          <div key={currency.code} className="flex items-center justify-between">
            <span className="font-medium">{currency.code}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {currency.rate.toLocaleString()} so'm
              </span>
              <span
                className={`text-xs flex items-center ${
                  currency.trend === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {currency.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(currency.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default CurrencyWidget;
