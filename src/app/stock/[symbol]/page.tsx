// src/app/stock/[symbol]/page.tsx
import { mockStocks } from "@/lib/mockStocks";
import { mockPriceHistory } from "@/lib/mockPriceHistory";
import { notFound } from "next/navigation";
import PriceChart from "@/components/stock/PriceChart";

const USD_TO_INR = 83;

export default async function StockHistoryPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;

  const stock = mockStocks.find((s) => s.symbol === symbol.toUpperCase());
  if (!stock) notFound();

  const history = mockPriceHistory.filter((h) => h.stockId === stock.stockId);

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{stock.symbol}</h1>
          <p className="text-gray-500">{stock.name}</p>
          <p className="mt-2">Current price in $: {stock.currentPrice}</p>
          <p>Current price in Rs.: {(stock.currentPrice * USD_TO_INR).toFixed(0)}</p>
        </div>
        <button className="bg-gray-200 rounded-lg px-4 py-2">
          Add to Watchlist
        </button>
      </div>

      <div className="mt-8">
        <PriceChart data={history} />
      </div>
    </div>
  );
}