'use client';

import { useEffect, useState } from 'react';
import { TopTicker, BottomNav } from '@/components/Shell';
import DashboardScreen from '@/components/Dashboard';
import MarketsScreen from '@/components/Markets';
import MacroScreen from '@/components/Macro';
import AIScreen from '@/components/AI';
import SettingsScreen from '@/components/Settings';

const TAB_IDS = ['dashboard', 'markets', 'macro', 'ai', 'settings'];
const SCREENS = {
  dashboard: DashboardScreen,
  markets: MarketsScreen,
  macro: MacroScreen,
  ai: AIScreen,
  settings: SettingsScreen,
};

export default function Page() {
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    const h = (window.location.hash || '#dashboard').replace('#', '');
    if (TAB_IDS.includes(h)) setTab(h);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '');
      if (TAB_IDS.includes(h)) setTab(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (window.location.hash.replace('#', '') !== tab) {
      window.history.replaceState(null, '', '#' + tab);
    }
    window.scrollTo(0, 0);
  }, [tab]);

  const Screen = SCREENS[tab] || DashboardScreen;

  return (
    <div className="min-h-screen relative bg-black">
      <div className="mx-auto max-w-[520px] relative min-h-screen pb-[88px] bg-black">
        <TopTicker />
        <div key={tab} className="screen-fade">
          <Screen />
        </div>
        <BottomNav active={tab} onChange={setTab} />
      </div>
    </div>
  );
}
