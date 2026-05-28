import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "2Y", value: 4.82 },
  { name: "5Y", value: 4.41 },
  { name: "10Y", value: 4.37 },
  { name: "30Y", value: 4.52 },
];

export function YieldCurveCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">US Yield Curve</CardTitle>
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 font-mono text-[10px]">
          Inverted -45bps
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-2xl font-mono font-bold text-foreground">Flat/Inverted</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
              <ArrowUpRight className="w-3 h-3 text-amber-500" />
              <span>Bear Steepening Momentum</span>
            </div>
          </div>
          <div className="w-24 h-12">
             <svg viewBox="0 0 100 40" className="w-full h-full stroke-primary fill-none stroke-2">
               <path d="M0,10 Q25,5 50,20 T100,15" strokeLinecap="round" />
             </svg>
          </div>
        </div>
        
        <div className="h-[120px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={(val) => val.toFixed(2)} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 4.5 ? '#f59e0b' : '#2563eb'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
