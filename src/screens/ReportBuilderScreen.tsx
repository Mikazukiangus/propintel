import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface ReportBuilderScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ReportBuilderScreen: React.FC<ReportBuilderScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [watermark, setWatermark] = useState<'CONFIDENTIAL' | 'DRAFT' | 'NONE'>('CONFIDENTIAL');
  const [coverNote, setCoverNote] = useState(
    'Prepared exclusively for Marcus & Cheryl Lim for strategic upgrader financial planning and Bishan asset repositioning.'
  );
  const [modules, setModules] = useState({
    hedonic: true,
    comps: true,
    quartile: true,
    onemap: true,
    askingSpread: true,
    stampDuty: false,
  });
  const [isCompiling, setIsCompiling] = useState(false);

  const toggleAll = () => {
    const allChecked = Object.values(modules).every(Boolean);
    setModules({
      hedonic: !allChecked,
      comps: !allChecked,
      quartile: !allChecked,
      onemap: !allChecked,
      askingSpread: !allChecked,
      stampDuty: !allChecked,
    });
    onShowToast(!allChecked ? "All modules included in PDF" : "Optional modules excluded");
  };

  const handleDownloadPdf = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      onShowToast("Bishan_Loft_Valuation_Report_v2.4.pdf downloaded (2.4 MB)");
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full pb-14 pt-1">
      {/* Screen Subheader Bar */}
      <div className="px-4 pt-2 pb-3 flex flex-col gap-2 bg-[#f2f4f7] border-b border-[#e6e8eb]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button 
              onClick={() => onNavigate('agent-dashboard')}
              aria-label="Go back" 
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#14283f] hover:bg-[#eceef1] border border-[#e6e8eb] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-[17px] font-bold text-[#001328] truncate leading-tight">
                Valuation Report Builder
              </h1>
              <p className="text-[11px] text-[#44474d] truncate">Institutional-grade advisory report for clients</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#e6e8eb] text-[#001328] text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
            v2.4
          </span>
        </div>

        {/* Active Dossier Switcher */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#95f1ff]/30 text-[#006f7b] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">folder_shared</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-[#74777e] uppercase tracking-wider font-semibold">Active Dossier</span>
              <span className="text-[12px] font-bold text-[#001328] truncate">
                Marcus &amp; Cheryl Lim · Bishan Loft #14-06
              </span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('client-matching')}
            className="text-[#006874] text-[11px] font-bold px-2 py-1 rounded-md bg-[#95f1ff]/20 hover:bg-[#95f1ff]/40 transition-colors flex items-center gap-0.5 shrink-0"
          >
            Switch
            <span className="material-symbols-outlined text-[13px]">unfold_more</span>
          </button>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4 mt-3 max-w-lg mx-auto w-full">
        {/* Section 1: Live Interactive Document Preview Card */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#001328] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006874]">visibility</span>
              Live Document Preview
            </span>
            <span className="text-[10px] text-[#006874] bg-[#95f1ff]/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874] animate-pulse"></span>
              Realtime Sync
            </span>
          </div>

          {/* Mini Document Canvas */}
          <div className="relative rounded-2xl bg-white p-4 shadow-sm border border-[#e6e8eb] flex flex-col gap-3 overflow-hidden">
            {/* Watermark Ribbon */}
            {watermark !== 'NONE' && (
              <div className="absolute -right-12 top-6 rotate-45 bg-[#e0a41d]/15 text-[#854d0e] font-bold text-[9px] px-12 py-0.5 tracking-widest uppercase pointer-events-none text-center shadow-xs border-y border-[#e0a41d]/30">
                {watermark === 'CONFIDENTIAL' ? 'CONFIDENTIAL CLIENT COPY' : 'DRAFT ADVISORY REPORT'}
              </div>
            )}

            {/* Document Header */}
            <div className="flex items-start justify-between pb-2 border-b border-[#f2f4f7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#14283f] text-white flex items-center justify-center text-[13px] font-bold tracking-tighter">
                  PI
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#001328] leading-none">SG PropIntel × PropNex</span>
                  <span className="text-[10px] text-[#74777e] mt-0.5">Advisory Research Division</span>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[11px] font-bold text-[#001328]">Eileen Tan</span>
                <span className="text-[9px] text-[#74777e]">CEA: R014829E</span>
              </div>
            </div>

            {/* Subject Property Overview Strip */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#f2f4f7] border border-[#e6e8eb]">
              <img 
                className="w-12 h-12 rounded-lg object-cover shrink-0" 
                src={ASSETS.bishanLoftExterior} 
                alt="Bishan Loft" 
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#001328] truncate">Bishan Loft</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#e0e3e6] text-[#001328] text-[9px] font-bold">D20 · EC</span>
                </div>
                <p className="text-[11px] text-[#44474d] truncate">Block 33 #14-06 · 3-Bed, 2-Bath · 1,141 sqft</p>
                <span className="text-[10px] text-[#005236] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  99-yr from 2001 · TOP 2003
                </span>
              </div>
            </div>

            {/* Valuation Core Benchmark Box */}
            <div className="rounded-xl p-3 bg-gradient-to-br from-[#14283f] to-[#001328] text-white flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-[#7c8fab] tracking-wider uppercase font-bold">
                  Algorithmic Valuation (AVM)
                </span>
                <span className="text-[9px] text-[#94f6c4] bg-[#002e1c] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94f6c4]"></span>
                  URA Realis Calibrated
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-0.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[20px] font-bold tracking-tight text-white">S$1,620,000</span>
                  <span className="text-[10px] text-[#7c8fab]">S$1,420 psf</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#95f1ff] block font-semibold">Range: S$1.56M – S$1.67M</span>
                  <span className="text-[9px] text-[#7c8fab]">Confidence: ±3.4%</span>
                </div>
              </div>

              {/* Micro Trajectory */}
              <div className="pt-1.5 mt-1 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-[#7c8fab]">5-Yr Trajectory</span>
                  <span className="text-[#94f6c4] font-bold flex items-center">
                    <span className="material-symbols-outlined text-[13px]">trending_up</span>
                    +18.4%
                  </span>
                </div>
                <svg className="w-20 h-4 overflow-visible" fill="none" viewBox="0 0 100 20">
                  <path d="M0 16 Q 25 14, 45 10 T 80 6 T 100 2" stroke="#79d4e2" strokeLinecap="round" strokeWidth="2"></path>
                  <circle cx="100" cy="2" fill="#95f1ff" r="3"></circle>
                </svg>
              </div>
            </div>

            {/* Highlights Pills */}
            <div className="flex flex-wrap gap-1 text-[10px]">
              <span className="px-2 py-0.5 rounded-md bg-[#f2f4f7] font-semibold text-[#001328] flex items-center gap-1 border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[12px] text-[#006874]">school</span>
                Catholic High (&lt;1km)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#f2f4f7] font-semibold text-[#001328] flex items-center gap-1 border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[12px] text-[#006874]">train</span>
                Bishan MRT (420m)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#f2f4f7] font-semibold text-[#001328] flex items-center gap-1 border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[12px] text-[#006874]">layers</span>
                94% Stack Matching
              </span>
            </div>

            {/* Footer Attribution */}
            <div className="p-2 rounded-lg bg-[#f2f4f7] flex items-center justify-between text-[9px] text-[#74777e] border border-[#e6e8eb]">
              <span className="flex items-center gap-1 truncate font-semibold">
                <span className="material-symbols-outlined text-[11px] text-[#006874]">verified_user</span>
                URA REALIS &amp; HDB Resale Data.gov.sg Verified
              </span>
              <span className="shrink-0 font-mono">14 Feb 2025</span>
            </div>
          </div>
        </div>

        {/* Section 2: Report Modules & Chapters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#001328]">Report Modules &amp; Chapters</h2>
              <p className="text-[11px] text-[#44474d]">Configure chapters included in the final 4-page PDF</p>
            </div>
            <button 
              onClick={toggleAll}
              className="text-[#006874] text-[11px] font-bold hover:underline"
            >
              Select All
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            {/* Module 1: Locked */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-md bg-[#14283f] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">1. Executive Summary &amp; AVM</span>
                  <span className="text-[10px] text-[#74777e]">Core property dossier &amp; baseline</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] shrink-0">
                Mandatory
              </span>
            </div>

            {/* Module 2 */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs cursor-pointer hover:bg-[#f2f4f7] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <input 
                  type="checkbox"
                  checked={modules.hedonic}
                  onChange={(e) => setModules({ ...modules, hedonic: e.target.checked })}
                  className="w-4 h-4 rounded text-[#006874] accent-[#006874]"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">2. Hedonic Factor Breakdown</span>
                  <span className="text-[10px] text-[#74777e]">Floor adjustment (+3.2%), MRT, Catholic High</span>
                </div>
              </div>
              <span className="text-[10px] text-[#006874] font-bold">Page 2</span>
            </label>

            {/* Module 3 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs">
              <label className="flex items-center gap-2.5 min-w-0 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={modules.comps}
                  onChange={(e) => setModules({ ...modules, comps: e.target.checked })}
                  className="w-4 h-4 rounded text-[#006874] accent-[#006874]"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">3. Selected URA REALIS Comparables</span>
                  <span className="text-[10px] text-[#74777e]">4 of 6 transactions selected for peer matrix</span>
                </div>
              </label>
              <button 
                onClick={() => onNavigate('caveats')}
                className="px-2 py-0.5 rounded bg-[#95f1ff]/30 text-[#006f7b] text-[10px] font-bold"
              >
                Edit (4)
              </button>
            </div>

            {/* Module 4 */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs cursor-pointer hover:bg-[#f2f4f7] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <input 
                  type="checkbox"
                  checked={modules.quartile}
                  onChange={(e) => setModules({ ...modules, quartile: e.target.checked })}
                  className="w-4 h-4 rounded text-[#006874] accent-[#006874]"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">4. Historical PSF &amp; 12-M Trend</span>
                  <span className="text-[10px] text-[#74777e]">Median spread &amp; Bishan D20 percentile curve</span>
                </div>
              </div>
              <span className="text-[10px] text-[#006874] font-bold">Page 3</span>
            </label>

            {/* Module 5 */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs cursor-pointer hover:bg-[#f2f4f7] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <input 
                  type="checkbox"
                  checked={modules.onemap}
                  onChange={(e) => setModules({ ...modules, onemap: e.target.checked })}
                  className="w-4 h-4 rounded text-[#006874] accent-[#006874]"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">5. OneMap Cadastral &amp; Walkability</span>
                  <span className="text-[10px] text-[#74777e]">SLA boundary lot coordinates &amp; park connectors</span>
                </div>
              </div>
              <span className="text-[10px] text-[#006874] font-bold">Page 3</span>
            </label>

            {/* Module 6 */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs cursor-pointer hover:bg-[#f2f4f7] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <input 
                  type="checkbox"
                  checked={modules.askingSpread}
                  onChange={(e) => setModules({ ...modules, askingSpread: e.target.checked })}
                  className="w-4 h-4 rounded text-[#006874] accent-[#006874]"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">6. Strategic Asking Recommendation</span>
                  <span className="text-[10px] text-[#74777e]">Competitive ($1.59M) vs Market ($1.62M) vs Premium</span>
                </div>
              </div>
              <span className="text-[10px] text-[#006874] font-bold">Page 4</span>
            </label>

            {/* Module 7: Optional */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs cursor-pointer hover:bg-[#f2f4f7] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <input 
                  type="checkbox"
                  checked={modules.stampDuty}
                  onChange={(e) => setModules({ ...modules, stampDuty: e.target.checked })}
                  className="w-4 h-4 rounded text-[#006874] accent-[#006874]"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">7. Buyer Financing &amp; Stamp Duty</span>
                  <span className="text-[10px] text-[#74777e]">ABSD / BSD breakdown, CPF Ordinary Account</span>
                </div>
              </div>
              <span className="text-[10px] text-[#74777e] font-semibold">Optional</span>
            </label>

            {/* Module 8: Required */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-md bg-[#006874]/10 text-[#006874] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[14px]">gavel</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-[#001328] truncate">8. Statutory Compliance &amp; SISV Disclosures</span>
                  <span className="text-[10px] text-[#74777e]">Standardized valuer disclosures</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] shrink-0">
                Required
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Client & Branding Customization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#001328]">Client &amp; Branding Customization</h2>
            <span className="text-[10px] text-[#006874] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">brush</span>
              Advisory Style
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
            {/* Agent Profile Card */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f4f7] border border-[#e6e8eb]">
              <div className="flex items-center gap-2.5">
                <img 
                  alt="Eileen Tan" 
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#006874]/30" 
                  src={ASSETS.agentEileen} 
                />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#001328]">Eileen Tan (+65 9123 4567)</span>
                  <span className="text-[10px] text-[#44474d]">PropNex Realty · Senior Associate Marketing Director</span>
                </div>
              </div>
              <button 
                onClick={() => onShowToast("Editing agent branding signature details")}
                className="text-[#006874] p-1.5 hover:bg-white rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">edit</span>
              </button>
            </div>

            {/* Editable Cover Note */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-[#001328] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Executive Cover Note</span>
                <span className="text-[#74777e] font-normal normal-case">Printed on Page 1</span>
              </label>
              <textarea 
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full text-[11px] bg-[#f2f4f7] text-[#191c1e] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006874]/30 border border-[#e6e8eb] resize-none"
                rows={2}
              />
            </div>

            {/* Watermark Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-[#001328] font-bold uppercase tracking-wider">
                Document Classification Watermark
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button 
                  onClick={() => setWatermark('CONFIDENTIAL')}
                  className={`py-2 px-1 text-center text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    watermark === 'CONFIDENTIAL'
                      ? 'bg-[#14283f] text-white shadow-xs'
                      : 'bg-[#f2f4f7] text-[#44474d] hover:bg-[#eceef1]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px]">lock</span>
                  Confidential
                </button>
                <button 
                  onClick={() => setWatermark('DRAFT')}
                  className={`py-2 px-1 text-center text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    watermark === 'DRAFT'
                      ? 'bg-[#14283f] text-white shadow-xs'
                      : 'bg-[#f2f4f7] text-[#44474d] hover:bg-[#eceef1]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px]">edit_note</span>
                  Draft Advisory
                </button>
                <button 
                  onClick={() => setWatermark('NONE')}
                  className={`py-2 px-1 text-center text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    watermark === 'NONE'
                      ? 'bg-[#14283f] text-white shadow-xs'
                      : 'bg-[#f2f4f7] text-[#44474d] hover:bg-[#eceef1]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px]">check_circle</span>
                  None (Clean)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Advisory Asking Spread */}
        <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#001328]">Advisory Asking Spread</span>
            <span className="text-[10px] text-[#74777e]">3-Scenario Calibration</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-xl bg-[#f2f4f7] flex flex-col items-center text-center border border-[#e6e8eb]">
              <span className="text-[9px] text-[#74777e] uppercase font-bold">Competitive</span>
              <span className="text-[13px] font-bold text-[#001328] mt-0.5">S$1.59M</span>
              <span className="text-[9px] text-[#74777e]">~30 Days Exit</span>
            </div>
            <div className="p-2 rounded-xl bg-[#006874]/10 border-2 border-[#006874] flex flex-col items-center text-center">
              <span className="text-[9px] text-[#006874] font-bold uppercase">Optimal AVM</span>
              <span className="text-[13px] font-bold text-[#006874] mt-0.5">S$1.62M</span>
              <span className="text-[9px] text-[#006874] font-semibold">Equilibrium</span>
            </div>
            <div className="p-2 rounded-xl bg-[#f2f4f7] flex flex-col items-center text-center border border-[#e6e8eb]">
              <span className="text-[9px] text-[#74777e] uppercase font-bold">Premium</span>
              <span className="text-[13px] font-bold text-[#001328] mt-0.5">S$1.66M</span>
              <span className="text-[9px] text-[#74777e]">Patient Strategy</span>
            </div>
          </div>
        </div>

        {/* Section 5: Generate Final Output */}
        <div className="rounded-2xl bg-[#eceef1] p-4 shadow-sm border border-[#e0e3e6] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006874]">verified</span>
              <span className="text-[13px] font-bold text-[#001328]">Generate Final Output</span>
            </div>
            <span className="text-[10px] text-[#74777e] font-semibold">PDF · 4 Pages · 2.4 MB</span>
          </div>

          <button 
            onClick={handleDownloadPdf}
            disabled={isCompiling}
            className="w-full py-3 px-4 rounded-xl bg-[#14283f] hover:bg-[#001328] text-white text-[13px] font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span className={`material-symbols-outlined text-[18px] text-[#95f1ff] ${isCompiling ? 'animate-spin' : ''}`}>
              {isCompiling ? 'refresh' : 'picture_as_pdf'}
            </span>
            <span>{isCompiling ? 'Compiling URA Data & Graphics...' : 'Download PDF Valuation Report'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => onShowToast("WhatsApp advisory brief sent to Marcus Lim (+65 9123 4567)")}
              className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#0d592b] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[17px] text-[#25D366]">send</span>
              WhatsApp Marcus
            </button>
            <button 
              onClick={() => {
                navigator.clipboard?.writeText('https://sgpropintel.sg/r/bl1406-marcus-4829e');
                onShowToast("Secure 14-day client link copied to clipboard");
              }}
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f2f4f7] text-[#001328] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs border border-[#e6e8eb]"
            >
              <span className="material-symbols-outlined text-[17px] text-[#006874]">link</span>
              Secure 14d Link
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-0.5 text-center text-[10px] text-[#74777e]">
            <span className="material-symbols-outlined text-[12px] text-[#006874]">encrypted</span>
            End-to-end encrypted with digital SISV hash &amp; 14-day client auto-expiry
          </div>
        </div>
      </div>
    </div>
  );
};
