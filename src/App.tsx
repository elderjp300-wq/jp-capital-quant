import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { TickerBar } from "@/components/TickerBar";
import { BottomNav } from "@/components/BottomNav";

import Dashboard from "@/pages/Dashboard";
import Markets from "@/pages/Markets";
import Macro from "@/pages/Macro";
import AI from "@/pages/AI";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-[430px] mx-auto bg-background relative shadow-2xl overflow-hidden">
      <TickerBar />
      
      <main className="flex-1 relative overflow-hidden">
        <Switch>
          <Route path="/" component={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/markets" component={Markets} />
          <Route path="/macro" component={Macro} />
          <Route path="/ai" component={AI} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-screen bg-black flex justify-center">
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
