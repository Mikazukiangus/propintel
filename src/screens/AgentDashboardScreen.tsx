import React from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface AgentDashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const AgentDashboardScreen: React.FC<AgentDashboardScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full pb-12 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* AGENT KPI & REGISTRATION STRIP */}
      <section className="flex flex-col gap-2">
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95f1ff]/30 text-[#006f7b] text-[10px] font-bold">
                <span className="material-symbols-outlined text-[13px] text-[#006874]">verified</span>
                CEA: R048291J
              </span>
              <span className="text-[#44474d] text-[11px] font-bold">PropNex Realty</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] text-[#005236] bg-[#94f6c4]/40 px-2 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874] animate-pulse"></span>
              Active Roster
            </span>
          </div>

          {/* Gross Commission MTD */}
          <div className="bg-[#14283f] text-white rounded-xl p-3.5 flex items-center justify-between shadow-xs">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 text-[#7c8fab] text-[10px] font-bold">
                <span>GROSS COMMISSION (MTD)</span>
                <span className="material-symbols-outlined text-[14px]">query_stats</span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-[22px] font-bold tracking-tight text-white">S$48,500</span>
                <span className="text-[10px] text-[#7c8fab]">3 Deals Closed</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md bg-[#005236]/30 text-[#94f6c4] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +18.4%
              </span>
              <span className="text-[9px] text-[#7c8fab] mt-0.5">vs. prev month</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2x2 METRICS GRID */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-wider uppercase text-[#44474d] font-bold">Portfolio Vitals</span>
          <span className="text-[10px] text-[#006874] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span> Live REALIS Sync
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Active Listings */}
          <div 
            onClick={() => onNavigate('marketing-kit')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#006874]/40"
          >
            <div className="flex items-center justify-between text-[#44474d]">
              <span className="text-[10px] font-bold">Active Listings</span>
              <span className="material-symbols-outlined text-[17px] text-[#006874]">apartment</span>
            </div>
            <div className="my-1">
              <div className="text-[20px] font-bold text-[#14283f]">18</div>
              <div className="text-[10px] text-[#44474d] flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span> 4 viewings pending
              </div>
            </div>
          </div>

          {/* New Enquiries */}
          <div 
            onClick={() => onShowToast("7 active portal buyer leads received")}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#006874]/40"
          >
            <div className="flex items-center justify-between text-[#44474d]">
              <span className="text-[10px] font-bold">New Enquiries</span>
              <span className="material-symbols-outlined text-[17px] text-[#006874]">chat</span>
            </div>
            <div className="my-1">
              <div className="text-[20px] font-bold text-[#14283f]">7</div>
              <div className="text-[10px] text-[#44474d] flex items-center gap-1 mt-0.5">
                <span className="text-[#005236] font-bold">+3</span> past 24h via Portal
              </div>
            </div>
          </div>

          {/* Upcoming Viewings */}
          <div 
            onClick={() => onShowToast("Calendar: 2 viewings today (Woodleigh & Bishan)")}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#006874]/40"
          >
            <div className="flex items-center justify-between text-[#44474d]">
              <span className="text-[10px] font-bold">Upcoming Viewings</span>
              <span className="material-symbols-outlined text-[17px] text-[#006874]">calendar_clock</span>
            </div>
            <div className="my-1">
              <div className="text-[20px] font-bold text-[#14283f]">4</div>
              <div className="text-[10px] text-[#44474d] flex items-center gap-1 mt-0.5">
                <span className="font-bold text-[#006874]">2 scheduled</span> today
              </div>
            </div>
          </div>

          {/* Active Clients */}
          <div 
            onClick={() => onNavigate('client-matching')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#006874]/40"
          >
            <div className="flex items-center justify-between text-[#44474d]">
              <span className="text-[10px] font-bold">Active Clients</span>
              <span className="material-symbols-outlined text-[17px] text-[#006874]">assignment_ind</span>
            </div>
            <div className="my-1">
              <div className="text-[20px] font-bold text-[#14283f]">32</div>
              <div className="text-[10px] text-[#44474d] flex items-center gap-1 mt-0.5">
                <span className="font-bold text-[#005236]">8</span> Pre-Approved IPA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK OPERATIONS BAR */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-wider uppercase text-[#44474d] font-bold">Fast Operations</span>
          <span className="text-[10px] text-[#74777e]">Shortcuts</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button 
            onClick={() => onNavigate('marketing-kit')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#006874] text-white text-[11px] font-bold whitespace-nowrap shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            New Listing
          </button>
          <button 
            onClick={() => onNavigate('valuation')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14283f] text-white text-[11px] font-bold whitespace-nowrap shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[15px]">analytics</span>
            Run AVM
          </button>
          <button 
            onClick={() => onNavigate('client-matching')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e6e8eb] text-[#14283f] text-[11px] font-bold whitespace-nowrap active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[15px]">person_add</span>
            Matching Mandate
          </button>
          <button 
            onClick={() => onNavigate('report-builder')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e6e8eb] text-[#14283f] text-[11px] font-bold whitespace-nowrap active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[15px]">description</span>
            Valuation Report
          </button>
        </div>
      </section>

      {/* PRIORITY ACTION CENTER (3 Urgent) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-bold text-[#001328]">Priority Action Center</span>
            <span className="px-2 py-0.2 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
              3 urgent
            </span>
          </div>
          <button 
            onClick={() => onShowToast("Loaded today's full agenda")}
            className="text-[#006874] text-[11px] font-bold hover:underline"
          >
            View Agenda
          </button>
        </div>

        {/* Alert Card 1: Today's Viewing */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006874]/10 text-[#006874] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#14283f] text-white text-[9px] font-bold">
                  Today 4:30 PM
                </span>
                <span className="text-[#44474d] text-[10px]">D13 • Woodleigh</span>
              </div>
              <h4 className="text-[13px] font-bold text-[#001328] mt-0.5">Park Colonial #11-04</h4>
              <p className="text-[11px] text-[#44474d]">
                Buyer: <strong className="text-[#001328]">Tan Wei Ming</strong> (DBS IPA S$1.60M approved)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-[#f2f4f7]">
            <button 
              onClick={() => onShowToast("WhatsApp confirmation sent to Tan Wei Ming (+65 9123 4567)")}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[#006874] hover:bg-[#005236] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              Confirm WhatsApp
            </button>
            <button 
              onClick={() => onNavigate('property-detail')}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[11px] font-bold flex items-center justify-center gap-1 transition-all border border-[#e6e8eb]"
            >
              <span className="material-symbols-outlined text-[15px]">send</span>
              Briefing Sheet
            </button>
          </div>
        </div>

        {/* Alert Card 2: OTP Expiry */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
              <span className="material-symbols-outlined text-[12px]">timer</span>
              OTP Expires in 48 Hours
            </span>
            <span className="text-[10px] text-[#44474d]">HDB DBSS • D20</span>
          </div>

          <div className="flex items-baseline justify-between mt-0.5">
            <div>
              <h4 className="text-[13px] font-bold text-[#001328]">Bishan Loft #14-06</h4>
              <p className="text-[11px] text-[#44474d]">Option Fee Received • Awaiting Buyer Exercise</p>
            </div>
            <div className="text-right">
              <div className="text-[15px] font-bold text-[#001328]">S$1.638M</div>
              <span className="text-[10px] text-[#44474d]">S$1,142 psf</span>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between pt-1.5 border-t border-[#f2f4f7]">
            <div className="flex items-center gap-1.5 text-[#44474d] text-[10px]">
              <span className="material-symbols-outlined text-[14px] text-[#006874]">handshake</span>
              Buyer Agent: Kevin Teo (ERA)
            </div>
            <button 
              onClick={() => onShowToast("SMS reminder nudged to Kevin Teo regarding OTP exercise")}
              className="px-2.5 py-1 rounded-md bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[10px] font-bold border border-[#e6e8eb]"
            >
              Nudge Agent
            </button>
          </div>
        </div>

        {/* Alert Card 3: Price Alignment Advisory */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6e8eb] text-[#44474d] text-[10px] font-bold">
              <span className="material-symbols-outlined text-[12px]">trending_down</span>
              Price Alignment Advisory
            </span>
            <span className="text-[10px] text-[#74777e]">24 Days on Market</span>
          </div>

          <div className="mt-0.5">
            <h4 className="text-[13px] font-bold text-[#001328]">The Sail @ Marina Bay #32-05</h4>
            <div className="flex items-center gap-3 mt-1 text-[11px]">
              <div>
                <span className="text-[9px] text-[#74777e] block">Asking</span>
                <span className="font-bold text-[#001328]">S$1.88M</span>
              </div>
              <span className="text-[#74777e]">→</span>
              <div>
                <span className="text-[9px] text-[#74777e] block">AVM Fair Value</span>
                <span className="font-bold text-[#006874]">S$1.82M</span>
              </div>
              <div className="ml-auto">
                <span className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                  -3.2% Adj
                </span>
              </div>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between pt-1.5 border-t border-[#f2f4f7]">
            <span className="text-[10px] text-[#44474d]">Low viewing velocity (0 past 7d)</span>
            <button 
              onClick={() => onNavigate('report-builder')}
              className="px-2.5 py-1 rounded-md bg-[#95f1ff]/30 hover:bg-[#95f1ff]/50 text-[#006f7b] text-[10px] font-bold"
            >
              Generate Seller Pitch
            </button>
          </div>
        </div>
      </section>

      {/* ACTIVE INVENTORY PERFORMANCE */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#001328]">Active Inventory Vitals</span>
          <button 
            onClick={() => onShowToast("Displaying all 18 managed client listings")}
            className="text-[#006874] text-[11px] font-bold flex items-center gap-0.5"
          >
            Manage All (18)
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
          </button>
        </div>

        {/* Listing 1 */}
        <div 
          onClick={() => onNavigate('property-detail')}
          className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2 cursor-pointer hover:border-[#006874]/50 transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#eceef1]">
                <img className="w-full h-full object-cover" src={ASSETS.bishanECLiving} alt="Bishan Loft" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#001328] leading-tight">Bishan Loft</h4>
                <span className="text-[11px] text-[#44474d]">3-Bed EC • 1,184 sqft • D20</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#001328]">S$1.62M</span>
              <span className="block text-[9px] text-[#44474d]">S$1,368 psf</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-[#f2f4f7] rounded-lg p-2 text-center text-[11px] border border-[#e6e8eb]">
            <div>
              <span className="font-bold text-[#001328] block">142</span>
              <span className="text-[9px] text-[#74777e]">Impressions</span>
            </div>
            <div>
              <span className="font-bold text-[#001328] block">12</span>
              <span className="text-[9px] text-[#74777e]">Watchlist</span>
            </div>
            <div>
              <span className="font-bold text-[#006874] block">4</span>
              <span className="text-[9px] text-[#74777e]">Viewings</span>
            </div>
          </div>
        </div>

        {/* Listing 2 */}
        <div 
          onClick={() => onNavigate('explore')}
          className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2 cursor-pointer hover:border-[#006874]/50 transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#eceef1]">
                <img className="w-full h-full object-cover" src={ASSETS.parcEsta} alt="Parc Esta" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[13px] font-bold text-[#001328] leading-tight">Parc Esta</h4>
                  <span className="px-1.5 py-0.2 rounded bg-[#94f6c4] text-[#002113] text-[9px] font-bold">Offer Recd</span>
                </div>
                <span className="text-[11px] text-[#44474d]">1-Bed Condo • 452 sqft • D14</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#001328]">S$1.08M</span>
              <span className="block text-[9px] text-[#44474d]">Pending S$1.06M</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-[#f2f4f7] rounded-lg p-2 text-center text-[11px] border border-[#e6e8eb]">
            <div>
              <span className="font-bold text-[#001328] block">310</span>
              <span className="text-[9px] text-[#74777e]">Impressions</span>
            </div>
            <div>
              <span className="font-bold text-[#001328] block">28</span>
              <span className="text-[9px] text-[#74777e]">Watchlist</span>
            </div>
            <div>
              <span className="font-bold text-[#005236] block">9</span>
              <span className="text-[9px] text-[#74777e]">Viewings</span>
            </div>
          </div>
        </div>
      </section>

      {/* TERRITORY INTELLIGENCE */}
      <section>
        <div className="bg-[#f2f4f7] rounded-xl p-3.5 flex flex-col gap-2 border border-[#e6e8eb]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006874] text-[18px]">radar</span>
              <span className="text-[13px] font-bold text-[#001328]">Territory Intelligence</span>
            </div>
            <span className="text-[10px] text-[#74777e]">D12 • D13 • D20</span>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-xs border border-[#e6e8eb] flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                <span className="text-[10px] font-bold text-[#001328]">URA REALIS Flash Caveat</span>
              </div>
              <span className="text-[10px] text-[#74777e]">12 mins ago</span>
            </div>
            <p className="text-[11px] text-[#191c1e]">
              <strong>Sky Habitat (D20)</strong> recorded resale at <span className="text-[#006874] font-bold">S$1.78M</span> (S$1,740 psf).
            </p>
            <div className="flex items-center justify-between pt-1 text-[10px]">
              <span className="text-[#74777e] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">lightbulb</span>
                Comparable to your Bishan Loft listing (+4.2% spread)
              </span>
              <button 
                onClick={() => onNavigate('caveats')}
                className="text-[#006874] font-bold underline"
              >
                Deep Dive
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
