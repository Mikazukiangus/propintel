import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface MortgageRatesScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const MortgageRatesScreen: React.FC<MortgageRatesScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'floating' | 'fixed' | 'green'>('all');
  const [simType, setSimType] = useState<'new' | 'refinance'>('new');
  const [selectedPackage, setSelectedPackage] = useState<string>('dbs-green');

  return (
    <div className="flex flex-col w-full pb-12 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Context & Scenario Header */}
      <section className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f2f4f7] text-[#14283f] text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
            MAS Notice 632 Compliant
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95f1ff]/30 text-[#006f7b] text-[10px] font-bold">
            <span className="material-symbols-outlined text-[12px]">verified</span>
            Verified Bank Packages Q1 2025
          </span>
        </div>

        <div className="flex items-start justify-between gap-2 pt-0.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[18px] font-bold text-[#001328] truncate">Bishan Loft #14-06</h1>
              <span className="px-1.5 py-0.2 rounded bg-[#e6e8eb] text-[#44474d] text-[10px] font-bold">D20</span>
            </div>
            <p className="text-[11px] text-[#44474d] flex items-center gap-1 mt-0.5">
              <span>Executive Condominium</span>
              <span>•</span>
              <span className="text-[#006874] font-bold">99-yr (TOP 2003)</span>
            </p>
          </div>

          <button 
            onClick={() => onNavigate('property-detail')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[11px] font-bold transition-all border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>Edit</span>
          </button>
        </div>

        {/* Metrics Ribbon */}
        <div className="grid grid-cols-3 gap-2 p-2 bg-[#f2f4f7] rounded-lg border border-[#e6e8eb] text-[11px]">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#74777e]">Purchase Price</span>
            <span className="font-bold text-[#001328] text-[14px] mt-0.5">S$1.62M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#74777e]">Loan (75% LTV)</span>
            <span className="font-bold text-[#006874] text-[14px] mt-0.5">S$1.215M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#74777e]">Tenure / Fix</span>
            <span className="font-bold text-[#001328] text-[14px] mt-0.5">25 Yrs</span>
          </div>
        </div>
      </section>

      {/* Live SORA Benchmark Radar */}
      <section className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#006874]/10 flex items-center justify-center text-[#006874]">
              <span className="material-symbols-outlined text-[16px]">show_chart</span>
            </div>
            <div>
              <span className="text-[9px] text-[#44474d] uppercase tracking-wider block font-bold">Statutory Reference</span>
              <span className="text-[14px] font-bold text-[#001328]">3-Month Compounded SORA</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[18px] font-bold text-[#001328]">3.05%</div>
            <span className="text-[10px] text-[#005236] flex items-center justify-end font-bold">
              <span className="material-symbols-outlined text-[12px]">trending_down</span> -12 bps QoQ
            </span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="bg-[#f2f4f7] rounded-lg p-2.5 flex flex-col gap-1 border border-[#e6e8eb]">
          <div className="flex items-center justify-between text-[10px] text-[#44474d]">
            <span>Q1 '24 (3.72%)</span>
            <span className="text-[#006874] font-bold">Fed Pivot Curve</span>
            <span>Target Q4 '25 (2.75%)</span>
          </div>

          <div className="w-full h-8 flex items-center">
            <svg className="w-full h-8" fill="none" preserveAspectRatio="none" viewBox="0 0 300 36">
              <path d="M0,8 Q50,11 100,16 T200,24 T300,31" stroke="#006874" strokeLinecap="round" strokeWidth="2.5"></path>
              <circle cx="20" cy="9" fill="#14283F" r="3"></circle>
              <circle cx="150" cy="20" fill="#006874" r="3"></circle>
              <circle cx="280" cy="30" fill="#3c9f74" r="4" stroke="#ffffff" strokeWidth="2"></circle>
            </svg>
          </div>

          <p className="text-[10px] text-[#44474d] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#006874]">info</span>
            <span>Forecast projection: <strong>2.75% expected by Q4 2025</strong> via US Fed rate cuts.</span>
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <button 
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              filterTab === 'all' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            All Packages (14)
          </button>
          <button 
            onClick={() => setFilterTab('floating')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              filterTab === 'floating' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            Floating (SORA)
          </button>
          <button 
            onClick={() => setFilterTab('fixed')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              filterTab === 'fixed' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            Fixed (1-3 Yrs)
          </button>
          <button 
            onClick={() => setFilterTab('green')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              filterTab === 'green' ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            Green / Eco
          </button>
        </div>
      </section>

      {/* Top Recommended Mortgage Packages */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#001328]">Top Verified Packages</h2>
            <p className="text-[11px] text-[#44474d]">Ranked by lowest 3-year net borrowing cost</p>
          </div>
          <span className="text-[10px] text-[#006874] font-bold">14 Live Offers</span>
        </div>

        {/* PACKAGE 1: DBS Green Home 2-Yr Fixed */}
        <article 
          onClick={() => setSelectedPackage('dbs-green')}
          className={`bg-white rounded-xl p-4 shadow-xs border transition-all flex flex-col gap-2.5 relative overflow-hidden cursor-pointer ${
            selectedPackage === 'dbs-green' ? 'border-[#006874] ring-2 ring-[#006874]/30 shadow-sm' : 'border-[#e6e8eb]'
          }`}
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-[#006874]"></div>

          <div className="flex items-start justify-between gap-2 pt-1">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#94f6c4] text-[#002113] text-[9px] font-bold">
                  Best Value
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#006874]/10 text-[#006874] text-[9px] font-bold">
                  Green Building BCA Gold
                </span>
              </div>
              <h3 className="text-[14px] font-bold text-[#001328] mt-1">DBS Green Home 2-Yr Fixed</h3>
              <span className="text-[11px] text-[#44474d]">DBS Bank Ltd • BCA Certified Condos</span>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#f2f4f7] flex items-center justify-center p-1.5 border border-[#e6e8eb]">
              <span className="text-[13px] font-bold text-[#ba1a1a]">DBS</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f2f4f7] rounded-lg border border-[#e6e8eb]">
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">Rate Structure</span>
              <div className="text-[15px] font-bold text-[#001328]">2.85% p.a.</div>
              <span className="text-[10px] text-[#44474d]">Fixed Yr 1-2 • SORA+0.65% after</span>
            </div>
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">Est. Monthly Instalment</span>
              <div className="text-[15px] font-bold text-[#006874]">S$5,666 <span className="text-[10px] text-[#44474d] font-normal">/mo</span></div>
              <span className="text-[9px] text-[#005236] font-bold">Saves S$192/mo vs 3.15%</span>
            </div>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#001328]">
              <span className="material-symbols-outlined text-[15px] text-[#005236]">check_circle</span>
              <span><strong>S$2,500</strong> Legal Subsidy + <strong>S$300</strong> Green Reno Rebate</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#001328]">
              <span className="material-symbols-outlined text-[15px] text-[#005236]">check_circle</span>
              <span>Zero Valuation Fee + 1x Free Conversion if SORA drops &gt;50bps</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#44474d]">
              <span className="material-symbols-outlined text-[15px] text-[#006874]">lock</span>
              <span>2-Year Lock-in Period • Free repricing window at Month 22</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowToast("Amortisation schedule prepared for DBS Green Home");
              }}
              className="py-2 px-3 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[11px] font-bold transition-all border border-[#e6e8eb]"
            >
              Schedule Table
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowToast("DBS Green Home 2-Yr Fixed selected for bank quote!");
              }}
              className="py-2 px-3 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white text-[11px] font-bold transition-all shadow-xs"
            >
              Select for Quotation
            </button>
          </div>
        </article>

        {/* PACKAGE 2: OCBC 3M SORA Floating */}
        <article 
          onClick={() => setSelectedPackage('ocbc-sora')}
          className={`bg-white rounded-xl p-4 shadow-xs border transition-all flex flex-col gap-2.5 cursor-pointer ${
            selectedPackage === 'ocbc-sora' ? 'border-[#006874] ring-2 ring-[#006874]/30 shadow-sm' : 'border-[#e6e8eb]'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#95f1ff] text-[#001f24] text-[9px] font-bold">
                  Lowest SORA Margin
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[9px] font-semibold">
                  Rate-Cut Upside
                </span>
              </div>
              <h3 className="text-[14px] font-bold text-[#001328] mt-1">OCBC 3M SORA (Cap Shield)</h3>
              <span className="text-[11px] text-[#44474d]">OCBC Bank • Floating With Safety Net</span>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#f2f4f7] flex items-center justify-center p-1.5 border border-[#e6e8eb]">
              <span className="text-[13px] font-bold text-[#ba1a1a]">OCBC</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f2f4f7] rounded-lg border border-[#e6e8eb]">
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">Rate Calculation</span>
              <div className="text-[15px] font-bold text-[#001328]">3M SORA + 0.50%</div>
              <span className="text-[10px] text-[#44474d]">Effective 3.55% (Cap at 3.65%)</span>
            </div>
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">Est. Monthly Instalment</span>
              <div className="text-[15px] font-bold text-[#006874]">S$5,788 <span className="text-[10px] text-[#44474d] font-normal">/mo</span></div>
              <span className="text-[9px] text-[#44474d]">Shield Active 24 Mo</span>
            </div>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#001328]">
              <span className="material-symbols-outlined text-[15px] text-[#005236]">shield</span>
              <span><strong>Rate Cap at 3.65%</strong> protects against any unexpected geopolitical spike</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#001328]">
              <span className="material-symbols-outlined text-[15px] text-[#005236]">check_circle</span>
              <span><strong>S$2,200</strong> Cash Rebate + Fire Insurance Premium Waiver</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowToast("Schedule ready for OCBC 3M SORA");
              }}
              className="py-2 px-3 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[11px] font-bold transition-all border border-[#e6e8eb]"
            >
              Schedule Table
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowToast("OCBC 3M SORA Cap Shield selected!");
              }}
              className="py-2 px-3 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white text-[11px] font-bold transition-all shadow-xs"
            >
              Select for Quotation
            </button>
          </div>
        </article>

        {/* PACKAGE 3: UOB Fixed */}
        <article 
          onClick={() => setSelectedPackage('uob-fixed')}
          className={`bg-white rounded-xl p-4 shadow-xs border transition-all flex flex-col gap-2.5 cursor-pointer ${
            selectedPackage === 'uob-fixed' ? 'border-[#006874] ring-2 ring-[#006874]/30 shadow-sm' : 'border-[#e6e8eb]'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#e6e8eb] text-[#001328] text-[9px] font-bold">
                  Max Predictability
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[9px]">
                  36-Month Lock
                </span>
              </div>
              <h3 className="text-[14px] font-bold text-[#001328] mt-1">UOB 3-Yr Fixed Peace-of-Mind</h3>
              <span className="text-[11px] text-[#44474d]">United Overseas Bank</span>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#f2f4f7] flex items-center justify-center p-1.5 border border-[#e6e8eb]">
              <span className="text-[13px] font-bold text-[#001328]">UOB</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f2f4f7] rounded-lg border border-[#e6e8eb]">
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">Guaranteed Rate</span>
              <div className="text-[15px] font-bold text-[#001328]">2.90% p.a.</div>
              <span className="text-[10px] text-[#44474d]">Locked flat for 36 months</span>
            </div>
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">Est. Monthly Instalment</span>
              <div className="text-[15px] font-bold text-[#006874]">S$5,698 <span className="text-[10px] text-[#44474d] font-normal">/mo</span></div>
              <span className="text-[9px] text-[#44474d]">Zero rate volatility</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowToast("Schedule ready for UOB 3-Yr Fixed");
              }}
              className="py-2 px-3 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] text-[11px] font-bold transition-all border border-[#e6e8eb]"
            >
              Schedule Table
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowToast("UOB 3-Yr Fixed selected!");
              }}
              className="py-2 px-3 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white text-[11px] font-bold transition-all shadow-xs"
            >
              Select for Quotation
            </button>
          </div>
        </article>
      </section>

      {/* 3-Year Cost Simulation */}
      <section className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-[#001328]">3-Year Cost Simulation</h2>
            <p className="text-[11px] text-[#44474d]">Cumulative interest comparison for S$1.215M</p>
          </div>
          <div className="p-0.5 rounded-lg bg-[#f2f4f7] flex items-center gap-1 border border-[#e6e8eb]">
            <button 
              onClick={() => setSimType('new')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                simType === 'new' ? 'bg-white text-[#001328] shadow-xs' : 'text-[#44474d]'
              }`}
            >
              New Buy
            </button>
            <button 
              onClick={() => setSimType('refinance')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                simType === 'refinance' ? 'bg-white text-[#001328] shadow-xs' : 'text-[#44474d]'
              }`}
            >
              Refinance
            </button>
          </div>
        </div>

        {/* Comparative Bars */}
        <div className="flex flex-col gap-2.5 pt-1 text-[11px]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[#001328] font-bold flex items-center gap-1">
                <span>DBS 2-Yr Fixed (2.85%)</span>
                <span className="text-[#005236] font-semibold text-[10px]">[Lowest Net]</span>
              </span>
              <span className="text-[#001328] font-bold">S$98,420</span>
            </div>
            <div className="w-full h-3 bg-[#f2f4f7] rounded-full overflow-hidden flex">
              <div className="bg-[#006874] h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[#191c1e]">3M SORA Floating (Est. 3.05%)</span>
              <span className="text-[#191c1e] font-semibold">S$105,800</span>
            </div>
            <div className="w-full h-3 bg-[#f2f4f7] rounded-full overflow-hidden flex">
              <div className="bg-[#4d6079] h-full rounded-full" style={{ width: '81%' }}></div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[#74777e]">Standard Bank Board Rate (3.75%)</span>
              <span className="text-[#ba1a1a] font-bold">S$131,200</span>
            </div>
            <div className="w-full h-3 bg-[#f2f4f7] rounded-full overflow-hidden flex">
              <div className="bg-[#ba1a1a]/70 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Value Callout */}
        <div className="p-3 rounded-lg bg-[#f2f4f7] flex items-start gap-2 border border-[#e6e8eb]">
          <span className="material-symbols-outlined text-[20px] text-[#005236]">savings</span>
          <div className="flex-1">
            <span className="text-[12px] font-bold text-[#001328] block">Estimated Savings: S$7,380</span>
            <span className="text-[11px] text-[#44474d]">
              Locking DBS 2-Yr Fixed saves ~S$7,380 in interest over 36 months compared to baseline floating.
            </span>
          </div>
        </div>
      </section>

      {/* Broker Marketplace */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#001328]">Broker Marketplace</h2>
            <p className="text-[11px] text-[#44474d]">Independent advisors negotiate package waivers directly.</p>
          </div>
          <span className="text-[10px] text-[#005236] font-bold bg-[#94f6c4]/40 px-2 py-0.5 rounded-full">
            100% Free Service
          </span>
        </div>

        {/* Broker 1: Desmond Ng */}
        <article className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5">
          <div className="flex items-start gap-3">
            <img 
              alt="Desmond Ng broker" 
              className="w-12 h-12 rounded-full object-cover shadow-xs shrink-0 ring-1 ring-[#006874]/30" 
              src={ASSETS.desmondBroker} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#001328] truncate">Desmond Ng</h3>
                <span className="flex items-center text-[11px] font-bold text-[#001328]">
                  <span className="material-symbols-outlined text-[13px] text-[#e0a41d]">star</span> 4.96 (184)
                </span>
              </div>
              <span className="text-[11px] text-[#006874] font-bold block">Senior Principal Mortgage Advisor</span>
              <span className="text-[10px] text-[#74777e]">Redbrick Mortgage Advisory • 12 Yrs Exp</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[9px] font-semibold">
              S$420M Disbursed
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[9px] font-semibold">
              Decoupling Specialist
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[9px] font-semibold">
              EC Bridging
            </span>
          </div>

          <p className="text-[11px] text-[#44474d]">
            Specializes in Executive Condominium staging, decoupling strategies, and negotiating waiver of clawback legal fees.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={() => onShowToast("Connecting to WhatsApp: Desmond Ng (Redbrick Advisory)")}
              className="py-2 px-3 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075E54] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp</span>
            </button>
            <button 
              onClick={() => onShowToast("Proposal requested from Desmond Ng. Expect turnaround in 2h.")}
              className="py-2 px-3 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white text-[11px] font-bold text-center shadow-xs transition-all"
            >
              Request Proposal
            </button>
          </div>
        </article>

        {/* Broker 2: Serene Goh */}
        <article className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5">
          <div className="flex items-start gap-3">
            <img 
              alt="Serene Goh broker" 
              className="w-12 h-12 rounded-full object-cover shadow-xs shrink-0 ring-1 ring-[#006874]/30" 
              src={ASSETS.sereneBroker} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#001328] truncate">Serene Goh</h3>
                <span className="flex items-center text-[11px] font-bold text-[#001328]">
                  <span className="material-symbols-outlined text-[13px] text-[#e0a41d]">star</span> 4.90 (112)
                </span>
              </div>
              <span className="text-[11px] text-[#006874] font-bold block">VP, Mortgage Solutions</span>
              <span className="text-[10px] text-[#74777e]">MoneySmart • Ex-DBS Credit Underwriter</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[9px] font-semibold">
              S$290M Portfolio
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[9px] font-semibold">
              TDSR Structuring
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={() => onShowToast("Connecting to WhatsApp: Serene Goh")}
              className="py-2 px-3 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075E54] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp</span>
            </button>
            <button 
              onClick={() => onShowToast("Proposal requested from Serene Goh.")}
              className="py-2 px-3 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white text-[11px] font-bold text-center shadow-xs transition-all"
            >
              Request Proposal
            </button>
          </div>
        </article>
      </section>

      {/* Fast-Track Singpass IPA */}
      <section className="bg-gradient-to-br from-[#14283f] to-[#001328] rounded-2xl p-4 text-white shadow-md flex flex-col gap-2.5 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#95f1ff] text-[#001f24] flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#95f1ff] font-bold">Singpass Fast-Track</span>
        </div>

        <div>
          <h2 className="text-[16px] font-bold">Multi-Bank IPA in 24–48 Hours</h2>
          <p className="text-[11px] text-[#eceef1] mt-0.5">
            Apply once via Singpass MyInfo. Concurrently secure In-Principle Approvals from <strong>DBS, OCBC, UOB, HSBC &amp; SCB</strong> with zero hit to your credit score before property option issuance.
          </p>
        </div>

        <div className="flex items-center justify-between py-2 px-3 bg-white/10 backdrop-blur-md rounded-lg text-[11px] font-semibold text-[#f7f9fc]">
          <span>DBS</span>
          <span className="opacity-40">•</span>
          <span>OCBC</span>
          <span className="opacity-40">•</span>
          <span>UOB</span>
          <span className="opacity-40">•</span>
          <span>HSBC</span>
          <span className="opacity-40">•</span>
          <span>StanChart</span>
        </div>

        <button 
          onClick={() => onShowToast("Opening Singpass MyInfo for Multi-Bank pre-approval...")}
          className="w-full py-2.5 px-4 rounded-xl bg-[#006874] hover:bg-[#005236] text-white text-[12px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[17px]">fingerprint</span>
          <span>Retrieve Singpass &amp; Apply Multi-IPA</span>
        </button>

        <span className="text-[9px] text-[#7c8fab] text-center block">
          Compliant with MAS Guidelines on Credit Assessment &amp; PDPA Singapore.
        </span>
      </section>
    </div>
  );
};
