import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface ClientMatchingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ClientMatchingScreen: React.FC<ClientMatchingScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [isWeightsOpen, setIsWeightsOpen] = useState(false);
  const [schoolWeight, setSchoolWeight] = useState(40);
  const [budgetWeight, setBudgetWeight] = useState(35);
  const [mrtWeight, setMrtWeight] = useState(25);
  const [activeSort, setActiveSort] = useState<'match' | 'budget' | 'avm' | 'school'>('match');

  return (
    <div className="flex flex-col w-full pb-12 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Active Client Dossier Card */}
      <section className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-[#006874] font-bold">Active Mandate</span>
            <button 
              onClick={() => onShowToast("Switching between active client mandates: 32 mandates available")}
              className="flex items-center gap-1.5 text-left group mt-0.5"
            >
              <h1 className="text-[18px] font-bold text-[#14283f] truncate group-hover:text-[#006874] transition-colors">
                Marcus &amp; Cheryl Lim
              </h1>
              <span className="material-symbols-outlined text-[18px] text-[#74777e] group-hover:text-[#006874]">
                expand_more
              </span>
            </button>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#95f1ff] text-[#001f24] text-[10px] font-bold whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
            Upgrader Buyer
          </span>
        </div>

        {/* Client Financial Envelope */}
        <div className="bg-[#f2f4f7] rounded-lg p-2.5 mb-2.5 border border-[#e6e8eb]">
          <div className="flex items-center justify-between text-[#44474d] text-[10px] pb-1 mb-1 border-b border-[#e6e8eb]">
            <span className="flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[13px] text-[#006874]">account_balance</span>
              IPA Approval (OCBC)
            </span>
            <span className="text-[12px] text-[#001328] font-bold">S$1.85M</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#44474d]">
            <span>Timeline Target</span>
            <span className="text-[#001328] font-bold">Q2 2025 (3-6 Mos)</span>
          </div>
        </div>

        {/* Client Preferences Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="shrink-0 px-2 py-0.5 bg-[#e6e8eb] rounded-full text-[10px] font-semibold text-[#191c1e]">
            Budget: S$1.6M – S$1.8M
          </span>
          <span className="shrink-0 px-2 py-0.5 bg-[#e6e8eb] rounded-full text-[10px] font-semibold text-[#191c1e]">
            3-Bed Condo/EC
          </span>
          <span className="shrink-0 px-2 py-0.5 bg-[#e6e8eb] rounded-full text-[10px] font-semibold text-[#191c1e]">
            ≤1km Catholic High / Cedar
          </span>
          <span className="shrink-0 px-2 py-0.5 bg-[#e6e8eb] rounded-full text-[10px] font-semibold text-[#191c1e]">
            &lt;8m Walk MRT (CCL/NEL)
          </span>
        </div>
      </section>

      {/* Algorithmic Overview & Filters */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3c9f74] animate-pulse"></span>
            <p className="text-[11px] text-[#191c1e]">
              <span className="font-bold text-[#001328]">4 High Fit Matches</span>
              <span className="text-[#44474d]"> from 14 evaluated</span>
            </p>
          </div>
          <button 
            onClick={() => setIsWeightsOpen(true)}
            className="flex items-center gap-1 text-[11px] text-[#006874] font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-[15px]">tune</span>
            Tune Weights
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button 
            onClick={() => setActiveSort('match')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
              activeSort === 'match' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-white text-[#44474d] border border-[#e6e8eb]'
            }`}
          >
            <span>Highest Match %</span>
            <span className="material-symbols-outlined text-[13px]">arrow_downward</span>
          </button>
          <button 
            onClick={() => setActiveSort('budget')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
              activeSort === 'budget' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-white text-[#44474d] border border-[#e6e8eb]'
            }`}
          >
            Budget Fit
          </button>
          <button 
            onClick={() => setActiveSort('avm')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
              activeSort === 'avm' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-white text-[#44474d] border border-[#e6e8eb]'
            }`}
          >
            Under AVM Valuation
          </button>
          <button 
            onClick={() => setActiveSort('school')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
              activeSort === 'school' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-white text-[#44474d] border border-[#e6e8eb]'
            }`}
          >
            School &lt;1km
          </button>
        </div>
      </section>

      {/* MATCH CARD 1: 94% Top Match - Bishan Loft */}
      <article className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb] space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#94f6c4]/40 to-transparent pointer-events-none rounded-bl-full"></div>

        <div className="flex items-start justify-between gap-2 relative">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] px-1.5 py-0.2 bg-[#f2f4f7] text-[#44474d] rounded font-semibold">D20 • Bishan</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-[#f2f4f7] text-[#44474d] rounded font-semibold">99-yr</span>
              <span className="text-[9px] text-[#005236] font-bold flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span> URA Verified
              </span>
            </div>
            <h2 className="text-[15px] font-bold text-[#001328] truncate">Bishan Loft · Block 33</h2>
            <p className="text-[11px] text-[#44474d]">#14-06 • 3-Bed, 2-Bath • 1,141 sqft</p>
          </div>

          {/* Match Score Radial */}
          <div className="shrink-0 flex flex-col items-center justify-center w-13 h-13 rounded-full bg-[#94f6c4] text-[#002e1c] shadow-xs">
            <span className="text-[16px] leading-none font-bold">94%</span>
            <span className="text-[8px] uppercase tracking-tight font-bold mt-0.5">Fit Score</span>
          </div>
        </div>

        {/* Visual Snapshot */}
        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#eceef1]">
          <img 
            className="w-full h-full object-cover" 
            src={ASSETS.bishanLoftLivingAlt} 
            alt="Bishan Loft interior" 
          />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#14283f]/85 backdrop-blur-md text-white text-[9px] font-bold">
            3 Bedder EC High Floor
          </div>
          <div className="absolute top-2 right-2">
            <button 
              onClick={() => onShowToast("Shortlisted Bishan Loft for Marcus & Cheryl")}
              className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-[#001328] flex items-center justify-center shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f2f4f7] rounded-lg border border-[#e6e8eb]">
          <div>
            <span className="text-[9px] text-[#44474d] block font-semibold">Asking Price</span>
            <span className="text-[15px] font-bold text-[#001328] block">S$1,620,000</span>
            <span className="text-[10px] text-[#44474d]">S$1,420 psf</span>
          </div>
          <div>
            <span className="text-[9px] text-[#44474d] block font-semibold">AVM Fair Value</span>
            <span className="text-[15px] font-bold text-[#006874] block">S$1,620,000</span>
            <span className="text-[10px] text-[#005236] font-bold">Parity with Valuation</span>
          </div>
        </div>

        {/* Criteria Fit Checklist */}
        <div className="space-y-1.5 pt-0.5 text-[11px]">
          <p className="text-[9px] uppercase font-bold text-[#44474d] tracking-wider">Fit Breakdown</p>
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#005236] shrink-0 mt-0.5">check_circle</span>
            <span className="flex-1"><strong className="text-[#001328]">Budget Cap:</strong> S$1.62M within S$1.8M limit (<span className="text-[#005236] font-bold">+S$180k buffer</span>)</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#005236] shrink-0 mt-0.5">check_circle</span>
            <span className="flex-1"><strong className="text-[#001328]">Primary School:</strong> 0.72km to Catholic High (Phase 2C Eligible)</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#005236] shrink-0 mt-0.5">check_circle</span>
            <span className="flex-1"><strong className="text-[#001328]">Transport:</strong> 6 mins walk Bishan MRT (NSL / Circle Line Interchange)</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#005236] shrink-0 mt-0.5">check_circle</span>
            <span className="flex-1"><strong className="text-[#001328]">Usable Area:</strong> 1,141 sqft exceeds client min 1,000 sqft</span>
          </div>
        </div>

        {/* Realtor Actions */}
        <div className="pt-1 flex items-center gap-2">
          <button 
            onClick={() => onNavigate('report-builder')}
            className="flex-1 h-9 bg-[#006874] hover:bg-[#005236] text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">share</span>
            <span>Share Pitch PDF</span>
          </button>
          <button 
            onClick={() => onShowToast("Shortlisted Bishan Loft to Marcus's private portal")}
            className="h-9 px-3 bg-[#e6e8eb] hover:bg-[#d8dadd] text-[#001328] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">calendar_today</span>
            <span>Shortlist</span>
          </button>
          <button 
            onClick={() => onNavigate('property-detail')}
            className="h-9 w-9 bg-[#f2f4f7] hover:bg-[#eceef1] text-[#44474d] rounded-lg flex items-center justify-center border border-[#e6e8eb]"
            title="Inspect"
          >
            <span className="material-symbols-outlined text-[17px]">visibility</span>
          </button>
        </div>
      </article>

      {/* MATCH CARD 2: 88% Match - Park Colonial */}
      <article className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb] space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] px-1.5 py-0.2 bg-[#f2f4f7] text-[#44474d] rounded font-semibold">D13 • Woodleigh</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-[#f2f4f7] text-[#44474d] rounded font-semibold">99-yr</span>
              <span className="text-[9px] text-[#006f7b] font-bold">Under Valued</span>
            </div>
            <h2 className="text-[15px] font-bold text-[#001328] truncate">Park Colonial · Block 1</h2>
            <p className="text-[11px] text-[#44474d]">#09-12 • 3-Bed Compact • 947 sqft</p>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center w-13 h-13 rounded-full bg-[#95f1ff] text-[#001f24] shadow-xs">
            <span className="text-[16px] leading-none font-bold">88%</span>
            <span className="text-[8px] uppercase tracking-tight font-bold mt-0.5">Fit Score</span>
          </div>
        </div>

        {/* Visual Snapshot */}
        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#eceef1]">
          <img className="w-full h-full object-cover" src={ASSETS.parkColonial} alt="Park Colonial pool" />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#14283f]/85 backdrop-blur-md text-white text-[9px] font-bold">
            Direct MRT Underpass
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f2f4f7] rounded-lg border border-[#e6e8eb]">
          <div>
            <span className="text-[9px] text-[#44474d] block font-semibold">Asking Price</span>
            <span className="text-[15px] font-bold text-[#001328] block">S$1,690,000</span>
            <span className="text-[10px] text-[#44474d]">S$1,780 psf</span>
          </div>
          <div>
            <span className="text-[9px] text-[#44474d] block font-semibold">AVM Assessment</span>
            <span className="text-[15px] font-bold text-[#006874] block">S$1,720,000</span>
            <span className="text-[10px] text-[#005236] font-bold">1.8% Under AVM</span>
          </div>
        </div>

        {/* Fit breakdown */}
        <div className="space-y-1.5 pt-0.5 text-[11px]">
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#005236] shrink-0 mt-0.5">check_circle</span>
            <span className="flex-1"><strong className="text-[#001328]">Transport:</strong> 1 min sheltered linkway to Woodleigh MRT (NEL)</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#005236] shrink-0 mt-0.5">check_circle</span>
            <span className="flex-1"><strong className="text-[#001328]">Primary School:</strong> 0.85km to Cedar Primary School</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#ba1a1a] shrink-0 mt-0.5">warning</span>
            <span className="flex-1 text-[#44474d]"><strong className="text-[#001328]">Size Compromise:</strong> 947 sqft is 53 sqft below 1,000 sqft target</span>
          </div>
        </div>

        <div className="pt-1 flex items-center gap-2">
          <button 
            onClick={() => onNavigate('report-builder')}
            className="flex-1 h-9 bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[15px]">share</span>
            <span>Share Pitch Deck</span>
          </button>
          <button 
            onClick={() => onShowToast("Park Colonial shortlisted for Marcus & Cheryl")}
            className="h-9 px-4 bg-[#006874] text-white rounded-lg text-[11px] font-bold"
          >
            Shortlist
          </button>
        </div>
      </article>

      {/* MATCH CARD 3: Sky Habitat */}
      <article className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb] space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] px-1.5 py-0.2 bg-[#f2f4f7] text-[#44474d] rounded font-semibold">D20 • Bishan</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-[#f2f4f7] text-[#44474d] rounded font-semibold">99-yr</span>
              <span className="text-[9px] text-[#44474d]">Iconic Moshe Safdie</span>
            </div>
            <h2 className="text-[15px] font-bold text-[#001328] truncate">Sky Habitat · Bishan St 15</h2>
            <p className="text-[11px] text-[#44474d]">#06-18 • 2-Bed + Study • 1,023 sqft</p>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center w-13 h-13 rounded-full bg-[#e6e8eb] text-[#001328] shadow-xs">
            <span className="text-[16px] leading-none font-bold">82%</span>
            <span className="text-[8px] uppercase tracking-tight font-bold mt-0.5">Fit Score</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f2f4f7] rounded-lg border border-[#e6e8eb]">
          <div>
            <span className="text-[9px] text-[#44474d] block font-semibold">Asking Price</span>
            <span className="text-[15px] font-bold text-[#001328] block">S$1,780,000</span>
            <span className="text-[10px] text-[#44474d]">S$1,740 psf</span>
          </div>
          <div>
            <span className="text-[9px] text-[#44474d] block font-semibold">AVM Analysis</span>
            <span className="text-[15px] font-bold text-[#001328] block">S$1,735,000</span>
            <span className="text-[10px] text-[#ba1a1a] font-bold">+2.5% Premium Asking</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-0.5 text-[11px]">
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#005236] shrink-0 mt-0.5">check_circle</span>
            <span className="flex-1"><strong className="text-[#001328]">Ultra Close to School:</strong> 0.45km walk to Catholic High Primary</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#191c1e]">
            <span className="material-symbols-outlined text-[15px] text-[#ba1a1a] shrink-0 mt-0.5">priority_high</span>
            <span className="flex-1 text-[#44474d]"><strong className="text-[#001328]">Budget Stretch:</strong> At 96.2% of pre-approved loan envelope (S$1.78M / S$1.85M)</span>
          </div>
        </div>

        <div className="pt-1 flex items-center gap-2">
          <button 
            onClick={() => onNavigate('caveats')}
            className="flex-1 h-9 bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[15px]">history_edu</span>
            <span>Review Caveats</span>
          </button>
          <button 
            onClick={() => onNavigate('report-builder')}
            className="flex-1 h-9 bg-[#e6e8eb] hover:bg-[#d8dadd] text-[#001328] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">share</span>
            <span>Share Option</span>
          </button>
        </div>
      </article>

      {/* WhatsApp Match Bundle Sticky Footer */}
      <section className="bg-[#14283f] text-white rounded-2xl p-4 shadow-md space-y-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#006874] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">send</span>
          </div>
          <div>
            <h2 className="text-[14px] font-bold leading-none">WhatsApp Match Bundle</h2>
            <span className="text-[11px] text-[#7c8fab]">Curated top 2 units (Bishan Loft &amp; Park Colonial)</span>
          </div>
        </div>

        <button 
          onClick={() => onShowToast("WhatsApp Pitch prepared for Marcus & Cheryl Lim (+65 9123 4567)")}
          className="w-full h-11 bg-[#005236] hover:bg-[#002e1c] text-[#94f6c4] text-[13px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>Batch Send 2 Matches to Marcus</span>
        </button>

        <div className="flex items-center justify-between text-[#7c8fab] pt-1 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-[#94f6c4]">verified_user</span>
            URA REALIS Caveat &amp; SISV Compliant
          </span>
          <span>Updated 12m ago</span>
        </div>
      </section>

      {/* Algorithmic Weight Tuning Drawer Modal */}
      {isWeightsOpen && (
        <div className="fixed inset-0 z-50 bg-[#001328]/60 backdrop-blur-sm flex flex-col justify-end animate-fade-in">
          <div className="bg-white rounded-t-2xl p-4 space-y-3.5 shadow-2xl max-w-md mx-auto w-full border-t border-[#e6e8eb]">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-[15px] font-bold text-[#001328]">Algorithmic Match Tuning</h2>
                <p className="text-[11px] text-[#44474d]">Adjust weighting priorities for Marcus &amp; Cheryl</p>
              </div>
              <button 
                onClick={() => setIsWeightsOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eceef1] hover:bg-[#e0e3e6] flex items-center justify-center text-[#001328]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 py-1">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-[#001328]">School Proximity (1km Primary)</span>
                  <span className="text-[#006874]">{schoolWeight}%</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="60"
                  value={schoolWeight}
                  onChange={(e) => setSchoolWeight(Number(e.target.value))}
                  className="w-full accent-[#006874] h-1.5 bg-[#eceef1] rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-[#001328]">Budget &amp; Price Ceiling Safety</span>
                  <span className="text-[#006874]">{budgetWeight}%</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="60"
                  value={budgetWeight}
                  onChange={(e) => setBudgetWeight(Number(e.target.value))}
                  className="w-full accent-[#006874] h-1.5 bg-[#eceef1] rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-[#001328]">MRT Walkability (&lt;8 min)</span>
                  <span className="text-[#006874]">{mrtWeight}%</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="50"
                  value={mrtWeight}
                  onChange={(e) => setMrtWeight(Number(e.target.value))}
                  className="w-full accent-[#006874] h-1.5 bg-[#eceef1] rounded-lg"
                />
              </div>
            </div>

            <button 
              onClick={() => {
                setIsWeightsOpen(false);
                onShowToast("Algorithm weights updated. Matches recalculated.");
              }}
              className="w-full h-11 bg-[#001328] hover:bg-[#14283f] text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-[0.99] transition-all"
            >
              Recalculate Matches
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
