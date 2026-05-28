import { Link, useLocation } from "wouter";
import { LayoutDashboard, TrendingUp, Globe2, Sparkles, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/markets", label: "Markets", icon: TrendingUp },
  { path: "/macro", label: "Macro", icon: Globe2 },
  { path: "/ai", label: "AI", icon: Sparkles },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0f16]/90 backdrop-blur-lg border-t border-[#1e2235] pb-safe">
      <div className="max-w-[430px] mx-auto px-4 py-2 flex justify-between items-center relative">
        {navItems.map((item) => {
          const isActive = location === item.path || (location === "/" && item.path === "/dashboard");
          return (
            <Link key={item.path} href={item.path} className="flex-1 flex flex-col items-center gap-1 relative py-2">
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-[#2563eb]" : "text-[#6b7280]")} />
              <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-[#e2e8f0]" : "text-[#6b7280]")}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#2563eb] rounded-b-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
