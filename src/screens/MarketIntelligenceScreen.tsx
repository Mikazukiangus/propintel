import React, { useState } from 'react';
import { ScreenId } from '../types';

interface MarketIntelligenceScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const MarketIntelligenceScreen: React.FC<MarketIntelligenceScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [segment, setSegment] = useState<'condo' | 'hdb' | 'all' | 'landed'>('condo');
  const [region, setRegion] = useState<'rcr' | 'ccr' | 'ocr' | 'islandwide'>('rcr');
  const [horizon, setHorizon] = useState<'1y' | '3y' | '5y'>('3y');
  const [showVolume, setShowVolume] = useState<boolean>(true);
  const [showSpread, setShowSpread] = useState<boolean>(true);

  return (
    <div className="flex flex-col w-full pb-12 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Context Header & Data Freshness Ribbon */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div>
          <h1 className="text-[20px] font-bold text-[#001328] tracking-tight">Market Intelligence</h1>
          <p className="text-[11px] text-[#44474d] flex items-center gap-1.5 mt-0.5">
            <span>Q1 2025 · URA &amp; HDB Official Indices</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#eceef1] px-2.5 py-1 rounded-full shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006874] animate-pulse"></span>
          <span className="text-[10px] text-[#001328] font-bold">REALIS Synced 14 Feb</span>
        </div>
      </div>

      {/* Global Filter Controls */}
      <div className="space-y-2">
        {/* Segment Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button 
            onClick={() => setSegment('all')}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
              segment === 'all' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            All Residential
          </button>
          <button 
            onClick={() => setSegment('condo')}
            className={`whitespace-nowrap px-3.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 ${
              segment === 'condo' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            <span>Private Condo / EC</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#95f1ff]"></span>
          </button>
          <button 
            onClick={() => setSegment('hdb')}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
              segment === 'hdb' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            HDB Resale
          </button>
          <button 
            onClick={() => setSegment('landed')}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
              segment === 'landed' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            Landed
          </button>
        </div>

        {/* Region & Time Horizon in Single Row */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {(['islandwide', 'ccr', 'rcr', 'ocr'] as const).map((r) => (
              <button 
                key={r}
                onClick={() => setRegion(r)}
                className={`whitespace-nowrap px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                  region === r ? 'bg-[#006874] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-[#eceef1] p-0.5 rounded-full shrink-0 border border-[#e6e8eb]">
            {(['1y', '3y', '5y'] as const).map((h) => (
              <button 
                key={h}
                onClick={() => setHorizon(h)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                  horizon === h ? 'bg-[#14283f] text-white shadow-xs' : 'text-[#44474d]'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Macro Trend Summary Metrics (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#e6e8eb]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#44474d] font-semibold">Median Resale PSF</span>
            <span className="material-symbols-outlined text-[#006874] text-[16px]">show_chart</span>
          </div>
          <div className="text-[18px] font-bold text-[#001328] tracking-tight">
            S$1,780<span className="text-[11px] font-normal text-[#44474d]"> psf</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[#005236] text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">trending_up</span>
            <span>+1.8% QoQ</span>
            <span className="text-[#74777e] font-normal">(+5.4% YoY)</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#e6e8eb]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#44474d] font-semibold">Caveat Volume</span>
            <span className="material-symbols-outlined text-[#006874] text-[16px]">bar_chart</span>
          </div>
          <div className="text-[18px] font-bold text-[#001328] tracking-tight">
            3,420<span className="text-[11px] font-normal text-[#44474d]"> units</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[#ba1a1a] text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">trending_down</span>
            <span>-4.2% QoQ</span>
            <span className="text-[#74777e] font-normal">URA</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#e6e8eb]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#44474d] font-semibold">Gross Rental Yield</span>
            <span className="material-symbols-outlined text-[#006874] text-[16px]">percent</span>
          </div>
          <div className="text-[18px] font-bold text-[#001328] tracking-tight">
            3.65%<span className="text-[11px] font-normal text-[#44474d]"> gross</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[#006874] text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">horizontal_rule</span>
            <span>Stable +10 bps</span>
            <span className="text-[#74777e] font-normal">RCR Avg</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#e6e8eb]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#44474d] font-semibold">Momentum Index</span>
            <span className="material-symbols-outlined text-[#006874] text-[16px]">speed</span>
          </div>
          <div className="text-[18px] font-bold text-[#001328] tracking-tight">
            64.2<span className="text-[11px] font-normal text-[#44474d]"> / 100</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[#005236] text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874] inline-block"></span>
            <span>Mod. Expansion</span>
          </div>
        </div>
      </div>

      {/* Interactive Price Trend & Volume Chart Section */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb] space-y-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#001328]">PSF Trend vs Volume</h2>
            <span className="bg-[#f2f4f7] px-2 py-0.5 rounded text-[10px] font-bold text-[#14283f] border border-[#e6e8eb]">
              RCR Private Resale
            </span>
          </div>
          <p className="text-[11px] text-[#44474d]">Official quarterly movement from Q1 2023 to Q1 2025</p>
        </div>

        {/* Toggle Layers */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <div className="px-2.5 py-1 rounded-full bg-[#14283f] text-white text-[10px] font-bold shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#95f1ff]"></span>
            <span>Median PSF</span>
          </div>
          <button 
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 border transition-all ${
              showVolume ? 'bg-[#14283f] text-white border-[#14283f]' : 'bg-[#f2f4f7] text-[#44474d] border-[#e6e8eb]'
            }`}
          >
            <span className="w-2 h-2 rounded-xs bg-[#79d4e2]"></span>
            <span>Volume (Units)</span>
          </button>
          <button 
            onClick={() => setShowSpread(!showSpread)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 border transition-all ${
              showSpread ? 'bg-[#14283f] text-white border-[#14283f]' : 'bg-[#f2f4f7] text-[#44474d] border-[#e6e8eb]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#006874]"></span>
            <span>25th-75th Spread</span>
          </button>
        </div>

        {/* SVG Composite Chart */}
        <div className="relative w-full pt-1 pb-1">
          <svg className="w-full h-40 overflow-visible" viewBox="0 0 340 160">
            <defs>
              <linearGradient id="chartGradient2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006874" stopOpacity="0.32"></stop>
                <stop offset="100%" stopColor="#006874" stopOpacity="0.0"></stop>
              </linearGradient>
              <linearGradient id="bandGradient2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#79d4e2" stopOpacity="0.25"></stop>
                <stop offset="100%" stopColor="#79d4e2" stopOpacity="0.08"></stop>
              </linearGradient>
            </defs>

            {/* Horizontal Guide Lines */}
            <line stroke="#eceef1" strokeDasharray="3 3" strokeWidth="1" x1="30" x2="330" y1="20" y2="20"></line>
            <line stroke="#eceef1" strokeDasharray="3 3" strokeWidth="1" x1="30" x2="330" y1="55" y2="55"></line>
            <line stroke="#eceef1" strokeDasharray="3 3" strokeWidth="1" x1="30" x2="330" y1="90" y2="90"></line>
            <line stroke="#eceef1" strokeWidth="1" x1="30" x2="330" y1="125" y2="125"></line>

            {/* Labels */}
            <text fill="#44474d" fontSize="9" fontWeight="500" textAnchor="end" x="24" y="24">$1.8k</text>
            <text fill="#44474d" fontSize="9" fontWeight="500" textAnchor="end" x="24" y="59">$1.7k</text>
            <text fill="#44474d" fontSize="9" fontWeight="500" textAnchor="end" x="24" y="94">$1.6k</text>
            <text fill="#44474d" fontSize="9" fontWeight="500" textAnchor="end" x="24" y="128">Vol</text>

            {/* Bars */}
            {showVolume && (
              <g>
                <rect fill="#14283f" height="20" opacity="0.18" rx="3" width="16" x="42" y="105"></rect>
                <rect fill="#14283f" height="25" opacity="0.2" rx="3" width="16" x="76" y="100"></rect>
                <rect fill="#14283f" height="33" opacity="0.22" rx="3" width="16" x="110" y="92"></rect>
                <rect fill="#14283f" height="17" opacity="0.15" rx="3" width="16" x="144" y="108"></rect>
                <rect fill="#14283f" height="30" opacity="0.25" rx="3" width="16" x="178" y="95"></rect>
                <rect fill="#14283f" height="39" opacity="0.28" rx="3" width="16" x="212" y="86"></rect>
                <rect fill="#14283f" height="43" opacity="0.3" rx="3" width="16" x="246" y="82"></rect>
                <rect fill="#14283f" height="27" opacity="0.22" rx="3" width="16" x="280" y="98"></rect>
                <rect fill="#006874" height="35" opacity="0.35" rx="3" width="16" x="310" y="90"></rect>
              </g>
            )}

            {/* Band */}
            {showSpread && (
              <polygon 
                fill="url(#bandGradient2)" 
                points="50,92 84,86 118,74 152,70 186,60 220,52 254,44 288,38 318,30 318,48 288,58 254,66 220,74 186,84 152,94 118,98 84,106 50,110"
              ></polygon>
            )}

            {/* Median Spline */}
            <path d="M 50,88 Q 84,80 118,70 T 186,52 T 254,36 T 318,22 L 318,125 L 50,125 Z" fill="url(#chartGradient2)"></path>
            <path d="M 50,88 Q 84,80 118,70 T 186,52 T 254,36 T 318,22" fill="none" stroke="#006874" strokeLinecap="round" strokeWidth="3"></path>

            <circle cx="50" cy="88" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="118" cy="70" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="186" cy="52" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="254" cy="36" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="318" cy="22" fill="#006874" r="5" stroke="#ffffff" strokeWidth="2"></circle>

            <rect fill="#001328" height="15" rx="4" width="58" x="268" y="4"></rect>
            <text fill="#ffffff" fontSize="8.5" fontWeight="700" textAnchor="middle" x="297" y="14">S$1,780 psf</text>

            <text fill="#44474d" fontSize="9" textAnchor="middle" x="50" y="142">Q1'23</text>
            <text fill="#44474d" fontSize="9" textAnchor="middle" x="118" y="142">Q3'23</text>
            <text fill="#44474d" fontSize="9" textAnchor="middle" x="186" y="142">Q1'24</text>
            <text fill="#44474d" fontSize="9" textAnchor="middle" x="254" y="142">Q3'24</text>
            <text fill="#006874" fontSize="9" fontWeight="700" textAnchor="middle" x="318" y="142">Q1'25</text>
          </svg>
        </div>

        {/* Quick Insight */}
        <div className="flex items-center justify-between bg-[#f2f4f7] p-2.5 rounded-lg border border-[#e6e8eb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006874] text-[18px]">verified</span>
            <span className="text-[11px] font-semibold text-[#001328]">Trajectory: Continuous +9.8% capital gain over 24 months.</span>
          </div>
          <span className="text-[11px] text-[#006874] font-bold whitespace-nowrap">Explore →</span>
        </div>
      </div>

      {/* District Comparison */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-[#001328]">District Comparison</h2>
            <p className="text-[11px] text-[#44474d]">Benchmark key submarkets against RCR baseline</p>
          </div>
          <button 
            onClick={() => onShowToast("Loaded all 28 Singapore postal districts")}
            className="text-[10px] text-[#006874] font-bold bg-[#f2f4f7] px-2.5 py-1 rounded-full border border-[#e6e8eb]"
          >
            See All 28
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* D20 */}
          <div 
            onClick={() => onNavigate('property-detail')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between hover:bg-[#f2f4f7] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#f2f4f7] flex flex-col items-center justify-center shrink-0 border border-[#e6e8eb]">
                <span className="text-[12px] font-bold text-[#001328]">D20</span>
                <span className="text-[8px] text-[#44474d] uppercase font-bold">Central</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#001328] truncate">Bishan / Ang Mo Kio</span>
                  <span className="px-1.5 py-0.2 bg-[#eceef1] text-[#44474d] text-[9px] rounded font-mono font-medium">185 Caveats</span>
                </div>
                <div className="flex items-center gap-2 text-[#44474d] text-[11px] mt-0.5">
                  <span>S$1,680 psf</span>
                  <span className="text-[#005236] font-bold flex items-center text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">north_east</span>+4.6% YoY
                  </span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#94f6c4] text-[#002113]">Resilient</span>
          </div>

          {/* D13 */}
          <div 
            onClick={() => onNavigate('explore')}
            className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between hover:bg-[#f2f4f7] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#f2f4f7] flex flex-col items-center justify-center shrink-0 border border-[#e6e8eb]">
                <span className="text-[12px] font-bold text-[#001328]">D13</span>
                <span className="text-[8px] text-[#44474d] uppercase font-bold">City Fringe</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#001328] truncate">MacPherson / Woodleigh</span>
                  <span className="px-1.5 py-0.2 bg-[#eceef1] text-[#44474d] text-[9px] rounded font-mono font-medium">214 Caveats</span>
                </div>
                <div className="flex items-center gap-2 text-[#44474d] text-[11px] mt-0.5">
                  <span>S$1,890 psf</span>
                  <span className="text-[#005236] font-bold flex items-center text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">north_east</span>+6.2% YoY
                  </span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#95f1ff] text-[#001f24]">High Growth</span>
          </div>

          {/* D12 */}
          <div className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#f2f4f7] flex flex-col items-center justify-center shrink-0 border border-[#e6e8eb]">
                <span className="text-[12px] font-bold text-[#001328]">D12</span>
                <span className="text-[8px] text-[#44474d] uppercase font-bold">Central</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#001328] truncate">Balestier / Toa Payoh</span>
                  <span className="px-1.5 py-0.2 bg-[#eceef1] text-[#44474d] text-[9px] rounded font-mono font-medium">142 Caveats</span>
                </div>
                <div className="flex items-center gap-2 text-[#44474d] text-[11px] mt-0.5">
                  <span>S$1,720 psf</span>
                  <span className="text-[#005236] font-bold flex items-center text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">north_east</span>+2.1% YoY
                  </span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e6e8eb] text-[#44474d]">Neutral</span>
          </div>

          {/* D15 */}
          <div className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#f2f4f7] flex flex-col items-center justify-center shrink-0 border border-[#e6e8eb]">
                <span className="text-[12px] font-bold text-[#001328]">D15</span>
                <span className="text-[8px] text-[#44474d] uppercase font-bold">East Coast</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#001328] truncate">East Coast / Marine Parade</span>
                  <span className="px-1.5 py-0.2 bg-[#eceef1] text-[#44474d] text-[9px] rounded font-mono font-medium">310 Caveats</span>
                </div>
                <div className="flex items-center gap-2 text-[#44474d] text-[11px] mt-0.5">
                  <span>S$2,150 psf</span>
                  <span className="text-[#005236] font-bold flex items-center text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">north_east</span>+3.8% YoY
                  </span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d2e4ff] text-[#071c33]">Premium RCR</span>
          </div>
        </div>
      </div>

      {/* Market Signals & Policy Radar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006874] text-[18px]">radar</span>
            <h2 className="text-[14px] font-bold text-[#001328]">Market Signals &amp; Policy Radar</h2>
          </div>
          <span className="text-[10px] text-[#44474d]">GovTech Feed</span>
        </div>

        <div className="space-y-2">
          <div className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#95f1ff]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#006874]">
              <span className="material-symbols-outlined text-[18px]">domain_add</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[12px] font-bold text-[#001328]">URA Private Housing Pipeline</h3>
                <span className="text-[10px] font-bold text-[#006874]">Peak 2025-26</span>
              </div>
              <p className="text-[11px] text-[#44474d] mt-0.5">
                <strong>18,400 units</strong> currently under construction across Central regions. Completions will moderate secondary leasing competition.
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#94f6c4]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#005236]">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[12px] font-bold text-[#001328]">MAS SORA Benchmark</h3>
                <span className="text-[10px] font-bold text-[#005236]">Stabilizing</span>
              </div>
              <p className="text-[11px] text-[#44474d] mt-0.5">
                3-Month Compounded SORA holding steady at <strong>3.15%</strong>. Debt servicing conditions easing for private borrowers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive & Export Actions */}
      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onShowToast("Compiling Q1 2025 URA & HDB Market Report PDF...")}
            className="flex items-center justify-center gap-2 bg-[#14283f] hover:bg-[#001328] text-white py-2.5 px-3 rounded-xl text-[12px] font-bold shadow-xs active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">picture_as_pdf</span>
            <span>Q1 Report (PDF)</span>
          </button>
          <button 
            onClick={() => onShowToast("Exporting quarterly index data to CSV")}
            className="flex items-center justify-center gap-2 bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] py-2.5 px-3 rounded-xl text-[12px] font-bold border border-[#e6e8eb] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">csv</span>
            <span>Export CSV</span>
          </button>
        </div>

        <div 
          onClick={() => onNavigate('rental-investment')}
          className="w-full flex items-center justify-between bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs hover:border-[#006874]/50 cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#006874]/10 flex items-center justify-center text-[#006874]">
              <span className="material-symbols-outlined text-[18px]">calculate</span>
            </div>
            <div>
              <span className="text-[12px] font-bold text-[#001328] block">Rental Yield &amp; Cashflow Engine</span>
              <span className="text-[10px] text-[#44474d]">Simulate net yield after ABSD, MCST &amp; maintenance</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#74777e] group-hover:translate-x-1 transition-transform text-[18px]">
            arrow_forward_ios
          </span>
        </div>
      </div>

      {/* Statutory Authority Feed */}
      <div className="p-3 rounded-xl bg-[#f2f4f7] space-y-1 text-center border border-[#e6e8eb]">
        <div className="flex items-center justify-center gap-1.5 text-[#44474d]">
          <span className="material-symbols-outlined text-[14px] text-[#006874]">assured_workload</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#001328]">Statutory Authority Feed</span>
        </div>
        <p className="text-[10px] text-[#44474d] leading-relaxed">
          Indices calculated from verified caveats lodged with Singapore Land Authority (SLA), Urban Redevelopment Authority (URA REALIS), Housing &amp; Development Board (HDB), and SingStat APIs. Validated in compliance with SISV statistical standards.
        </p>
      </div>
    </div>
  );
};
