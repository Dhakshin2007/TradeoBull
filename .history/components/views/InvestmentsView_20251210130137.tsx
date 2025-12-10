
import React from 'react';
import { UserProfile, Stock } from '../../types';
import { PieChart as IconPieChart, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils';
import { CONTACT_INFO } from '../../constants';

interface InvestmentsViewProps {
    user: UserProfile;
    stocks: Stock[];
    onSelect: (s: Stock) => void;
}

const COLORS = ['#00d09c', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

const InvestmentsView: React.FC<InvestmentsViewProps> = ({ user, stocks, onSelect }) => {
    const currentValue = user.portfolio.reduce((acc, item) => {
        const stock = stocks.find(s => s.symbol === item.symbol);
        return acc + (stock ? stock.price * item.quantity : 0);
    }, 0);

    const investedValue = user.portfolio.reduce((acc, item) => acc + (item.averagePrice * item.quantity), 0);
    const totalReturns = currentValue - investedValue;
    const isPositive = totalReturns >= 0;

    // --- SECTOR ALLOCATION LOGIC ---
    const sectorMap: { [key: string]: number } = {};
    user.portfolio.forEach(item => {
        const stock = stocks.find(s => s.symbol === item.symbol);
        if (stock) {
            const val = stock.price * item.quantity;
            sectorMap[stock.sector] = (sectorMap[stock.sector] || 0) + val;
        }
    });

    const allocationData = Object.keys(sectorMap).map(sector => ({
        name: sector,
        value: sectorMap[sector]
    })).sort((a, b) => b.value - a.value); // Sort largest to smallest

    return (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl pb-20">
            {/* Portfolio Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md dark:hover:shadow-slate-800/50 transition-shadow relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 transition-opacity">
                        <IconPieChart size={140} className="text-[#00d09c]" />
                     </div>
                     <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Current Portfolio Value</p>
                     <h2 className="font-bold text-gray-900 dark:text-white text-4xl mb-8 tracking-tight">{formatCurrency(currentValue)}</h2>

                     <div className="grid grid-cols-2 gap-8 relative z-10">
                         <div>
                             <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase mb-1">Invested Amount</p>
                             <h3 className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(investedValue)}</h3>
                         </div>
                         <div>
                             <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase mb-1">Total Returns</p>
                             <h3 className={`text-xl font-bold flex items-center gap-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                {isPositive ? '+' : ''}{formatCurrency(totalReturns)}
                                {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                             </h3>
                         </div>
                     </div>
                </div>

                <div className="bg-gradient-to-br from-[#00d09c] to-[#00a078] dark:from-[#00d09c]/90 dark:to-[#00a078]/90 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                     <div>
                        <p className="text-green-100 text-sm font-bold uppercase tracking-wide mb-1">Wallet Balance</p>
                        <h2 className="font-bold text-4xl tracking-tight">{formatCurrency(user.balance)}</h2>
                     </div>
                     <div className="mt-6 bg-white/20 backdrop-blur-md rounded-xl p-4 text-sm font-medium text-white border border-white/20">
                        <p className="mb-2">Funds are ready for deployment. <span className="opacity-80 text-xs">Simulated currency, real learning.</span></p>
                        <p className="text-xs border-t border-white/20 pt-2 mt-2 opacity-90">
                           Need more funds? Mail us at <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-green-100">{CONTACT_INFO.email}</a>
                        </p>
                     </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sector Allocation Chart */}
                {user.portfolio.length > 0 && (
                    <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">Allocation by Sector</h3>
                        <div className="h-[250px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={allocationData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {allocationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value: number) => formatCurrency(value)}
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend 
                                        verticalAlign="bottom" 
                                        height={36} 
                                        iconType="circle"
                                        formatter={(value, entry: any) => <span className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                                <span className="text-xs text-gray-400 font-bold uppercase">Total</span>
                                <div className="text-sm font-extrabold text-gray-900 dark:text-white">
                                    {formatCurrency(currentValue)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Holdings List */}
                <div className={`${user.portfolio.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-6">Your Holdings <span className="text-gray-400 text-base font-medium ml-2">{user.portfolio.length} Assets</span></h3>
                    {user.portfolio.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
                            <div className="bg-gray-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Briefcase size={32} className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your portfolio is empty</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Start building your wealth by investing in top performing companies. Go to Explore to find your first stock.</p>
                        </div>
                    ) : (
                        <div className={`grid grid-cols-1 ${user.portfolio.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-5`}>
                            {user.portfolio.map(item => {
                                const stock = stocks.find(s => s.symbol === item.symbol);
                                if (!stock) return null;
                                const curVal = stock.price * item.quantity;
                                const invVal = item.averagePrice * item.quantity;
                                const returns = curVal - invVal;
                                
                                return (
                                    <div key={item.symbol} onClick={() => onSelect(stock)} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg dark:hover:shadow-slate-800/50 hover:border-[#00d09c]/30 dark:hover:border-[#00d09c]/40 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-[#00d09c] transition-colors">{item.symbol}</h4>
                                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mt-1">{item.quantity} Shares • Avg {formatCurrency(item.averagePrice)}</p>
                                            </div>
                                            <div className={`text-xs font-bold px-2.5 py-1 rounded-lg ${returns >= 0 ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'}`}>
                                                {((returns / invVal) * 100).toFixed(2)}%
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end border-t border-gray-50 dark:border-slate-800 pt-4">
                                             <div>
                                                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-0.5">Current Value</p>
                                                <p className="font-bold text-gray-900 dark:text-white text-lg">{formatCurrency(curVal)}</p>
                                             </div>
                                             <div className="text-right">
                                                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-0.5">Returns</p>
                                                <p className={`font-bold text-base ${returns >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                                    {returns >= 0 ? '+' : ''}{formatCurrency(returns)}
                                                </p>
                                             </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvestmentsView;
