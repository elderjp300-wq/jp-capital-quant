import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const qtData = [
  { val: 8.5 }, { val: 8.3 }, { val: 8.1 }, { val: 7.9 }, { val: 7.7 }, { val: 7.5 }, { val: 7.3 }, { val: 7.1 }
];

export function LiquidityCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">Liquidity & Bal Sheet</CardTitle>
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Fed Total Assets</div>
            <div className="text-xl font-mono font-bold">$7.12T</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">QT Pace</div>
            <div className="text-xl font-mono font-bold text-red-500">-$60B<span className="text-xs text-muted-foreground">/mo</span></div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">TGA Balance</div>
            <div className="text-lg font-mono text-foreground">$750B</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">SOFR</div>
            <div className="text-lg font-mono text-foreground">5.31%</div>
          </div>
        </div>

        <div className="h-[60px] w-full mt-2 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className="text-[10px] font-bold text-red-500/20 uppercase tracking-widest rotate-[-5deg]">Tightening Regime</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={qtData}>
              <Line type="stepAfter" dataKey="val" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
