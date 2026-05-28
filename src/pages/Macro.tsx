import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const regimes = [
  { region: "US", gdp: "+2.4%", cpi: "3.2%", stance: "Hawkish", trend: "Strong", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { region: "EU", gdp: "+0.3%", cpi: "2.6%", stance: "Dovish", trend: "Weak", color: "bg-red-500/10 text-red-500 border-red-500/20" },
  { region: "China", gdp: "+4.8%", cpi: "0.1%", stance: "Easing", trend: "Stabilizing", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  { region: "Japan", gdp: "+0.5%", cpi: "2.8%", stance: "Normalizing", trend: "Improving", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  { region: "UK", gdp: "+0.1%", cpi: "3.4%", stance: "Neutral", trend: "Weak", color: "bg-red-500/10 text-red-500 border-red-500/20" },
  { region: "EM", gdp: "+4.2%", cpi: "4.5%", stance: "Mixed", trend: "Strong", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
];

const centralBanks = [
  { name: "Fed", rate: "5.50%", change: "Hold", next: "Jun 12", expected: "Hold" },
  { name: "ECB", rate: "4.50%", change: "Hold", next: "Jun 6", expected: "Cut 25bps" },
  { name: "BOJ", rate: "0.10%", change: "Hike 10bps", next: "Jun 14", expected: "Hold" },
  { name: "BOE", rate: "5.25%", change: "Hold", next: "Jun 20", expected: "Hold" },
  { name: "PBOC", rate: "3.45%", change: "Cut 10bps", next: "May 20", expected: "Hold" },
];

const momentum = [
  { asset: "Rates", score: -0.6, label: "Bearish" },
  { asset: "Equities", score: 0.8, label: "Bullish" },
  { asset: "FX (USD)", score: 0.4, label: "Mild Bullish" },
  { asset: "Commodities", score: 0.7, label: "Bullish" },
  { asset: "Crypto", score: 0.9, label: "Strong Bullish" },
];

export default function Macro() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div className="p-3 space-y-4 pb-20" variants={container} initial="hidden" animate="show">
      
      <motion.div variants={item}>
        <Card className="bg-card/50 backdrop-blur-md border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Macro Cycle Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-24 h-24 relative rounded-full border-4 border-muted flex items-center justify-center">
                {/* 4 Quadrants styling */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 border-t-4 border-r-4 border-amber-500 rounded-tr-full opacity-50"></div>
                <div className="absolute top-0 left-0 w-1/2 h-1/2 border-t-4 border-l-4 border-red-500 rounded-tl-full opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-b-4 border-l-4 border-blue-500 rounded-bl-full opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-b-4 border-r-4 border-green-500 rounded-br-full opacity-20"></div>
                
                {/* Indicator dot */}
                <div className="absolute top-[10%] right-[10%] w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                
                <span className="text-[10px] font-bold text-center leading-tight">Late<br/>Cycle</span>
              </div>
              <div className="flex-1 ml-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Current Phase</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">Slowdown</Badge>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Growth decelerating while inflation remains sticky. Bias towards defensive equities and duration.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-card/50 backdrop-blur-md border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Global Regime Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-[1px] bg-border/50">
              {regimes.map(r => (
                <div key={r.region} className="bg-card p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm">{r.region}</span>
                    <Badge variant="outline" className={cn("text-[9px] px-1 py-0", r.color)}>{r.stance}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                    <div className="text-muted-foreground">GDP <span className="text-foreground">{r.gdp}</span></div>
                    <div className="text-muted-foreground">CPI <span className="text-foreground">{r.cpi}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-card/50 backdrop-blur-md border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Central Bank Policy Tracker</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {centralBanks.map(cb => (
                <div key={cb.name} className="flex items-center justify-between p-3 text-sm">
                  <div className="w-12 font-bold">{cb.name}</div>
                  <div className="w-16 font-mono">{cb.rate}</div>
                  <div className="flex-1 text-xs text-muted-foreground text-right">{cb.expected} <span className="opacity-50 ml-1">({cb.next})</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-card/50 backdrop-blur-md border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">3M Cross-Asset Momentum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {momentum.map(m => (
              <div key={m.asset} className="flex items-center text-xs">
                <div className="w-24 text-muted-foreground">{m.asset}</div>
                <div className="flex-1 flex items-center">
                  {/* Zero line */}
                  <div className="h-4 w-[2px] bg-muted mx-2 z-10"></div>
                  
                  <div className="flex-1 relative h-2 bg-muted/30 rounded-full overflow-hidden flex">
                    <div className="w-1/2 flex justify-end">
                      {m.score < 0 && (
                        <div className="h-full bg-red-500 rounded-l-full" style={{ width: `${Math.abs(m.score) * 100}%` }}></div>
                      )}
                    </div>
                    <div className="w-1/2 flex justify-start">
                      {m.score > 0 && (
                        <div className="h-full bg-green-500 rounded-r-full" style={{ width: `${m.score * 100}%` }}></div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-8 text-right font-mono ml-2">
                  {m.score > 0 ? '+' : ''}{m.score.toFixed(1)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
}
