
import React, { useState } from 'react';
import { X, ShieldCheck, Cookie, FileText } from 'lucide-react';
import { LEGAL_CONTENT } from '../constants';

// --- Terms Modal (Forced) ---
export const TermsModal = ({ isOpen, onAccept, darkMode }: { isOpen: boolean, onAccept: () => void, darkMode: boolean }) => {
    const [scrolled, setScrolled] = useState(false); // Can enforce scroll to accept

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 ${darkMode ? 'bg-slate-900 text-white border border-slate-700' : 'bg-white text-gray-900'}`}>
                <div className={`p-6 border-b ${darkMode ? 'border-slate-800' : 'border-gray-100'} flex items-center gap-3`}>
                    <div className="w-10 h-10 rounded-full bg-[#00d09c]/10 text-[#00d09c] flex items-center justify-center">
                        <FileText size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Terms of Service</h2>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Please accept to continue</p>
                    </div>
                </div>
                
                <div 
                    className={`p-6 overflow-y-auto leading-relaxed space-y-4 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}
                    onScroll={(e) => {
                        const target = e.target as HTMLDivElement;
                        if(target.scrollTop + target.clientHeight >= target.scrollHeight - 20) setScrolled(true);
                    }}
                >
                    <p className="font-bold">Welcome to TradeoBull.</p>
                    <div dangerouslySetInnerHTML={{ __html: LEGAL_CONTENT.terms.replace(/\n/g, '<br/>') }} />
                </div>

                <div className={`p-6 border-t ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-gray-50'} flex justify-end gap-3`}>
                    <button 
                        onClick={onAccept}
                        className="px-8 py-3 bg-[#00d09c] hover:bg-[#00b386] text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                    >
                        I Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Cookie Banner ---
export const CookieBanner = ({ onAccept, darkMode }: { onAccept: () => void, darkMode: boolean }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleAccept = () => {
        setIsVisible(false);
        onAccept();
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500`}>
            <div className={`max-w-4xl mx-auto rounded-2xl shadow-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#00d09c]/10 text-[#00d09c] rounded-xl shrink-0">
                        <Cookie size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-1">We use cookies</h4>
                        <p className={`text-xs leading-relaxed max-w-lg ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            We use cookies to enhance your trading experience and analyze traffic. By continuing, you agree to our use of cookies.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={handleAccept} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-bold text-xs border ${darkMode ? 'border-slate-600 hover:bg-slate-800' : 'border-gray-200 hover:bg-gray-50'}`}>Preferences</button>
                    <button onClick={handleAccept} className="flex-1 md:flex-none px-6 py-2.5 bg-[#00d09c] text-white rounded-lg font-bold text-xs hover:bg-[#00b386]">Accept All</button>
                </div>
            </div>
        </div>
    );
};

// --- Privacy Modal (Information Only) ---
export const PrivacyModal = ({ isOpen, onClose, darkMode }: { isOpen: boolean, onClose: () => void, darkMode: boolean }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
             <div className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg flex items-center gap-2"><ShieldCheck size={20} className="text-[#00d09c]"/> Privacy Policy</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-red-500" /></button>
                </div>
                <div className="p-6 overflow-y-auto text-sm leading-loose">
                     <div dangerouslySetInnerHTML={{ __html: LEGAL_CONTENT.privacy.replace(/\n/g, '<br/>') }} />
                </div>
             </div>
        </div>
    );
};
