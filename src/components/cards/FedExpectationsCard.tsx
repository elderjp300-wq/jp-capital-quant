import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const oisData = [
  { date: "Current", rate: 5.33 },
  { date: "Jun", rate: 5.33 },
  { date: "Jul", rate: 5.25 },
  { date: "Sep", rate: 5.00 },
  { date: "Nov", rate: 4.75 },
  { date: "Dec", rate: 4.50 },
];

export function FedExpectationsCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-muted-foreground">Fed Funds / OIS</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px]">
            Pricing 2 Cuts
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-mono font-bold text-foreground">5.25-5.50%</div>
          <div className="text-xs text-muted-foreground mt-1">Terminal rate expected Dec 2025: 4.50%</div>
        </div>

        <div className="flex justify-between items-center mb-6 px-1">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mb-1"></div>
            <span className="text-[10px] text-muted-foreground font-mono">Jun 12</span>
            <span className="text-[10px] font-bold">Hold</span>
          </div>
          <div className="h-[1px] flex-1 bg-border mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mb-1"></div>
            <span className="text-[10px] text-muted-foreground font-mono">Jul 31</span>
            <span className="text-[10px] font-bold">Hold</span>
          </div>
          <div className="h-[1px] flex-1 bg-border mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mb-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] text-muted-foreground font-mono">Sep 18</span>
            <span className="text-[10px] font-bold text-green-500">-25bps</span>
          </div>
        </div>

        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={oisData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={(val) => val.toFixed(2)} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111318', borderColor: '#1e2235', fontSize: '12px' }}
                itemStyle={{ color: '#2563eb' }}
              />
              <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: '#111318', strokeWidth: 2 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
