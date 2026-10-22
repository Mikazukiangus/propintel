import React, { useState } from 'react';
import { ScreenId } from '../types';

interface CaveatsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const CaveatsScreen: React.FC<CaveatsScreenProps> = ({ onNavigate, onShowToast }) => {
  const [expandedDeal, setExpandedDeal] = useState<string | null>('deal-1');
  const [activeTab, setActiveTab] = useState<'qtr' | 'spread'>('qtr');
  const [selectedRadius, setSelectedRadius] = useState('500m');

  const toggleDeal = (id: string) => {
    setExpandedDeal(expandedDeal === id ? null : id);
  };

  return (
    <div className="flex flex-col w-full pb-12 pt-2">
      {/* Screen Context / Title Banner */}
      <section className="px-4 pt-2 pb-2 bg-[#f7f9fc]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#95f1ff] text-[#006f7b]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#44474d] font-bold">
              Valuation Evidence Base
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e6e8eb] text-[#191c1e] text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874] animate-pulse"></span>
            URA REALIS Sync
          </span>
        </div>

        <div className="mt-1.5">
          <h1 className="text-[20px] font-bold text-[#001328] tracking-tight">Comparable Transactions</h1>
          <p className="text-[12px] text-[#44474d] mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span>Bishan Loft &amp; D20 Private Resale</span>
            <span className="text-[#c4c6cd]">•</span>
            <span className="inline-flex items-center text-[#006874] font-semibold">Supporting S$1.62M Model</span>
          </p>
        </div>
      </section>

      {/* Filter Pills Bar (Horizontal Scrollable) */}
      <section className="w-full overflow-x-auto py-1 px-4 no-scrollbar flex items-center gap-2">
        <button 
          onClick={() => {
            const next = selectedRadius === '500m' ? '1km' : '500m';
            setSelectedRadius(next);
            onShowToast(`Filter radius changed to ${next}`);
          }}
          className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-[#14283f] text-white shadow-xs transition-transform active:scale-95 text-[11px] font-semibold"
        >
          <span className="material-symbols-outlined text-[14px]">near_me</span>
          <span>Radius: {selectedRadius}</span>
        </button>
        <button 
          onClick={() => onShowToast("Filtering for past 12 months transactions")}
          className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-[#e0e3e6] text-[#191c1e] hover:bg-[#d8dadd] transition-all text-[11px] font-semibold"
        >
          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
          <span>Past 12 Months</span>
        </button>
        <button 
          onClick={() => onShowToast("Selected: 3-Bed (1,000–1,200 sqft)")}
          className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-[#e0e3e6] text-[#191c1e] hover:bg-[#d8dadd] transition-all text-[11px] font-semibold"
        >
          <span className="material-symbols-outlined text-[14px]">bed</span>
          <span>3-Bed (1,000–1,200 sqft)</span>
        </button>
        <button 
          onClick={() => onShowToast("Floor preference: Mid to High floor stacks")}
          className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-[#e0e3e6] text-[#191c1e] hover:bg-[#d8dadd] transition-all text-[11px] font-semibold"
        >
          <span className="material-symbols-outlined text-[14px]">apartment</span>
          <span>Floor: Mid-High</span>
        </button>
      </section>

      {/* Key Analytics Summary Matrix */}
      <section className="px-4 mt-2">
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb]">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006874]">analytics</span>
              <span className="text-[12px] text-[#44474d] font-bold">Sample Pool Intelligence</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#95f1ff] text-[#001f24] text-[10px] font-bold">
              18 Verified Caveats
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-1">
            <div className="bg-[#f2f4f7] rounded-lg p-2.5 border border-[#e6e8eb]">
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">
                Median Price
              </span>
              <span className="text-[18px] font-bold text-[#001328] mt-0.5 block tracking-tight">
                S$1,610,000
              </span>
              <span className="text-[11px] text-[#006874] flex items-center gap-0.5 mt-0.5 font-semibold">
                <span className="material-symbols-outlined text-[13px]">trending_up</span> +2.8% vs 2024
              </span>
            </div>

            <div className="bg-[#f2f4f7] rounded-lg p-2.5 border border-[#e6e8eb]">
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">
                Median PSF
              </span>
              <span className="text-[18px] font-bold text-[#001328] mt-0.5 block tracking-tight">
                S$1,418 <span className="text-[11px] font-normal text-[#44474d]">psf</span>
              </span>
              <span className="text-[11px] text-[#44474d] mt-0.5 block">D20 Private Avg: S$1,540</span>
            </div>
          </div>

          <div className="mt-2.5 bg-[#e6e8eb]/60 rounded-lg px-3 py-1.5 flex items-center justify-between text-[#191c1e]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#44474d]">unfold_more</span>
              <span className="text-[11px] font-bold text-[#44474d]">Transaction Range</span>
            </div>
            <span className="text-[12px] font-bold text-[#001328]">S$1,530,000 – S$1,690,000</span>
          </div>
        </div>
      </section>

      {/* Interactive PSF Movement & Quarterly Chart */}
      <section className="px-4 mt-3">
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#001328]">PSF Movement &amp; Cluster Range</h2>
              <p className="text-[11px] text-[#44474d]">Past 4 Quarters · D20 3-Bed EC &amp; Private</p>
            </div>
            <div className="flex items-center gap-1 bg-[#f2f4f7] p-0.5 rounded-lg border border-[#e6e8eb]">
              <button 
                onClick={() => setActiveTab('qtr')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  activeTab === 'qtr' ? 'bg-white text-[#001328] shadow-xs' : 'text-[#44474d]'
                }`}
              >
                Qtr
              </button>
              <button 
                onClick={() => setActiveTab('spread')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  activeTab === 'spread' ? 'bg-white text-[#001328] shadow-xs' : 'text-[#44474d]'
                }`}
              >
                Spread
              </button>
            </div>
          </div>

          {/* Inline SVG Chart */}
          <div className="mt-3 relative w-full h-36 flex flex-col justify-end">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="flex items-center justify-between text-[#44474d] text-[10px]">
                <span className="w-full bg-[#e0e3e6] h-[1px]"></span>
                <span className="pl-2 shrink-0">1.8k</span>
              </div>
              <div className="flex items-center justify-between text-[#44474d] text-[10px]">
                <span className="w-full bg-[#e0e3e6] h-[1px]"></span>
                <span className="pl-2 shrink-0">1.6k</span>
              </div>
              <div className="flex items-center justify-between text-[#44474d] text-[10px]">
                <span className="w-full bg-[#e0e3e6] h-[1px]"></span>
                <span className="pl-2 shrink-0">1.4k</span>
              </div>
              <div className="flex items-center justify-between text-[#44474d] text-[10px]">
                <span className="w-full bg-[#e0e3e6] h-[1px]"></span>
                <span className="pl-2 shrink-0">1.2k</span>
              </div>
            </div>

            <svg className="w-full h-28 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 100">
              <defs>
                <linearGradient id="caveatGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006874" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#006874" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>

              {/* Target Area Band */}
              <rect fill="#006874" fillOpacity="0.08" height="24" rx="4" width="320" x="0" y="42"></rect>
              <line stroke="#006874" strokeDasharray="3,3" strokeWidth="1.5" x1="0" x2="320" y1="54" y2="54"></line>

              {/* Trendline Polygon */}
              <polygon fill="url(#caveatGradient)" points="15,72 80,66 160,55 240,48 305,43 305,95 15,95"></polygon>
              <polyline fill="none" points="15,72 80,66 160,55 240,48 305,43" stroke="#006874" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></polyline>

              {/* Cluster Points */}
              <circle cx="25" cy="74" fill="#3c9f74" r="3.5"></circle>
              <circle cx="45" cy="70" fill="#3c9f74" r="3"></circle>
              <circle cx="95" cy="67" fill="#3c9f74" r="3.5"></circle>
              <circle cx="115" cy="62" fill="#3c9f74" r="3"></circle>
              <circle cx="165" cy="58" fill="#3c9f74" r="4"></circle>
              <circle cx="180" cy="53" fill="#3c9f74" r="3.5"></circle>
              <circle cx="235" cy="50" fill="#3c9f74" r="4"></circle>
              <circle cx="250" cy="46" fill="#3c9f74" r="3.5"></circle>
              <circle cx="285" cy="20" fill="#006874" r="4"></circle>
              <circle cx="305" cy="43" fill="#14283f" r="5" stroke="#ffffff" strokeWidth="1.5"></circle>
            </svg>

            <div className="flex justify-between items-center pt-2 px-1 text-[#44474d] text-[10px]">
              <span>Q1 2024</span>
              <span>Q2 2024</span>
              <span>Q3 2024</span>
              <span>Q4 2024</span>
              <span className="font-bold text-[#001328]">Q1 2025</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 mt-2 bg-[#f2f4f7] px-3 py-1.5 rounded-lg border border-[#e6e8eb]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14283f]"></span>
              <span className="text-[10px] text-[#191c1e] font-semibold">Subject Target Stack</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006874]"></span>
              <span className="text-[10px] text-[#191c1e] font-semibold">Algorithmic Band (S$1,420 psf)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3c9f74]"></span>
              <span className="text-[10px] text-[#191c1e] font-semibold">Verified Caveat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tap Interaction Banner */}
      <section className="px-4 mt-3">
        <div className="bg-[#14283f] text-white rounded-xl p-3 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#95f1ff] text-[20px]">touch_app</span>
            <p className="text-[11px] leading-snug">
              <span className="font-bold">Interactive Auditor:</span> Tap any deal below to inspect BSD/ABSD, contract type, and tenure life.
            </p>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#7c8fab] shrink-0">info</span>
        </div>
      </section>

      {/* Verified Transaction Feed */}
      <section className="px-4 mt-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#001328]">Verified Transaction Feed</span>
          <span className="text-[10px] text-[#44474d] font-semibold">Ranked by Similarity</span>
        </div>

        {/* Card 1: Bishan Loft Block 33 */}
        <article 
          onClick={() => toggleDeal('deal-1')}
          className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] transition-all hover:border-[#006874]/50 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-[14px] font-bold text-[#001328] truncate">Bishan Loft · Block 33</h3>
                <span className="px-1.5 py-0.2 rounded bg-[#95f1ff] text-[#001f24] text-[9px] font-bold">99-yr EC</span>
              </div>
              <p className="text-[11px] text-[#44474d] mt-0.5">12 Jan 2025 · Level #14-06 (High Floor) · 1,141 sqft</p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95f1ff] text-[#001f24] text-[10px] font-bold">
                <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                98% Match
              </span>
              <span className="block text-[10px] text-[#006874] font-bold mt-0.5">Identical Stack</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 bg-[#f2f4f7] rounded-lg p-2.5 border border-[#e6e8eb]">
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Sold Price</span>
              <span className="text-[16px] font-bold text-[#001328] mt-0.5 block">S$1,638,000</span>
            </div>
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Unit Rate</span>
              <span className="text-[16px] font-bold text-[#006874] mt-0.5 block">
                S$1,436 <span className="text-[11px] font-normal text-[#44474d]">psf</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f2f4f7]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
              <span className="text-[10px] text-[#44474d] font-semibold">URA REALIS Verified Caveat</span>
            </div>
            <div className="flex items-center gap-1 text-[#006874] text-[11px] font-bold">
              <span>{expandedDeal === 'deal-1' ? 'Collapse' : 'Inspect Breakdown'}</span>
              <span className={`material-symbols-outlined text-[16px] transition-transform ${expandedDeal === 'deal-1' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
          </div>

          {/* Accordion Drawer */}
          {expandedDeal === 'deal-1' && (
            <div className="mt-2.5 pt-2.5 bg-[#f2f4f7] rounded-lg p-3 text-[#191c1e] border border-[#e6e8eb] animate-fade-in">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-[#44474d] block font-medium">Buyer Profile:</span> Singaporean (1st Home)</div>
                <div><span className="text-[#44474d] block font-medium">Est. BSD:</span> S$50,100</div>
                <div><span className="text-[#44474d] block font-medium">Contract Lodged:</span> 16 Jan 2025</div>
                <div><span className="text-[#44474d] block font-medium">Remaining Lease:</span> 78 Years 4 Months</div>
              </div>
            </div>
          )}
        </article>

        {/* Card 2: Bishan Loft Block 31 */}
        <article 
          onClick={() => toggleDeal('deal-2')}
          className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] transition-all hover:border-[#006874]/50 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-[14px] font-bold text-[#001328] truncate">Bishan Loft · Block 31</h3>
                <span className="px-1.5 py-0.2 rounded bg-[#e0e3e6] text-[#191c1e] text-[9px] font-bold">99-yr EC</span>
              </div>
              <p className="text-[11px] text-[#44474d] mt-0.5">03 Nov 2024 · Level #11-02 (Mid Floor) · 1,141 sqft</p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95f1ff] text-[#001f24] text-[10px] font-bold">
                94% Match
              </span>
              <span className="block text-[10px] text-[#44474d] mt-0.5">Mid-Floor Bench</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 bg-[#f2f4f7] rounded-lg p-2.5 border border-[#e6e8eb]">
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Sold Price</span>
              <span className="text-[16px] font-bold text-[#001328] mt-0.5 block">S$1,590,000</span>
            </div>
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Unit Rate</span>
              <span className="text-[16px] font-bold text-[#006874] mt-0.5 block">
                S$1,394 <span className="text-[11px] font-normal text-[#44474d]">psf</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f2f4f7]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
              <span className="text-[10px] text-[#44474d] font-semibold">URA REALIS Verified Caveat</span>
            </div>
            <div className="flex items-center gap-1 text-[#006874] text-[11px] font-bold">
              <span>{expandedDeal === 'deal-2' ? 'Collapse' : 'Inspect Breakdown'}</span>
              <span className={`material-symbols-outlined text-[16px] transition-transform ${expandedDeal === 'deal-2' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
          </div>

          {expandedDeal === 'deal-2' && (
            <div className="mt-2.5 pt-2.5 bg-[#f2f4f7] rounded-lg p-3 text-[#191c1e] border border-[#e6e8eb] animate-fade-in">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-[#44474d] block font-medium">Contract Type:</span> Resale (Private Treaty)</div>
                <div><span className="text-[#44474d] block font-medium">Est. BSD:</span> S$47,700</div>
                <div><span className="text-[#44474d] block font-medium">Lodgement:</span> 08 Nov 2024</div>
                <div><span className="text-[#44474d] block font-medium">Variance to Model:</span> -1.8%</div>
              </div>
            </div>
          )}
        </article>

        {/* Card 3: Sky Habitat */}
        <article 
          onClick={() => toggleDeal('deal-3')}
          className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] transition-all hover:border-[#006874]/50 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-[14px] font-bold text-[#001328] truncate">Sky Habitat · St 15</h3>
                <span className="px-1.5 py-0.2 rounded bg-[#d2e4ff] text-[#071c33] text-[9px] font-bold">Full Condo</span>
              </div>
              <p className="text-[11px] text-[#44474d] mt-0.5">18 Dec 2024 · Level #10-14 · 1,023 sqft (Nearby Benchmark)</p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eceef1] text-[#191c1e] text-[10px] font-bold">
                81% Match
              </span>
              <span className="block text-[10px] text-[#44474d] mt-0.5">Condo Premium</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 bg-[#f2f4f7] rounded-lg p-2.5 border border-[#e6e8eb]">
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Sold Price</span>
              <span className="text-[16px] font-bold text-[#001328] mt-0.5 block">S$1,780,000</span>
            </div>
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Unit Rate</span>
              <span className="text-[16px] font-bold text-[#006874] mt-0.5 block">
                S$1,740 <span className="text-[11px] font-normal text-[#44474d]">psf</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f2f4f7]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
              <span className="text-[10px] text-[#44474d] font-semibold">URA REALIS Verified Caveat</span>
            </div>
            <div className="flex items-center gap-1 text-[#006874] text-[11px] font-bold">
              <span>{expandedDeal === 'deal-3' ? 'Collapse' : 'Inspect Breakdown'}</span>
              <span className={`material-symbols-outlined text-[16px] transition-transform ${expandedDeal === 'deal-3' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
          </div>

          {expandedDeal === 'deal-3' && (
            <div className="mt-2.5 pt-2.5 bg-[#f2f4f7] rounded-lg p-3 text-[#191c1e] border border-[#e6e8eb] animate-fade-in">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-[#44474d] block font-medium">Tenure:</span> 99-yr from 2011</div>
                <div><span className="text-[#44474d] block font-medium">Distance:</span> 280m from Bishan Loft</div>
                <div><span className="text-[#44474d] block font-medium">EC Discount Gap:</span> ~17.5% historic spread</div>
                <div><span className="text-[#44474d] block font-medium">Lodgement:</span> 24 Dec 2024</div>
              </div>
            </div>
          )}
        </article>

        {/* Card 4: Natura Loft DBSS */}
        <article 
          onClick={() => toggleDeal('deal-4')}
          className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] transition-all hover:border-[#006874]/50 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-[14px] font-bold text-[#001328] truncate">Natura Loft (DBSS)</h3>
                <span className="px-1.5 py-0.2 rounded bg-[#e6e8eb] text-[#191c1e] text-[9px] font-bold">HDB DBSS</span>
              </div>
              <p className="text-[11px] text-[#44474d] mt-0.5">22 Jan 2025 · Level #25-08 · 1,292 sqft (5-Room DBSS)</p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eceef1] text-[#191c1e] text-[10px] font-bold">
                78% Match
              </span>
              <span className="block text-[10px] text-[#44474d] mt-0.5">Ceiling HDB</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 bg-[#f2f4f7] rounded-lg p-2.5 border border-[#e6e8eb]">
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Sold Price</span>
              <span className="text-[16px] font-bold text-[#001328] mt-0.5 block">S$1,410,000</span>
            </div>
            <div>
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider block font-semibold">Unit Rate</span>
              <span className="text-[16px] font-bold text-[#006874] mt-0.5 block">
                S$1,091 <span className="text-[11px] font-normal text-[#44474d]">psf</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f2f4f7]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#78d9aa]"></span>
              <span className="text-[10px] text-[#44474d] font-semibold">HDB Resale Data.gov.sg</span>
            </div>
            <div className="flex items-center gap-1 text-[#006874] text-[11px] font-bold">
              <span>{expandedDeal === 'deal-4' ? 'Collapse' : 'Inspect Breakdown'}</span>
              <span className={`material-symbols-outlined text-[16px] transition-transform ${expandedDeal === 'deal-4' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
          </div>

          {expandedDeal === 'deal-4' && (
            <div className="mt-2.5 pt-2.5 bg-[#f2f4f7] rounded-lg p-3 text-[#191c1e] border border-[#e6e8eb] animate-fade-in">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-[#44474d] block font-medium">Lease Commenced:</span> 2012</div>
                <div><span className="text-[#44474d] block font-medium">Market Role:</span> Bishan Resale Price Floor</div>
                <div><span className="text-[#44474d] block font-medium">Buyer Status:</span> HDB Upgrader Segment</div>
                <div><span className="text-[#44474d] block font-medium">Distance:</span> 420m away</div>
              </div>
            </div>
          )}
        </article>
      </section>

      {/* Export & Workflow Actions Floating Dock */}
      <section className="px-4 mt-4">
        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-[#e6e8eb] flex items-center justify-between gap-2">
          <button 
            onClick={() => onShowToast("Exporting 18 verified caveats to CSV...")}
            className="flex-1 py-2 px-2 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] flex items-center justify-center gap-1.5 transition-all text-[12px] font-semibold active:scale-95 border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => onShowToast("Opening parameter adjustment tolerances")}
            className="flex-1 py-2 px-2 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] flex items-center justify-center gap-1.5 transition-all text-[12px] font-semibold active:scale-95 border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[17px]">tune</span>
            <span>Parameters</span>
          </button>
          <button 
            onClick={() => onNavigate('report-builder')}
            className="flex-1 py-2 px-2 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white flex items-center justify-center gap-1.5 shadow-xs transition-all text-[12px] font-semibold active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px] text-[#95f1ff]">ios_share</span>
            <span>Share PDF</span>
          </button>
        </div>
      </section>
    </div>
  );
};
