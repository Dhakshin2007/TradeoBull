
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  description: string;
  // Fundamental Data
  marketCap: string;
  peRatio: number;
  pbRatio: number;
  roe: number;
  divYield: number;
  high52: number;
  low52: number;
}

export interface PortfolioItem {
  symbol: string;
  quantity: number;
  averagePrice: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;       
  avatar?: string;     
  location?: string;   
  bio?: string;        
  balance: number;
  startBalance: number;
  portfolio: PortfolioItem[];
  transactions: Transaction[];
  watchlist: string[];
  termsAccepted: boolean;      
  onboardingCompleted: boolean; 
}

export interface ChartDataPoint {
  time: string;
  price: number;
}

export type View = 'EXPLORE' | 'INVESTMENTS' | 'ORDERS' | 'LEARN' | 'PROFILE';

export interface MarketContextType {
  stocks: Stock[];
  loading: boolean;
  refreshMarket: () => void;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}
