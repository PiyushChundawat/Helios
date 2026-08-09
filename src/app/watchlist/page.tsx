import { mockStocks } from "@/lib/mockStocks";
import { mockWatchlist } from "@/lib/mockWatchlist";
import StockCard from "@/components/stock/StockCard";
export default function WatchListPage() {
    const watchlistStocks = mockStocks.filter((stock) =>
        mockWatchlist.includes(stock.stockId)
      );
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {watchlistStocks.map((stock) => (
                <StockCard key={stock.stockId} stock={stock} />
            ))}
        </div>
    )
}