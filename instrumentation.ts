// instrumentation.ts (project root)
import { fetchQuote } from "@/lib/finnhub";
import { getRedisClient } from "@/lib/redis";
import { chunkArray } from "@/lib/chunk";
import { mockStocks } from "@/lib/mockStocks";

const symbols = mockStocks.map((s) => s.symbol);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllStocks() {
  const client = await getRedisClient();
  const batches = chunkArray(symbols, 5);

  for (const batch of batches) {
    const results = await Promise.all(
      batch.map((symbol) => fetchQuote(symbol))
    );

    for (let i = 0; i < batch.length; i++) {
      const symbol = batch[i];
      const data = results[i];
      await client.set(`stock:${symbol}`, JSON.stringify(data));
      await client.publish("price-updates", JSON.stringify({ symbol, ...data }));
    }

    await delay(500); // small pause before the next batch
  }

  console.log("Fetched and stored all stocks:", new Date().toISOString());
}

export async function register() {
    if (process.env.NEXT_RUNTIME !== "nodejs") return;
    fetchAllStocks(); // run once immediately on server start
    setInterval(fetchAllStocks, 60000); // then every 60 seconds
}