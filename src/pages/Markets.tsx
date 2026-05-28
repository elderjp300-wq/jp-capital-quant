import { useState } from "react";
import { mockAssets } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const groups = [
  { id: "rates", label: "Rates" },
  { id: "equities", label: "Equities" },
  { id: "fx", label: "FX" },
  { id: "commodities", label: "Commodities" },
  { id: "crypto", label: "Crypto" },
];

export default function Markets() {
  const [activeGroup, setActiveGroup] = useState("rates");

  const currentAssets = mockAssets[activeGroup as keyof typeof mockAssets];

  return (
    <div className="pb-20 flex flex-col h-[calc(100vh-36px)]">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border p-3 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 min-w-max">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
                activeGroup === g.id 
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(37,99,235,0.3)]" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {currentAssets.map((asset, i) => {
          const isPositive = asset.change >= 0;
          const chartData = asset.trend.map((val, idx) => ({ time: idx, value: val }));
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={asset.symbol}
            >
              <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-colors cursor-pointer active:scale-[0.98]">
                <div className="p-3 flex items-center justify-between">
                  <div className="w-[30%]">
                    <div className="font-bold text-sm">{asset.symbol}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{asset.name}</div>
                  </div>
                  
                  <div className="w-[25%] h-[30px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={isPositive ? '#10b981' : '#ef4444'} 
                          strokeWidth={1.5} 
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="w-[20%] text-right font-mono">
                    <div className="text-sm font-bold">{asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</div>
                    <div className={cn("text-[10px]", isPositive ? "text-green-500" : "text-red-500")}>
                      {isPositive ? "+" : ""}{asset.changePct.toFixed(2)}%
                    </div>
                  </div>

                  <div className="w-[25%] text-right flex justify-end">
                    <Badge variant="outline" className={cn(
                      "text-[9px] px-1.5 py-0 h-4 border-muted",
                      isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                      {asset.regime}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
