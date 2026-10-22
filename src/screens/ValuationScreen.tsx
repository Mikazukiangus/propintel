import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ValuationScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ValuationScreen: React.FC<ValuationScreenProps> = ({ onNavigate, onShowToast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [floorArea, setFloorArea] = useState(1141);
  const [floorTier, setFloorTier] = useState('#12 - #18 (High Floor)');
  const [estimatedPrice, setEstimatedPrice] = useState(1620000);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const psf = Math.round(estimatedPrice / floorArea);
  const conservative = Math.round(estimatedPrice * 0.963);
  const aggressive = Math.round(estimatedPrice * 1.031);

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      setIsEditing(false);
      setEstimatedPrice(Math.round(floorArea * 1422));
      onShowToast("AVM Model recalibrated against 18 URA REALIS caveats!");
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-4 pb-12 pt-2">
      {/* Header Block */}
      <div className="flex flex-col pt-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95f1ff] text-[#001f24] text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874] animate-pulse"></span>
            URA REALIS • HDB RESALE SYNC
          </span>
          <span className="text-[11px] text-[#44474d] font-semibold">Q1 2025</span>
        </div>
        <h1 className="text-[20px] font-bold text-[#001328] tracking-tight">Instant Property Valuation</h1>
        <p className="text-[12px] text-[#44474d] mt-0.5 leading-snug">
          Evidence-based algorithmic valuation calibrated against URA REALIS caveats and HDB Resale registration data.
        </p>
      </div>

      {/* Fast Property Lookup / Parameter Capsule */}
      <div className="bg-white rounded-xl shadow-xs border border-[#e6e8eb] p-3.5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#eceef1] flex items-center justify-center text-[#14283f] shrink-0">
              <span className="material-symbols-outlined text-[18px]">apartment</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h2 className="text-[15px] font-bold text-[#001328] truncate">Bishan Loft</h2>
                <span className="text-[10px] font-bold bg-[#e6e8eb] px-1.5 py-0.2 rounded text-[#191c1e]">D20</span>
              </div>
              <p className="text-[11px] text-[#44474d] truncate">Bishan Street 22 • Privatised EC</p>
            </div>
          </div>

          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-0.5 text-[#006874] hover:text-[#004f57] text-[12px] font-bold py-1 px-2.5 rounded-lg bg-[#95f1ff]/30 transition-all"
          >
            <span>{isEditing ? 'Close' : 'Edit'}</span>
            <span className={`material-symbols-outlined text-[15px] transition-transform ${isEditing ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
        </div>

        {/* Parameter Details Grid */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2 bg-[#f2f4f7] rounded-lg p-2.5 border border-[#e6e8eb]">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#44474d]">Floor Area</span>
              <span className="text-[12px] text-[#001328] font-bold truncate">
                {floorArea.toLocaleString()} sqft ({Math.round(floorArea * 0.0929)} sqm)
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#44474d]">Floor Level</span>
              <span className="text-[12px] text-[#001328] font-bold truncate">{floorTier}</span>
            </div>
            <div className="flex flex-col min-w-0 col-span-2 pt-1 border-t border-[#e6e8eb]">
              <span className="text-[10px] text-[#44474d]">Tenure &amp; Balance</span>
              <span className="text-[12px] text-[#001328] font-bold flex items-center gap-1.5">
                99-year Leasehold
                <span className="px-1.5 py-0.2 bg-[#e0e3e6] text-[#191c1e] text-[10px] rounded-full">
                  76 yrs remaining
                </span>
              </span>
            </div>
          </div>

          {/* Collapsible Edit Form */}
          {isEditing && (
            <div className="flex flex-col space-y-2 pt-1 bg-white p-3 rounded-lg border border-[#006874]/30 shadow-xs animate-fade-in">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#44474d] font-semibold block mb-1">Unit Floor</label>
                  <select 
                    value={floorTier}
                    onChange={(e) => setFloorTier(e.target.value)}
                    className="w-full bg-[#f2f4f7] text-[#001328] rounded-lg px-2.5 py-1.5 text-[12px] font-medium focus:outline-none"
                  >
                    <option value="#01 - #05 (Ground Floor)">#01 - #05 (Ground)</option>
                    <option value="#06 - #11 (Mid Floor)">#06 - #11 (Mid)</option>
                    <option value="#12 - #18 (High Floor)">#12 - #18 (High)</option>
                    <option value="#19 - #30 (Penthouse)">#19 - #30 (Penthouse)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#44474d] font-semibold block mb-1">Floor Area (sqft)</label>
                  <input 
                    type="number"
                    value={floorArea}
                    onChange={(e) => setFloorArea(Number(e.target.value))}
                    className="w-full bg-[#f2f4f7] text-[#001328] rounded-lg px-2.5 py-1.5 text-[12px] font-medium focus:outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleRecalculate}
                disabled={isRecalculating}
                className="w-full mt-1 py-2 px-3 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.99] transition-transform"
              >
                <span className={`material-symbols-outlined text-[16px] ${isRecalculating ? 'animate-spin' : ''}`}>
                  {isRecalculating ? 'refresh' : 'sync'}
                </span>
                <span>{isRecalculating ? 'Processing URA Caveats...' : 'Re-calculate Valuation Model'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Primary Valuation Results Card */}
      <div className="relative bg-white rounded-xl shadow-md border border-[#e6e8eb] overflow-hidden">
        {/* Algorithmic Header Banner */}
        <div className="bg-[#14283f] text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#95f1ff]">auto_graph</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#95f1ff]">
              AVM Estimate • Hedonic Model
            </span>
          </div>
          <span className="text-[10px] text-[#7c8fab]">v4.8 Algo</span>
        </div>

        <div className="p-4 space-y-3.5">
          {/* Big Metric Display */}
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider font-semibold">
                Estimated Market Value
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#95f1ff]/40 text-[#004f57] font-bold">
                ±3.4% Uncertainty
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-bold text-[#001328] tracking-tight">
                S${estimatedPrice.toLocaleString()}
              </span>
              <span className="text-[12px] text-[#44474d] font-semibold">
                (S${psf.toLocaleString()} psf)
              </span>
            </div>

            {/* Uncertainty Range Bar */}
            <div className="mt-2.5 bg-[#f2f4f7] rounded-xl p-2.5 flex flex-col gap-1.5 border border-[#e6e8eb]">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-[#44474d]">
                  Conservative: <strong className="text-[#191c1e]">S${conservative.toLocaleString()}</strong>
                </span>
                <span className="text-[#44474d]">
                  Aggressive: <strong className="text-[#191c1e]">S${aggressive.toLocaleString()}</strong>
                </span>
              </div>

              {/* Range track visual */}
              <div className="relative h-2 w-full bg-[#e0e3e6] rounded-full overflow-hidden">
                <div className="absolute left-[15%] right-[15%] h-full bg-[#006874] rounded-full"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white -translate-x-1/2 shadow-xs"></div>
              </div>

              <div className="text-center text-[10px] text-[#44474d] pt-0.5">
                Median Base: S${psf.toLocaleString()} psf • Midpoint Calibration
              </div>
            </div>
          </div>

          {/* Confidence & Metrics Row */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Confidence Score */}
            <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col justify-between border border-[#e6e8eb]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#44474d] font-semibold">Model Confidence</span>
                <span className="material-symbols-outlined text-[16px] text-[#78d9aa]">verified</span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-[20px] font-bold text-[#001328]">89</span>
                <span className="text-[10px] text-[#44474d]">/100</span>
              </div>
              <div className="w-full bg-[#e0e3e6] h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-[#006874] h-full rounded-full w-[89%]"></div>
              </div>
              <span className="text-[10px] text-[#44474d] mt-1.5 leading-tight">
                High • 18 direct caveats in 6 mo
              </span>
            </div>

            {/* Rental Yield */}
            <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col justify-between border border-[#e6e8eb]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#44474d] font-semibold">Est. Rental Yield</span>
                <span className="material-symbols-outlined text-[16px] text-[#006874]">payments</span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-[20px] font-bold text-[#006874]">3.65%</span>
                <span className="text-[10px] text-[#44474d]">gross</span>
              </div>
              <div className="w-full bg-[#e0e3e6] h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-[#79d4e2] h-full rounded-full w-[65%]"></div>
              </div>
              <span className="text-[10px] text-[#44474d] mt-1.5 leading-tight truncate">
                ~S$4,900/mo (D20 median)
              </span>
            </div>
          </div>

          {/* Official Disclaimer Micro-Tag */}
          <div className="bg-[#e6e8eb]/70 rounded-lg p-2 flex items-start gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#44474d] shrink-0 mt-0.5">info</span>
            <p className="text-[10px] text-[#44474d] leading-tight">
              Algorithmic model benchmark only. Not a licensed appraisal or statutory HDB Notice of Valuation for housing loan disbursement.
            </p>
          </div>
        </div>
      </div>

      {/* Valuation Factor Breakdown (Hedonic Driver Attribution) */}
      <div className="bg-white rounded-xl shadow-xs border border-[#e6e8eb] p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#001328]">tune</span>
            <h3 className="text-[14px] font-bold text-[#001328]">Valuation Factor Breakdown</h3>
          </div>
          <span className="text-[10px] text-[#44474d]">Hedonic Attributes</span>
        </div>

        <p className="text-[12px] text-[#44474d]">
          Net algorithmic adjustment of <strong className="text-[#001328]">+7.9%</strong> relative to Bishan District benchmark baseline.
        </p>

        <div className="space-y-1.5 pt-1">
          {/* Driver 1 */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] transition-colors">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <div className="w-6 h-6 rounded-full bg-[#94f6c4]/40 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[14px] text-[#005236]">arrow_upward</span>
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#001328] truncate">High Floor Tier (#12-18)</div>
                <div className="text-[10px] text-[#44474d]">Unblocked view elevation premium</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#005236] shrink-0 bg-[#94f6c4]/50 px-2 py-0.5 rounded-full">
              +3.2%
            </span>
          </div>

          {/* Driver 2 */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] transition-colors">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <div className="w-6 h-6 rounded-full bg-[#94f6c4]/40 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[14px] text-[#005236]">school</span>
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#001328] truncate">Primary School Proximity</div>
                <div className="text-[10px] text-[#44474d]">Within 1km of Catholic High School</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#005236] shrink-0 bg-[#94f6c4]/50 px-2 py-0.5 rounded-full">
              +4.5%
            </span>
          </div>

          {/* Driver 3 */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] transition-colors">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <div className="w-6 h-6 rounded-full bg-[#ffdad6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[14px] text-[#ba1a1a]">hourglass_bottom</span>
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#001328] truncate">Lease Decay Adjustment</div>
                <div className="text-[10px] text-[#44474d]">76 yrs tenure balance vs 99y new launches</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#ba1a1a] shrink-0 bg-[#ffdad6] px-2 py-0.5 rounded-full">
              -1.8%
            </span>
          </div>

          {/* Driver 4 */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] transition-colors">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <div className="w-6 h-6 rounded-full bg-[#94f6c4]/40 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[14px] text-[#005236]">train</span>
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#001328] truncate">Transport &amp; CRL Infra Uplift</div>
                <div className="text-[10px] text-[#44474d]">Cross Island Line &amp; En-bloc benchmark uplift</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#005236] shrink-0 bg-[#94f6c4]/50 px-2 py-0.5 rounded-full">
              +2.0%
            </span>
          </div>
        </div>
      </div>

      {/* Historical Price Trend Chart Widget */}
      <div className="bg-white rounded-xl shadow-xs border border-[#e6e8eb] p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#001328]">Historical PSF Trajectory</h3>
            <p className="text-[11px] text-[#44474d]">6-Month Trend vs District 20 Median</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#001328]">
              <span className="w-2.5 h-1 rounded-full bg-[#006874]"></span> Bishan Loft
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#74777e]">
              <span className="w-2.5 h-1 rounded-full bg-[#c4c6cd]"></span> D20
            </div>
          </div>
        </div>

        {/* Lightweight SVG Trend Chart */}
        <div className="w-full bg-[#f2f4f7] rounded-xl p-3 border border-[#e6e8eb]">
          <svg className="w-full h-36" preserveAspectRatio="none" viewBox="0 0 320 120">
            <defs>
              <linearGradient id="avmAreaGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006874" stopOpacity="0.25"></stop>
                <stop offset="100%" stopColor="#006874" stopOpacity="0.00"></stop>
              </linearGradient>
            </defs>

            {/* Horizontal Guide Lines */}
            <line opacity="0.6" stroke="#c4c6cd" strokeDasharray="2 3" strokeWidth="0.8" x1="0" x2="320" y1="20" y2="20"></line>
            <line opacity="0.6" stroke="#c4c6cd" strokeDasharray="2 3" strokeWidth="0.8" x1="0" x2="320" y1="60" y2="60"></line>
            <line opacity="0.6" stroke="#c4c6cd" strokeDasharray="2 3" strokeWidth="0.8" x1="0" x2="320" y1="100" y2="100"></line>

            {/* District 20 Median (Dashed gray curve) */}
            <path d="M 0 75 Q 64 72 128 68 T 256 62 T 320 58" fill="none" stroke="#74777e" strokeDasharray="3 3" strokeWidth="1.8"></path>

            {/* Subject Property Area Fill */}
            <path d="M 0 68 Q 64 62 128 50 T 256 36 T 320 28 L 320 115 L 0 115 Z" fill="url(#avmAreaGrad)"></path>

            {/* Subject Property Trend Curve (Solid Teal) */}
            <path d="M 0 68 Q 64 62 128 50 T 256 36 T 320 28" fill="none" stroke="#006874" strokeLinecap="round" strokeWidth="2.5"></path>

            {/* Points */}
            <circle cx="64" cy="62" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="128" cy="50" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="192" cy="42" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="256" cy="36" fill="#ffffff" r="3" stroke="#006874" strokeWidth="2"></circle>
            <circle cx="320" cy="28" fill="#006874" r="4" stroke="#ffffff" strokeWidth="2"></circle>

            {/* Bubble */}
            <rect fill="#001328" height="18" rx="4" width="80" x="235" y="6"></rect>
            <text fill="#ffffff" fontFamily="Inter" fontSize="9" fontWeight="600" textAnchor="middle" x="275" y="18">
              ${psf.toLocaleString()} psf
            </text>
          </svg>

          {/* Timeline Labels */}
          <div className="flex justify-between items-center text-[10px] text-[#44474d] pt-2 px-1">
            <span>Aug 24</span>
            <span>Sep 24</span>
            <span>Oct 24</span>
            <span>Nov 24</span>
            <span>Dec 24</span>
            <span className="font-bold text-[#001328]">Jan 25</span>
          </div>
        </div>

        {/* Quick Insight Badge */}
        <div className="flex items-center gap-2 p-2 bg-[#eceef1] rounded-lg">
          <span className="material-symbols-outlined text-[16px] text-[#006874]">trending_up</span>
          <span className="text-[11px] text-[#191c1e] leading-tight">
            Bishan Loft gained <strong>+4.8%</strong> over 6 months, outperforming D20 avg by +1.6%.
          </span>
        </div>
      </div>

      {/* Primary Action Stack */}
      <div className="space-y-2 pt-1">
        <button 
          onClick={() => onNavigate('caveats')}
          className="w-full py-3 px-4 rounded-xl bg-[#001328] hover:bg-[#14283f] text-white text-[13px] font-bold flex items-center justify-between shadow-md active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#95f1ff]">fact_check</span>
            <span>Inspect 18 Comparable Transactions</span>
          </div>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="py-2.5 px-3 rounded-xl bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[17px] text-[#44474d]">tune</span>
            <span>Adjust Model</span>
          </button>
          <button 
            onClick={() => onNavigate('report-builder')}
            className="py-2.5 px-3 rounded-xl bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006874]">picture_as_pdf</span>
            <span>PDF Audit Report</span>
          </button>
        </div>
      </div>

      {/* Statutory & Data Governance Notice Footer */}
      <div className="bg-[#f2f4f7] rounded-xl p-3.5 space-y-1.5 border border-[#e6e8eb]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#001328] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#006874]">security</span>
            DATA GOVERNANCE &amp; AUDITABILITY
          </span>
          <span className="text-[10px] text-[#44474d]">Singapore GovTech Standards</span>
        </div>
        <p className="text-[11px] text-[#44474d] leading-relaxed">
          Data sources: <strong className="text-[#191c1e]">URA Caveats (Refreshed Jan 2025)</strong>, <strong className="text-[#191c1e]">HDB Resale Data.gov.sg</strong>, SLA Cadastral Boundaries, and OneMap Spatial APIs. Methodology applies multivariate hedonic price regressions normalized for floor elevation, primary school radii, aging lease decay curve, and transit station walkshed.
        </p>
      </div>
    </div>
  );
};
