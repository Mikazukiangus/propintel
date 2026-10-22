export type PersonaType = 'buyer' | 'seller' | 'agent';

export type ScreenId =
  | 'home'
  | 'explore'
  | 'valuation'
  | 'caveats'
  | 'property-detail'
  | 'rental-investment'
  | 'seller-strategy'
  | 'affordability-tdsr'
  | 'mortgage-rates'
  | 'market-intelligence'
  | 'agent-dashboard'
  | 'client-matching'
  | 'report-builder'
  | 'marketing-kit'
  | 'seller-portal';

export interface ScreenMeta {
  id: ScreenId;
  title: string;
  category: 'Core' | 'Financial & Valuation' | 'Seller & Marketing' | 'Agent Advisory';
  persona: PersonaType;
  badge?: string;
  icon: string;
}

export const ALL_SCREENS: ScreenMeta[] = [
  { id: 'home', title: 'Buyer Home & Market Pulse', category: 'Core', persona: 'buyer', icon: 'dashboard', badge: 'Live Sync' },
  { id: 'explore', title: 'OneMap Geospatial Explorer', category: 'Core', persona: 'buyer', icon: 'travel_explore', badge: 'Map View' },
  { id: 'property-detail', title: 'Bishan Loft #14-06 Listing', category: 'Core', persona: 'buyer', icon: 'apartment', badge: 'Verified' },
  { id: 'valuation', title: 'Instant AVM Hedonic Valuation', category: 'Financial & Valuation', persona: 'buyer', icon: 'calculate', badge: '±3.4% Band' },
  { id: 'caveats', title: 'Comparable Transactions Feed', category: 'Financial & Valuation', persona: 'buyer', icon: 'insert_chart', badge: '18 Caveats' },
  { id: 'affordability-tdsr', title: 'Affordability & TDSR Calculator', category: 'Financial & Valuation', persona: 'buyer', icon: 'account_balance', badge: 'MAS 4.0%' },
  { id: 'mortgage-rates', title: 'Mortgage & 3M SORA Packages', category: 'Financial & Valuation', persona: 'buyer', icon: 'payments', badge: 'Bank Live' },
  { id: 'market-intelligence', title: 'Macro Market Intelligence', category: 'Financial & Valuation', persona: 'buyer', icon: 'show_chart', badge: 'URA Indices' },
  { id: 'rental-investment', title: 'Rental & Investment Analysis', category: 'Financial & Valuation', persona: 'buyer', icon: 'query_stats', badge: 'Institutional' },
  { id: 'seller-portal', title: 'Official Owner Portal', category: 'Seller & Marketing', persona: 'seller', icon: 'meeting_room', badge: '2 Offers' },
  { id: 'seller-strategy', title: 'Selling Price & Net Proceeds', category: 'Seller & Marketing', persona: 'seller', icon: 'receipt_long', badge: 'CPF + Cash' },
  { id: 'marketing-kit', title: 'Master Marketing Kit & CAD', category: 'Seller & Marketing', persona: 'seller', icon: 'architecture', badge: 'CAD + 4K' },
  { id: 'agent-dashboard', title: 'Agent Command Center', category: 'Agent Advisory', persona: 'agent', icon: 'query_stats', badge: 'MTD $48.5K' },
  { id: 'client-matching', title: 'Client Mandate Matching', category: 'Agent Advisory', persona: 'agent', icon: 'hub', badge: '94% Match' },
  { id: 'report-builder', title: 'Valuation Report Builder', category: 'Agent Advisory', persona: 'agent', icon: 'picture_as_pdf', badge: 'PDF Ready' },
];
