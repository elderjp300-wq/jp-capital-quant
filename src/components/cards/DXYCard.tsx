import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const dxyData = [
  { value: 105.2 }, { value: 105.5 }, { value: 105.1 }, { value: 104.8 },
  { value: 104.5 }, { value: 104.2 }, { value: 104.4 }, { value: 104.1 },
  { value: 103.9 }, { value: 104.32 }
];

export function DXYCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">DXY Strength</CardTitle>
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-mono text-[10px]">
          Bearish Cons.
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-2xl font-mono font-bold text-foreground">104.32</div>
            <div className="text-sm text-red-500 font-mono">-1.20% <span className="text-muted-foreground text-xs ml-1">30D</span></div>
          </div>
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dxyData}>
                <defs>
                  <linearGradient id="colorDxy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill="url(#colorDxy)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-3 bg-muted/50 rounded-md border border-border/50">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-primary font-medium">Correlation Note:</span> USD weakness is creating a bid for EM equities and commodities. Watch 103.50 support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
