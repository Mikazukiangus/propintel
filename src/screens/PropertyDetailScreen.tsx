import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface PropertyDetailScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const photos = [
    ASSETS.bishanLoftLiving,
    ASSETS.masterSuite,
    ASSETS.chefsKitchen,
    ASSETS.parkBalcony,
  ];

  return (
    <div className="flex flex-col w-full relative pb-28">
      {/* Sub-Header Bar */}
      <div className="sticky top-0 z-30 bg-[#f7f9fc]/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-[#e6e8eb]">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate('home')}
            className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] flex items-center justify-center text-[#14283f] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#14283f] leading-none truncate max-w-[190px]">
              Bishan Loft #14-06
            </span>
            <span className="text-[11px] text-[#44474d] flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
              D20 · Bishan EC
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              onShowToast("Listing link copied for sharing!");
            }}
            className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] flex items-center justify-center text-[#14283f] active:scale-95"
            title="Share"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button 
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              onShowToast(!isBookmarked ? "Property bookmarked to portfolio" : "Bookmark removed");
            }}
            className={`w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] flex items-center justify-center active:scale-95 transition-colors ${
              isBookmarked ? 'text-[#006874]' : 'text-[#14283f]'
            }`}
            title="Bookmark"
          >
            <span className="material-symbols-outlined text-[19px]">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-3.5 pt-3">
        {/* Statutory Micro-Badges Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#e6e8eb] shadow-xs text-[#001328] text-[10px] font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
            URA Verified Caveat
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white border border-[#e6e8eb] text-[#44474d] text-[10px] shrink-0 font-medium">
            Privatised EC
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white border border-[#e6e8eb] text-[#44474d] text-[10px] shrink-0 font-medium">
            99-yr (TOP 2003)
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white border border-[#e6e8eb] text-[#44474d] text-[10px] shrink-0 font-medium">
            High Floor (#14)
          </span>
        </div>

        {/* Media Carousel Section */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#eceef1] shadow-sm border border-[#e6e8eb]">
          <div className="relative aspect-[4/3] w-full">
            <img 
              alt="Bishan Loft interior" 
              className="w-full h-full object-cover transition-all duration-300" 
              src={photos[activePhotoIdx]} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001328]/70 via-transparent to-[#001328]/20 pointer-events-none"></div>

            {/* Live Badges on Media */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              <span 
                onClick={() => onNavigate('marketing-kit')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#14283f]/85 text-white text-[10px] font-bold backdrop-blur-md cursor-pointer hover:bg-[#14283f]"
              >
                <span className="material-symbols-outlined text-[13px] text-[#95f1ff]">view_in_ar</span> 
                360° Virtual Tour
              </span>
              <span 
                onClick={() => onNavigate('marketing-kit')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-[#14283f] text-[10px] font-bold backdrop-blur-md shadow-xs cursor-pointer hover:bg-white"
              >
                <span className="material-symbols-outlined text-[13px] text-[#006874]">verified</span> 
                Cadastral Plan
              </span>
            </div>

            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-0.5 rounded-full bg-[#001328]/80 text-white text-[10px] font-bold backdrop-blur-md">
                {activePhotoIdx + 1} / {photos.length}
              </span>
            </div>

            {/* Photo selector thumbnails */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-medium">
                  <span className="material-symbols-outlined text-[12px]">wb_sunny</span> N-S Orientation
                </span>
                <span className="text-[10px] flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-medium">
                  <span className="material-symbols-outlined text-[12px]">forest</span> Park Horizon
                </span>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      activePhotoIdx === i ? 'w-4 bg-[#006874]' : 'w-1.5 bg-white/60'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Valuation & Pricing Module */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider font-semibold">
                Asking Price · Negotiable
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#006874]/10 text-[#006874] text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                Fair Valuation Parity
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-bold text-[#14283f] tracking-tight">S$1,620,000</span>
              <span className="text-[13px] text-[#44474d] font-semibold">S$1,420 psf</span>
            </div>
          </div>

          {/* Algorithmic Valuation Model (AVM) Spread Analysis */}
          <div className="bg-[#f2f4f7] p-3 rounded-xl flex flex-col gap-2 border border-[#e6e8eb]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px] text-[#006874]">psychology</span>
                <span className="text-[12px] font-bold text-[#14283f]">Hedonic AVM Model Value</span>
              </div>
              <span className="text-[10px] text-[#44474d]">Conf. ±3.4%</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-[15px] font-bold text-[#14283f]">S$1,620,000</span>
              <span className="text-[11px] text-[#004f57] font-semibold">Model Band: S$1.56M – S$1.67M</span>
            </div>

            {/* Visual Uncertainty & Parity Bar */}
            <div className="w-full h-2 rounded-full bg-[#e6e8eb] relative overflow-hidden flex items-center">
              <div className="absolute left-[15%] right-[15%] h-full bg-[#95f1ff] rounded-full"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#006874] rounded-full shadow-xs"></div>
            </div>

            <div className="flex items-center justify-between text-[#44474d] text-[10px] pt-0.5">
              <span>-3.4% Undervalued</span>
              <span className="text-[11px] font-bold text-[#006874]">At Benchmark</span>
              <span>+3.4% Premium</span>
            </div>
          </div>

          {/* 5-Year Capital Appreciation Stat */}
          <div className="flex items-center justify-between py-1 px-1">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#94f6c4]/40 flex items-center justify-center text-[#005236]">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d]">5-Yr Development Resale ROI</span>
                <span className="text-[12px] font-bold text-[#14283f]">+18.4% Net Appreciation</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('valuation')}
              className="text-[11px] font-bold text-[#006874] hover:underline flex items-center gap-0.5"
            >
              AVM Breakdown <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Spatial & Cadastral Specs */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#14283f]">Spatial &amp; Cadastral Specs</h2>
            <span className="text-[10px] text-[#44474d]">SLA Cadastral #33-1406</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">Strata Floor Area</span>
              <span className="text-[15px] font-bold text-[#14283f] mt-0.5">
                1,141 <span className="text-[11px] font-normal text-[#44474d]">sqft (106 sqm)</span>
              </span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">Configuration</span>
              <span className="text-[15px] font-bold text-[#14283f] mt-0.5">3 Bed · 2 Bath</span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">Floor Level &amp; Stack</span>
              <span className="text-[14px] font-bold text-[#14283f] mt-0.5">
                #14-06 <span className="text-[10px] text-[#006874] font-semibold">(High Tier)</span>
              </span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">Remaining Lease</span>
              <span className="text-[14px] font-bold text-[#14283f] mt-0.5">
                76 Years <span className="text-[10px] font-normal text-[#44474d]">(from 2001)</span>
              </span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">Solar Facing</span>
              <span className="text-[14px] font-bold text-[#14283f] mt-0.5">
                North-South <span className="text-[10px] font-normal text-[#44474d]">(0 West Sun)</span>
              </span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">MCST Maintenance</span>
              <span className="text-[14px] font-bold text-[#14283f] mt-0.5">
                S$310 <span className="text-[10px] font-normal text-[#44474d]">/ month</span>
              </span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">Tenure Classification</span>
              <span className="text-[14px] font-bold text-[#14283f] mt-0.5">Privatised EC</span>
            </div>
            <div className="flex flex-col p-2.5 rounded-lg bg-[#f2f4f7]">
              <span className="text-[10px] text-[#44474d]">Interior Condition</span>
              <span className="text-[14px] font-bold text-[#14283f] mt-0.5">Turnkey Ready</span>
            </div>
          </div>
        </div>

        {/* OneMap Verified School Matrix & MOE Primary 1 Priority Buffer */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[#006874] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                OneMap Official Cadastral Buffer
              </span>
              <span className="text-[10px] text-[#44474d]">Blk 33 Geocode</span>
            </div>
            <h2 className="text-[15px] font-bold text-[#14283f]">MOE P1 Priority Registration</h2>
            <p className="text-[11px] text-[#44474d]">
              Calculated based on Singapore Land Authority (SLA) boundary coordinates for P1 Phase 2C priority allocation.
            </p>
          </div>

          {/* Within 1KM (Highest Priority Band) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between pb-0.5">
              <span className="text-[12px] font-bold text-[#14283f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#006874]">star</span>
                Within 1km Buffer (Highest Priority)
              </span>
              <span className="text-[10px] text-[#006874] font-bold">Phase 2C Priority</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#95f1ff]/20 border border-[#95f1ff]/40">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#14283f] leading-tight">Catholic High School (Primary)</span>
                <span className="text-[11px] text-[#44474d]">SAP Autonomous Boys School</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[16px] font-bold text-[#006874]">0.72 km</span>
                <span className="text-[10px] text-[#44474d]">9 min walk</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f4f7]">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#14283f] leading-tight">Townsville Primary School</span>
                <span className="text-[11px] text-[#44474d]">Co-ed Government School</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[15px] font-bold text-[#14283f]">0.94 km</span>
                <span className="text-[10px] text-[#44474d]">12 min walk</span>
              </div>
            </div>
          </div>

          {/* 1km to 2km Buffer */}
          <div className="flex flex-col gap-1 pt-1 border-t border-[#e6e8eb]">
            <span className="text-[11px] font-bold text-[#44474d]">Within 1km – 2km Buffer</span>
            <div className="flex items-center justify-between py-1 px-1 text-[12px]">
              <span className="text-[#14283f]">Kuo Chuan Presbyterian Primary</span>
              <span className="font-semibold text-[#44474d]">1.35 km</span>
            </div>
            <div className="flex items-center justify-between py-1 px-1 text-[12px]">
              <span className="text-[#14283f]">Teck Ghee Primary School</span>
              <span className="font-semibold text-[#44474d]">1.48 km</span>
            </div>
            <div className="flex items-center justify-between py-1 px-1 text-[12px]">
              <span className="text-[#14283f]">Ai Tong School (Bishan/Sin Ming)</span>
              <span className="font-semibold text-[#44474d]">1.85 km</span>
            </div>
          </div>

          {/* Transit Connectivity */}
          <div className="bg-[#f2f4f7] p-3 rounded-xl flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#14283f]">Key Urban Amenities &amp; Transit</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center bg-white p-2 rounded-lg border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[18px] text-[#006874]">train</span>
                <span className="text-[10px] text-[#44474d] mt-1">Bishan MRT (NS/CC)</span>
                <span className="text-[12px] font-bold text-[#14283f]">420m (6 min)</span>
              </div>
              <div className="flex flex-col items-center bg-white p-2 rounded-lg border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[18px] text-[#006874]">local_mall</span>
                <span className="text-[10px] text-[#44474d] mt-1">Junction 8 Mall</span>
                <span className="text-[12px] font-bold text-[#14283f]">480m</span>
              </div>
              <div className="flex flex-col items-center bg-white p-2 rounded-lg border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[18px] text-[#006874]">park</span>
                <span className="text-[10px] text-[#44474d] mt-1">Bishan-AMK Park</span>
                <span className="text-[12px] font-bold text-[#14283f]">250m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Mortgage Underwriting & TDSR Stress Analysis */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#14283f]">calculate</span>
              <h2 className="text-[15px] font-bold text-[#14283f]">Financial Outlay &amp; TDSR</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#44474d] text-[10px] font-semibold">
              75% LTV (25 Yr)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#f2f4f7] flex flex-col gap-1 border border-[#e6e8eb]">
            <span className="text-[10px] text-[#44474d]">Estimated Monthly Repayment (3.15% SORA)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-[20px] font-bold text-[#14283f]">
                S$5,134 <span className="text-[12px] font-normal text-[#44474d]">/ month</span>
              </span>
              <span className="text-[11px] font-semibold text-[#006874]">Principal + Interest</span>
            </div>
            <div className="flex items-center justify-between text-[#44474d] text-[11px] pt-1 border-t border-[#e6e8eb]">
              <span>MAS Stress Rate (4.00%):</span>
              <span className="font-bold text-[#14283f]">S$5,801 / month</span>
            </div>
          </div>

          {/* Capital Breakdown Matrix */}
          <div className="flex flex-col gap-1.5 text-[12px]">
            <span className="text-[11px] font-bold text-[#14283f]">Initial Capital Breakdown (SC 1st Home)</span>
            <div className="flex items-center justify-between py-1 text-[#44474d] border-b border-[#f2f4f7]">
              <span>Min 5% Statutory Cash</span>
              <span className="font-bold text-[#14283f]">S$81,000</span>
            </div>
            <div className="flex items-center justify-between py-1 text-[#44474d] border-b border-[#f2f4f7]">
              <span>20% Downpayment (CPF OA / Cash)</span>
              <span className="font-bold text-[#14283f]">S$324,000</span>
            </div>
            <div className="flex items-center justify-between py-1 text-[#44474d] border-b border-[#f2f4f7]">
              <span>Buyer's Stamp Duty (IRAS BSD 2023)</span>
              <span className="font-bold text-[#14283f]">S$49,400</span>
            </div>
            <div className="flex items-center justify-between py-1 text-[#44474d]">
              <span>Additional Buyer's Stamp Duty (ABSD)</span>
              <span className="font-bold text-[#006874]">S$0 (Exempt)</span>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('affordability-tdsr')}
            className="w-full py-2.5 rounded-xl bg-[#e6e8eb] hover:bg-[#e0e3e6] text-[#14283f] text-[12px] font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
          >
            Customise Loan Tenure &amp; CPF Allocation
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>

        {/* URA REALIS Transaction Feed */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-bold text-[#14283f]">URA REALIS Transaction Feed</h2>
              <span className="text-[11px] text-[#44474d]">Same Project Comparables (Bishan Loft)</span>
            </div>
            <span className="text-[10px] text-[#006874] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>Live Sync
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-3 rounded-xl bg-[#f2f4f7] flex flex-col gap-1 border border-[#e6e8eb]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#14283f]">Stack #14-06</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#006874]/15 text-[#006874] text-[9px] font-bold">
                    Identical Stack
                  </span>
                </div>
                <span className="text-[10px] text-[#44474d]">Jan 2025</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-bold text-[#14283f]">S$1,638,000</span>
                <span className="text-[11px] text-[#44474d]">S$1,435 psf · 1,141 sqft</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f2f4f7] flex flex-col gap-1 border border-[#e6e8eb]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#14283f]">Stack #11-02</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#e6e8eb] text-[#44474d] text-[9px] font-medium">
                    Similar Layout
                  </span>
                </div>
                <span className="text-[10px] text-[#44474d]">Nov 2024</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-bold text-[#14283f]">S$1,590,000</span>
                <span className="text-[11px] text-[#44474d]">S$1,393 psf · 1,141 sqft</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('caveats')}
            className="w-full py-2 text-center text-[12px] font-bold text-[#006874] hover:underline flex items-center justify-center gap-1"
          >
            Explore All 18 Caveats in D20 Hub
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

        {/* Verified Appointed Agent */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#44474d] uppercase tracking-wider font-semibold">
              Verified Appointed Agent
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95f1ff]/30 text-[#006874] text-[10px] font-bold">
              <span className="material-symbols-outlined text-[13px]">verified_user</span> CEA Verified
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img 
              alt="Eileen Tan agent photo" 
              className="w-14 h-14 rounded-full object-cover shadow-xs shrink-0 ring-1 ring-[#006874]/30" 
              src={ASSETS.agentEileen} 
            />
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#14283f] truncate">Eileen Tan</h3>
                <span className="flex items-center gap-0.5 text-[#14283f] text-[11px] font-bold shrink-0">
                  <span className="material-symbols-outlined text-[15px] text-[#f59e0b]">star</span> 
                  4.9 (42)
                </span>
              </div>
              <span className="text-[12px] text-[#44474d] truncate">PropNex Realty · Snr Associate Marketing Director</span>
              <span className="text-[10px] text-[#44474d] mt-0.5">CEA: R014829E · Lic: L3008022J</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={() => onShowToast("Calling Eileen Tan (+65 9182 3456)...")}
              className="py-2 px-3 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#14283f] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[17px] text-[#006874]">call</span> Direct Call
            </button>
            <button 
              onClick={() => onNavigate('marketing-kit')}
              className="py-2 px-3 rounded-lg bg-[#f2f4f7] hover:bg-[#eceef1] text-[#14283f] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[17px] text-[#006874]">badge</span> Full Dossier
            </button>
          </div>
        </div>

        {/* Audit Notice */}
        <div className="px-1 py-2 flex flex-col gap-1 text-[#44474d] opacity-90">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide">
            <span className="material-symbols-outlined text-[14px] text-[#006874]">shield</span>
            Government Data Audit Notice
          </div>
          <p className="text-[11px] leading-relaxed">
            Caveat data sourced directly via Urban Redevelopment Authority (URA) Real Estate Information System (REALIS) API and Housing &amp; Development Board (HDB). School boundaries computed using Singapore Land Authority (SLA) OneMap Cadastral Coordinates. Algorithmic Valuations (AVM) are estimates and do not constitute certified statutory appraisals.
          </p>
        </div>
      </div>

      {/* Persistent Sticky Bottom Action Dock */}
      <div className="fixed bottom-16 inset-x-0 z-40 bg-white/95 backdrop-blur-xl px-4 py-3 shadow-[0_-4px_16px_rgba(20,40,63,0.08)] border-t border-[#e6e8eb]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#14283f] leading-none">S$1,620,000</span>
            <span className="text-[11px] text-[#44474d] mt-1">Est. S$5,134 / mo</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onShowToast("Connecting to WhatsApp: enquiry pre-filled for Eileen Tan")}
              className="h-10 px-3.5 rounded-lg bg-[#95f1ff]/50 hover:bg-[#95f1ff] text-[#006f7b] text-[12px] font-bold flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span>WhatsApp</span>
            </button>

            <button 
              onClick={() => onShowToast("Viewing schedule: Available slots this Saturday 2:30 PM & Sunday 4:00 PM")}
              className="h-10 px-4 rounded-lg bg-[#14283f] hover:bg-[#001328] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[17px] text-[#95f1ff]">calendar_month</span>
              <span>Book Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
