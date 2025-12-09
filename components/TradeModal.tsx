
import React, { useState, useEffect } from 'react';
import { Stock, UserProfile } from '../types';
import { X, Info } from 'lucide-react';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock | null;
  userProfile: UserProfile;
  onTrade: (symbol: string, price: number, quantity: number, type: 'BUY' | 'SELL') => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose, stock, userProfile, onTrade }) => {
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setType('BUY');
    }
  }, [isOpen]);

  if (!isOpen || !stock) return null;

  const totalCost = stock.price * quantity;
  const canBuy = userProfile.balance >= totalCost;
  const ownedQty = userProfile.portfolio.find(p => p.symbol === stock.symbol)?.quantity || 0;
  const canSell = ownedQty >= quantity;

  const handleTrade = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
        onTrade(stock.symbol, stock.price, quantity, type);
        setLoading(false);
        onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-0 md:p-4">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300 dark:border dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
            <div className="flex items-center gap-2">
                 <span className="text-sm text-gray-900 dark:text-gray-200 font-semibold">₹{stock.price.toFixed(2)}</span>
                 <span className={`text-xs font-medium ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                 </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Trade Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-800">
             <button 
                onClick={() => setType('BUY')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${type === 'BUY' ? 'border-green-500 text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-500/10' : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
             >
                Buy
             </button>
             <button 
                onClick={() => setType('SELL')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${type === 'SELL' ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-500/10' : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
             >
                Sell
             </button>
        </div>

        {/* Inputs */}
        <div className="p-6 space-y-6 overflow-y-auto">
            
            {/* Delivery / Intraday toggle (Fake) */}
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-medium">Delivery</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-400 rounded-full text-xs font-medium cursor-not-allowed">Intraday</span>
            </div>

            <div>
                 <div className="flex justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Quantity (NSE)</label>
                 </div>
                 <div className="relative">
                    <input 
                        type="number" 
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg py-3 px-4 text-lg font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                 </div>
            </div>

            <div>
                 <div className="flex justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Price Limit</label>
                 </div>
                 <div className="relative">
                    <div className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg py-3 px-4 text-lg font-semibold text-gray-400 cursor-not-allowed flex justify-between items-center">
                        <span>At Market</span>
                        <Info size={16} />
                    </div>
                 </div>
            </div>

            {/* Balances */}
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-3 flex justify-between items-center text-xs">
                 <span className="text-gray-500 dark:text-gray-400">Balance Available</span>
                 <span className="font-bold text-gray-900 dark:text-white">₹{userProfile.balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
             {type === 'SELL' && (
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-3 flex justify-between items-center text-xs">
                     <span className="text-gray-500 dark:text-gray-400">Shares Available</span>
                     <span className="font-bold text-gray-900 dark:text-white">{ownedQty}</span>
                </div>
            )}
        </div>

        {/* Footer Action */}
        <div className="p-5 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 mt-auto">
             <div className="flex justify-between items-center mb-4">
                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Approx. Required</span>
                 <span className="text-lg font-bold text-gray-900 dark:text-white">₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
             </div>

             <button
                onClick={handleTrade}
                disabled={loading || (type === 'BUY' && !canBuy) || (type === 'SELL' && !canSell)}
                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                    type === 'BUY' ? 'bg-[#00d09c] hover:bg-[#00b386] shadow-green-200 dark:shadow-[0_0_15px_rgba(0,208,156,0.3)]' : 'bg-[#eb5b3c] hover:bg-[#d44528]'
                }`}
            >
                {loading ? 'Processing...' : `${type.toUpperCase()}`}
            </button>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
