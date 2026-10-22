import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigate, onShowToast }) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [activePin, setActivePin] = useState<string>('park-colonial');
  const [selectedLayer, setSelectedLayer] = useState<string>('listings');
  const [maxPrice, setMaxPrice] = useState<string>('1.8M');

  return (
    <div className="flex flex-col w-full relative pb-10">
      {/* Top Search & Multi-Filter Command Area */}
      <div className="px-4 pt-2 pb-2 space-y-2 bg-[#f7f9fc]/90 backdrop-blur-md border-b border-[#e6e8eb]">
        {/* Search Bar with Integrated MRT / Geolocation Icon */}
        <div className="relative flex items-center bg-white shadow-xs rounded-full px-4 py-2 border border-[#e6e8eb]">
          <span className="material-symbols-outlined text-[#006874] text-[22px] mr-2">subway</span>
          <input 
            className="w-full bg-transparent text-[13px] text-[#191c1e] placeholder:text-[#74777e] focus:outline-none" 
            placeholder="MRT / School / Area (e.g., Bishan, Woodleigh)" 
            type="text" 
            defaultValue="Woodleigh MRT, D13"
          />
          <button 
            onClick={() => onShowToast("Filter modal: Setting radius to 1km of Woodleigh")}
            aria-label="Filter" 
            className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] flex items-center justify-center text-[#14283f] transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Active Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#14283f] text-white rounded-full shrink-0 shadow-xs text-[11px] font-semibold">
            <span>All Residential</span>
            <span className="material-symbols-outlined text-[13px]">close</span>
          </div>
          <button 
            onClick={() => onShowToast("Price filter: Max S$1.8M")}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white text-[#191c1e] border border-[#e6e8eb] rounded-full shrink-0 shadow-xs text-[11px] font-medium hover:bg-[#f2f4f7]"
          >
            <span>Max S$1.8M</span>
            <span className="material-symbols-outlined text-[14px] text-[#74777e]">keyboard_arrow_down</span>
          </button>
          <button 
            onClick={() => onShowToast("Walkshed filter: ≤ 10m walk MRT active")}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white text-[#191c1e] border border-[#e6e8eb] rounded-full shrink-0 shadow-xs text-[11px] font-medium hover:bg-[#f2f4f7]"
          >
            <span>≤ 10m walk MRT</span>
            <span className="material-symbols-outlined text-[14px] text-[#006874]">directions_walk</span>
          </button>
          <button 
            onClick={() => onShowToast("Applied filters: School 1km, High Floor")}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#95f1ff] text-[#001f24] rounded-full shrink-0 shadow-xs text-[11px] font-bold"
          >
            <span>+2 Filters</span>
          </button>
        </div>

        {/* View Mode Segmented Switcher & Live Count Badge */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#44474d] uppercase tracking-wider font-semibold">Matched</span>
            <span className="px-2 py-0.5 rounded-full bg-[#002e1c] text-[#3c9f74] text-[10px] font-bold">
              48 Units Live
            </span>
          </div>

          <div className="inline-flex p-0.5 bg-[#f2f4f7] rounded-full shadow-inner border border-[#e6e8eb]">
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
                viewMode === 'map' ? 'bg-[#14283f] text-white shadow-xs' : 'text-[#44474d]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">map</span>
              <span>Map</span>
            </button>
            <button 
              onClick={() => {
                setViewMode('list');
                onShowToast("Displaying 48 units in D13 Woodleigh area");
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
                viewMode === 'list' ? 'bg-[#14283f] text-white shadow-xs' : 'text-[#44474d]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">view_list</span>
              <span>List (48)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[480px] overflow-hidden bg-[#eceef1]">
        {/* Background Ground Plane image */}
        <div 
          className="w-full h-full bg-cover bg-center absolute inset-0 opacity-80" 
          style={{ backgroundImage: `url(${ASSETS.mapBackground})` }}
        ></div>

        {/* Soft Vector Map Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#f7f9fc] via-transparent to-transparent opacity-60"></div>

        {/* Stylized Transit & Road Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-45" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,180 Q140,240 280,190 T480,260" fill="none" stroke="#79d4e2" strokeDasharray="3 4" strokeLinecap="round" strokeWidth="4"></path>
          <path d="M60,-20 L190,520" fill="none" stroke="#ffffff" strokeWidth="6"></path>
          <path d="M120,380 L390,120" fill="none" stroke="#ffffff" strokeWidth="5"></path>
          {/* North East Line (Purple MRT) */}
          <path d="M30,460 Q170,300 240,110" fill="none" stroke="#8b5cf6" strokeLinecap="round" strokeWidth="5"></path>
        </svg>

        {/* Map Layer Selector Floating Chips */}
        <div className="absolute top-3 inset-x-0 px-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar z-10">
          <button 
            onClick={() => setSelectedLayer('listings')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 shrink-0 transition-all ${
              selectedLayer === 'listings' ? 'bg-[#14283f] text-white' : 'bg-white/95 text-[#191c1e]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#95f1ff]"></span>
            Active Listings
          </button>
          <button 
            onClick={() => setSelectedLayer('transactions')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1 shrink-0 backdrop-blur-md transition-all ${
              selectedLayer === 'transactions' ? 'bg-[#14283f] text-white' : 'bg-white/95 text-[#191c1e]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#78d9aa]"></span>
            URA/HDB Deals
          </button>
          <button 
            onClick={() => setSelectedLayer('mrt')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1 shrink-0 backdrop-blur-md transition-all ${
              selectedLayer === 'mrt' ? 'bg-[#14283f] text-white' : 'bg-white/95 text-[#191c1e]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px] text-[#006874]">train</span>
            MRT (NEL/CCL)
          </button>
          <button 
            onClick={() => onShowToast("Rendering 1km MOE Primary School catchment")}
            className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#191c1e] text-[10px] font-bold shadow-sm shrink-0"
          >
            1km Pri Schools
          </button>
        </div>

        {/* Floating Map Controls (Right Side Quick Actions) */}
        <div className="absolute right-3 top-16 flex flex-col gap-2 z-10">
          <button 
            onClick={() => onShowToast("Radius tool activated: Drag to adjust search boundary")}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-[#e6e8eb] flex items-center justify-center text-[#14283f] active:scale-95 transition-transform" 
            title="Draw Radius"
          >
            <span className="material-symbols-outlined text-[20px]">gesture</span>
          </button>
          <button 
            onClick={() => onShowToast("GPS GPS centered on Woodleigh MRT Station (D13)")}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-[#e6e8eb] flex items-center justify-center text-[#006874] active:scale-95 transition-transform" 
            title="My Location"
          >
            <span className="material-symbols-outlined text-[20px]">my_location</span>
          </button>
          <button 
            onClick={() => onShowToast("Switched map skin to OneMap Night Mode")}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-[#e6e8eb] flex items-center justify-center text-[#44474d] active:scale-95 transition-transform" 
            title="Layers"
          >
            <span className="material-symbols-outlined text-[20px]">layers</span>
          </button>
          <button 
            onClick={() => onShowToast("Recenter view to Woodleigh (D13)")}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-[#e6e8eb] flex items-center justify-center text-[#44474d] active:scale-95 transition-transform" 
            title="Focus"
          >
            <span className="material-symbols-outlined text-[20px]">filter_center_focus</span>
          </button>
        </div>

        {/* Custom Branded Pin Markers */}
        {/* Pin 1: Target Pin (Park Colonial - Selected & Pulsing) */}
        <div 
          onClick={() => {
            setActivePin('park-colonial');
            onShowToast("Selected: Park Colonial #09-12 (S$1.29M)");
          }}
          className="absolute top-44 left-1/2 -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center cursor-pointer group"
        >
          <div className="px-2.5 py-1 rounded-full bg-[#14283f] text-white text-[12px] font-bold shadow-lg flex items-center gap-1 ring-2 ring-[#95f1ff] animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#95f1ff]"></span>
            <span>S$1.29M</span>
          </div>
          <div className="w-2 h-2 bg-[#14283f] rotate-45 -mt-1 shadow-xs"></div>
          <div className="w-8 h-2 bg-[#14283f]/20 rounded-full blur-[2px] mt-0.5"></div>
        </div>

        {/* Pin 2: Nearby Freehold */}
        <div 
          onClick={() => onShowToast("Upper Serangoon Freehold: S$1.45M")}
          className="absolute top-28 left-16 z-10 flex flex-col items-center cursor-pointer"
        >
          <div className="px-2 py-0.5 rounded-full bg-white text-[#191c1e] text-[10px] font-bold shadow-md border border-[#e6e8eb]">
            <span>S$1.45M</span>
          </div>
          <div className="w-1.5 h-1.5 bg-white rotate-45 -mt-1"></div>
        </div>

        {/* Pin 3: Bidadari HDB 4-Room Resale */}
        <div 
          onClick={() => onShowToast("Bidadari Alkaff Oasis (4-Room): S$720K")}
          className="absolute top-60 right-14 z-10 flex flex-col items-center cursor-pointer"
        >
          <div className="px-2 py-0.5 rounded-full bg-white text-[#002e1c] text-[10px] font-bold shadow-md flex items-center gap-0.5 border border-[#e6e8eb]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3c9f74]"></span>
            <span>S$720K</span>
          </div>
          <div className="w-1.5 h-1.5 bg-white rotate-45 -mt-1"></div>
        </div>

        {/* Pin 4: The Woodleigh Residences */}
        <div 
          onClick={() => onShowToast("The Woodleigh Residences: S$2.1M")}
          className="absolute top-36 right-8 z-10 flex flex-col items-center cursor-pointer"
        >
          <div className="px-2 py-0.5 rounded-full bg-white text-[#191c1e] text-[10px] font-bold shadow-md border border-[#e6e8eb]">
            <span>S$2.1M</span>
          </div>
          <div className="w-1.5 h-1.5 bg-white rotate-45 -mt-1"></div>
        </div>

        {/* Cluster Marker: Boon Keng / Potong Pasir (+14) */}
        <div 
          onClick={() => onShowToast("Expanding cluster: 14 units around Potong Pasir & Boon Keng")}
          className="absolute bottom-24 right-16 z-10 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-[#95f1ff] text-[#001f24] text-[12px] font-bold flex items-center justify-center shadow-md ring-4 ring-[#95f1ff]/30 active:scale-95 transition-transform">
            +14
          </div>
        </div>

        {/* Dynamic Transit MRT Station Pill on Map */}
        <div className="absolute top-52 left-20 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm border border-[#e6e8eb]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span>
          <span className="text-[10px] text-[#191c1e] font-bold">NE11 Woodleigh</span>
        </div>
      </div>

      {/* Bottom Sheet / Selected Property Detail Card */}
      <div className="relative -mt-10 z-30 px-4 pb-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 space-y-3 border border-[#e6e8eb]">
          {/* Drag Handle & Indicators */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-1 bg-[#e0e3e6] rounded-full mb-2"></div>
            <div className="w-full flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#d2e4ff] text-[#071c33] text-[10px] font-bold">
                  Condo · 99-yr
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#eceef1] text-[#44474d] text-[10px]">
                  District 13
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#44474d]">
                <button 
                  onClick={() => onShowToast("Park Colonial link copied to clipboard")}
                  className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] flex items-center justify-center active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button 
                  onClick={() => onShowToast("Saved Park Colonial to favorites")}
                  className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] flex items-center justify-center text-[#ba1a1a] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
            </div>
          </div>

          {/* Unit Title & Direct MRT Proximity */}
          <div className="space-y-0.5">
            <div className="flex items-start justify-between">
              <h2 className="text-[20px] font-bold text-[#001328] tracking-tight">Park Colonial</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#002e1c] text-[#94f6c4] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94f6c4] animate-pulse"></span>
                Verified
              </span>
            </div>
            <p className="text-[12px] text-[#44474d] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#006874]">location_on</span>
              <span>1 Woodleigh Lane · Adjacent Woodleigh MRT (NEL)</span>
            </p>
          </div>

          {/* Key Property Photo Thumbnail & Unit Spec Grid */}
          <div className="grid grid-cols-12 gap-2.5 items-center">
            <div className="col-span-4 rounded-xl overflow-hidden shadow-xs h-20 bg-[#eceef1]">
              <img 
                className="w-full h-full object-cover" 
                src={ASSETS.parkColonialThumb} 
                alt="Park Colonial facade" 
              />
            </div>
            <div className="col-span-8 grid grid-cols-2 gap-1.5 bg-[#f2f4f7] p-2 rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d]">Unit Type</span>
                <span className="text-[12px] text-[#001328] font-bold">2-Bed Compact</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d]">Size / Floor</span>
                <span className="text-[12px] text-[#001328] font-bold">603 sqft · Mid</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d]">Completion</span>
                <span className="text-[12px] text-[#001328] font-bold">TOP 2022</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#44474d]">Unit PSF</span>
                <span className="text-[12px] text-[#001328] font-bold">S$2,139 psf</span>
              </div>
            </div>
          </div>

          {/* Pricing & PropIntel AVM Valuation Matrix */}
          <div className="bg-[#f2f4f7] p-2.5 rounded-xl space-y-1.5 border border-[#e6e8eb]">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-[#44474d] block">Asking Price</span>
                <span className="text-[18px] font-bold text-[#001328]">S$1,290,000</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#95f1ff] text-[#001f24] text-[10px] font-bold">
                Fair Market Ask
              </span>
            </div>

            {/* PropIntel AVM */}
            <div className="bg-white p-2 rounded-lg shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#006874] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">auto_graph</span>
                  PropIntel AVM Estimate
                </span>
                <span className="text-[#005236] font-bold">High Confidence</span>
              </div>
              <div className="flex items-center justify-between text-[#191c1e]">
                <span className="text-[12px] font-bold">S$1,280,000 – S$1,330,000</span>
                <span className="text-[10px] text-[#44474d]">14 comparables / 6m</span>
              </div>
              {/* Gauge Bar */}
              <div className="w-full bg-[#e0e3e6] h-1.5 rounded-full overflow-hidden relative">
                <div className="h-full bg-[#79d4e2] rounded-full" style={{ width: '72%' }}></div>
                <div className="absolute top-0 bottom-0 left-[35%] w-1 bg-[#006874] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* OneMap Verified Distance Matrix */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#44474d] uppercase tracking-wider font-bold">
                OneMap Verified Distance Matrix
              </span>
              <span className="text-[10px] text-[#006874] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                SLA Sync
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-[#f2f4f7] p-2 rounded-xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-[#006874] text-[18px] mb-0.5">directions_walk</span>
                <span className="text-[11px] font-bold text-[#001328]">1 min · 80m</span>
                <span className="text-[10px] text-[#44474d] truncate">Woodleigh MRT</span>
              </div>
              <div className="bg-[#f2f4f7] p-2 rounded-xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-[#006874] text-[18px] mb-0.5">school</span>
                <span className="text-[11px] font-bold text-[#001328]">0.78 km</span>
                <span className="text-[10px] text-[#44474d] truncate">Cedar Primary</span>
              </div>
              <div className="bg-[#f2f4f7] p-2 rounded-xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-[#006874] text-[18px] mb-0.5">storefront</span>
                <span className="text-[11px] font-bold text-[#001328]">2 min · 120m</span>
                <span className="text-[10px] text-[#44474d] truncate">The Woodleigh Mall</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-1.5 pt-1">
            <button 
              onClick={() => onNavigate('property-detail')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#006874] hover:bg-[#005236] text-white text-[12px] font-semibold shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
            >
              <span>View Full Analysis &amp; Caveats</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button 
              onClick={() => onShowToast("Connecting to OneMap Transit Routing API...")}
              className="w-full py-2.5 px-4 rounded-xl bg-[#f2f4f7] hover:bg-[#eceef1] text-[#14283f] text-[12px] font-semibold active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006874]">alt_route</span>
              <span>Directions via OneMap Transit API</span>
            </button>
          </div>
        </div>
      </div>

      {/* Attribution Footer */}
      <div className="px-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-[#74777e] text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
          <span>Map Data © OneMap Singapore · SLA | Property records synced with URA &amp; HDB</span>
        </div>
      </div>
    </div>
  );
};
