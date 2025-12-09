
import React from 'react';
import { UserProfile } from '../../types';
import { List, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils';

interface OrdersViewProps {
    user: UserProfile;
}

const OrdersView: React.FC<OrdersViewProps> = ({ user }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order History</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track all your buy and sell transactions</p>
                </div>
                <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm text-sm font-bold text-gray-600 dark:text-gray-300">
                    Total Orders: {user.transactions.length}
                </div>
             </div>

             <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                            <tr>
                                <th className="px-8 py-5 font-bold text-gray-400 dark:text-gray-500 uppercase text-xs tracking-wider">Stock</th>
                                <th className="px-6 py-5 font-bold text-gray-400 dark:text-gray-500 uppercase text-xs tracking-wider">Type</th>
                                <th className="px-6 py-5 font-bold text-gray-400 dark:text-gray-500 uppercase text-xs tracking-wider">Qty</th>
                                <th className="px-6 py-5 font-bold text-gray-400 dark:text-gray-500 uppercase text-xs tracking-wider">Price</th>
                                <th className="px-6 py-5 font-bold text-gray-400 dark:text-gray-500 uppercase text-xs tracking-wider text-right">Total</th>
                                <th className="px-8 py-5 font-bold text-gray-400 dark:text-gray-500 uppercase text-xs tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                            {user.transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-gray-400 dark:text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <List size={48} className="text-gray-200 dark:text-slate-700 mb-4" />
                                            <p>No transactions found yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                user.transactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-gray-900 dark:text-white text-base">{txn.symbol}</div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">{new Date(txn.date).toLocaleDateString()} • {new Date(txn.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide ${txn.type === 'BUY' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'}`}>
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 font-bold text-gray-700 dark:text-gray-300">{txn.quantity}</td>
                                        <td className="px-6 py-5 font-medium text-gray-600 dark:text-gray-400">{formatCurrency(txn.price)}</td>
                                        <td className="px-6 py-5 font-bold text-gray-900 dark:text-white text-right">{formatCurrency(txn.total)}</td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 px-3 py-1.5 rounded-full">
                                                <CheckCircle2 size={14} /> {txn.status || 'SUCCESS'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
};

export default OrdersView;
