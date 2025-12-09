
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface IndicesCardProps {
    name: string;
    value: number;
    change: number;
    isPositive: boolean;
}

const IndicesCard: React.FC<IndicesCardProps> = ({ name, value, change, isPositive }) => (
    <div className="bg-white dark:bg-slate-900/60 dark:backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl p-4 min-w-[150px] shadow-sm hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all cursor-pointer flex-1 group dark:hover:border-slate-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide mb-2 group-hover:text-[#00d09c] transition-colors">{name}</p>
        <div className="flex items-baseline gap-2 mb-1">
             <span className="font-bold text-gray-900 dark:text-white text-xl">{value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
        </div>
        <p className={`text-xs font-semibold flex items-center gap-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
            {isPositive ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
            {Math.abs(change).toFixed(2)} ({isPositive ? '+' : ''}{(change/value * 100).toFixed(2)}%)
        </p>
    </div>
);

export default IndicesCard;
