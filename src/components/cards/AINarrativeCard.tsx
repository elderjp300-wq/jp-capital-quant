import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function AINarrativeCard() {
  return (
    <Card className="relative overflow-hidden bg-[#111318] border-[#2563eb]/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2563eb] to-transparent animate-pulse" />
      
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <div className="bg-[#2563eb]/20 p-1.5 rounded-md">
          <Sparkles className="w-4 h-4 text-[#2563eb]" />
        </div>
        <span className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">Powered by JP Capital AI</span>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-foreground/90 leading-relaxed font-medium">
          The Fed remains on hold as core PCE moderates toward 2.4%. DXY weakness is creating a tailwind for commodities and EM. Yield curve normalization suggests the hiking cycle is behind us. <span className="text-amber-500 font-bold">Key risk:</span> hotter-than-expected NFP could reprice terminal rate expectations and shock short-end yields.
        </p>
        <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Updated 4 mins ago</span>
          <div className="flex gap-2">
            <span className="bg-muted px-2 py-1 rounded">Confidence: High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
