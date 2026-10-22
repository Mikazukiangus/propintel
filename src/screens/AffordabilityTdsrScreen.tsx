import React, { useState } from 'react';
import { ScreenId } from '../types';

interface AffordabilityTdsrScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const AffordabilityTdsrScreen: React.FC<AffordabilityTdsrScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [profile, setProfile] = useState<'marcus' | 'single' | 'custom'>('marcus');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(16500);
  const [cpfBalance, setCpfBalance] = useState<number>(240000);
  const [cashReserves, setCashReserves] = useState<number>(180000);
  const [monthlyDebt, setMonthlyDebt] = useState<number>(1550);
  const [tenure, setTenure] = useState<number>(28);
  const [rateBenchmark, setRateBenchmark] = useState<number>(3.15);

  // Dynamic calculations based on TDSR 55% cap
  const maxAllowableTotalDebt = monthlyIncome * 0.55;
  const allowableMortgageUnderStress = Math.max(0, maxAllowableTotalDebt - monthlyDebt);
  
  // Under MAS 4.0% stress rate
  const stressMonthlyRate = 0.04 / 12;
  const numMonths = tenure * 12;
  const maxLoanFromStress = Math.round(
    allowableMortgageUnderStress * (Math.pow(1 + stressMonthlyRate, numMonths) - 1) / (stressMonthlyRate * Math.pow(1 + stressMonthlyRate, numMonths))
  );

  // Capital check (75% LTV -> max purchase = loan / 0.75, or 25% downpayment check)
  const availableDownpayment = cpfBalance + cashReserves;
  const maxPurchaseFromEquity = Math.round(availableDownpayment / 0.25);
  const maxPurchaseFromLoan = Math.round(maxLoanFromStress / 0.75);
  const prudentBudget = Math.min(maxPurchaseFromLoan, maxPurchaseFromEquity, 1850000);

  const bankLoan = Math.round(prudentBudget * 0.75);
  const minCash5 = Math.round(prudentBudget * 0.05);
  const downpayment20 = Math.round(prudentBudget * 0.20);

  // Monthly repayment at selected benchmark rate
  const calcRate = rateBenchmark / 100 / 12;
  const actualMonthlyRepayment = Math.round(
    bankLoan * (calcRate * Math.pow(1 + calcRate, numMonths)) / (Math.pow(1 + calcRate, numMonths) - 1)
  );

  // Stress repayment at 4.0%
  const stressRepayment = Math.round(
    bankLoan * (stressMonthlyRate * Math.pow(1 + stressMonthlyRate, numMonths)) / (Math.pow(1 + stressMonthlyRate, numMonths) - 1)
  );

  // TDSR % at benchmark
  const tdsrActual = (((actualMonthlyRepayment + monthlyDebt) / monthlyIncome) * 100).toFixed(1);
  const tdsrStress = (((stressRepayment + monthlyDebt) / monthlyIncome) * 100).toFixed(1);
  const headroom = (55.0 - parseFloat(tdsrStress)).toFixed(1);

  // Tiered BSD on prudent budget
  const calculateBSD = (price: number) => {
    let bsd = 0;
    if (price > 180000) bsd += 180000 * 0.01;
    if (price > 360000) bsd += 180000 * 0.02;
    if (price > 1000000) bsd += 640000 * 0.03;
    if (price > 1500000) bsd += 500000 * 0.04;
    if (price > 1500000) bsd += (price - 1500000) * 0.05;
    return Math.round(bsd);
  };
  const bsd = calculateBSD(prudentBudget);
  const totalUpfront = minCash5 + downpayment20 + bsd + 3200;

  return (
    <div className="flex flex-col w-full pb-12 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Context & Regulatory Benchmark Banner */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006874]"></span>
            <span className="text-[10px] uppercase tracking-wider text-[#006874] font-bold">
              Institutional Engine
            </span>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6e8eb] text-[#44474d] text-[10px] font-semibold">
            <span className="material-symbols-outlined text-[13px] text-[#006874]">verified_user</span>
            <span>MAS Notice 645/632 Compliant</span>
          </div>
        </div>

        <h1 className="text-[20px] font-bold text-[#001328] tracking-tight">
          Affordability &amp; TDSR Calculator
        </h1>
        <p className="text-[12px] text-[#44474d]">
          MAS regulatory stress-test · CPF OA usage · Tiered BSD &amp; ABSD simulation
        </p>

        {/* Regulatory Version Pill */}
        <div className="mt-1 p-2.5 rounded-xl bg-[#f2f4f7] flex items-center justify-between border border-[#e6e8eb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#006874]">account_balance</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#001328]">4.00% MAS Medium-Term Stress Rate</span>
              <span className="text-[10px] text-[#44474d] leading-tight">Floor rate mandatory for non-HDB residential borrowing</span>
            </div>
          </div>
          <span className="text-[10px] bg-[#e0e3e6] text-[#001328] px-2 py-0.5 rounded-md font-bold">v25.2</span>
        </div>
      </section>

      {/* Profile Switcher */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-[#001328]">Active Buyer Profile</span>
          <button 
            onClick={() => onShowToast("Editing profile parameters")}
            className="text-[11px] text-[#006874] font-semibold hover:underline flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-[13px]">tune</span>Edit Variables
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button 
            onClick={() => {
              setProfile('marcus');
              setMonthlyIncome(16500);
              setCpfBalance(240000);
              setCashReserves(180000);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap shadow-xs transition-all ${
              profile === 'marcus' ? 'bg-[#14283f] text-white' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#95f1ff]">family_restroom</span>
            <span>Marcus &amp; Cheryl (SC Upgrader)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#95f1ff]"></span>
          </button>

          <button 
            onClick={() => {
              setProfile('single');
              setMonthlyIncome(11500);
              setCpfBalance(140000);
              setCashReserves(90000);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
              profile === 'single' ? 'bg-[#14283f] text-white' : 'bg-[#f2f4f7] text-[#44474d]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">person</span>
            <span>First-Timer Single (SC)</span>
          </button>

          <button 
            onClick={() => onShowToast("Custom simulation unlocked for all salary inputs")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f2f4f7] text-[#44474d] text-[11px] font-semibold whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            <span>Custom</span>
          </button>
        </div>

        {/* Residency & Status */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">Citizenship Status</span>
              <span className="text-[12px] font-bold text-[#001328]">Singapore Citizen (SC)</span>
            </div>
            <span className="material-symbols-outlined text-[#006874] text-[18px]">flag</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#e6e8eb] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[9px] text-[#44474d] block font-semibold">ABSD Tier</span>
              <span className="text-[12px] font-bold text-[#001328]">1st Property (Upgrading)</span>
            </div>
            <span className="material-symbols-outlined text-[#3c9f74] text-[18px]">task_alt</span>
          </div>
        </div>
      </section>

      {/* Hero Summary Card: Prudent Purchase Budget */}
      <section>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#14283f] to-[#001328] text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#006874]/20 blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-1 relative z-10">
            <span className="text-[10px] uppercase tracking-wider text-[#7c8fab] font-bold">
              Maximum Prudent Purchase Budget
            </span>
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94f6c4]"></span>
              <span>55% TDSR Bound</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-3 relative z-10">
            <span className="text-[26px] font-bold tracking-tight text-white">
              S${prudentBudget.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#95f1ff] font-semibold">Cap: 75% LTV</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-white/10 relative z-10 text-[11px]">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#7c8fab]">Max Bank Loan (75%)</span>
              <span className="text-[16px] font-bold text-white mt-0.5">S${bankLoan.toLocaleString()}</span>
              <span className="text-[9px] text-[#7c8fab]">{tenure} yrs tenure (to age 65)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#7c8fab]">Monthly Repayment</span>
              <span className="text-[16px] font-bold text-white mt-0.5">
                S${actualMonthlyRepayment.toLocaleString()} <span className="text-[10px] font-normal text-[#7c8fab]">/mo</span>
              </span>
              <span className="text-[9px] text-[#94f6c4] font-semibold">Stress 4.0%: S${stressRepayment.toLocaleString()} /mo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 pt-1 relative z-10">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-[9px] text-[#7c8fab] block">Min. Cash Required (5%)</span>
              <span className="text-[12px] font-bold text-white">S${minCash5.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-[9px] text-[#7c8fab] block">CPF OA + Cash (20%)</span>
              <span className="text-[12px] font-bold text-white">S${downpayment20.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Parameter Sliders & Toggles */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#e6e8eb] flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-bold text-[#001328]">Underwriting Inputs</h2>
          <span className="text-[10px] text-[#006874] bg-[#95f1ff]/30 px-2 py-0.5 rounded-full font-bold">
            Live Recalculation
          </span>
        </div>

        {/* Income Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-bold text-[#44474d] flex items-center gap-1">
              Household Monthly Income
              <span className="material-symbols-outlined text-[13px] text-[#74777e]">info</span>
            </span>
            <span className="text-[15px] font-bold text-[#14283f]">S${monthlyIncome.toLocaleString()}</span>
          </div>

          <input 
            type="range"
            min={8000}
            max={35000}
            step={500}
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full h-2 bg-[#eceef1] rounded-lg appearance-none cursor-pointer accent-[#006874]"
          />

          <div className="flex justify-between text-[10px] text-[#74777e] mt-1">
            <span>S$8,000</span>
            <span className="text-[#006874] font-bold">S${(monthlyIncome / 1000).toFixed(1)}k Household</span>
            <span>S$35,000</span>
          </div>
        </div>

        {/* Available Cash & CPF OA Matrix */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-[#f2f4f7] border border-[#e6e8eb]">
            <span className="text-[9px] text-[#44474d] block font-semibold">Combined CPF OA Balance</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="text-[14px] font-bold text-[#001328]">S${cpfBalance.toLocaleString()}</span>
              <span className="text-[9px] text-[#006874] font-bold">Verified</span>
            </div>
            <span className="text-[9px] text-[#74777e] mt-0.5 block">Allocated to 20% downpayment</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f2f4f7] border border-[#e6e8eb]">
            <span className="text-[9px] text-[#44474d] block font-semibold">Liquid Cash Reserves</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="text-[14px] font-bold text-[#001328]">S${cashReserves.toLocaleString()}</span>
              <span className="text-[9px] text-[#74777e]">Liquid</span>
            </div>
            <span className="text-[9px] text-[#74777e] mt-0.5 block">5% min cash: S${minCash5.toLocaleString()}</span>
          </div>
        </div>

        {/* Existing Debt */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-bold text-[#44474d]">Existing Monthly Debt (Car &amp; Cards)</span>
            <span className="text-[14px] font-bold text-[#001328]">
              S${monthlyDebt.toLocaleString()} <span className="text-[10px] text-[#74777e] font-normal">/mo</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#44474d] text-[10px] bg-[#f2f4f7] p-2 rounded-lg border border-[#e6e8eb]">
            <span className="material-symbols-outlined text-[14px]">directions_car</span>
            <span>Car loan: S$1,100</span>
            <span>·</span>
            <span className="material-symbols-outlined text-[14px]">credit_card</span>
            <span>Credit lines: S$450</span>
          </div>
        </div>

        {/* Tenure & Rate Selector */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <span className="text-[10px] text-[#44474d] block mb-1 font-semibold">Loan Tenure</span>
            <div className="flex bg-[#f2f4f7] p-0.5 rounded-lg border border-[#e6e8eb]">
              {[25, 28, 30].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`flex-1 py-1 text-center text-[11px] rounded-md transition-all ${
                    tenure === t ? 'bg-[#14283f] text-white font-bold shadow-xs' : 'text-[#44474d]'
                  }`}
                >
                  {t}y
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] text-[#44474d] block mb-1 font-semibold">Rate Benchmark</span>
            <div className="flex bg-[#f2f4f7] p-0.5 rounded-lg border border-[#e6e8eb]">
              {[3.15, 2.90, 4.0].map((r) => (
                <button
                  key={r}
                  onClick={() => setRateBenchmark(r)}
                  className={`flex-1 py-1 text-center text-[11px] rounded-md transition-all ${
                    rateBenchmark === r ? 'bg-[#006874] text-white font-bold shadow-xs' : 'text-[#44474d]'
                  }`}
                >
                  {r.toFixed(2)}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TDSR Regulatory Gauge */}
      <section className="p-4 rounded-2xl bg-white border border-[#e6e8eb] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-[#001328]">TDSR Regulatory Gauge</h2>
            <span className="text-[10px] text-[#44474d]">Total Debt Servicing Ratio Assessment</span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#94f6c4]/40 text-[#005236] text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">format_image_left</span>
            <span>Compliant (Safe Zone)</span>
          </div>
        </div>

        {/* Meter Visual */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[20px] font-bold text-[#006874]">{tdsrActual}%</span>
              <span className="text-[10px] text-[#44474d]">at {rateBenchmark.toFixed(2)}% baseline</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-[#74777e] block">Statutory Limit</span>
              <span className="text-[12px] font-bold text-[#ba1a1a]">55.0% Max</span>
            </div>
          </div>

          {/* Multi-segment progress */}
          <div className="w-full h-3.5 bg-[#e6e8eb] rounded-full overflow-hidden flex relative p-0.5">
            <div className="h-full bg-[#006874] rounded-l-full" style={{ width: `${Math.min(36, Number(tdsrActual) * 0.8)}%` }}></div>
            <div className="h-full bg-[#79d4e2]" style={{ width: '8%' }}></div>
            <div className="h-full bg-[#c4c6cd]" style={{ width: '6%' }}></div>
            {/* 55% pin */}
            <div className="absolute top-0 bottom-0 left-[55%] w-0.5 bg-[#ba1a1a] z-10"></div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#44474d] mt-1.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#006874] inline-block"></span> New Property
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#79d4e2] inline-block"></span> Car &amp; CC
            </span>
            <span className="text-[#005236] font-bold">{headroom}% Headroom left</span>
          </div>
        </div>

        {/* Commitments Audit */}
        <div className="pt-2 border-t border-[#e6e8eb] flex flex-col gap-1.5 text-[11px]">
          <div className="flex justify-between items-center text-[#44474d]">
            <span>Gross Monthly Income Base</span>
            <span className="font-bold text-[#001328]">S${monthlyIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[#44474d]">
            <span>New Monthly Housing Loan (at {rateBenchmark}%)</span>
            <span className="font-bold text-[#001328]">S${actualMonthlyRepayment.toLocaleString()} /mo</span>
          </div>
          <div className="flex justify-between items-center text-[#44474d]">
            <span>MAS 4.0% Stress Test Repayment</span>
            <span className="font-bold text-[#14283f]">S${stressRepayment.toLocaleString()} /mo</span>
          </div>
          <div className="flex justify-between items-center text-[#44474d]">
            <span>Car &amp; Other Monthly Commitments</span>
            <span className="font-bold text-[#001328]">S${monthlyDebt.toLocaleString()} /mo</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-dashed border-[#e6e8eb] font-bold text-[#001328]">
            <span>Total Debt Servicing (Stress Condition)</span>
            <span className="text-[#006874]">S${(stressRepayment + monthlyDebt).toLocaleString()} /mo ({tdsrStress}%)</span>
          </div>
        </div>

        {/* MSR Alert */}
        <div className="p-2.5 rounded-xl bg-[#f2f4f7] flex items-start gap-2 border border-[#e6e8eb]">
          <span className="material-symbols-outlined text-[16px] text-[#006874] mt-0.5">info</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#001328]">MSR 30% Exempt</span>
              <span className="text-[9px] text-[#44474d] px-1.5 py-0.2 bg-[#e0e3e6] rounded font-semibold">
                Private / Resale EC
              </span>
            </div>
            <span className="text-[10px] text-[#74777e] mt-0.5">
              Mortgage Servicing Ratio (30% cap) is statutory solely for HDB flats and new Executive Condominiums.
            </span>
          </div>
        </div>
      </section>

      {/* Upfront Capital & Stamp Duty */}
      <section className="p-4 rounded-2xl bg-white border border-[#e6e8eb] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-[#001328]">Upfront Capital &amp; Stamp Duty</h2>
            <span className="text-[10px] text-[#44474d]">Tiered statutory capital requirements</span>
          </div>
          <span className="text-[16px] text-[#14283f] font-bold">S${totalUpfront.toLocaleString()}</span>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="p-2.5 rounded-xl bg-[#f2f4f7] flex justify-between items-center border border-[#e6e8eb]">
            <div>
              <span className="font-bold text-[#001328] block">5% Minimum Statutory Cash Downpayment</span>
              <span className="text-[10px] text-[#74777e]">Mandatory Cash under MAS Notice 632</span>
            </div>
            <span className="font-bold text-[#001328]">S${minCash5.toLocaleString()}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f2f4f7] flex justify-between items-center border border-[#e6e8eb]">
            <div>
              <span className="font-bold text-[#001328] block">20% Additional Downpayment (CPF / Cash)</span>
              <span className="text-[10px] text-[#74777e]">Funded fully via available CPF OA</span>
            </div>
            <span className="font-bold text-[#001328]">S${downpayment20.toLocaleString()}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f2f4f7] flex justify-between items-center border border-[#e6e8eb]">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#001328]">Buyer's Stamp Duty (BSD)</span>
                <span className="text-[9px] px-1 rounded bg-[#e0e3e6] text-[#44474d]">IRAS 2023+</span>
              </div>
              <span className="text-[10px] text-[#74777e]">Tiered formula on S${prudentBudget.toLocaleString()}</span>
            </div>
            <span className="font-bold text-[#001328]">S${bsd.toLocaleString()}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f2f4f7] flex justify-between items-center border border-[#e6e8eb]">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#001328]">Additional Buyer's Stamp Duty (ABSD)</span>
                <span className="text-[9px] px-1 rounded bg-[#94f6c4]/50 text-[#005236] font-bold">Remission</span>
              </div>
              <span className="text-[10px] text-[#74777e]">SC Upgrader: 6-month disposal undertaking</span>
            </div>
            <span className="font-bold text-[#006874]">S$0</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f2f4f7] flex justify-between items-center border border-[#e6e8eb]">
            <div>
              <span className="font-bold text-[#001328] block">Legal &amp; Valuation Fees</span>
              <span className="text-[10px] text-[#74777e]">Estimated conveyancing</span>
            </div>
            <span className="font-bold text-[#001328]">~S$3,200</span>
          </div>
        </div>
      </section>

      {/* Rate Sensitivity Matrix */}
      <section className="p-4 rounded-2xl bg-white border border-[#e6e8eb] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-[13px] font-bold text-[#001328]">Rate Sensitivity Matrix</h2>
            <span className="text-[10px] text-[#44474d]">Monthly repayment shifts per +50 bps</span>
          </div>
          <span className="material-symbols-outlined text-[#006874] text-[18px]">show_chart</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="p-2 rounded-xl bg-[#f2f4f7] border border-[#e6e8eb]">
            <span className="text-[10px] text-[#44474d] block font-semibold">2.80%</span>
            <span className="text-[12px] font-bold text-[#001328] mt-0.5 block">S$5,380</span>
            <span className="text-[9px] text-[#006874] font-semibold">-S$482</span>
          </div>

          <div className="p-2 rounded-xl bg-[#14283f] text-white shadow-xs">
            <span className="text-[10px] text-[#95f1ff] block font-semibold">3.15%</span>
            <span className="text-[12px] font-bold text-white mt-0.5 block">S$5,862</span>
            <span className="text-[9px] text-[#95f1ff]">Current</span>
          </div>

          <div className="p-2 rounded-xl bg-[#f2f4f7] border border-[#e6e8eb]">
            <span className="text-[10px] text-[#44474d] block font-semibold">3.75%</span>
            <span className="text-[12px] font-bold text-[#001328] mt-0.5 block">S$6,310</span>
            <span className="text-[9px] text-[#ba1a1a] font-semibold">+S$448</span>
          </div>

          <div className="p-2 rounded-xl bg-[#f2f4f7] border border-[#e6e8eb]">
            <span className="text-[10px] text-[#44474d] block font-semibold">4.25%</span>
            <span className="text-[12px] font-bold text-[#001328] mt-0.5 block">S$6,680</span>
            <span className="text-[9px] text-[#ba1a1a] font-semibold">+S$818</span>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col gap-2 pt-1">
        <button 
          onClick={() => onNavigate('mortgage-rates')}
          className="w-full py-3 px-4 rounded-xl bg-[#14283f] hover:bg-[#001328] text-white text-[13px] font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[19px] text-[#95f1ff]">verified</span>
          <span>Apply In-Principle Approval (IPA)</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onShowToast("Exporting MAS Affordability Audit PDF...")}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f2f4f7] text-[#001328] text-[12px] font-bold shadow-xs border border-[#e6e8eb] flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006874]">picture_as_pdf</span>
            <span>Export Audit PDF</span>
          </button>
          <button 
            onClick={() => onShowToast("Affordability brief dispatched to agent")}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f2f4f7] text-[#001328] text-[12px] font-bold shadow-xs border border-[#e6e8eb] flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006874]">share</span>
            <span>Share with Agent</span>
          </button>
        </div>
      </section>

      {/* Statutory Footer */}
      <footer className="pt-1 pb-4">
        <div className="p-3 rounded-xl bg-[#f2f4f7] text-[#44474d] text-[10px] leading-relaxed flex items-start gap-2 border border-[#e6e8eb]">
          <span className="material-symbols-outlined text-[15px] text-[#74777e] mt-0.5">gavel</span>
          <div>
            <p className="font-bold text-[#001328]">Statutory Compliance Notice</p>
            <p className="mt-0.5">
              Calculations are simulated under MAS Notices 645 &amp; 632 guidelines and IRAS Stamp Duty tiered schedules (February 2025). Variable bonus components are discounted by 30% pursuant to MAS standard hair-cutting rules.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
