// src/app/portfolio/page.tsx (top, above the component)
import { mockStocks } from "@/lib/mockStocks";
import { mockUserPortfolio, mockHoldings } from "@/lib/mockPortfolio";

const enrichedHoldings = mockHoldings.map((holding) => {
  const stock = mockStocks.find((s) => s.stockId === holding.stockId);

  return {
    stockId: holding.stockId,
    symbol: stock?.symbol ?? "UNKNOWN",
    name: stock?.name ?? "Unknown",
    currentPrice: stock?.currentPrice ?? 0,
    quantity: holding.quantity,
    avgBuyPrice: holding.avgBuyPrice,
    valueInvested: holding.quantity * holding.avgBuyPrice,
    valueNow: holding.quantity * (stock?.currentPrice ?? 0),
  };
});

const totalInvested = enrichedHoldings.reduce(
    (sum, holding) => sum + holding.valueInvested,
    0
);

const totalValueNow = enrichedHoldings.reduce(
    (sum, holding) => sum + holding.valueNow,
    0
);

export default function PortfolioPage() {
    return (
      <div className="p-4">
        <p>Current Balance: ${mockUserPortfolio.currentBalance}</p>
        <p>Investment: ${totalInvested}</p>
        <p>Investment Value Now: ${totalValueNow}</p>
  
        <h2 className="mt-4 font-semibold">Invested Stocks:</h2>
        <div className="flex flex-col gap-3 mt-2">
          {enrichedHoldings.map((h) => (
            <div key={h.stockId} className="bg-gray-100 rounded-lg p-4 flex justify-between">
              <div>
                <p className="font-semibold">{h.symbol}</p>
                <p className="text-sm text-gray-500">{h.name}</p>
                <p>Current Price: ${h.currentPrice}</p>
              </div>
              <div className="text-right">
                <p>My Holdings: {h.quantity}</p>
                <p>Value Invested: ${h.valueInvested}</p>
                <p>Value Now: ${h.valueNow}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }