
import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { GUIDE_STEPS } from '../../constants';

const LearnView: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-20">
             <header className="text-center mb-10">
                 <div className="inline-flex items-center gap-2 bg-[#00d09c]/10 text-[#00d09c] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
                    <BookOpen size={16} /> Beginner's Guide
                 </div>
                 <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">How to Trade on TradeoBull</h1>
                 <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">Master the basics of the stock market in 5 minutes. No jargon, just plain English.</p>
             </header>

             <div className="grid gap-8">
                 {GUIDE_STEPS.map((step, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        {/* Number Watermark */}
                        <div className="absolute -top-4 -right-4 text-9xl font-black text-gray-50 dark:text-slate-800/50 select-none z-0">
                            {index + 1}
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                {step.title}
                            </h3>
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {step.content}
                            </div>
                        </div>
                    </div>
                 ))}

                 <div className="bg-gradient-to-br from-[#00d09c] to-emerald-600 rounded-3xl p-8 text-white text-center shadow-xl">
                     <HelpCircle size={48} className="mx-auto mb-4 opacity-80" />
                     <h3 className="text-2xl font-bold mb-2">Still Confused?</h3>
                     <p className="opacity-90 mb-6">Ask our AI Genius at the bottom right corner. It can explain any term instantly!</p>
                 </div>
             </div>
        </div>
    );
};

export default LearnView;
