import React, { useState } from 'react';
import { ScreenId } from '../types';

interface RentalInvestmentScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const RentalInvestmentScreen: React.FC<RentalInvestmentScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [calcTab, setCalcTab] = useState<'acq' | 'ops'>('acq');
  const [purchasePrice, setPurchasePrice] = useState<number>(1620000);
  const [ltv, setLtv] = useState<number>(75);
  const [interestRate, setInterestRate] = useState<number>(3.15);
  const [isStressActive, setIsStressActive] = useState<boolean>(false);
  const [loanTenure, setLoanTenure] = useState<number>(25);
  const [absdType, setAbsdType] = useState<'sc1' | 'sc2' | 'foreign'>('sc1');
  const [monthlyRent, setMonthlyRent] = useState<number>(4900);

  // Dynamic calculations
  const loanAmount = Math.round(purchasePrice * (ltv / 100));
  const effectiveRate = isStressActive ? 4.00 : interestRate;
  
  // Amortization calculation
  const monthlyRate = effectiveRate / 100 / 12;
  const numPayments = loanTenure * 12;
  const monthlyMortgage = Math.round(
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  );

  const grossAnnualRent = monthlyRent * 12;
  const vacancyLoss = monthlyRent * 1;
  const egi = grossAnnualRent - vacancyLoss;
  const operatingExpenses = 3720 + 4680 + (monthlyRent * 0.5) + (120 * 12);
  const noi = Math.round(egi - operatingExpenses);
  const annualDebtService = monthlyMortgage * 12;
  const annualNetCashFlow = noi - annualDebtService;
  const monthlyNetCashFlow = Math.round(annualNetCashFlow / 12);
  const breakEvenRent = Math.round((annualDebtService + operatingExpenses + vacancyLoss) / 12);

  const grossYield = ((grossAnnualRent / purchasePrice) * 100).toFixed(2);
  const netOperatingYield = ((noi / purchasePrice) * 100).toFixed(2);
  const equityDeployed = (purchasePrice - loanAmount) + 49400; // downpayment + BSD
  const cashOnCash = ((annualNetCashFlow / equityDeployed) * 100).toFixed(2);

  const handleAdjustPrice = (delta: number) => {
    setPurchasePrice((prev) => Math.max(500000, prev + delta));
  };

  const toggleStress = () => {
    const next = !isStressActive;
    setIsStressActive(next);
    onShowToast(next ? "MAS 4.00% TDSR Stress floor enabled" : "Returned to 3.15% SORA baseline");
  };

  return (
    <div className="flex flex-col w-full pb-12 pt-1">
      {/* Property Anchor Bar & Header Block */}
      <div className="px-4 pt-2 pb-2 flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-[#e6e8eb] text-[#14283f] text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006874] inline-block"></span>
          <span>URA &amp; SLA Validated Registry</span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-[20px] font-bold text-[#001328] tracking-tight">Rental &amp; Investment Analysis</h1>
          <p className="text-[12px] text-[#44474d]">Institutional Net Yield, IRR &amp; Cash Flow Simulator</p>
        </div>

        {/* Active Property Context Card */}
        <div className="mt-1 p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#006874]/10 flex items-center justify-center text-[#006874] shrink-0">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-[#001328] truncate">Bishan Loft #14-06</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#eceef1] text-[#44474d] text-[10px] font-bold">D20</span>
              </div>
              <span className="text-[11px] text-[#44474d] truncate">
                3-Bed EC · 1,141 sqft · S${purchasePrice.toLocaleString()} (S${Math.round(purchasePrice / 1141)} psf)
              </span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('property-detail')}
            aria-label="Switch Property" 
            className="shrink-0 p-1.5 text-[#006874] hover:text-[#001328] transition-colors"
            title="View Listing"
          >
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
          </button>
        </div>
      </div>

      {/* Primary Metric Hero Panel (Dark Mode Financial Dashboard Card) */}
      <div className="px-4 py-1">
        <div className="relative overflow-hidden rounded-2xl bg-[#14283f] text-white p-4 shadow-md">
          {/* Ambient Graphic Glow */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#006874]/30 blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between pb-2 border-b border-[#7c8fab]/20">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#95f1ff] text-[18px]">query_stats</span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#95f1ff]">Live Underwriting Model</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#002e1c] text-[#3c9f74] text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#95f1ff]"></span>
              {monthlyNetCashFlow >= 0 ? 'Positive Carry' : 'Negative Drag'}
            </span>
          </div>

          {/* 2x2 Metric Grid */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#7c8fab] font-semibold">Gross Rental Yield</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[24px] text-white font-bold">{grossYield}%</span>
                <span className="text-[10px] text-[#7c8fab]">p.a.</span>
              </div>
              <span className="text-[11px] text-[#95f1ff] mt-0.5">S${monthlyRent.toLocaleString()} / mo</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-[#7c8fab] font-semibold">Net Operating Yield (NOY)</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[24px] text-[#95f1ff] font-bold">{netOperatingYield}%</span>
                <span className="text-[10px] text-[#7c8fab]">p.a.</span>
              </div>
              <span className="text-[11px] text-[#7c8fab] mt-0.5">Net of tax &amp; MCST</span>
            </div>

            <div className="flex flex-col pt-1">
              <span className="text-[10px] text-[#7c8fab] font-semibold">Net Cash Flow (P+I)</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-[19px] font-bold ${monthlyNetCashFlow >= 0 ? 'text-[#94f6c4]' : 'text-[#ffdad6]'}`}>
                  {monthlyNetCashFlow >= 0 ? `+S$${monthlyNetCashFlow.toLocaleString()}` : `-S$${Math.abs(monthlyNetCashFlow).toLocaleString()}`}
                </span>
                <span className="text-[10px] text-[#7c8fab]">/ mo</span>
              </div>
              <span className="text-[10px] text-[#7c8fab] mt-0.5">
                {annualNetCashFlow >= 0 ? `+S$${annualNetCashFlow.toLocaleString()} / yr` : `-S$${Math.abs(annualNetCashFlow).toLocaleString()} / yr`}
              </span>
            </div>

            <div className="flex flex-col pt-1">
              <span className="text-[10px] text-[#7c8fab] font-semibold">Cash-on-Cash Return</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[19px] text-[#95f1ff] font-bold">{cashOnCash}%</span>
                <span className="text-[10px] text-[#7c8fab]">p.a.</span>
              </div>
              <span className="text-[10px] text-[#7c8fab] mt-0.5">Equity S${equityDeployed.toLocaleString()}</span>
            </div>
          </div>

          {/* Sparkline Indicator */}
          <div className="mt-3 pt-2 border-t border-[#7c8fab]/20 flex items-center justify-between text-[#7c8fab]">
            <span className="text-[10px]">5-Yr Target IRR (Unlevered / Levered)</span>
            <span className="text-[11px] text-white font-bold">5.12% / 9.84%</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Tabs */}
      <div className="px-4 mt-2">
        <div className="flex items-center p-1 rounded-xl bg-[#eceef1] border border-[#e6e8eb]">
          <button 
            onClick={() => setCalcTab('acq')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-center text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              calcTab === 'acq'
                ? 'bg-white text-[#001328] shadow-xs'
                : 'text-[#44474d] hover:text-[#001328]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">real_estate_agent</span>
            Acquisition &amp; Loan
          </button>
          <button 
            onClick={() => setCalcTab('ops')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-center text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              calcTab === 'ops'
                ? 'bg-white text-[#001328] shadow-xs'
                : 'text-[#44474d] hover:text-[#001328]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            Rental &amp; Expenses
          </button>
        </div>
      </div>

      {/* Input Forms Container */}
      <div className="px-4 mt-2">
        {calcTab === 'acq' ? (
          /* Panel 1: Acquisition Inputs */
          <div className="p-4 rounded-xl bg-white border border-[#e6e8eb] shadow-xs flex flex-col gap-3.5">
            {/* Purchase Price Input */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-[#44474d]">Purchase Price (S$)</label>
                <span className="text-[10px] text-[#006874] font-semibold">Bishan Loft Valuation: S$1.62M</span>
              </div>
              <div className="flex items-center rounded-lg bg-[#f2f4f7] px-3 py-1.5 border border-[#e6e8eb]">
                <span className="text-[13px] text-[#44474d] font-bold mr-1">S$</span>
                <input 
                  type="number"
                  step="10000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full bg-transparent text-[18px] font-bold text-[#001328] outline-none"
                />
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button 
                    onClick={() => handleAdjustPrice(-20000)}
                    className="w-7 h-7 rounded bg-[#e6e8eb] hover:bg-[#d8dadd] flex items-center justify-center text-[#001328] active:scale-95 text-[11px] font-bold"
                  >
                    -20k
                  </button>
                  <button 
                    onClick={() => handleAdjustPrice(20000)}
                    className="w-7 h-7 rounded bg-[#e6e8eb] hover:bg-[#d8dadd] flex items-center justify-center text-[#001328] active:scale-95 text-[11px] font-bold"
                  >
                    +20k
                  </button>
                </div>
              </div>
            </div>

            {/* LTV Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-[#44474d]">Loan-to-Value (LTV)</span>
                <span className="text-[12px] text-[#001328] font-bold">
                  {ltv}% · S${loanAmount.toLocaleString()}
                </span>
              </div>
              <input 
                type="range"
                min="40"
                max="75"
                step="5"
                value={ltv}
                onChange={(e) => setLtv(Number(e.target.value))}
                className="w-full accent-[#006874] h-1.5 bg-[#eceef1] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#74777e]">
                <span>40% (Min Debt)</span>
                <span>55%</span>
                <span>75% (MAS Max Limit)</span>
              </div>
            </div>

            {/* Interest Rate & Loan Tenure */}
            <div className="grid grid-cols-2 gap-2.5 pt-0.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#44474d]">Mortgage Rate (SORA)</label>
                <div className="flex items-center rounded-lg bg-[#f2f4f7] px-3 py-2 border border-[#e6e8eb]">
                  <input 
                    type="number"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-transparent text-[14px] font-bold text-[#001328] outline-none"
                  />
                  <span className="text-[10px] text-[#44474d] ml-1 shrink-0">% p.a.</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#44474d]">Loan Tenure</label>
                <div className="flex items-center rounded-lg bg-[#f2f4f7] px-3 py-2 border border-[#e6e8eb]">
                  <select 
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full bg-transparent text-[14px] font-bold text-[#001328] outline-none"
                  >
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* MAS Stress Switcher */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f4f7] border border-[#e6e8eb]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006874]">tune</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#001328]">MAS TDSR Stress Benchmark (4.00%)</span>
                  <span className="text-[10px] text-[#44474d]">Simulate monthly resilience at regulatory floor</span>
                </div>
              </div>
              <button 
                onClick={toggleStress}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors relative ${
                  isStressActive ? 'bg-[#006874]' : 'bg-[#e0e3e6]'
                }`}
              >
                <span className={`block w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  isStressActive ? 'translate-x-5' : 'translate-x-0'
                }`}></span>
              </button>
            </div>

            {/* ABSD Profile Quick Buttons */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-[#44474d]">Buyer Stamp Duty &amp; ABSD Liability</span>
                <span className="text-[10px] text-[#001328] font-bold">Tiered BSD: S$49,400</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button 
                  onClick={() => setAbsdType('sc1')}
                  className={`py-2 px-1 rounded-lg text-[10px] font-semibold text-center transition-all ${
                    absdType === 'sc1'
                      ? 'bg-[#14283f] text-white shadow-xs'
                      : 'bg-[#f2f4f7] text-[#191c1e] hover:bg-[#eceef1]'
                  }`}
                >
                  SC 1st Property<br /><span className="font-bold">0% ABSD</span>
                </button>
                <button 
                  onClick={() => setAbsdType('sc2')}
                  className={`py-2 px-1 rounded-lg text-[10px] font-semibold text-center transition-all ${
                    absdType === 'sc2'
                      ? 'bg-[#14283f] text-white shadow-xs'
                      : 'bg-[#f2f4f7] text-[#191c1e] hover:bg-[#eceef1]'
                  }`}
                >
                  SC 2nd Property<br /><span className="text-[#006874] font-bold">20% ABSD</span>
                </button>
                <button 
                  onClick={() => setAbsdType('foreign')}
                  className={`py-2 px-1 rounded-lg text-[10px] font-semibold text-center transition-all ${
                    absdType === 'foreign'
                      ? 'bg-[#14283f] text-white shadow-xs'
                      : 'bg-[#f2f4f7] text-[#191c1e] hover:bg-[#eceef1]'
                  }`}
                >
                  Foreign Entity<br /><span className="text-[#ba1a1a] font-bold">60% ABSD</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Panel 2: Rental & Expenses */
          <div className="p-4 rounded-xl bg-white border border-[#e6e8eb] shadow-xs flex flex-col gap-3.5 animate-fade-in">
            {/* Monthly Rent */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-[#44474d]">Monthly Expected Rent</label>
                <span className="text-[10px] text-[#006874] font-semibold">Bishan Median: S$4,800 - S$5,100</span>
              </div>
              <div className="flex items-center rounded-lg bg-[#f2f4f7] px-3 py-1.5 border border-[#e6e8eb]">
                <span className="text-[13px] text-[#44474d] font-bold mr-1">S$</span>
                <input 
                  type="number"
                  step="100"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full bg-transparent text-[18px] font-bold text-[#001328] outline-none"
                />
                <span className="text-[11px] text-[#44474d] ml-2 shrink-0">/ month</span>
              </div>
            </div>

            {/* Operating Cost Line Items */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#44474d]">Vacancy Provision</span>
                <div className="rounded-lg bg-[#f2f4f7] p-2 border border-[#e6e8eb]">
                  <span className="text-[13px] font-bold text-[#001328]">1.0 Month</span>
                  <span className="block text-[10px] text-[#44474d] mt-0.5">8.33% annual discount</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#44474d]">MCST Maintenance</span>
                <div className="rounded-lg bg-[#f2f4f7] p-2 border border-[#e6e8eb]">
                  <span className="text-[13px] font-bold text-[#001328]">S$310 / mo</span>
                  <span className="block text-[10px] text-[#44474d] mt-0.5">S$3,720 / yr</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#44474d]">IRAS Non-Owner Tax</span>
                <div className="rounded-lg bg-[#f2f4f7] p-2 border border-[#e6e8eb]">
                  <span className="text-[13px] font-bold text-[#001328]">S$4,680 / yr</span>
                  <span className="block text-[10px] text-[#44474d] mt-0.5">Tiered progressive AV</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#44474d]">Agent Commission</span>
                <div className="rounded-lg bg-[#f2f4f7] p-2 border border-[#e6e8eb]">
                  <span className="text-[13px] font-bold text-[#001328]">0.5 Month</span>
                  <span className="block text-[10px] text-[#44474d] mt-0.5">S$2,450 renewal est.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f4f7] border border-[#e6e8eb]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006874]">security</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#001328]">Insurance &amp; Repair Reserve</span>
                  <span className="text-[10px] text-[#44474d]">Aircon servicing + landlord indemnity</span>
                </div>
              </div>
              <span className="text-[13px] font-bold text-[#001328]">S$120 / mo</span>
            </div>
          </div>
        )}
      </div>

      {/* Cash Flow Breakdown Waterfall Card */}
      <div className="px-4 mt-3">
        <div className="p-4 rounded-xl bg-white border border-[#e6e8eb] shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#001328]">Annual Cash Flow Waterfall</h2>
            <span className="text-[10px] text-[#006874] bg-[#006874]/10 px-2 py-0.5 rounded-full font-bold">
              IRAS Net Basis
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-[12px] pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[#191c1e]">Gross Scheduled Rent (12 mos)</span>
              <span className="font-bold text-[#001328]">S${grossAnnualRent.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-[#44474d] pl-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">remove</span>
                Vacancy &amp; Lease Loss (1 mo)
              </span>
              <span className="text-[#ba1a1a] font-semibold">-S${vacancyLoss.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between py-1 bg-[#f2f4f7] px-2.5 rounded-md font-semibold text-[#001328]">
              <span>Effective Gross Income (EGI)</span>
              <span>S${egi.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-[#44474d] pl-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">remove</span>
                Operating Outflows (MCST, Tax, Ins, Agent)
              </span>
              <span className="text-[#ba1a1a] font-semibold">-S${operatingExpenses.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between py-1 bg-[#f2f4f7] px-2.5 rounded-md font-bold text-[#006874]">
              <span>Net Operating Income (NOI)</span>
              <span>S${noi.toLocaleString()} / yr</span>
            </div>

            <div className="flex items-center justify-between text-[#44474d] pl-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">remove</span>
                Mortgage Debt Service (P+I: S${monthlyMortgage.toLocaleString()}/mo)
              </span>
              <span className="font-semibold text-[#44474d]">-S${annualDebtService.toLocaleString()}</span>
            </div>

            {/* Break-Even Rent Rate */}
            <div className="mt-1 pt-2 flex items-center justify-between bg-[#e6e8eb]/70 p-2.5 rounded-lg border border-[#e6e8eb]">
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#001328]">Break-Even Rent Rate</span>
                <span className="text-[10px] text-[#44474d]">Minimum lease to cover carry &amp; amort.</span>
              </div>
              <span className="text-[16px] font-bold text-[#006874]">
                S${breakEvenRent.toLocaleString()} / mo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensitivity Stress Matrix */}
      <div className="px-4 mt-3">
        <div className="p-4 rounded-xl bg-white border border-[#e6e8eb] shadow-xs flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-[14px] font-bold text-[#001328]">Sensitivity Stress Matrix</h2>
              <span className="text-[11px] text-[#44474d]">Net Monthly Cash Flow (S$/month)</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eceef1] text-[#44474d] font-bold">
              3x3 Grid
            </span>
          </div>

          <div className="overflow-x-auto mt-1">
            <table className="w-full text-center text-[11px]">
              <thead>
                <tr className="bg-[#f2f4f7] text-[#44474d]">
                  <th className="py-2 px-1 text-left rounded-l font-semibold">Rent \ Rate</th>
                  <th className="py-2 px-1 font-semibold">2.80%</th>
                  <th className="py-2 px-1 font-bold bg-[#006874]/10 text-[#006874]">3.15% (Base)</th>
                  <th className="py-2 px-1 rounded-r font-bold text-[#ba1a1a]">4.00% (MAS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f4f7] text-[11px]">
                <tr className="hover:bg-[#f2f4f7]/50">
                  <td className="py-2.5 px-1 text-left font-bold text-[#001328]">S$4,500/mo</td>
                  <td className="py-2.5 px-1 text-[#16845B] font-semibold">+S$78</td>
                  <td className="py-2.5 px-1 text-[#ba1a1a] font-semibold bg-[#f2f4f7]/40">-S$58</td>
                  <td className="py-2.5 px-1 text-[#ba1a1a] font-bold">-S$382</td>
                </tr>
                <tr className="bg-[#006874]/5 font-bold">
                  <td className="py-2.5 px-1 text-left text-[#006874] flex items-center gap-1">
                    <span>S$4,900/mo</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                  </td>
                  <td className="py-2.5 px-1 text-[#16845B] font-bold">+S$478</td>
                  <td className="py-2.5 px-1 text-[#006874] bg-[#006874]/15 font-bold">+S$342</td>
                  <td className="py-2.5 px-1 text-[#16845B] font-semibold">+S$18</td>
                </tr>
                <tr className="hover:bg-[#f2f4f7]/50">
                  <td className="py-2.5 px-1 text-left font-bold text-[#001328]">S$5,300/mo</td>
                  <td className="py-2.5 px-1 text-[#16845B] font-bold">+S$878</td>
                  <td className="py-2.5 px-1 text-[#16845B] font-bold bg-[#f2f4f7]/40">+S$742</td>
                  <td className="py-2.5 px-1 text-[#16845B] font-bold">+S$418</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[#44474d] text-[10px] pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16845B]"></span> Positive Monthly Carry
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span> Negative Monthly Drag
            </span>
          </div>
        </div>
      </div>

      {/* Action Docks */}
      <div className="px-4 mt-3 flex flex-col gap-2">
        <button 
          onClick={() => onShowToast("Exporting institutional Investment Pro-Forma (PDF)...")}
          className="w-full py-3 px-4 rounded-xl bg-[#14283f] hover:bg-[#001328] text-white text-[13px] font-bold shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[19px] text-[#95f1ff]">picture_as_pdf</span>
          Export Investment Pro-Forma (PDF)
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onShowToast("Saved simulation parameters to Bishan Loft dossier")}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f2f4f7] text-[#001328] text-[12px] font-bold shadow-xs border border-[#e6e8eb] transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006874]">bookmark_add</span>
            Save to Portfolio
          </button>
          <button 
            onClick={() => onShowToast("WhatsApp summary generated with net yield and IRR")}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f2f4f7] text-[#001328] text-[12px] font-bold shadow-xs border border-[#e6e8eb] transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px] text-[#16845B]">chat</span>
            WhatsApp Summary
          </button>
        </div>
      </div>

      {/* Statutory Disclaimer */}
      <div className="px-4 mt-3">
        <div className="p-3 rounded-xl bg-[#f2f4f7] text-[#74777e] flex gap-2 items-start border border-[#e6e8eb]">
          <span className="material-symbols-outlined text-[15px] text-[#74777e] mt-0.5 shrink-0">info</span>
          <p className="text-[10px] leading-relaxed">
            Indicative simulation based on IRAS Non-Owner Occupied progressive Property Tax rates and MAS Total Debt Servicing Ratio (TDSR) guidelines. Computations exclude capital appreciation tax (nil in SG) and legal conveyancing costs. Does not constitute statutory financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};
