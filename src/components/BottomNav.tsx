import React from 'react';
import { PersonaType, ScreenId } from '../types';

interface BottomNavProps {
  persona: PersonaType;
  activeScreen: ScreenId;
  setActiveScreen: (s: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  persona,
  activeScreen,
  setActiveScreen,
}) => {
  // Determine role-specific 5th tab
  const getFifthTab = () => {
    if (persona === 'agent') {
      return {
        id: 'client-matching' as ScreenId,
        label: 'Matching',
        icon: 'hub',
        isActive: ['client-matching', 'agent-dashboard', 'report-builder'].includes(activeScreen),
      };
    }
    if (persona === 'seller') {
      return {
        id: 'seller-strategy' as ScreenId,
        label: 'Proceeds',
        icon: 'receipt_long',
        isActive: ['seller-strategy', 'seller-portal', 'marketing-kit'].includes(activeScreen),
      };
    }
    return {
      id: 'affordability-tdsr' as ScreenId,
      label: 'TDSR Calc',
      icon: 'account_balance',
      isActive: ['affordability-tdsr', 'mortgage-rates', 'rental-investment'].includes(activeScreen),
    };
  };

  const fifthTab = getFifthTab();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#f7f9fc]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(20,40,63,0.06)] border-t border-[#e6e8eb]/70">
      <div className="flex justify-around items-center h-16 px-2 max-w-4xl mx-auto">
        {/* Tab 1: Home */}
        <button
          onClick={() => {
            if (persona === 'agent') setActiveScreen('agent-dashboard');
            else if (persona === 'seller') setActiveScreen('seller-portal');
            else setActiveScreen('home');
          }}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors ${
            ['home', 'agent-dashboard', 'seller-portal'].includes(activeScreen)
              ? 'text-[#006874] font-semibold'
              : 'text-[#44474d] hover:text-[#191c1e]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {persona === 'agent' ? 'dashboard' : 'dashboard'}
          </span>
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Tab 2: Explore */}
        <button
          onClick={() => setActiveScreen('explore')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors ${
            activeScreen === 'explore'
              ? 'text-[#006874] font-semibold'
              : 'text-[#44474d] hover:text-[#191c1e]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">travel_explore</span>
          <span className="text-[10px] tracking-tight">Explore</span>
        </button>

        {/* Tab 3: Valuation */}
        <button
          onClick={() => setActiveScreen('valuation')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors ${
            activeScreen === 'valuation'
              ? 'text-[#006874] font-semibold'
              : 'text-[#44474d] hover:text-[#191c1e]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">calculate</span>
          <span className="text-[10px] tracking-tight">Valuation</span>
        </button>

        {/* Tab 4: Caveats */}
        <button
          onClick={() => setActiveScreen('caveats')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors ${
            activeScreen === 'caveats'
              ? 'text-[#006874] font-semibold'
              : 'text-[#44474d] hover:text-[#191c1e]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">insert_chart</span>
          <span className="text-[10px] tracking-tight">Caveats</span>
        </button>

        {/* Tab 5: Dynamic Role Tool */}
        <button
          onClick={() => setActiveScreen(fifthTab.id)}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors ${
            fifthTab.isActive
              ? 'text-[#006874] font-semibold'
              : 'text-[#44474d] hover:text-[#191c1e]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">{fifthTab.icon}</span>
          <span className="text-[10px] tracking-tight">{fifthTab.label}</span>
        </button>
      </div>
    </nav>
  );
};
