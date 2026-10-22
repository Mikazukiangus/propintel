import React, { useState } from 'react';
import { ScreenId } from '../types';

interface SellerStrategyScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const SellerStrategyScreen: React.FC<SellerStrategyScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [askingPrice, setAskingPrice] = useState<number>(1620000);
  const [selectedScenario, setSelectedScenario] = useState<'fast' | 'equilibrium' | 'premium'>('equilibrium');

  const LOAN_REDEMPTION = 480000;
  const CPF_PRINCIPAL = 265000;
  const CPF_ACCRUED = 80000;
  const CPF_REFUND = CPF_PRINCIPAL + CPF_ACCRUED; // 345000
  const LEGAL_FEE = 3000;
  const SQFT = 1141;

  // 2% commission + 9% GST = 2.18%
  const agentCommission = Math.round(askingPrice * 0.02 * 1.09);
  const estimatedNetCash = askingPrice - LOAN_REDEMPTION - CPF_REFUND - agentCommission - LEGAL_FEE;
  const totalLiquidCapital = estimatedNetCash + CPF_REFUND;
  const psf = Math.round(askingPrice / SQFT);

  const minNextBudget = ((totalLiquidCapital * 2.25) / 1000000).toFixed(2);
  const maxNextBudget = ((totalLiquidCapital * 2.45) / 1000000).toFixed(2);

  const handleSelectScenario = (type: 'fast' | 'equilibrium' | 'premium', price: number) => {
    setSelectedScenario(type);
    setAskingPrice(price);
    onShowToast(`Simulating ${type.toUpperCase()} scenario at S$${price.toLocaleString()}`);
  };

  const adjustPrice = (delta: number) => {
    setAskingPrice((prev) => Math.max(1000000, prev + delta));
  };

  return (
    <div className="flex flex-col w-full pb-12 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#e6e8eb] text-[#191c1e] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
              MAS &amp; CPF Stat-Engine
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eceef1] text-[#44474d] text-[10px] font-semibold">
              SISV Valuation Standard
            </span>
          </div>
          <span className="text-[10px] text-[#006874] font-bold tracking-wide flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            Live Sync
          </span>
        </div>

        <div>
          <h1 className="text-[20px] font-bold text-[#001328] tracking-tight">Selling Price Strategy</h1>
          <p className="text-[12px] text-[#44474d] mt-0.5">
            Target Pricing &amp; Net Cash Proceeds Engine · CPF Accrued Interest &amp; MAS Loan Redemption
          </p>
        </div>
      </div>

      {/* Active Property Context Card */}
      <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e6e8eb] relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#14283f] text-white">D20</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#e6e8eb] text-[#44474d] font-semibold">Executive Condo</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#e6e8eb] text-[#44474d] font-semibold">99-Yr (TOP 2003)</span>
            </div>
            <h2 className="text-[15px] font-bold text-[#001328] truncate">Bishan Loft #14-06</h2>
            <p className="text-[11px] text-[#44474d]">3-Bedder · 1,141 sqft · High Floor</p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[9px] text-[#44474d] uppercase tracking-wider block font-semibold">Current Listed</span>
            <span className="text-[16px] font-bold text-[#001328]">S$1,620,000</span>
            <span className="text-[10px] text-[#006874] font-bold block">S$1,420 psf</span>
          </div>
        </div>

        <div className="mt-2.5 pt-1.5 flex items-center justify-between bg-[#f2f4f7] px-2.5 py-1.5 rounded-lg border border-[#e6e8eb]">
          <div className="flex items-center gap-1.5 text-[#44474d]">
            <span className="material-symbols-outlined text-[15px] text-[#006874]">analytics</span>
            <span className="text-[10px]">Latest Sub-sale: #14-08 (1,141 sqft)</span>
          </div>
          <span className="text-[10px] font-bold text-[#001328]">S$1,638,000 (May 2024)</span>
        </div>
      </div>

      {/* 3-Scenario Strategic Asking Price Matrix */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-[#001328] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-[#006874]">tune</span>
            Strategic Asking Scenarios
          </h3>
          <span className="text-[10px] text-[#44474d]">Tap card to simulate</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Scenario A: Fast Exit */}
          <div 
            onClick={() => handleSelectScenario('fast', 1590000)}
            className={`cursor-pointer bg-white rounded-xl p-3.5 border transition-all ${
              selectedScenario === 'fast'
                ? 'border-[#006874] ring-2 ring-[#006874]/30 shadow-sm'
                : 'border-[#e6e8eb] hover:border-[#006874]/40 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#79d4e2]"></span>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#44474d] font-bold block">Scenario A</span>
                  <h4 className="text-[13px] font-bold text-[#001328]">Fast Exit / Competitive</h4>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[14px] font-bold text-[#001328]">S$1,590,000</span>
                <span className="text-[10px] text-[#44474d] block">S$1,393 psf</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5 bg-[#f2f4f7] p-2 rounded-lg text-[11px] border border-[#e6e8eb]">
              <div>
                <span className="text-[9px] text-[#44474d] block font-semibold">Est. Time to Sell</span>
                <span className="font-bold text-[#001328]">14 – 30 Days</span>
              </div>
              <div>
                <span className="text-[9px] text-[#44474d] block font-semibold">Active D20 Buyer Pool</span>
                <span className="font-bold text-[#005236] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span> ~82% Coverage
                </span>
              </div>
            </div>
          </div>

          {/* Scenario B: Equilibrium */}
          <div 
            onClick={() => handleSelectScenario('equilibrium', 1620000)}
            className={`cursor-pointer bg-white rounded-xl p-3.5 border relative transition-all ${
              selectedScenario === 'equilibrium'
                ? 'border-[#006874] ring-2 ring-[#006874]/50 shadow-md'
                : 'border-[#e6e8eb] hover:border-[#006874]/40 shadow-xs'
            }`}
          >
            <div className="absolute -top-2.5 right-4 bg-[#006874] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
              AI Recommended · Fair Market
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006874]"></span>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#006874] font-bold block">Scenario B · Equilibrium</span>
                  <h4 className="text-[13px] font-bold text-[#001328]">AVM Fair Equilibrium</h4>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[14px] font-bold text-[#001328]">S$1,620,000</span>
                <span className="text-[10px] text-[#44474d] block">S$1,420 psf</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5 bg-[#95f1ff]/20 p-2 rounded-lg text-[11px] border border-[#95f1ff]/40">
              <div>
                <span className="text-[9px] text-[#44474d] block font-semibold">Est. Time to Sell</span>
                <span className="font-bold text-[#001328]">30 – 60 Days</span>
              </div>
              <div>
                <span className="text-[9px] text-[#44474d] block font-semibold">Active D20 Buyer Pool</span>
                <span className="font-bold text-[#006874] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span> ~60% Coverage
                </span>
              </div>
            </div>
            <p className="text-[10px] text-[#44474d] mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#006874]">check_circle</span>
              Exact parity with 2024 Stack 06 valuation envelope
            </p>
          </div>

          {/* Scenario C: Premium */}
          <div 
            onClick={() => handleSelectScenario('premium', 1660000)}
            className={`cursor-pointer bg-white rounded-xl p-3.5 border transition-all ${
              selectedScenario === 'premium'
                ? 'border-[#006874] ring-2 ring-[#006874]/30 shadow-sm'
                : 'border-[#e6e8eb] hover:border-[#006874]/40 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4d6079]"></span>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#44474d] font-bold block">Scenario C</span>
                  <h4 className="text-[13px] font-bold text-[#001328]">Patient / Premium Target</h4>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[14px] font-bold text-[#001328]">S$1,660,000</span>
                <span className="text-[10px] text-[#44474d] block">S$1,455 psf</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5 bg-[#f2f4f7] p-2 rounded-lg text-[11px] border border-[#e6e8eb]">
              <div>
                <span className="text-[9px] text-[#44474d] block font-semibold">Est. Time to Sell</span>
                <span className="font-bold text-[#001328]">60 – 120 Days</span>
              </div>
              <div>
                <span className="text-[9px] text-[#44474d] block font-semibold">Active D20 Buyer Pool</span>
                <span className="font-bold text-[#44474d] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74777e]"></span> ~28% Coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Net Proceeds Waterfall Simulator */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#14283f] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">calculate</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#001328] leading-tight">Net Proceeds Waterfall</h3>
              <span className="text-[10px] text-[#44474d]">Statutory deductions &amp; loan payoff</span>
            </div>
          </div>
          <span className="text-[10px] text-[#006874] bg-[#95f1ff]/40 px-2 py-0.5 rounded-full font-bold">
            SGD / Real-Time
          </span>
        </div>

        {/* Interactive Gross Price Dial */}
        <div className="bg-[#f2f4f7] p-3 rounded-xl flex items-center justify-between gap-2 border border-[#e6e8eb]">
          <button 
            onClick={() => adjustPrice(-10000)}
            className="w-10 h-10 rounded-full bg-white text-[#001328] shadow-xs border border-[#e6e8eb] flex items-center justify-center active:scale-95 transition-transform hover:bg-[#eceef1]"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
          <div className="text-center flex-1">
            <span className="text-[9px] text-[#44474d] uppercase tracking-wider block font-semibold">Simulation Asking Price</span>
            <span className="text-[20px] font-bold text-[#001328]">S${askingPrice.toLocaleString()}</span>
            <span className="text-[11px] text-[#006874] block font-semibold">S${psf.toLocaleString()} psf</span>
          </div>
          <button 
            onClick={() => adjustPrice(10000)}
            className="w-10 h-10 rounded-full bg-white text-[#001328] shadow-xs border border-[#e6e8eb] flex items-center justify-center active:scale-95 transition-transform hover:bg-[#eceef1]"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>

        {/* Waterfall Steps Breakdown */}
        <div className="flex flex-col gap-2 text-[12px] pt-1">
          {/* Gross */}
          <div className="flex items-center justify-between py-1 text-[#001328] font-bold border-b border-[#f2f4f7]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#3c9f74]">add_circle</span>
              Gross Selling Price
            </span>
            <span>S${askingPrice.toLocaleString()}</span>
          </div>

          {/* Loan */}
          <div className="flex items-center justify-between py-1 text-[#44474d] border-b border-[#f2f4f7]">
            <div className="flex flex-col">
              <span className="flex items-center gap-1.5 text-[#001328] font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">remove_circle</span>
                Bank Mortgage Loan Redemption
              </span>
              <span className="text-[10px] text-[#74777e] pl-5">DBS Fixed 3M SORA Package · Outstanding</span>
            </div>
            <span className="text-[#ba1a1a] font-bold">-S${LOAN_REDEMPTION.toLocaleString()}</span>
          </div>

          {/* CPF Refund */}
          <div className="bg-[#f2f4f7] rounded-xl p-2.5 flex flex-col gap-1 border border-[#e6e8eb]">
            <div className="flex items-center justify-between text-[#001328] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">remove_circle</span>
                <span>Total CPF Refund (OA + Accrued)</span>
              </div>
              <span className="text-[#ba1a1a] font-bold">-S${CPF_REFUND.toLocaleString()}</span>
            </div>
            <div className="pl-5 flex flex-col gap-0.5 text-[10px] text-[#44474d]">
              <div className="flex justify-between">
                <span>Principal Withdrawn (DP + Monthly):</span>
                <span>S${CPF_PRINCIPAL.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Accrued Interest (2.5% p.a. Compounded):</span>
                <span className="font-bold text-[#001328]">S${CPF_ACCRUED.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Agent Commission */}
          <div className="flex items-center justify-between py-1 text-[#44474d] border-b border-[#f2f4f7]">
            <div className="flex flex-col">
              <span className="flex items-center gap-1.5 text-[#001328] font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">remove_circle</span>
                Agent Commission
              </span>
              <span className="text-[10px] text-[#74777e] pl-5">2.0% + 9% prevailing GST</span>
            </div>
            <span className="text-[#ba1a1a] font-bold">-S${agentCommission.toLocaleString()}</span>
          </div>

          {/* Legal */}
          <div className="flex items-center justify-between py-1 text-[#44474d] border-b border-[#f2f4f7]">
            <div className="flex flex-col">
              <span className="flex items-center gap-1.5 text-[#001328] font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">remove_circle</span>
                Legal Conveyancing &amp; Discharge
              </span>
              <span className="text-[10px] text-[#74777e] pl-5">CPF Board &amp; Bank Caveat Discharge Fee</span>
            </div>
            <span className="text-[#ba1a1a] font-bold">-S${LEGAL_FEE.toLocaleString()}</span>
          </div>

          {/* SSD Exempt */}
          <div className="flex items-center justify-between py-1 text-[#44474d]">
            <div className="flex flex-col">
              <span className="flex items-center gap-1.5 text-[#001328] font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#006874]">check_circle</span>
                Seller's Stamp Duty (SSD)
              </span>
              <span className="text-[10px] text-[#006874] pl-5">Held &gt; 3 Years · Statutorily Exempt (0%)</span>
            </div>
            <span className="text-[#001328] font-bold">S$0</span>
          </div>
        </div>

        {/* High-Impact Highlighted Result Box */}
        <div className="bg-[#001328] text-white rounded-xl p-4 shadow-md flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#006874] opacity-25 blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[10px] text-[#95f1ff] uppercase tracking-wider font-bold">
                Estimated Net Proceeds
              </span>
              <h4 className="text-[26px] font-bold text-white tracking-tight mt-0.5">
                S${estimatedNetCash.toLocaleString()}
              </h4>
              <span className="text-[10px] text-[#d2e4ff] block mt-0.5">
                Liquid cash wire transferred to seller account
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#006874]/40 flex items-center justify-center text-[#95f1ff]">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
          </div>

          <div className="h-px w-full bg-white/10 my-1"></div>

          <div className="grid grid-cols-2 gap-2 text-[11px] relative z-10">
            <div>
              <span className="text-[9px] text-[#b4c8e6] block">Total CPF Returned to OA</span>
              <span className="font-bold text-white text-[15px]">S${CPF_REFUND.toLocaleString()}</span>
              <span className="text-[9px] text-[#78d9aa] block">Earns 2.5% · Ready for next home</span>
            </div>
            <div>
              <span className="text-[9px] text-[#b4c8e6] block">Total Liquid Capital</span>
              <span className="font-bold text-[#95f1ff] text-[15px]">S${totalLiquidCapital.toLocaleString()}</span>
              <span className="text-[9px] text-[#b4c8e6] block">Cash + CPF for downpayment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrader Reinvestment Envelope (Next Home Budget Preview) */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#e6e8eb] text-[#001328] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#001328] leading-tight">Next Home Budget Capacity</h3>
            <span className="text-[10px] text-[#44474d]">Capital Deployment · 55% TDSR Ratio</span>
          </div>
        </div>

        <div className="bg-[#f2f4f7] rounded-xl p-3 flex flex-col gap-2 border border-[#e6e8eb]">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-[#44474d]">Estimated Next Purchase Budget:</span>
            <span className="text-[15px] font-bold text-[#001328]">
              S${minNextBudget}M – S${maxNextBudget}M
            </span>
          </div>

          {/* Segmented bar */}
          <div className="w-full bg-[#e0e3e6] h-3 rounded-full overflow-hidden flex">
            <div className="bg-[#006874] h-full" style={{ width: '42%' }}></div>
            <div className="bg-[#14283f] h-full" style={{ width: '58%' }}></div>
          </div>

          <div className="flex justify-between items-center text-[10px] pt-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006874]"></span>
              <span className="text-[#44474d]">Downpayment (S${(totalLiquidCapital / 1000000).toFixed(2)}M)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#14283f]"></span>
              <span className="text-[#44474d]">New Bank Loan (75% LTV)</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('affordability-tdsr')}
          className="w-full py-2.5 px-3 rounded-xl bg-[#e6e8eb] hover:bg-[#e0e3e6] text-[#001328] text-[12px] font-bold transition-colors flex items-center justify-center gap-1.5 active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[17px] text-[#006874]">trending_up</span>
          Simulate Next Home Affordability &amp; TDSR
        </button>
      </div>

      {/* Action Buttons & Export Suite */}
      <div className="flex flex-col gap-2 pt-1">
        <button 
          onClick={() => onShowToast(`Official Asking Price saved to S$${askingPrice.toLocaleString()}`)}
          className="w-full py-3 px-4 rounded-xl bg-[#001328] hover:bg-[#14283f] text-white text-[13px] font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[19px] text-[#95f1ff]">bookmark_add</span>
          Set Official Asking Price (S${askingPrice.toLocaleString()})
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onShowToast("Generating official MAS Seller Net Sheet PDF...")}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f2f4f7] text-[#001328] text-[12px] font-bold shadow-xs border border-[#e6e8eb] transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006874]">picture_as_pdf</span>
            Export Net Sheet
          </button>
          <button 
            onClick={() => onShowToast("Strategy summary formatted & ready for WhatsApp dispatch")}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f2f4f7] text-[#001328] text-[12px] font-bold shadow-xs border border-[#e6e8eb] transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006874]">send_and_archive</span>
            Share with Agent
          </button>
        </div>
      </div>

      {/* Statutory & Advisory Notice Footer */}
      <div className="p-3 rounded-xl bg-[#f2f4f7] text-[#44474d] text-[10px] flex flex-col gap-1 border border-[#e6e8eb]">
        <div className="flex items-center gap-1 font-bold text-[#001328]">
          <span className="material-symbols-outlined text-[14px] text-[#006874]">info</span>
          Statutory &amp; Advisory Notice
        </div>
        <p className="leading-relaxed">
          Calculations adhere to CPF Board Section 15(10) housing refund requirements. Accrued interest is computed at the prevailing 2.50% Ordinary Account statutory rate compounded annually. Bank loan redemption is subject to formal notice of redemption (typically 3 months) to DBS Bank. Actual conveyancing legal fees may vary depending on appointed law firm and title search requirements.
        </p>
      </div>
    </div>
  );
};
