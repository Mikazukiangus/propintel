import React from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Greeting & Persona Bar */}
      <section className="px-4 pt-4 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#44474d] uppercase tracking-wider font-semibold">
              Singapore Property Intelligence
            </span>
            <h1 className="text-[20px] font-bold text-[#14283f] truncate">
              Good morning, Alex
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#eceef1] rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006874] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#14283f]">Buyer Mode</span>
          </div>
        </div>
        <p className="text-[12px] text-[#44474d] flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-[#006874]">verified_user</span>
          Algorithmic portfolio tracking with statutory URA &amp; HDB feeds
        </p>
      </section>

      {/* Global Command & Search Section */}
      <section className="px-4 py-1">
        <div className="bg-white rounded-xl p-2 shadow-[0_2px_10px_rgba(20,40,63,0.06)] border border-[#e6e8eb] flex flex-col gap-2">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[#006874] absolute left-3 pointer-events-none text-[20px]">search</span>
            <input 
              className="w-full pl-9 pr-10 py-2.5 bg-[#f2f4f7] rounded-lg text-[13px] text-[#191c1e] placeholder:text-[#74777e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006874]/30 transition-all" 
              placeholder="Search project (Watertown, Tre Ver), postal, MRT..." 
              type="text"
              defaultValue="Bishan Loft, D20"
            />
            <button 
              onClick={() => onNavigate('explore')}
              aria-label="Geospatial Filter" 
              className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-md bg-[#eceef1] text-[#44474d] hover:text-[#14283f] active:scale-95 transition-transform"
              title="Open Map View"
            >
              <span className="material-symbols-outlined text-[17px]">tune</span>
            </button>
          </div>

          {/* Quick Filter Pills (Horizontally Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button 
              onClick={() => onNavigate('explore')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#14283f] text-white text-[10px] font-semibold flex items-center gap-1 shadow-xs active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[12px]">location_on</span>
              D20 Bishan
            </button>
            <button 
              onClick={() => onNavigate('explore')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#f2f4f7] text-[#14283f] text-[10px] font-semibold flex items-center gap-1 hover:bg-[#eceef1] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[12px] text-[#006874]">train</span>
              &lt; 500m MRT
            </button>
            <button 
              onClick={() => onNavigate('affordability-tdsr')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#f2f4f7] text-[#14283f] text-[10px] font-semibold hover:bg-[#eceef1] active:scale-95 transition-transform"
            >
              Under S$1.65M
            </button>
            <button 
              onClick={() => onNavigate('market-intelligence')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#f2f4f7] text-[#14283f] text-[10px] font-semibold hover:bg-[#eceef1] active:scale-95 transition-transform"
            >
              99-yr EC / Condo
            </button>
          </div>
        </div>
      </section>

      {/* Live Market Pulse Institutional Benchmark */}
      <section className="px-4 pt-2 pb-1">
        <div 
          onClick={() => onNavigate('market-intelligence')}
          className="bg-[#14283f] text-white rounded-xl p-3.5 shadow-md relative overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
        >
          {/* Ambient subtle background glow */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#006874] opacity-30 blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between relative z-10 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#95f1ff] text-[#001f24]">
                <span className="material-symbols-outlined text-[13px]">insights</span>
              </span>
              <span className="text-[11px] font-bold tracking-wide text-[#d2e4ff] uppercase">Live Market Pulse</span>
            </div>
            <span className="text-[10px] text-[#7c8fab] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#78d9aa]"></span>
              08:30 SGT
            </span>
          </div>

          {/* Macro Indicators Grid */}
          <div className="grid grid-cols-3 gap-2 relative z-10 py-1">
            <div className="flex flex-col bg-[#001328]/40 rounded-lg p-2">
              <span className="text-[10px] text-[#b4c8e6] truncate">URA Resale Index</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[15px] text-[#94f6c4] font-bold">+0.8%</span>
                <span className="text-[9px] text-[#7c8fab]">QoQ</span>
              </div>
            </div>
            <div className="flex flex-col bg-[#001328]/40 rounded-lg p-2">
              <span className="text-[10px] text-[#b4c8e6] truncate">HDB Resale Index</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[15px] text-[#94f6c4] font-bold">+1.2%</span>
                <span className="text-[9px] text-[#7c8fab]">QoQ</span>
              </div>
            </div>
            <div className="flex flex-col bg-[#001328]/40 rounded-lg p-2">
              <span className="text-[10px] text-[#b4c8e6] truncate">3M Comp SORA</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[15px] text-[#95f1ff] font-bold">3.15%</span>
                <span className="text-[9px] text-[#7c8fab]">p.a.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 mt-1 text-[#7c8fab] relative z-10">
            <span className="text-[10px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#78d9aa]">check_circle</span>
              Audited via data.gov.sg &amp; URA REALIS
            </span>
            <span className="text-[11px] text-[#95f1ff] font-semibold group-hover:underline flex items-center">
              Deep Dive
              <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            </span>
          </div>
        </div>
      </section>

      {/* Quick Intelligence Actions (4-Column Bento/Grid) */}
      <section className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-[#44474d] uppercase tracking-wider">Precision Tools</span>
          <span className="text-[11px] text-[#006874] font-semibold">4 Engines Active</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Instant Valuation */}
          <div 
            onClick={() => onNavigate('valuation')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs hover:border-[#006874]/50 hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between h-28 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#95f1ff]/50 flex items-center justify-center text-[#006874]">
                <span className="material-symbols-outlined text-[20px]">calculate</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#95f1ff] text-[#006f7b]">AVM Core</span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#14283f] leading-tight group-hover:text-[#006874] transition-colors">
                Instant Valuation
              </div>
              <div className="text-[11px] text-[#44474d] truncate">Algorithmic fair pricing</div>
            </div>
          </div>

          {/* 2. OneMap Explorer */}
          <div 
            onClick={() => onNavigate('explore')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs hover:border-[#006874]/50 hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between h-28 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#e6e8eb] flex items-center justify-center text-[#14283f]">
                <span className="material-symbols-outlined text-[20px]">map</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#e6e8eb] text-[#44474d]">SLA Feed</span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#14283f] leading-tight group-hover:text-[#006874] transition-colors">
                OneMap Explorer
              </div>
              <div className="text-[11px] text-[#44474d] truncate">Schools 1-2km, MRT lines</div>
            </div>
          </div>

          {/* 3. Affordability & TDSR */}
          <div 
            onClick={() => onNavigate('affordability-tdsr')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs hover:border-[#006874]/50 hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between h-28 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#e6e8eb] flex items-center justify-center text-[#14283f]">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#e6e8eb] text-[#44474d]">MAS Rules</span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#14283f] leading-tight group-hover:text-[#006874] transition-colors">
                TDSR &amp; MSR
              </div>
              <div className="text-[11px] text-[#44474d] truncate">ABSD, BSD stress-test</div>
            </div>
          </div>

          {/* 4. Comparables Hub */}
          <div 
            onClick={() => onNavigate('caveats')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs hover:border-[#006874]/50 hover:shadow-md transition-all active:scale-[0.98] flex flex-col justify-between h-28 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#94f6c4]/40 flex items-center justify-center text-[#002e1c]">
                <span className="material-symbols-outlined text-[20px]">dataset</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#94f6c4]/50 text-[#005236]">100% Audit</span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#14283f] leading-tight group-hover:text-[#006874] transition-colors">
                Caveats Hub
              </div>
              <div className="text-[11px] text-[#44474d] truncate">Past URA &amp; HDB deals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Opportunities */}
      <section className="px-4 pt-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006874]"></span>
            <h2 className="text-[15px] font-bold text-[#14283f]">Featured Opportunities</h2>
          </div>
          <button 
            onClick={() => onNavigate('explore')}
            className="text-[11px] text-[#006874] font-semibold hover:underline flex items-center gap-0.5"
          >
            View All (18)
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Opportunity Card 0: Bishan Loft #14-06 (Hero Showcase) */}
        <article 
          onClick={() => onNavigate('property-detail')}
          className="bg-white rounded-xl p-3.5 shadow-sm border border-[#006874]/40 ring-1 ring-[#006874]/20 flex flex-col gap-2.5 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#eceef1]">
            <img 
              className="w-full h-full object-cover" 
              src={ASSETS.bishanLoftLiving} 
              alt="Bishan Loft interior" 
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#14283f]/90 backdrop-blur-md text-white text-[10px] font-semibold">
                Privatised EC · 99-yr
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#14283f] text-[10px] font-bold">
                D20 Bishan
              </span>
            </div>
            <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-[#14283f]/90 backdrop-blur-md text-[#94f6c4] text-[10px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              Fair Valuation Parity
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[15px] font-bold text-[#14283f] leading-tight">Bishan Loft #14-06</h3>
                <p className="text-[12px] text-[#44474d]">33 Bishan St 21 · 3-Bed EC · 1,141 sqft (High Floor)</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShowToast("Bishan Loft added to your active watchlist.");
                }}
                className="text-[#44474d] hover:text-[#006874] p-1"
                title="Bookmark"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#f2f4f7] p-2.5 rounded-lg mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d] font-semibold flex items-center gap-1">
                  Asking Price
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                </span>
                <div className="text-[16px] font-bold text-[#14283f]">S$1,620,000</div>
                <span className="text-[10px] text-[#44474d]">S$1,420 psf</span>
              </div>
              <div className="flex flex-col pl-2 border-l border-[#e6e8eb]">
                <span className="text-[10px] text-[#005236] font-semibold">Hedonic AVM Value</span>
                <div className="text-[16px] font-bold text-[#006874]">S$1,620,000</div>
                <span className="text-[10px] text-[#006874] font-semibold">±3.4% Uncertainty</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[#44474d]">
              <div className="flex items-center gap-1 text-[11px]">
                <span className="material-symbols-outlined text-[14px] text-[#006874]">school</span>
                <span>0.72km to Catholic High Primary</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#eceef1] text-[10px] font-semibold text-[#14283f]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                18 URA Caveats
              </div>
            </div>
          </div>
        </article>

        {/* Opportunity Card 1: Private Condo The Sail */}
        <article 
          onClick={() => onNavigate('property-detail')}
          className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e6e8eb] flex flex-col gap-2.5 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#eceef1]">
            <img 
              className="w-full h-full object-cover" 
              src={ASSETS.theSail} 
              alt="The Sail at Marina Bay" 
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#14283f]/90 backdrop-blur-md text-white text-[10px] font-semibold">
                Condo · 99-yr
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#14283f] text-[10px] font-bold">
                D01 Marina Bay
              </span>
            </div>
            <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-[#14283f]/90 backdrop-blur-md text-[#94f6c4] text-[10px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">trending_down</span>
              2.1% Below AVM
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[15px] font-bold text-[#14283f] leading-tight">The Sail @ Marina Bay</h3>
                <p className="text-[12px] text-[#44474d]">2 Marina Boulevard · 2 Bed · 2 Bath · 883 sqft</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShowToast("The Sail saved to portfolio");
                }}
                className="text-[#44474d] hover:text-[#006874] p-1"
                title="Bookmark"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#f2f4f7] p-2.5 rounded-lg mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d] font-semibold flex items-center gap-1">
                  Asking Price
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                </span>
                <div className="text-[16px] font-bold text-[#14283f]">S$1,880,000</div>
                <span className="text-[10px] text-[#44474d]">S$2,129 psf</span>
              </div>
              <div className="flex flex-col pl-2 border-l border-[#e6e8eb]">
                <span className="text-[10px] text-[#005236] font-semibold">Algorithmic Fair Value</span>
                <div className="text-[16px] font-bold text-[#191c1e]">S$1,920,000</div>
                <span className="text-[10px] text-[#006874] font-semibold">+$40k Equity Buffer</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[#44474d]">
              <div className="flex items-center gap-1 text-[11px]">
                <span className="material-symbols-outlined text-[14px] text-[#006874]">directions_walk</span>
                <span>2 mins to Downtown MRT (DT17)</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#eceef1] text-[10px] font-semibold text-[#14283f]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                6 URA Caveats
              </div>
            </div>
          </div>
        </article>

        {/* Opportunity Card 2: Tampines GreenRidges HDB */}
        <article 
          onClick={() => onNavigate('property-detail')}
          className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e6e8eb] flex flex-col gap-2.5 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#eceef1]">
            <img 
              className="w-full h-full object-cover" 
              src={ASSETS.tampinesGreenRidges} 
              alt="Tampines GreenRidges" 
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#14283f]/90 backdrop-blur-md text-white text-[10px] font-semibold">
                HDB Premium · 91y left
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#14283f] text-[10px] font-bold">
                D18 Tampines
              </span>
            </div>
            <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#006874] text-[10px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              Q1 Resale Parity
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[15px] font-bold text-[#14283f] leading-tight">Tampines GreenRidges</h3>
                <p className="text-[12px] text-[#44474d]">Tampines St 86 · 4-Room Flat · 1,001 sqft</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShowToast("Tampines GreenRidges saved to portfolio");
                }}
                className="text-[#44474d] hover:text-[#006874] p-1"
                title="Bookmark"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#f2f4f7] p-2.5 rounded-lg mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d] font-semibold flex items-center gap-1">
                  Asking Price
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                </span>
                <div className="text-[16px] font-bold text-[#14283f]">S$715,000</div>
                <span className="text-[10px] text-[#44474d]">S$714 psf</span>
              </div>
              <div className="flex flex-col pl-2 border-l border-[#e6e8eb]">
                <span className="text-[10px] text-[#005236] font-semibold">Algorithmic Valuation</span>
                <div className="text-[16px] font-bold text-[#191c1e]">S$725,000</div>
                <span className="text-[10px] text-[#006874] font-semibold">Fair Entry Range</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[#44474d]">
              <div className="flex items-center gap-1 text-[11px]">
                <span className="material-symbols-outlined text-[14px] text-[#006874]">school</span>
                <span>Poi Ching School &lt; 1km · 350m Tampines Hub</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#eceef1] text-[10px] font-semibold text-[#14283f]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                HDB Resale Synced
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Market Radar: Live Caveats */}
      <section className="px-4 pt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#14283f]">Market Radar: Live Caveats</h2>
            <p className="text-[11px] text-[#44474d]">Direct registry feed from SLA &amp; HDB</p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#78d9aa] animate-ping"></div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Item 1 */}
          <div 
            onClick={() => onNavigate('caveats')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between cursor-pointer hover:bg-[#f2f4f7] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eceef1] flex items-center justify-center text-[#14283f] shrink-0">
                <span className="material-symbols-outlined text-[19px]">apartment</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#14283f] truncate">Parc Esta</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#006874]/10 text-[#006874] text-[9px] font-bold">D14</span>
                </div>
                <div className="text-[11px] text-[#44474d] truncate">1-Bed · 452 sqft · #11-XX · 2 days ago</div>
                <span className="text-[10px] text-[#006874] font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                  URA REALIS Caveat Lodged
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 ml-2">
              <span className="text-[14px] font-bold text-[#14283f]">S$1,080,000</span>
              <span className="text-[10px] text-[#44474d]">S$2,389 psf</span>
            </div>
          </div>

          {/* Item 2 */}
          <div 
            onClick={() => onNavigate('caveats')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between cursor-pointer hover:bg-[#f2f4f7] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eceef1] flex items-center justify-center text-[#14283f] shrink-0">
                <span className="material-symbols-outlined text-[19px]">domain</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#14283f] truncate">Clementi Ridges</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#e0e3e6] text-[#44474d] text-[9px] font-bold">D05</span>
                </div>
                <div className="text-[11px] text-[#44474d] truncate">5-Room HDB · 1,205 sqft · Mid Floor</div>
                <span className="text-[10px] text-[#005236] font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                  HDB Resale Portal Verified
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 ml-2">
              <span className="text-[14px] font-bold text-[#14283f]">S$1,040,000</span>
              <span className="text-[10px] text-[#44474d]">S$863 psf</span>
            </div>
          </div>

          {/* Item 3 */}
          <div 
            onClick={() => onNavigate('caveats')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between cursor-pointer hover:bg-[#f2f4f7] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eceef1] flex items-center justify-center text-[#14283f] shrink-0">
                <span className="material-symbols-outlined text-[19px]">apartment</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#14283f] truncate">Principal Garden</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#006874]/10 text-[#006874] text-[9px] font-bold">D03</span>
                </div>
                <div className="text-[11px] text-[#44474d] truncate">2-Bed · 797 sqft · High Floor</div>
                <span className="text-[10px] text-[#006874] font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                  URA REALIS Caveat Lodged
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 ml-2">
              <span className="text-[14px] font-bold text-[#14283f]">S$1,720,000</span>
              <span className="text-[10px] text-[#44474d]">S$2,158 psf</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Trust Notice */}
      <footer className="px-4 pt-4 pb-2">
        <div className="p-3 rounded-xl bg-[#f2f4f7] flex items-start gap-2 text-[#44474d] border border-[#e6e8eb]">
          <span className="material-symbols-outlined text-[18px] text-[#006874] shrink-0 mt-0.5">account_balance</span>
          <p className="text-[11px] leading-relaxed">
            All valuations conform to Singapore Institute of Surveyors and Valuers (SISV) methodologies and are continuously reconciled against statutory records from Singapore Land Authority and URA.
          </p>
        </div>
      </footer>
    </div>
  );
};
