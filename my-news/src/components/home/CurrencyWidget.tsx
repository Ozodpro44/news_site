import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchCurrency, GetCurrency } from "@/data/fetchData";
import { useQuery } from "@tanstack/react-query";

export const CurrencyWidget = () => {
  const [currencies, setCurrencies] = useState<any>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['currency'],
    queryFn: fetchCurrency,
    staleTime: 1000 * 60 * 30, // 1 hour
    gcTime: 1000 * 60 * 40, // 24 hours
    retry: 1,
  });

  useEffect(() => {
    if (data) {
        setCurrencies(data);
      }
  }, [data]);

  const currencis = currencies ? [
    { code: "USD", rate: Math.round(Number(currencies.usd)), change: 0, trend: "up" }, // Assuming change and trend are hardcoded for now
    { code: "EUR", rate: Math.round(Number(currencies.eur)), change: 0, trend: "up" },
    { code: "RUB", rate: Math.round(Number(currencies.rub)), change: 0, trend: "up" },
  ] : [];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Valyuta kursi</h3>
      </div>
      
      {isLoading && <p>Loading currency data...</p>}
      {isError && <p className="text-red-500">Error loading currency data.</p>}

      {!isLoading && !isError && currencis.length > 0 && (
      <div className="space-y-2">
        {currencis.map((currency) => (
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
      )}
    </Card>
  );
};
