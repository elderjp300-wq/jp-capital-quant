import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BrainCircuit, AlertTriangle, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = ["Signals", "Scenarios", "Risks"];

const insights = [
  { id: 1, title: "Yield Curve Signal", time: "10m ago", conf: "High", text: "2s10s curve flattening momentum has accelerated. Historical analog to 2006 suggests final hike is priced. Recommend closing duration shorts." },
  { id: 2, title: "DXY Breakdown", time: "1h ago", conf: "Med", text: "Dollar index breaking below 104.50 support on weak ISM data. Model is flipping to structural short USD against high-beta EM currencies." },
  { id: 3, title: "Energy Shock Risk", time: "3h ago", conf: "Low", text: "WTI crude option skew showing extreme put premium. Supply-side geopolitics not fully priced. Tactical long energy equities advised." },
];

const scenarios = [
  { type: "Bull", prob: "15%", text: "Immaculate disinflation. Fed cuts 4x. SPX > 5500." },
  { type: "Base", prob: "60%", text: "Sticky inflation. Fed cuts 1-2x. Rangebound equities. Higher for longer." },
  { type: "Bear", prob: "25%", text: "Stagflation resurgence. Fed hikes again. SPX < 4500." },
];

const risks = [
  { name: "Fed pivot delay", prob: 28 },
  { name: "Commercial Real Estate event", prob: 22 },
  { name: "Middle East escalation", prob: 18 },
  { name: "Yen intervention failure", prob: 15 },
  { name: "Tech earnings miss", prob: 12 },
];

export default function AI() {
  const [activeTab, setActiveTab] = useState("Signals");

  return (
    <div className="pb-20 flex flex-col h-[calc(100vh-36px)]">
      
      <div className="p-3 bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold">JP Capital AI</h1>
            <div className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Model Active (v4.5)
            </div>
          </div>
        </div>

        <div className="flex bg-muted/50 p-1 rounded-lg">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 text-xs font-medium py-1.5 rounded-md transition-all",
                activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <AnimatePresence mode="wait">
          
          {activeTab === "Signals" && (
            <motion.div key="signals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {insights.map((insight, i) => (
                <motion.div key={insight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-card/50 backdrop-blur-md border-[#1e2235] relative overflow-hidden">
                    {i === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-sm flex items-center gap-2">
                          <MessageSquare className="w-3 h-3 text-primary" /> {insight.title}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">{insight.time}</div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {insight.text}
                      </p>
                      <div className="flex justify-end">
                        <Badge variant="outline" className="text-[9px] bg-muted/50 font-mono">
                          Conf: {insight.conf}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              <div className="flex gap-1 ml-4 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          )}

          {activeTab === "Scenarios" && (
            <motion.div key="scenarios" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {scenarios.map((s, i) => (
                <Card key={s.type} className="bg-card/50 border-[#1e2235]">
                  <CardContent className="p-4 flex gap-4">
                    <div className="flex flex-col items-center justify-center w-12 shrink-0">
                      <div className={cn(
                        "text-lg font-bold font-mono mb-1",
                        s.type === "Bull" ? "text-green-500" : s.type === "Bear" ? "text-red-500" : "text-amber-500"
                      )}>{s.prob}</div>
                      <div className="text-[10px] uppercase text-muted-foreground">{s.type}</div>
                    </div>
                    <div className="w-[1px] bg-border/50"></div>
                    <p className="text-xs text-muted-foreground flex-1 self-center leading-relaxed">
                      {s.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {activeTab === "Risks" && (
            <motion.div key="risks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="bg-card/50 border-[#1e2235]">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2 text-amber-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-bold">Tail Risk Matrix</span>
                  </div>
                  
                  {risks.map(risk => (
                    <div key={risk.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{risk.name}</span>
                        <span className="font-mono">{risk.prob}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${risk.prob}%` }}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="p-3 bg-background border-t border-border/50">
        <button className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 rounded-lg text-sm font-bold transition-colors">
          <Sparkles className="w-4 h-4" />
          Generate Custom Insight
        </button>
      </div>
    </div>
  );
}
