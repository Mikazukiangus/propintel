import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/assets';

interface MarketingKitScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const MarketingKitScreen: React.FC<MarketingKitScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [activeMediaFilter, setActiveMediaFilter] = useState<string>('all');
  const [isCADViewerOpen, setIsCADViewerOpen] = useState(false);

  const copyPitchCheatSheet = () => {
    const text = `BISHAN LOFT #14-06 PITCH POINTS:
1. True North-South Orientation: High floor #14 stack, unblocked breeze, zero west sun.
2. 1km Elite School: Catholic High School Primary (Phase 2C Priority).
3. 420m Sheltered Walk: Direct covered pathway to Bishan MRT Interchange & Junction 8.
4. Fully Privatised EC: Pure selling transaction, no ethnic quota restrictions.`;
    navigator.clipboard?.writeText(text);
    onShowToast("All 4 pitch cheat-sheet points copied for WhatsApp!");
  };

  return (
    <div className="flex flex-col w-full pb-14 pt-2 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Context Header Card */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-[#eceef1] px-2.5 py-0.5 rounded-full border border-[#e6e8eb]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006874] inline-block animate-pulse"></span>
            <span className="text-[10px] text-[#006874] uppercase tracking-wider font-bold">Active Kit v2.1</span>
          </div>
          <div className="flex items-center gap-1 bg-[#e6e8eb] px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[13px] text-[#005236]">verified</span>
            <span className="text-[10px] text-[#001328] font-bold">SLA Cadastral Verified</span>
          </div>
        </div>

        <div className="flex flex-col mt-0.5">
          <h1 className="text-[20px] font-bold text-[#001328] tracking-tight">Bishan Loft #14-06</h1>
          <p className="text-[12px] text-[#44474d] flex items-center gap-1">
            <span>33 Bishan Street 11, D20 · Stack 06</span>
            <span>•</span>
            <span className="text-[#006874] font-semibold">Bishan-AMK Park Facing</span>
          </p>
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <div className="inline-flex items-center gap-1.5 bg-[#14283f] text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs">
            <span className="material-symbols-outlined text-[13px] text-[#95f1ff]">storefront</span>
            <span>Seller Marketing Mode</span>
          </div>
          <span className="text-[10px] text-[#44474d]">CEA Co-Broke Clearance Approved</span>
        </div>
      </div>

      {/* Primary Quick Action Hub */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#74777e] uppercase tracking-wider font-bold">Verified Master Asset Package</span>
            <span className="text-[15px] font-bold text-[#001328]">Master Marketing Kit</span>
          </div>
          <span className="bg-[#95f1ff] text-[#001f24] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            38.4 MB ZIP
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#44474d]">
          <div className="flex items-center gap-1.5 bg-[#f2f4f7] px-2.5 py-1.5 rounded-lg border border-[#e6e8eb]">
            <span className="material-symbols-outlined text-[16px] text-[#006874]">picture_as_pdf</span>
            <span className="truncate font-semibold text-[#001328]">12p HD PDF Dossier</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f2f4f7] px-2.5 py-1.5 rounded-lg border border-[#e6e8eb]">
            <span className="material-symbols-outlined text-[16px] text-[#006874]">architecture</span>
            <span className="truncate font-semibold text-[#001328]">CAD &amp; DWG Schematics</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f2f4f7] px-2.5 py-1.5 rounded-lg border border-[#e6e8eb]">
            <span className="material-symbols-outlined text-[16px] text-[#006874]">photo_camera</span>
            <span className="truncate font-semibold text-[#001328]">18x 4K Pro Photography</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f2f4f7] px-2.5 py-1.5 rounded-lg border border-[#e6e8eb]">
            <span className="material-symbols-outlined text-[16px] text-[#006874]">view_in_ar</span>
            <span className="truncate font-semibold text-[#001328]">Matterport 3D Tour</span>
          </div>
        </div>

        <div className="flex gap-2 pt-0.5">
          <button 
            onClick={() => onShowToast("Downloading Bishan_Loft_Master_Kit.zip (38.4 MB)...")}
            className="flex-1 bg-[#001328] hover:bg-[#14283f] text-white py-2.5 px-3 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined text-[17px] text-[#95f1ff]">cloud_download</span>
            <span>Download All (.ZIP)</span>
          </button>
          <button 
            onClick={() => onShowToast("Client Passcode Link dispatched to WhatsApp clipboard!")}
            className="bg-[#002e1c] hover:bg-[#00170c] text-[#94f6c4] py-2.5 px-3 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined text-[17px]">share</span>
            <span>Dispatch Link</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 text-[10px] text-[#44474d] border-t border-[#f2f4f7]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#006874]">lock</span>
            <span>Client Passcode: <span className="text-[#001328] font-bold">BL1406</span></span>
          </div>
          <button 
            onClick={() => onShowToast("Passcode security set: Expires in 14 days")}
            className="text-[#006874] font-bold hover:underline flex items-center gap-0.5"
          >
            <span>Edit Security</span>
            <span className="material-symbols-outlined text-[12px]">tune</span>
          </button>
        </div>
      </div>

      {/* Architectural Floorplan & Cadastral Dossier Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#001328]">straighten</span>
            <h2 className="text-[14px] font-bold text-[#001328]">Architectural &amp; Strata Specs</h2>
          </div>
          <span className="text-[10px] font-bold bg-[#eceef1] text-[#44474d] px-2 py-0.5 rounded-full">
            Type C2 · Stack 06
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-[#e6e8eb] overflow-hidden">
          {/* Architectural Graphic Box */}
          <div className="relative bg-[#f2f4f7] p-4 flex flex-col items-center justify-center border-b border-[#e6e8eb]">
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              <span className="bg-[#14283f] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                High Floor · #14-06
              </span>
              <span className="bg-white/95 text-[#001328] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-[#e6e8eb]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
                Zero Afternoon Sun
              </span>
            </div>

            <div className="absolute top-3 right-3 bg-white/95 p-1.5 rounded-lg shadow-xs flex flex-col items-center border border-[#e6e8eb]">
              <span className="text-[9px] font-bold text-[#001328]">N</span>
              <span className="material-symbols-outlined text-[16px] text-[#006874]">navigation</span>
            </div>

            {/* Vector Floorplan Wireframe */}
            <div className="w-full max-w-[320px] py-2 flex flex-col items-center">
              <svg className="w-full h-44 text-[#001328]" fill="none" viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#FFFFFF" height="140" rx="4" stroke="#14283F" strokeWidth="2.5" width="300" x="20" y="20"></rect>
                <rect fill="#95F1FF" fillOpacity="0.15" height="75" stroke="#74777E" strokeDasharray="2 2" width="115" x="25" y="25"></rect>
                <text fill="#14283F" fontFamily="Inter" fontSize="9" fontWeight="700" x="32" y="42">LIVING &amp; DINING</text>
                <text fill="#006874" fontFamily="Inter" fontSize="8" fontWeight="600" x="32" y="55">7.2m × 3.8m</text>
                
                <rect fill="#94F6C4" fillOpacity="0.25" height="50" stroke="#74777E" width="115" x="25" y="105"></rect>
                <text fill="#005236" fontFamily="Inter" fontSize="9" fontWeight="700" x="32" y="125">BALCONY</text>
                <text fill="#44474D" fontFamily="Inter" fontSize="8" x="32" y="137">Park View (North)</text>

                <rect fill="#ECEEF1" height="85" stroke="#14283F" strokeWidth="1.5" width="95" x="145" y="25"></rect>
                <text fill="#14283F" fontFamily="Inter" fontSize="8.5" fontWeight="700" x="150" y="42">MASTER BEDROOM</text>
                <text fill="#006874" fontFamily="Inter" fontSize="8" fontWeight="600" x="150" y="55">4.2m × 3.4m</text>
                
                <rect fill="#FFFFFF" height="35" stroke="#74777E" width="40" x="195" y="70"></rect>
                <text fill="#44474D" fontFamily="Inter" fontSize="7" x="198" y="85">M-Bath</text>

                <rect fill="#FFFFFF" height="48" stroke="#74777E" width="70" x="245" y="25"></rect>
                <text fill="#14283F" fontFamily="Inter" fontSize="8" fontWeight="600" x="250" y="40">BEDROOM 2</text>
                <text fill="#44474D" fontFamily="Inter" fontSize="7" x="250" y="51">3.2m × 3.0m</text>

                <rect fill="#FFFFFF" height="48" stroke="#74777E" width="70" x="245" y="77"></rect>
                <text fill="#14283F" fontFamily="Inter" fontSize="8" fontWeight="600" x="250" y="92">BEDROOM 3</text>
                <text fill="#44474D" fontFamily="Inter" fontSize="7" x="250" y="103">3.2m × 3.0m</text>

                {/* BCA Hackable wall */}
                <rect fill="#FFE5D9" fillOpacity="0.45" height="40" stroke="#BA1A1A" strokeDasharray="3 2" strokeWidth="1.2" width="95" x="145" y="115"></rect>
                <text fill="#14283F" fontFamily="Inter" fontSize="8" fontWeight="700" x="150" y="130">KITCHEN / YARD</text>
                <text fill="#BA1A1A" fontFamily="Inter" fontSize="7" fontWeight="700" x="150" y="141">BCA Hackable Drywall</text>

                <rect fill="#FFFFFF" height="25" stroke="#74777E" width="70" x="245" y="130"></rect>
                <text fill="#44474D" fontFamily="Inter" fontSize="7" x="250" y="145">Yard + WC + Store</text>
              </svg>
            </div>

            <button 
              onClick={() => onShowToast("High-resolution CAD blueprint viewer opened in full-scale")}
              className="mt-1 bg-white hover:bg-[#f2f4f7] text-[#001328] px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-xs border border-[#e6e8eb] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[15px] text-[#006874]">zoom_in</span>
              <span>Open High-Res Interactive Viewer (CAD/SLA)</span>
            </button>
          </div>

          {/* Dimension Grid */}
          <div className="p-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 pb-1 border-b border-[#f2f4f7]">
              <div>
                <span className="text-[10px] text-[#74777e] block font-semibold">Strata Size Area</span>
                <span className="text-[15px] font-bold text-[#001328]">1,141 sqft <span className="text-[11px] font-normal text-[#74777e]">(106 sqm)</span></span>
              </div>
              <div>
                <span className="text-[10px] text-[#74777e] block font-semibold">Layout Configuration</span>
                <span className="text-[15px] font-bold text-[#001328]">3 Bed + Yard</span>
              </div>
              <div>
                <span className="text-[10px] text-[#74777e] block font-semibold">Main Living Orientation</span>
                <span className="text-[14px] font-bold text-[#001328] flex items-center gap-1">
                  <span>North-South</span>
                  <span className="material-symbols-outlined text-[#006874] text-[16px]">check_circle</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#74777e] block font-semibold">Property Tenure</span>
                <span className="text-[14px] font-bold text-[#001328]">99-Yr Privatised EC</span>
              </div>
            </div>

            {/* BCA Advisory */}
            <div className="bg-[#f2f4f7] p-2.5 rounded-lg flex items-start gap-2 border border-[#e6e8eb]">
              <span className="material-symbols-outlined text-[17px] text-[#006874] mt-0.5">construction</span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#001328]">BCA Reconfiguration Pre-Clearance</span>
                <p className="text-[10px] text-[#44474d] mt-0.5 leading-relaxed">
                  The kitchen dry-wall barrier is non-load-bearing. Pre-cleared for open-concept island conversion without structural BCA submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media & Virtual Assets */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#001328]">photo_library</span>
            <h2 className="text-[14px] font-bold text-[#001328]">Media &amp; Virtual Assets</h2>
          </div>
          <span className="text-[10px] text-[#006874] font-bold">18 Assets Verified</span>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {['all', 'staged', 'matterport', 'drone'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveMediaFilter(f)}
              className={`text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                activeMediaFilter === f ? 'bg-[#14283f] text-white shadow-xs' : 'bg-[#f2f4f7] text-[#44474d] border border-[#e6e8eb]'
              }`}
            >
              {f === 'all' ? 'All (18)' : f === 'staged' ? 'Staged (12)' : f === 'matterport' ? '3D Matterport' : 'Drone Aerial'}
            </button>
          ))}
        </div>

        {/* Featured Hero Photo */}
        <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#e6e8eb] flex flex-col">
          <div className="relative w-full h-48 bg-[#eceef1] overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={ASSETS.bishanLoftHeroWide} 
              alt="Bishan Loft Living & Dining" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001328]/80 via-transparent to-transparent"></div>
            
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006874]"></span>
              <span className="text-[9px] text-[#001328] font-bold">Featured Hero</span>
            </div>
            
            <div className="absolute top-2.5 right-2.5 bg-[#001328]/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              4K HDR · 300 DPI
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
              <div>
                <p className="text-[14px] font-bold leading-tight">Living &amp; Dining Hall</p>
                <p className="text-[10px] text-[#b4c8e6]">Unobstructed Bishan-AMK Park Line</p>
              </div>
              <button 
                onClick={() => onShowToast("Downloading 4K HDR Hero image (14.2 MB)...")}
                className="w-8 h-8 rounded-full bg-white text-[#001328] flex items-center justify-center shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
              </button>
            </div>
          </div>

          {/* Mosaic Thumbnails */}
          <div className="p-2 grid grid-cols-3 gap-1.5">
            <div className="relative h-20 rounded-lg overflow-hidden bg-[#eceef1]">
              <img className="w-full h-full object-cover" src={ASSETS.masterSuite} alt="Master Suite" />
              <div className="absolute bottom-1 left-1 bg-[#001328]/80 text-white text-[8px] font-semibold px-1 rounded">Master Suite</div>
            </div>
            <div className="relative h-20 rounded-lg overflow-hidden bg-[#eceef1]">
              <img className="w-full h-full object-cover" src={ASSETS.chefsKitchen} alt="Chef's Kitchen" />
              <div className="absolute bottom-1 left-1 bg-[#001328]/80 text-white text-[8px] font-semibold px-1 rounded">Chef's Kitchen</div>
            </div>
            <div className="relative h-20 rounded-lg overflow-hidden bg-[#eceef1]">
              <img className="w-full h-full object-cover" src={ASSETS.parkBalcony} alt="Park Balcony" />
              <div className="absolute bottom-1 left-1 bg-[#001328]/80 text-white text-[8px] font-semibold px-1 rounded">Park Balcony</div>
            </div>
          </div>
        </div>

        {/* Matterport Module */}
        <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#95f1ff]/40 text-[#006f7b] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#001328]">Matterport Pro 3D Walkthrough</span>
                <span className="text-[10px] text-[#74777e] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3c9f74]"></span>
                  142 virtual tours completed this week
                </span>
              </div>
            </div>
            <button 
              onClick={() => onShowToast("Launching Matterport 360 viewer...")}
              className="bg-[#006874] hover:bg-[#005236] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[13px]">play_arrow</span>
              <span>Launch 360°</span>
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#f2f4f7] px-3 py-2 rounded-lg border border-[#e6e8eb]">
            <span className="text-[11px] text-[#44474d] truncate font-mono">https://my.matterport.com/show/?m=sg_bl1406</span>
            <button 
              onClick={() => {
                navigator.clipboard?.writeText('https://my.matterport.com/show/?m=sg_bl1406');
                onShowToast("Matterport 3D link copied to clipboard");
              }}
              className="text-[#006874] text-[11px] font-bold flex items-center gap-1 shrink-0 ml-2"
            >
              <span className="material-symbols-outlined text-[15px]">content_copy</span>
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marketing Collateral Templates */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#001328]">campaign</span>
            <h2 className="text-[14px] font-bold text-[#001328]">Marketing Collateral Templates</h2>
          </div>
          <span className="text-[10px] text-[#74777e] font-semibold">CEA Compliant</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {/* 9:16 Reel */}
          <div className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#f2f4f7] flex items-center justify-center text-[#001328] border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#001328]">Instagram Reel / TikTok Story (9:16)</span>
                <span className="text-[10px] text-[#74777e]">Animated room transitions &amp; price badge</span>
              </div>
            </div>
            <button 
              onClick={() => onShowToast("Downloading 9:16 Reel video template...")}
              className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[17px]">file_download</span>
            </button>
          </div>

          {/* 16:9 Portal Banner */}
          <div className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#f2f4f7] flex items-center justify-center text-[#001328] border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[20px]">web</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#001328]">Portal Listing Hero Banner (16:9)</span>
                <span className="text-[10px] text-[#74777e]">Pre-formatted for PropertyGuru &amp; 99.co</span>
              </div>
            </div>
            <button 
              onClick={() => onShowToast("Downloading 16:9 Portal Banner pack...")}
              className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[17px]">file_download</span>
            </button>
          </div>

          {/* A4 Brochure */}
          <div className="bg-white p-3 rounded-xl border border-[#e6e8eb] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#f2f4f7] flex items-center justify-center text-[#001328] border border-[#e6e8eb]">
                <span className="material-symbols-outlined text-[20px]">print</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#001328]">A4 Print Brochure (2-Page CMYK)</span>
                <span className="text-[10px] text-[#74777e]">With Eileen Tan (CEA: R014829E) QR code</span>
              </div>
            </div>
            <button 
              onClick={() => onShowToast("Downloading printable CMYK A4 PDF...")}
              className="w-8 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[17px]">file_download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Agent Pitch Cheat-Sheet */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#001328]">fact_check</span>
            <h2 className="text-[14px] font-bold text-[#001328]">Agent Pitch Cheat-Sheet</h2>
          </div>
          <button 
            onClick={copyPitchCheatSheet}
            className="bg-[#f2f4f7] hover:bg-[#eceef1] text-[#001328] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-[#e6e8eb]"
          >
            <span className="material-symbols-outlined text-[13px] text-[#006874]">content_copy</span>
            <span>Copy All Points</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e6e8eb] flex flex-col gap-2.5 text-[11px]">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f2f4f7] flex items-center justify-center text-[#006874] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[13px]">wb_sunny</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#001328]">True North-South Orientation</p>
              <p className="text-[#44474d] text-[10px]">High floor #14 stack with unblocked breeze, cross-ventilation, and zero west afternoon heat penetrating the living or bedrooms.</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f2f4f7] flex items-center justify-center text-[#006874] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[13px]">school</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#001328]">1km Elite School Buffer (Catholic High)</p>
              <p className="text-[#44474d] text-[10px]">Within the prestigious 1km perimeter of Catholic High School (Primary Phase 2C priority) and Kuo Chuan Presbyterian.</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f2f4f7] flex items-center justify-center text-[#006874] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[13px]">directions_subway</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#001328]">420m Sheltered MRT Walk</p>
              <p className="text-[#44474d] text-[10px]">Direct covered pathway to Bishan MRT Interchange (North-South &amp; Circle Lines) and Junction 8 Shopping Centre.</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f2f4f7] flex items-center justify-center text-[#006874] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[13px]">real_estate_agent</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#001328]">Fully Privatised EC Status</p>
              <p className="text-[#44474d] text-[10px]">Zero ethnic quota restrictions. Pure selling transaction with no extension of stay required by seller.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointed CEA Exclusive Agent */}
      <div className="bg-[#14283f] text-white p-4 rounded-xl shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#7c8fab] uppercase tracking-wider font-bold">Appointed CEA Exclusive Agent</span>
          <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">PropNex Realty</span>
        </div>

        <div className="flex items-center gap-3">
          <img 
            alt="Eileen Tan" 
            className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-[#006874]" 
            src={ASSETS.agentEileenProfile} 
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] font-bold text-white leading-tight">Eileen Tan</span>
            <span className="text-[11px] text-[#7c8fab]">Associate Branch Director · CEA: R014829E</span>
            <span className="text-[11px] text-[#94f6c4] font-semibold mt-0.5">+65 9182 3456</span>
          </div>
        </div>

        <div className="bg-white/10 p-2.5 rounded-lg flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#94f6c4]">insights</span>
            <div className="flex flex-col">
              <span className="font-bold text-white">86 Prospective Buyer Downloads</span>
              <span className="text-[10px] text-[#7c8fab]">14 Co-broke agents requested viewings</span>
            </div>
          </div>
          <span className="text-[14px] font-bold text-[#94f6c4]">+24%</span>
        </div>

        <div className="flex gap-2 pt-0.5">
          <button 
            onClick={() => onShowToast("Connecting to Eileen Tan (+65 9182 3456)...")}
            className="flex-1 bg-white hover:bg-[#f2f4f7] text-[#001328] py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined text-[15px] text-[#006874]">call</span>
            <span>Call Agent</span>
          </button>
          <button 
            onClick={() => onShowToast("WhatsApp sync active with PropNex network")}
            className="flex-1 bg-[#006874] hover:bg-[#005236] text-white py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined text-[15px]">chat</span>
            <span>WhatsApp Sync</span>
          </button>
        </div>
      </div>
    </div>
  );
};
