import React, { useState } from 'react';
import { ScreenId } from '../types';

interface SellerPortalScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (message: string) => void;
}

interface Offer {
  id: string;
  name: string;
  amount: number;
  psf: number;
  bank: string;
  status: 'active' | 'countered' | 'accepted' | 'declined';
  otpDays: number;
  optionFee: number;
  completionWeeks: number;
  badge?: string;
  isCashRich?: boolean;
  expiresIn?: string;
}

export const SellerPortalScreen: React.FC<SellerPortalScreenProps> = ({ onNavigate, onShowToast }) => {
  const [askingPrice, setAskingPrice] = useState(1620000);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState(1620000);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [counterPrice, setCounterPrice] = useState('1,605,000');
  const [counterNote, setCounterNote] = useState('Highest floor unblocked view in stack 06; firm at S$1.605M with 14-day OTP.');
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [blackoutDate, setBlackoutDate] = useState('2025-05-03');

  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 'offer-1',
      name: 'Tan Wei Ming',
      amount: 1590000,
      psf: 1393,
      bank: 'IPA S$1.60M Approved · DBS Bank',
      status: 'active',
      otpDays: 14,
      optionFee: 15900,
      completionWeeks: 8,
      badge: 'Top Recommendation',
    },
    {
      id: 'offer-2',
      name: 'Dr. K. Rajan',
      amount: 1560000,
      psf: 1367,
      bank: 'Immediate Funds Available · No Contingency',
      status: 'active',
      otpDays: 14,
      optionFee: 15600,
      completionWeeks: 6,
      isCashRich: true,
      expiresIn: 'Expiring in 24h',
    },
  ]);

  const handleUpdatePrice = () => {
    setAskingPrice(tempPrice);
    setIsEditingPrice(false);
    onShowToast(`Target asking price updated to S$${tempPrice.toLocaleString()}`);
  };

  const handleOpenCounter = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowCounterModal(true);
  };

  const handleAcceptOffer = (offer: Offer) => {
    setOffers(prev => prev.map(o => o.id === offer.id ? { ...o, status: 'accepted' } : o));
    onShowToast(`Offer from ${offer.name} accepted at S$${offer.amount.toLocaleString()}! Agent notified.`);
  };

  const handleDeclineOffer = (offer: Offer) => {
    setOffers(prev => prev.map(o => o.id === offer.id ? { ...o, status: 'declined' } : o));
    onShowToast(`Offer from ${offer.name} declined.`);
  };

  const handleSubmitCounter = () => {
    if (!selectedOffer) return;
    setOffers(prev => prev.map(o => o.id === selectedOffer.id ? { ...o, status: 'countered' } : o));
    setShowCounterModal(false);
    onShowToast(`Counter-offer of S$${counterPrice} transmitted to ${selectedOffer.name}'s broker!`);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Subheader status */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16845B] animate-ping" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Official Property Owner Portal
          </span>
        </div>
        <span className="bg-[#14283F]/5 text-[#14283F] text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-semibold">
          <span className="material-symbols-outlined text-[13px] text-[#006874]">verified_user</span>
          URA &amp; HDB Synced
        </span>
      </div>

      {/* Active Property Master Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[140px] text-[#14283F]">apartment</span>
        </div>

        <div className="flex items-start justify-between relative z-10 mb-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Active Listing · Day 18 on Market
              </span>
              <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                SLA Verified Title
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#14283F] tracking-tight">Bishan Loft #14-06</h2>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#006874]">location_on</span>
              D20 · 33 Bishan St 21 · 3-Bed EC · 1,141 sqft (High Floor)
            </p>
          </div>

          <button
            onClick={() => setIsEditingPrice(!isEditingPrice)}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#14283F] hover:bg-[#95f1ff]/30 transition-colors shadow-sm shrink-0"
            title="Edit Asking Price"
          >
            <span className="material-symbols-outlined text-[19px]">edit_note</span>
          </button>
        </div>

        {/* Edit Price Drawer */}
        {isEditingPrice && (
          <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-700">Adjust Listing Asking Price:</div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">S$</span>
                <input
                  type="number"
                  step="10000"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-sm font-bold text-[#14283F]"
                />
              </div>
              <button
                onClick={handleUpdatePrice}
                className="bg-[#14283F] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-slate-800"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingPrice(false)}
                className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-lg hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Financial Metrics Ribbon */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 relative z-10">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Target Asking Price</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-extrabold text-[#14283F] tabular-nums">S${askingPrice.toLocaleString()}</span>
            </div>
            <span className="text-[11px] font-semibold text-[#006874] block">
              S${Math.round(askingPrice / 1141).toLocaleString()} psf · Firm
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">URA/AVM Valuation</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Parity 100%</span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-extrabold text-[#14283F] tabular-nums">S$1,620,000</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Optimal Sweet-Spot</span>
          </div>
        </div>
      </div>

      {/* Visual Traction & Funnel Vitals (2x2 Grid) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#14283F] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006874]">trending_up</span>
            Listing Performance &amp; Traction
          </h3>
          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">Past 7 Days</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Metric 1 */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Impressions</span>
              <span className="w-6 h-6 rounded-full bg-[#95f1ff]/40 text-[#006874] flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">visibility</span>
              </span>
            </div>
            <div className="my-1.5">
              <span className="text-xl font-extrabold text-[#14283F] tabular-nums">1,428</span>
              <span className="text-[10px] font-bold text-emerald-700 block">↑ +14% vs D20 avg</span>
            </div>
            <svg className="w-full h-4 text-[#006874] stroke-current fill-none stroke-[2]" viewBox="0 0 100 20">
              <path d="M0,15 Q25,18 45,10 T80,5 T100,2" />
            </svg>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Shortlisted</span>
              <span className="w-6 h-6 rounded-full bg-slate-100 text-rose-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </span>
            </div>
            <div className="my-1.5">
              <span className="text-xl font-extrabold text-[#14283F] tabular-nums">46 buyers</span>
              <span className="text-[10px] font-bold text-[#006874] block">High Buyer Interest</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#006874] h-full rounded-full" style={{ width: '78%' }} />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Viewings Done</span>
              <span className="w-6 h-6 rounded-full bg-slate-100 text-[#14283F] flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">meeting_room</span>
              </span>
            </div>
            <div className="my-1.5">
              <span className="text-xl font-extrabold text-[#14283F] tabular-nums">9 sessions</span>
              <span className="text-[10px] font-medium text-slate-500 block">3 scheduled this wknd</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-medium text-slate-600">Optimal Pace</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Formal Enquiries</span>
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">support_agent</span>
              </span>
            </div>
            <div className="my-1.5">
              <span className="text-xl font-extrabold text-[#14283F] tabular-nums">14 prospects</span>
              <span className="text-[10px] font-bold text-emerald-700 block">8 Pre-Approved IPA</span>
            </div>
            <span className="bg-[#006874]/10 text-[#006874] text-[10px] font-bold px-1.5 py-0.5 rounded self-start">
              57% Financially Ready
            </span>
          </div>
        </div>
      </div>

      {/* Active Inbound Offers & Negotiation Pipeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#14283F]">Inbound Offers &amp; Enquiries</h3>
            <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {offers.filter(o => o.status === 'active').length} Active
            </span>
          </div>
          <button
            onClick={() => onShowToast('Full digital audit trail & CEA contract logs export ready.')}
            className="text-[11px] font-bold text-[#006874] hover:underline"
          >
            Audit Trail
          </button>
        </div>

        {/* Offer Cards */}
        {offers.map((offer) => {
          const isOfferActive = offer.status === 'active';
          return (
            <div
              key={offer.id}
              className={`bg-white rounded-2xl p-4 border transition-all ${
                offer.status === 'accepted'
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : offer.status === 'declined'
                  ? 'border-slate-200 opacity-60'
                  : 'border-slate-200 shadow-sm'
              } relative overflow-hidden`}
            >
              {offer.badge && isOfferActive && (
                <div className="absolute top-0 right-0 bg-[#14283F] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#95f1ff]">stars</span>
                  {offer.badge}
                </div>
              )}

              {offer.expiresIn && isOfferActive && (
                <span className="absolute top-3 right-3 bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">timer</span>
                  {offer.expiresIn}
                </span>
              )}

              <div className="pr-20 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#14283F]">{offer.name}</span>
                  {offer.isCashRich && (
                    <span className="bg-[#006874]/10 text-[#006874] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      Cash Rich
                    </span>
                  )}
                  {offer.status === 'accepted' && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Accepted
                    </span>
                  )}
                  {offer.status === 'countered' && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Counter Sent
                    </span>
                  )}
                  {offer.status === 'declined' && (
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Declined
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-[#006874] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  {offer.bank}
                </span>
              </div>

              {/* Offer Metrics */}
              <div className="my-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-500">Offered Purchase Price</span>
                  <span className="text-lg font-extrabold text-[#14283F] tabular-nums">
                    S${offer.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>S${offer.psf.toLocaleString()} psf</span>
                  <span className="text-[#006874] font-bold">
                    {((offer.amount / askingPrice) * 100).toFixed(1)}% of Asking (-S${((askingPrice - offer.amount) / 1000).toFixed(0)}k)
                  </span>
                </div>
              </div>

              {/* Terms Breakdown */}
              <div className="grid grid-cols-3 gap-1.5 mb-3 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="block text-[#14283F] font-bold">{offer.otpDays}-Day</span>
                  <span className="text-[10px] text-slate-500">OTP Validity</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="block text-[#14283F] font-bold">1% S${(offer.optionFee / 1000).toFixed(1)}k</span>
                  <span className="text-[10px] text-slate-500">Option Fee</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="block text-[#14283F] font-bold">{offer.completionWeeks} Weeks</span>
                  <span className="text-[10px] text-slate-500">Completion</span>
                </div>
              </div>

              {/* Negotiation Action Strip */}
              {isOfferActive ? (
                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => handleAcceptOffer(offer)}
                    className="flex-1 py-2.5 bg-[#14283F] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors text-center shadow-sm"
                  >
                    Accept Offer
                  </button>
                  <button
                    onClick={() => handleOpenCounter(offer)}
                    className="flex-1 py-2.5 bg-[#95f1ff] text-[#001f24] text-xs font-bold rounded-xl hover:bg-[#79d4e2] transition-colors text-center"
                  >
                    Counter-Offer
                  </button>
                  <button
                    onClick={() => handleDeclineOffer(offer)}
                    className="px-3 py-2.5 bg-slate-100 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                </div>
              ) : (
                <div className="text-center py-1 text-xs font-bold text-slate-500">
                  {offer.status === 'accepted' ? 'Deal in legal conveyance. OTP being drafted.' : 'This offer has been processed.'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming Viewings Cadence & Schedule */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#14283F] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006874]">calendar_month</span>
            Upcoming Viewings
          </h3>
          <span className="text-[10px] font-bold text-slate-500">Calendar Sync Active</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          {/* Viewing 1 */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-[#14283F] text-white flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider">Sat</span>
              <span className="text-base font-extrabold leading-none">28</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14283F]">2:30 PM – 3:15 PM</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Confirmed
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate mt-0.5">Marcus &amp; Cheryl Lim</p>
              <p className="text-[11px] text-slate-500">Accompanied by Eileen Tan (PropNex Lead Agent)</p>
            </div>
          </div>

          {/* Viewing 2 */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-200 text-[#14283F] flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider">Sun</span>
              <span className="text-base font-extrabold leading-none">29</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14283F]">4:00 PM – 5:00 PM</span>
                <span className="bg-[#95f1ff] text-[#001f24] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  2 Buyers
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate mt-0.5">Open House Inspection Window</p>
              <p className="text-[11px] text-slate-500">Passcode Access / Reception desk briefed</p>
            </div>
          </div>

          <button
            onClick={() => setShowCalendarModal(true)}
            className="w-full py-2.5 bg-slate-100 text-[#14283F] text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">add_alarm</span>
            + Add Blackout Dates / Manage Access
          </button>
        </div>
      </div>

      {/* Submarket Pulse & Direct Bishan Loft Comps */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#14283F] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006874]">pie_chart</span>
            Submarket Pulse &amp; Direct Comps
          </h3>
          <span className="text-[10px] font-bold text-[#006874]">URA Real-time</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-[#14283F]">3 Competing Units in Bishan Loft</span>
            <span className="text-[11px] font-semibold text-slate-500">D20 Inventory: -4% QoQ (Tight)</span>
          </div>

          {/* Comp 1 */}
          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#14283F]">#11-02 (Stack 02)</span>
                <span className="text-[11px] text-slate-500">1,141 sqft</span>
              </div>
              <span className="text-xs text-slate-600">Asking S$1.63M (S$1,428 psf) · 32 days</span>
            </div>
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">Higher Floor</span>
          </div>

          {/* Comp 2 */}
          <div className="flex items-center justify-between py-1.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#14283F]">#08-04 (Stack 04)</span>
                <span className="text-[11px] text-slate-500">1,141 sqft</span>
              </div>
              <span className="text-xs text-slate-600">Asking S$1.58M (S$1,385 psf) · OTP Issued</span>
            </div>
            <span className="bg-[#95f1ff] text-[#001f24] text-[10px] font-bold px-2 py-0.5 rounded">Offer Pending</span>
          </div>

          {/* Submarket Advisory Note */}
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[17px] text-[#006874] mt-0.5 shrink-0">lightbulb</span>
            <p className="text-xs text-slate-700 leading-snug">
              <span className="font-bold text-[#14283F]">Strategic Pricing Edge:</span> Since #08-04 is under option at ~S$1.58M, your #14-06 (high floor unblocked) is currently the highest-converting active unit.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Strategic Proceeds Calculator CTA */}
      <div className="space-y-2">
        <button
          onClick={() => onNavigate('seller-strategy')}
          className="w-full p-4 bg-[#14283F] text-white rounded-2xl shadow-md hover:bg-slate-800 transition-all text-left flex items-center justify-between group"
        >
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#95f1ff] uppercase tracking-wider">Interactive Seller Model</span>
            <h4 className="text-sm font-bold text-white group-hover:text-[#95f1ff] transition-colors">
              Selling Price &amp; Net Cash Proceeds Strategy
            </h4>
            <p className="text-xs text-slate-300">
              Calculate CPF OA refund + 2.5% accrued interest, bank loan payback &amp; cash in hand.
            </p>
          </div>
          <span className="material-symbols-outlined text-[24px] text-[#95f1ff] shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        {/* Secondary Quick Utilities */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigate('marketing-kit')}
            className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors text-left flex items-center gap-2.5"
          >
            <span className="w-8 h-8 rounded-xl bg-slate-100 text-[#006874] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">file_download</span>
            </span>
            <div>
              <span className="text-xs font-bold text-[#14283F] block leading-tight">Master Marketing Kit</span>
              <span className="text-[10px] text-slate-500">Floorplan CAD &amp; Comps</span>
            </div>
          </button>

          <button
            onClick={() => onShowToast('Connecting you directly with Lead Agent Eileen Tan (+65 9123 4567)...')}
            className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors text-left flex items-center gap-2.5"
          >
            <span className="w-8 h-8 rounded-xl bg-[#95f1ff] text-[#001f24] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </span>
            <div>
              <span className="text-xs font-bold text-[#14283F] block leading-tight">Eileen Tan</span>
              <span className="text-[10px] text-[#006874] font-semibold">PropNex Lead Agent</span>
            </div>
          </button>
        </div>
      </div>

      {/* Regulatory Footer */}
      <div className="pt-2 text-center space-y-1 text-slate-500">
        <div className="flex items-center justify-center gap-2">
          <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px] font-semibold">CEA License: R048291J</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px] font-semibold">URA REALIS Feed v4</span>
        </div>
        <p className="text-[10px]">
          Data calibrated against Singapore Land Authority (SLA) Title Cadastre and MAS Residential Mortgage Directives.
        </p>
      </div>

      {/* Counter Offer Modal */}
      {showCounterModal && selectedOffer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-[#14283F]">Submit Counter-Offer</h3>
                <p className="text-xs text-slate-500">To Buyer: {selectedOffer.name} (Current: S${selectedOffer.amount.toLocaleString()})</p>
              </div>
              <button onClick={() => setShowCounterModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Counter Price (S$)</label>
                <input
                  type="text"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-[#14283F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Counter Condition / Message</label>
                <textarea
                  rows={3}
                  value={counterNote}
                  onChange={(e) => setCounterNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-700"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSubmitCounter}
                className="flex-1 py-2.5 bg-[#006874] text-white text-xs font-bold rounded-xl hover:bg-[#00525c] transition-colors"
              >
                Transmit Counter-Offer
              </button>
              <button
                onClick={() => setShowCounterModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Blackout Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-[#14283F]">Manage Viewing Availability</h3>
                <p className="text-xs text-slate-500">Block dates or set access instructions for agents</p>
              </div>
              <button onClick={() => setShowCalendarModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Blackout Date</label>
                <input
                  type="date"
                  value={blackoutDate}
                  onChange={(e) => setBlackoutDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#14283F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Access Notes for Concierge</label>
                <input
                  type="text"
                  defaultValue="Family resting. Strictly no open-house viewings between 12-2 PM."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowCalendarModal(false);
                  onShowToast(`Viewing calendar updated: Blackout confirmed for ${blackoutDate}`);
                }}
                className="flex-1 py-2.5 bg-[#14283F] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Save Availability
              </button>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
