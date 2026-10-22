import React, { useState, useEffect } from 'react';
import { PersonaType, ScreenId } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ScreenSwitcherModal } from './components/ScreenSwitcherModal';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { PropertyDetailScreen } from './screens/PropertyDetailScreen';
import { ValuationScreen } from './screens/ValuationScreen';
import { CaveatsScreen } from './screens/CaveatsScreen';
import { RentalInvestmentScreen } from './screens/RentalInvestmentScreen';
import { SellerStrategyScreen } from './screens/SellerStrategyScreen';
import { AffordabilityTdsrScreen } from './screens/AffordabilityTdsrScreen';
import { MortgageRatesScreen } from './screens/MortgageRatesScreen';
import { MarketIntelligenceScreen } from './screens/MarketIntelligenceScreen';
import { AgentDashboardScreen } from './screens/AgentDashboardScreen';
import { ClientMatchingScreen } from './screens/ClientMatchingScreen';
import { ReportBuilderScreen } from './screens/ReportBuilderScreen';
import { MarketingKitScreen } from './screens/MarketingKitScreen';
import { SellerPortalScreen } from './screens/SellerPortalScreen';

export default function App() {
  const [persona, setPersona] = useState<PersonaType>('buyer');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [isScreenModalOpen, setIsScreenModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast with auto-dismiss
  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Navigate & scroll to top
  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Screen selection with persona alignment
  const handleSelectScreenWithPersona = (screenId: ScreenId, targetPersona?: PersonaType) => {
    if (targetPersona) {
      setPersona(targetPersona);
    }
    setActiveScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'explore':
        return <ExploreScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'property-detail':
        return <PropertyDetailScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'valuation':
        return <ValuationScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'caveats':
        return <CaveatsScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'rental-investment':
        return <RentalInvestmentScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'seller-strategy':
        return <SellerStrategyScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'affordability-tdsr':
        return <AffordabilityTdsrScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'mortgage-rates':
        return <MortgageRatesScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'market-intelligence':
        return <MarketIntelligenceScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'agent-dashboard':
        return <AgentDashboardScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'client-matching':
        return <ClientMatchingScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'report-builder':
        return <ReportBuilderScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'marketing-kit':
        return <MarketingKitScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      case 'seller-portal':
        return <SellerPortalScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onShowToast={handleShowToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#191c1e] flex flex-col font-sans antialiased selection:bg-[#95f1ff] selection:text-[#001f24]">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-[#001328] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700/60 animate-bounce-in">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="material-symbols-outlined text-[19px] text-[#78d9aa] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-xs font-semibold text-slate-100 truncate">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 p-1 rounded-full transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Universal Institutional Header with Persona Selector */}
      <Header
        persona={persona}
        setPersona={setPersona}
        activeScreen={activeScreen}
        setActiveScreen={handleNavigate}
        onOpenScreenModal={() => setIsScreenModalOpen(true)}
        onShowToast={handleShowToast}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto pt-32 pb-24 px-3 sm:px-4">
        {renderActiveScreen()}
      </main>

      {/* Universal Dynamic Bottom Nav with Role Context */}
      <BottomNav
        persona={persona}
        activeScreen={activeScreen}
        setActiveScreen={handleNavigate}
      />

      {/* 15-Screen Quick Catalog Switcher Drawer */}
      <ScreenSwitcherModal
        isOpen={isScreenModalOpen}
        onClose={() => setIsScreenModalOpen(false)}
        activeScreen={activeScreen}
        onSelectScreen={handleSelectScreenWithPersona}
      />
    </div>
  );
}
