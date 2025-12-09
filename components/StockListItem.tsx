
import React from 'react';
import { Stock } from '../types';
import { formatCurrency } from '../utils';
import { STOCK_SYMBOLS } from '../constants';

interface StockListItemProps {
    stock: Stock;
    onClick: () => void;
    layout?: 'list' | 'grid';
}

const StockListItem: React.FC<StockListItemProps> = ({ stock, onClick, layout = 'list' }) => {
    // Check if this stock is in our Live List
    const isLive = STOCK_SYMBOLS.includes(stock.symbol);

    if (layout === 'grid') {
        return (
            <div 
                onClick={onClick} 
                className="
                    bg-white dark:bg-slate-900/60 dark:backdrop-blur-md 
                    border border-gray-100 dark:border-slate-800 
                    rounded-2xl p-5 
                    hover:shadow-xl hover:-translate-y-1 
                    transition-all duration-300 cursor-pointer group 
                    hover:border-[#00d09c]/30 dark:hover:border-[#00d09c]/40 
                    dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]
                    relative overflow-hidden
                "
            >
                {/* Subtle gradient overlay on hover for dark mode */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d09c]/0 to-[#00d09c]/0 group-hover:from-[#00d09c]/5 group-hover:to-transparent transition-all duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                     <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-gray-600 dark:text-gray-300 font-bold flex items-center justify-center text-sm group-hover:bg-[#00d09c]/10 group-hover:text-[#00d09c] group-hover:border-[#00d09c]/20 transition-all shadow-inner dark:shadow-none">
                        {stock.symbol[0]}
                     </div>
                     <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stock.change >= 0 ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 dark:border dark:border-green-500/20' : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400 dark:border dark:border-red-500/20'}`}>
                        {stock.changePercent.toFixed(2)}%
                     </span>
                </div>
                <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-0.5 flex items-center gap-2">
                        {stock.symbol}
                        {isLive && (
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        )}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate font-medium">{stock.name}</p>
                    <div className="flex items-end justify-between">
                         <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{formatCurrency(stock.price)}</span>
                    </div>
                </div>
            </div>
        )
    }

    // List Layout
    return (
        <div 
            onClick={onClick} 
            className="
                flex justify-between items-center py-4 px-4 -mx-4 
                border-b border-gray-50 dark:border-slate-800/50 
                hover:bg-gray-50 dark:hover:bg-slate-800/50 
                rounded-xl cursor-pointer transition-all group active:scale-[0.99]
            "
        >
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center group-hover:border-[#00d09c]/30 group-hover:text-[#00d09c] transition-colors shadow-sm dark:shadow-none text-gray-600 dark:text-gray-400">
                    <span className="text-sm font-bold">{stock.symbol.substring(0, 1)}</span>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#00d09c] transition-colors flex items-center gap-2">
                        {stock.name}
                        {isLive && (
                            <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
                        )}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700/50 border dark:border-slate-700 px-1.5 py-0.5 rounded uppercase tracking-wider">{stock.sector}</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">{formatCurrency(stock.price)}</p>
                <p className={`text-xs font-bold mt-0.5 ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </p>
            </div>
        </div>
    );
};

export default StockListItem;
