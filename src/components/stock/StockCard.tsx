// src/components/stock/StockCard.tsx
import Link from "next/link";
import { Stock } from "@/types/stock";

export default function StockCard({ stock }: { stock: Stock }) {
  return (
    <Link href={`/stock/${stock.symbol}`}>
      <div className="border rounded-lg p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
        <p className="font-semibold">{stock.symbol}</p>
        <p className="text-sm text-gray-500">{stock.name}</p>
        <p className="mt-2">${stock.currentPrice}</p>
      </div>
    </Link>
  );
}