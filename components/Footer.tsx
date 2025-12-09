
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Shield, FileText, AlertTriangle, Mail } from 'lucide-react';

interface FooterProps {
    onOpenTerms: () => void;
    onOpenPrivacy: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenPrivacy }) => {
    return (
        <footer className="w-full mt-20 border-t border-gray-100 dark:border-slate-800 bg-white/50 dark:bg-[#0B1121]/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="https://i.postimg.cc/43DWhq20/Tradeo-Bull.png" alt="TradeoBull" className="w-8 h-8 rounded-lg" />
                            <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">TradeoBull</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                            A risk-free trading simulator designed to educate Indian investors. Master the market before deploying real capital.
                        </p>
                    </div>

                    {/* Developer Info */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Developer</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
                            {CONTACT_INFO.name}
                        </p>
                        <a 
                            href={`mailto:${CONTACT_INFO.email}`} 
                            className="text-sm text-[#00d09c] hover:underline flex items-center gap-2"
                        >
                            <Mail size={14} />
                            {CONTACT_INFO.email}
                        </a>
                    </div>

                    {/* Legal Links */}
                    <div>
                         <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal & Support</h4>
                         <ul className="space-y-3 text-sm">
                            <li>
                                <button onClick={onOpenPrivacy} className="text-gray-500 dark:text-gray-400 hover:text-[#00d09c] transition-colors flex items-center gap-2">
                                    <Shield size={14} /> Privacy Policy
                                </button>
                            </li>
                            <li>
                                <button onClick={onOpenTerms} className="text-gray-500 dark:text-gray-400 hover:text-[#00d09c] transition-colors flex items-center gap-2">
                                    <FileText size={14} /> Terms & Conditions
                                </button>
                            </li>
                            <li>
                                <a href={`mailto:${CONTACT_INFO.email}?subject=Legal Issue Report - TradeoBull`} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                                    <AlertTriangle size={14} /> Report Legal Issue
                                </a>
                            </li>
                         </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-gray-600">
                    <p>© {new Date().getFullYear()} TradeoBull. All rights reserved.</p>
                    <p>Simulated Market Data. Not for real financial advice.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
