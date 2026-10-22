import React from 'react';
import { PersonaType, ScreenId, ALL_SCREENS } from '../types';
import { ASSETS } from '../data/assets';

interface HeaderProps {
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  activeScreen: ScreenId;
  setActiveScreen: (s: ScreenId) => void;
  onOpenScreenModal: () => void;
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  persona,
  setPersona,
  activeScreen,
  setActiveScreen,
  onOpenScreenModal,
  onShowToast,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#f7f9fc]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(20,40,63,0.04)] pt-safe border-b border-[#e6e8eb]/60">
      <div className="h-28 px-4 flex flex-col justify-between py-2 max-w-4xl mx-auto">
        {/* Top Row: Logo, Live Sync, Notification, Profile */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveScreen('home')}
            title="Go to Home"
          >
            <img 
              alt="SG PropIntel Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src={ASSETS.logo} 
            />
            <div className="flex flex-col">
              <span className="font-semibold text-[16px] text-[#14283f] leading-none tracking-tight">
                SG PropIntel
              </span>
              <span className="text-[10px] text-[#44474d] font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874] inline-block animate-pulse"></span>
                {persona === 'agent' ? 'CEA Lic. R014829E • Verified' : 'URA & HDB Live Sync'}
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5">
            {/* Quick Screen Catalog Navigator Button */}
            <button
              onClick={onOpenScreenModal}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eceef1] hover:bg-[#e0e3e6] text-[#001328] text-[11px] font-semibold transition-all active:scale-95 shadow-xs"
              title="Browse all 15 screens"
            >
              <span className="material-symbols-outlined text-[15px] text-[#006874]">grid_view</span>
              <span className="hidden sm:inline">15 Screens</span>
            </button>

            {/* Notification Bell */}
            <button 
              aria-label="Notifications" 
              className="w-9 h-9 flex items-center justify-center text-[#44474d] hover:text-[#14283f] rounded-full transition-colors relative hover:bg-[#eceef1]"
              onClick={() => onShowToast("You have 3 active updates from URA REALIS & HDB Resale.")}
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            {/* Profile Avatar */}
            <div 
              className="relative cursor-pointer"
              onClick={() => onShowToast(persona === 'agent' ? "Eileen Tan (PropNex Lead Agent) Profile" : "Alex Tan (Buyer/Owner Portfolio)")}
            >
              <img 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(20,40,63,0.08)] ring-1 ring-[#006874]/30" 
                src={persona === 'agent' ? ASSETS.agentEileen : ASSETS.profile} 
              />
            </div>
          </div>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="flex items-center justify-between bg-[#f2f4f7] p-1 rounded-full shadow-inner">
          <button 
            type="button"
            onClick={() => {
              setPersona('buyer');
              if (['agent-dashboard', 'client-matching', 'report-builder', 'seller-portal', 'seller-strategy', 'marketing-kit'].includes(activeScreen)) {
                setActiveScreen('home');
              }
              onShowToast("Switched to Buyer Mode: Explore properties & calculate TDSR");
            }}
            className={`flex-1 py-1 text-center text-[12px] font-semibold rounded-full transition-all ${
              persona === 'buyer' 
                ? 'bg-[#14283f] text-white shadow-[0_1px_3px_rgba(20,40,63,0.12)]' 
                : 'text-[#44474d] hover:text-[#191c1e]'
            }`}
          >
            Buyer
          </button>

          <button 
            type="button"
            onClick={() => {
              setPersona('seller');
              if (!['seller-portal', 'seller-strategy', 'marketing-kit'].includes(activeScreen)) {
                setActiveScreen('seller-portal');
              }
              onShowToast("Switched to Seller Mode: Owner dashboard & proceeds waterfall");
            }}
            className={`flex-1 py-1 text-center text-[12px] font-semibold rounded-full transition-all ${
              persona === 'seller' 
                ? 'bg-[#14283f] text-white shadow-[0_1px_3px_rgba(20,40,63,0.12)]' 
                : 'text-[#44474d] hover:text-[#191c1e]'
            }`}
          >
            Seller
          </button>

          <button 
            type="button"
            onClick={() => {
              setPersona('agent');
              if (!['agent-dashboard', 'client-matching', 'report-builder', 'marketing-kit'].includes(activeScreen)) {
                setActiveScreen('agent-dashboard');
              }
              onShowToast("Switched to Agent Mode: Mandate matching & valuation reports");
            }}
            className={`flex-1 py-1 text-center text-[12px] font-semibold rounded-full transition-all flex items-center justify-center gap-1 ${
              persona === 'agent' 
                ? 'bg-[#14283f] text-white shadow-[0_1px_3px_rgba(20,40,63,0.12)]' 
                : 'text-[#44474d] hover:text-[#191c1e]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px] text-[#78d9aa]">verified</span>
            Agent
          </button>
        </div>
      </div>
    </header>
  );
};
