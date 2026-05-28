import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User, Bell, RefreshCcw, Shield, LogOut, ChevronRight } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-3 space-y-4 pb-20">
      
      {/* Profile Section */}
      <Card className="bg-card/50 border-[#1e2235]">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Alex Quant</h2>
            <p className="text-xs text-muted-foreground font-mono">alex@jpcapital.com</p>
          </div>
          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-none shadow-[0_0_10px_rgba(245,158,11,0.3)]">
            PRO
          </Badge>
        </CardContent>
      </Card>

      {/* Subscription */}
      <div className="bg-gradient-to-br from-[#2563eb]/10 to-transparent p-[1px] rounded-xl">
        <div className="bg-card p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-foreground">Pro Plan Active</div>
            <div className="text-xs text-muted-foreground mt-0.5">Renews Dec 31, 2024</div>
          </div>
          <button className="text-xs text-primary font-medium px-3 py-1.5 bg-primary/10 rounded-md">Manage</button>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1">Preferences</h3>
        <Card className="bg-card/50 border-[#1e2235]">
          <CardContent className="p-0 divide-y divide-[#1e2235]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-sm font-medium">Dark Mode</div>
              </div>
              <Switch checked={true} disabled />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium">Push Notifications</div>
                  <div className="text-[10px] text-muted-foreground">Alerts for regime shifts</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <RefreshCcw className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium">Auto-Refresh</div>
                  <div className="text-[10px] text-muted-foreground">Every 5 seconds</div>
                </div>
              </div>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Links */}
      <Card className="bg-card/50 border-[#1e2235]">
        <CardContent className="p-0 divide-y divide-[#1e2235]">
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <span className="text-sm text-foreground">API Documentation</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <span className="text-sm text-foreground">Contact Support</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 text-red-500 p-4 font-medium hover:bg-red-500/10 rounded-lg transition-colors">
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

      <div className="text-center pt-4 pb-2">
        <div className="text-[10px] font-mono text-muted-foreground">JP Capital — Quant Dominance v1.0.0</div>
        <div className="text-[10px] text-muted-foreground mt-1">Made in NYC</div>
      </div>
    </div>
  );
}
