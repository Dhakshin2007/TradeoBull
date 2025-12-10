
import React, { useState } from 'react';
import { Stock } from '../../types';
import { TrendingUp, ChevronDown, ChevronUp, Star } from 'lucide-react';
import IndicesCard from '../IndicesCard';
import StockListItem from '../StockListItem';
import { formatCurrency } from '../../utils';

interface ExploreViewProps {
    stocks: Stock[];
    onSelect: (s: Stock) => void;
    indices: any;
    watchlist: string[];
}

const ExploreView: React.FC<ExploreViewProps> = ({ stocks, onSelect, indices, watchlist }) => {
    const [showAll, setShowAll] = useState(false);

    const watchlistedStocks = stocks.filter(s => watchlist.includes(s.symbol));

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Indices */}
            <section>
                 <h3 className="font-bold text-[#00d09c] text-lg mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-[#00d09c]" /> Market Status
                 </h3>
                 <div className="flex flex-col md:flex-row gap-4 overflow-x-auto no-scrollbar pb-2">
                    <IndicesCard name="NIFTY 50" value={indices.nifty.value} change={indices.nifty.change} isPositive={indices.nifty.change >= 0} />
                    <IndicesCard name="BANK NIFTY" value={indices.bank.value} change={indices.bank.change} isPositive={indices.bank.change >= 0} />
                    <IndicesCard name="SENSEX" value={indices.sensex.value} change={indices.sensex.change} isPositive={indices.sensex.change >= 0} />
                </div>
            </section>

            {/* Watchlist Section (Only if items exist) */}
            {watchlistedStocks.length > 0 && (
                <section>
                    <h3 className="font-bold text-[#00d09c] text-xl mb-6 flex items-center gap-2">
                        <Star size={20} className="fill-[#00d09c]" /> Your Watchlist
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                         {watchlistedStocks.map(stock => (
                            <StockListItem key={stock.symbol} stock={stock} onClick={() => onSelect(stock)} layout="grid" />
                        ))}
                    </div>
                </section>
            )}

            {/* Top Stocks Grid */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-[#00d09c] text-xl">Top Movers</h3>
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#00d09c] text-sm font-bold hover:underline bg-[#00d09c]/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                    >
                        {showAll ? 'Show Less' : 'View All'}
                        {showAll ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    </button>
                </div>
                
                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                     {stocks.slice(0, showAll ? stocks.length : 8).map(stock => (
                        <StockListItem key={stock.symbol} stock={stock} onClick={() => onSelect(stock)} layout="grid" />
                    ))}
                </div>

                {/* Mobile List */}
                <div className="md:hidden bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 px-4 shadow-sm">
                    {stocks.slice(0, showAll ? stocks.length : 5).map(stock => (
                        <StockListItem key={stock.symbol} stock={stock} onClick={() => onSelect(stock)} />
                    ))}
                    {showAll && stocks.length > 5 && (
                         <div className="py-2 text-center border-t border-gray-100 dark:border-slate-800">
                             <button onClick={() => setShowAll(false)} className="text-xs font-bold text-gray-400">Collapse</button>
                         </div>
                    )}
                </div>
            </section>

             <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-[#00d09c] text-xl">Stocks in News</h3>
                </div>
                 <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                    {stocks.slice(5, 10).map(stock => (
                        <div 
                            key={stock.symbol} 
                            onClick={() => onSelect(stock)} 
                            className="min-w-[180px] bg-white dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition-all hover:-translate-y-1 group"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:bg-[#00d09c]/10 group-hover:text-[#00d09c] transition-colors">{stock.symbol[0]}</div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-base truncate">{stock.symbol}</h4>
                            <p className="text-gray-900 dark:text-gray-200 text-lg font-bold mt-1">{formatCurrency(stock.price)}</p>
                            <p className={`text-xs font-bold mt-1 inline-block px-2 py-0.5 rounded ${stock.change >= 0 ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'}`}>
                                {stock.changePercent.toFixed(2)}%
                            </p>
                        </div>
                    ))}
                 </div>
             </section>
        </div>
    );
};

export default ExploreView;
