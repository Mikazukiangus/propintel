import React, { useState } from 'react';
import { ScreenId, ALL_SCREENS, PersonaType } from '../types';

interface ScreenSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId, persona?: PersonaType) => void;
}

export const ScreenSwitcherModal: React.FC<ScreenSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeScreen,
  onSelectScreen,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Core', 'Financial & Valuation', 'Seller & Marketing', 'Agent Advisory'];

  const filteredScreens = ALL_SCREENS.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.persona.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#001328]/70 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-[#e6e8eb]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#e6e8eb] flex items-center justify-between bg-[#f7f9fc]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006874]/10 text-[#006874] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#001328]">All 15 Screens Navigator</h2>
              <p className="text-[11px] text-[#44474d]">Switch between any view across Buyer, Seller & Agent flows</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eceef1] hover:bg-[#e0e3e6] flex items-center justify-center text-[#44474d] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="p-3 border-b border-[#e6e8eb] bg-white space-y-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#74777e]">search</span>
            <input
              type="text"
              placeholder="Search screen by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#f2f4f7] rounded-lg text-[13px] text-[#191c1e] placeholder:text-[#74777e] focus:outline-none focus:ring-2 focus:ring-[#006874]/30"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#14283f] text-white shadow-xs'
                    : 'bg-[#f2f4f7] text-[#44474d] hover:bg-[#eceef1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Screen Cards List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[50vh]">
          {filteredScreens.map((screen, idx) => {
            const isCurrent = activeScreen === screen.id;
            return (
              <div
                key={screen.id}
                onClick={() => {
                  onSelectScreen(screen.id, screen.persona);
                  onClose();
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                  isCurrent
                    ? 'bg-[#006874]/5 border-[#006874] ring-1 ring-[#006874]/30 shadow-sm'
                    : 'bg-white border-[#e6e8eb] hover:border-[#006874]/40 hover:bg-[#f7f9fc]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? 'bg-[#006874] text-white'
                        : 'bg-[#f2f4f7] text-[#14283f] group-hover:bg-[#006874]/10 group-hover:text-[#006874]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[19px]">{screen.icon}</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-[#74777e]">#{idx + 1}</span>
                      <h3 className="text-[13px] font-bold text-[#001328] truncate group-hover:text-[#006874] transition-colors">
                        {screen.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#44474d] mt-0.5">
                      <span className="uppercase font-semibold tracking-wider text-[#006874]">
                        {screen.persona}
                      </span>
                      <span>•</span>
                      <span className="truncate">{screen.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {screen.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#006874] text-[10px] font-bold">
                      {screen.badge}
                    </span>
                  )}
                  {isCurrent ? (
                    <span className="material-symbols-outlined text-[18px] text-[#006874]">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px] text-[#c4c6cd] group-hover:text-[#006874] transition-colors">
                      chevron_right
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e6e8eb] bg-[#f7f9fc] flex items-center justify-between text-[11px] text-[#44474d]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006874]"></span>
            All 15 Screens Built to High-Fidelity Standard
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-[#14283f] text-white font-semibold text-[11px] hover:bg-[#001328]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
