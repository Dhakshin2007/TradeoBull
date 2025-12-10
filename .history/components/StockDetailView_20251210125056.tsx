
import React, { useState, useEffect } from 'react';
import { Stock, ChartDataPoint } from '../types';
import { TrendingUp, TrendingDown, ArrowDownRight, Brain, ShieldCheck, Heart } from 'lucide-react';
import StockChart from './StockChart';
import { getStockAnalysis } from '../services/geminiService';
import { formatCurrency, generateChartData } from '../utils';

interface StockDetailViewProps {
    stock: Stock;
    isWatchlisted: boolean;
    onToggleWatchlist: (symbol: string) => void;
    onBack: () => void;
    onTrade: (type: 'BUY' | 'SELL') => void;
}

const StockDetailView: React.FC<StockDetailViewProps> = ({ stock, isWatchlisted, onToggleWatchlist, onBack, onTrade }) => {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [aiAnalysis, setAiAnalysis] = useState<string>('');
    const [analyzing, setAnalyzing] = useState(false);
  
    useEffect(() => {
      setChartData(generateChartData(stock.price));
      const fetchAnalysis = async () => {
        setAnalyzing(true);
        const text = await getStockAnalysis(stock);
        setAiAnalysis(text);
        setAnalyzing(false);
      };
      fetchAnalysis();
    }, [stock]);

    return (
        <div className="fixed inset-0 z-40 bg-gray-50/80 dark:bg-slate-950/80 md:bg-black/70 backdrop-blur-md md:flex md:items-center md:justify-center overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#0B1121] w-full h-full md:h-auto md:max-w-6xl md:rounded-3xl md:max-h-[90vh] md:overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in slide-in-from-bottom-10 duration-300 md:border dark:border-slate-800/60 relative">
                
                {/* Header (Mobile Only) */}
                <div className="md:hidden sticky top-0 bg-white dark:bg-[#0B1121] z-10 px-4 py-3 flex items-center gap-4 border-b border-gray-100 dark:border-slate-800">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowDownRight className="rotate-180 text-gray-600 dark:text-gray-300" size={24} />
                    </button>
                    <div className="flex-1">
                        <h2 className="font-bold text-gray-900 dark:text-white text-lg leading-none">{stock.symbol}</h2>
                    </div>
                    <button 
                        onClick={() => onToggleWatchlist(stock.symbol)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Heart size={24} className={isWatchlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
                    </button>
                </div>

                {/* Left Panel: Chart & Info */}
                <div className="flex-1 overflow-y-auto p-0 md:p-8 scrollbar-hide dark:bg-[#0B1121]">
                     {/* Desktop Header */}
                    <div className="hidden md:flex justify-between items-start mb-8">
                         <div className="flex items-center gap-4">
                             <button onClick={onBack} className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors border border-gray-200 dark:border-slate-700">
                                 <ArrowDownRight className="rotate-180 text-gray-600 dark:text-gray-300" size={20} />
                             </button>
                             <div>
                                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                     {stock.name} 
                                     <span className="text-sm font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-md tracking-wide">{stock.symbol}</span>
                                 </h1>
                                 <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">{stock.sector}</p>
                             </div>
                         </div>
                         <button 
                             onClick={() => onToggleWatchlist(stock.symbol)}
                             className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                         >
                             <Heart size={20} className={`transition-all ${isWatchlisted ? "fill-red-500 text-red-500 scale-110" : "text-gray-400 group-hover:text-red-400"}`} />
                             <span className={`text-sm font-bold ${isWatchlisted ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                                 {isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}
                             </span>
                         </button>
                    </div>

                    <div className="px-5 py-6 md:p-0">
                        <div className="flex items-baseline gap-3 mb-1">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">{formatCurrency(stock.price)}</h1>
                        </div>
                        <p className={`text-base md:text-lg font-bold flex items-center gap-1.5 ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                            {stock.change >= 0 ? <TrendingUp size={20}/> : <TrendingDown size={20}/>}
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                            <span className="text-gray-400 text-xs font-bold uppercase ml-1">Today</span>
                        </p>
                    </div>

                    {/* Chart */}
                    <div className="h-72 md:h-[400px] w-full mb-8 bg-white dark:bg-slate-900/50 md:border md:border-gray-100 dark:md:border-slate-800 md:rounded-2xl md:p-6 md:shadow-sm">
                        <StockChart data={chartData} color={stock.change >= 0 ? "#00d09c" : "#ef4444"} showAxes={true} />
                    </div>

                    <div className="px-5 md:px-0 mb-10 grid md:grid-cols-2 gap-8">
                        {/* Fundamentals */}
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-lg">Fundamentals</h3>
                            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                                {[{l:'Market Cap', v:stock.marketCap}, {l:'P/E Ratio', v:stock.peRatio}, {l:'P/B Ratio', v:stock.pbRatio}, {l:'ROE', v:`${stock.roe}%`}, {l:'Div Yield', v:`${stock.divYield}%`}, {l:'52W High', v:stock.high52}].map((item) => (
                                    <div key={item.l}>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">{item.l}</p>
                                        <p className="text-base font-bold text-gray-900 dark:text-white">{item.v}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* AI Insight */}
                         <div>
                             <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-lg">AI Market Analysis</h3>
                            <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900/50 border border-indigo-100 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Brain size={20} className="text-indigo-600 dark:text-indigo-400" />
                                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">Gemini Insight</span>
                                </div>
                                {analyzing ? (
                                    <div className="flex items-center gap-3 text-indigo-400 text-sm font-medium py-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></div>
                                        Processing market data...
                                    </div>
                                ) : (
                                    <p className="text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed font-medium">{aiAnalysis}</p>
                                )}
                            </div>
                         </div>
                    </div>

                    <div className="px-5 md:px-0 pb-24 md:pb-0">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">About Company</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-loose">{stock.description}</p>
                    </div>
                </div>

                {/* Right Panel: Actions (Desktop Sticky) */}
                <div className="hidden md:flex w-96 bg-gray-50/50 dark:bg-[#0B1121] border-l border-gray-100 dark:border-slate-800 flex-col p-8 justify-between backdrop-blur-sm z-10">
                     <div>
                         <h3 className="font-bold text-gray-900 dark:text-white mb-8 text-xl">Place Order</h3>
                         <div className="space-y-4">
                             <button 
                                onClick={() => onTrade('BUY')}
                                className="w-full bg-[#00d09c] hover:bg-[#00b386] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-100 dark:shadow-[0_0_20px_rgba(0,208,156,0.2)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1 active:translate-y-0"
                             >
                                Buy
                             </button>
                             <button 
                                onClick={() => onTrade('SELL')}
                                className="w-full bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg"
                             >
                                Sell
                             </button>
                         </div>
                         <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 py-2 rounded-lg border border-transparent dark:border-green-500/20">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Market is Open
                         </div>
                     </div>
                     
                     <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/60 dark:border-slate-800 shadow-sm">
                         <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck className="text-[#00d09c]" size={22} />
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">100% Safe & Secure</p>
                         </div>
                         <p className="text-xs text-gray-400 leading-relaxed font-medium">
                             This is a simulator. No real money is involved. Trade risk-free and master your psychology.
                         </p>
                     </div>
                </div>

                {/* Mobile Floating Action Bar */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-4 flex gap-3 safe-area-pb z-20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                     <button 
                        onClick={() => onTrade('SELL')}
                        className="flex-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-red-500 py-3.5 rounded-xl font-bold text-base active:bg-gray-50 active:scale-[0.98] transition-all"
                     >
                        Sell
                     </button>
                     <button 
                        onClick={() => onTrade('BUY')}
                        className="flex-1 bg-[#00d09c] text-white py-3.5 rounded-xl font-bold text-base active:bg-[#00b386] active:scale-[0.98] transition-all shadow-lg shadow-green-100 dark:shadow-none"
                     >
                        Buy
                     </button>
                </div>
            </div>
        </div>
    );
};

export default StockDetailView;
