import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const assets = ["SPX", "US10Y", "DXY", "GOLD", "BTC"];

const correlations = [
  [1.00, -0.45, -0.65, 0.35, 0.72],
  [-0.45, 1.00, 0.55, -0.25, -0.30],
  [-0.65, 0.55, 1.00, -0.80, -0.55],
  [0.35, -0.25, -0.80, 1.00, 0.45],
  [0.72, -0.30, -0.55, 0.45, 1.00],
];

function getColorForValue(value: number) {
  if (value === 1) return "bg-muted text-muted-foreground"; // self
  if (value > 0.6) return "bg-green-500/20 text-green-500";
  if (value > 0.3) return "bg-green-500/10 text-green-400";
  if (value > -0.3) return "bg-transparent text-muted-foreground";
  if (value > -0.6) return "bg-red-500/10 text-red-400";
  return "bg-red-500/20 text-red-500";
}

export function CorrelationMatrix() {
  return (
    <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-colors overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">30D Rolling Correlation</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <div className="grid grid-cols-6 gap-[1px] bg-border p-[1px] rounded-md overflow-hidden">
          {/* Header row */}
          <div className="bg-card flex items-center justify-center p-1"></div>
          {assets.map(asset => (
            <div key={`h-${asset}`} className="bg-card flex items-center justify-center p-1 text-[9px] font-mono text-muted-foreground">
              {asset}
            </div>
          ))}
          
          {/* Matrix rows */}
          {assets.map((asset, i) => (
            <React.Fragment key={`row-${asset}`}>
              <div className="bg-card flex items-center justify-end pr-2 py-2 text-[9px] font-mono text-muted-foreground">
                {asset}
              </div>
              {correlations[i].map((val, j) => (
                <div 
                  key={`${i}-${j}`} 
                  className={cn(
                    "flex items-center justify-center p-2 text-[10px] font-mono font-medium",
                    getColorForValue(val)
                  )}
                >
                  {val === 1 ? "-" : val.toFixed(2)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
