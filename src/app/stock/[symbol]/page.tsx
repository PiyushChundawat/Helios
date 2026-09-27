// src/app/stock/[symbol]/page.tsx
import { mockStocks } from "@/lib/mockStocks";
import { notFound } from "next/navigation";
import PriceChart from "@/components/stock/PriceChart";
import { prisma } from "@/lib/prisma";
import { getRedisClient } from "@/lib/redis";

const USD_TO_INR = 83;

export default async function StockHistoryPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;

  const stock = mockStocks.find((s) => s.symbol === symbol.toUpperCase());
  if (!stock) notFound();

  const [history, currentPrice] = await Promise.all([
    getHistory(stock.symbol),
    getCurrentPrice(stock.symbol),
  ]);

  const displayPrice = currentPrice ?? stock.currentPrice;

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{stock.symbol}</h1>
          <p className="text-gray-500">{stock.name}</p>
          <p className="mt-2">Current price in $: {displayPrice}</p>
          <p>Current price in Rs.: {(displayPrice * USD_TO_INR).toFixed(0)}</p>
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

async function getHistory(symbol: string) {
  const client = await getRedisClient();
  const cacheKey = `history:${symbol}`;

  const cached = await client.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const rows = await prisma.priceHistory.findMany({
    where: { stockId: symbol },
    orderBy: { timestamp: "asc" },
  });

  await client.set(cacheKey, JSON.stringify(rows), { EX: 180 });
  return rows;
}

async function getCurrentPrice(symbol: string) {
  const client = await getRedisClient();
  const raw = await client.get(`stock:${symbol}`);
  if (!raw) return null;
  const data = JSON.parse(raw);
  return data.c;
}