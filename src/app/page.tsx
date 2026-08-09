
import { mockStocks } from "@/lib/mockStocks";
import StockCard from "@/components/stock/StockCard";
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {mockStocks.map((stock) => (
        <StockCard key={stock.stockId} stock={stock} />
      ))}
    </div>
  );
}