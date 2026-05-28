import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RiskGauge() {
  const value = 62;
  const rotation = (value / 100) * 180 - 90; // -90 to 90
  
  return (
    <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">Risk Appetite</CardTitle>
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 font-mono text-[10px]">
          Mild Risk-On
        </Badge>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="relative w-48 h-24 mx-auto overflow-hidden">
          {/* Background arc */}
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-muted box-border" />
          
          {/* Colored arcs */}
          <svg className="absolute top-0 left-0 w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Red zone 0-30 */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="276.46" strokeDashoffset={276.46 - (276.46 * 0.15)} opacity="0.6" />
            {/* Amber zone 30-70 */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="276.46" strokeDashoffset={276.46 - (276.46 * 0.2)} transform="rotate(54 50 50)" opacity="0.6" />
            {/* Green zone 70-100 */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="276.46" strokeDashoffset={276.46 - (276.46 * 0.15)} transform="rotate(126 50 50)" opacity="0.6" />
          </svg>

          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-20 bg-foreground origin-bottom -translate-x-1/2 transition-transform duration-1000 ease-out z-10"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>
          
          {/* Center pivot */}
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground z-20" />
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl font-bold font-mono text-foreground z-30">
            {value}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-muted/30 p-2 rounded-md border border-border/50 text-center">
            <div className="text-[10px] text-muted-foreground uppercase">VIX</div>
            <div className="text-sm font-mono font-bold text-green-500">16.4</div>
          </div>
          <div className="bg-muted/30 p-2 rounded-md border border-border/50 text-center">
            <div className="text-[10px] text-muted-foreground uppercase">HY Spreads</div>
            <div className="text-sm font-mono font-bold">342bps</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
