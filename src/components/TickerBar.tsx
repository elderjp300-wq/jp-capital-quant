import { useState, useEffect } from "react";
import { tickerItems } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function TickerBar() {
  const [items, setItems] = useState(tickerItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((currentItems) =>
        currentItems.map((item) => {
          const fluctuate = Math.random() > 0.7;
          if (!fluctuate) return item;
          
          const changeAmount = item.value * 0.0005 * (Math.random() > 0.5 ? 1 : -1);
          return {
            ...item,
            value: Number((item.value + changeAmount).toFixed(4)),
            change: Number((item.change + changeAmount).toFixed(4)),
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#0d0f16] border-b border-[#1e2235] overflow-hidden h-9 flex items-center">
      <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap min-w-max">
        {[...items, ...items].map((item, i) => {
          const isPositive = item.change >= 0;
          return (
            <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 px-4 text-xs font-mono">
              <span className="text-[#6b7280] font-medium">{item.symbol}</span>
              <span className="text-[#e2e8f0]">{item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
              <span className={cn(isPositive ? "text-[#10b981]" : "text-[#ef4444]")}>
                {isPositive ? "+" : ""}{item.change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
