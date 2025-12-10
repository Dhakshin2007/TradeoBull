
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  List, 
  BookOpen, 
  User, 
  Search, 
  Bell, 
  Cloud, 
  CloudOff,
  Sun,
  Moon,
  LogOut,
  Radio,
  PanelLeft,
  Menu
} from 'lucide-react';
import { Stock, UserProfile, View } from './types';
import { MOCK_STOCKS, STOCK_SYMBOLS } from './constants';
import { getUserProfile, executeTrade, resetAccount, saveUserProfile } from './services/userService';
import { fetchRealTimeData } from './services/stockService';
import { supabase } from './services/supabaseClient';
import TradeModal from './components/TradeModal';
import StockListItem from './components/StockListItem';
import { formatCurrency } from './utils';

// New Components
import AuthPage from './components/AuthPage';
import OnboardingTour from './components/OnboardingTour';
import { TermsModal, PrivacyModal, CookieBanner } from './components/LegalModals';
import AIChatWidget from './components/AIChatWidget';
import Footer from './components/Footer';

// Views
import ExploreView from './components/views/ExploreView';
import InvestmentsView from './components/views/InvestmentsView';
import OrdersView from './components/views/OrdersView';
import ProfileView from './components/views/ProfileView';
import LearnView from './components/views/LearnView';
import StockDetailView from './components/StockDetailView';

// --- Sidebar Item Component ---
const SidebarItem = ({ view, current, icon: Icon, label, onClick, collapsed }: { view: View, current: View, icon: any, label: string, onClick: (v: View) => void, collapsed: boolean }) => (
    <button 
        id={`nav-${view.toLowerCase()}`}
        onClick={() => onClick(view)}
        title={collapsed ? label : ''}
        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-bold text-sm mb-1 group relative overflow-hidden ${
            current === view 
            ? 'bg-[#00d09c]/10 text-[#00d09c] dark:bg-[#00d09c]/10 dark:text-[#00d09c]' 
            : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-gray-200'
        } ${collapsed ? 'justify-center' : ''}`}
    >
        {current === view && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00d09c] rounded-r-full shadow-[0_0_10px_#00d09c]"></div>
        )}
        <Icon size={22} strokeWidth={current === view ? 2.5 : 2} className={`transition-transform group-hover:scale-110 z-10 ${current === view ? 'text-[#00d09c]' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
        {!collapsed && <span className="z-10 animate-in fade-in duration-200">{label}</span>}
    </button>
);

// --- Mobile Nav Component ---
const NavTab = ({ view, current, icon: Icon, label, onClick }: { view: View, current: View, icon: any, label: string, onClick: (v: View) => void }) => (
    <button 
        onClick={() => onClick(view)}
        className={`flex flex-col items-center justify-center gap-1 w-full py-2 transition-colors ${current === view ? 'text-[#00d09c]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
    >
        <Icon size={24} strokeWidth={current === view ? 2.5 : 2} className={current === view ? 'animate-bounce-short' : ''} />
        <span className="text-[10px] font-bold">{label}</span>
    </button>
);

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('EXPLORE');
    const [user, setUser] = useState<UserProfile | null>(null);
    const [stocks, setStocks] = useState<Stock[]>(MOCK_STOCKS);
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCloudEnabled, setIsCloudEnabled] = useState(false);
    const [marketStatus, setMarketStatus] = useState<'LIVE' | 'DELAYED' | 'CLOSED'>('CLOSED');
    
    // UI State
    const [darkMode, setDarkMode] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Simulating Index Data
    const [indices, setIndices] = useState({
        nifty: { value: 24350.50, change: 125.40 },
        bank: { value: 52100.20, change: -210.50 },
        sensex: { value: 80100.10, change: 450.00 }
    });

    // --- Initialization ---
    useEffect(() => {
        // Load user
        getUserProfile().then(profile => {
            if (profile) { 
                setUser(profile);
                checkUserFlow(profile);
            }
        });
        setIsCloudEnabled(!!supabase);
    }, []);

    // Dark Mode Toggle Logic
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Check Legal & Onboarding Flow
    const checkUserFlow = (profile: UserProfile) => {
        if (!profile.termsAccepted) {
            setShowTerms(true);
        } else if (!profile.onboardingCompleted) {
            setShowOnboarding(true);
        }
    };

    // --- REAL-TIME MARKET DATA LOOP ---
    useEffect(() => {
        // 1. Initial Fetch
        const loadMarketData = async () => {
            try {
                // Returns { stocks, isLive }
                const result = await fetchRealTimeData();
                setStocks(result.stocks);
                // If API is working, it's LIVE. If rate-limited/error, it's SIMULATED (we use DELAYED/SIMULATED status)
                setMarketStatus(result.isLive ? 'LIVE' : 'DELAYED');
            } catch (e) {
                console.error("Market Data Load Failed", e);
                setMarketStatus('DELAYED');
            }
        };

        loadMarketData();

        // 2. Poll every 30 seconds (Finnhub allows ~60 calls/min. 20 stocks x 2 calls/min = 40. Safe.)
        const interval = setInterval(() => {
            loadMarketData();
            
            // Simulate Index Movement for liveness between API calls
            setIndices(prev => ({
                nifty: { ...prev.nifty, value: prev.nifty.value + (Math.random() - 0.5) * 15 },
                bank: { ...prev.bank, value: prev.bank.value + (Math.random() - 0.5) * 25 },
                sensex: { ...prev.sensex, value: prev.sensex.value + (Math.random() - 0.5) * 40 }
            }));
        }, 30000); 

        return () => clearInterval(interval);
    }, []);

    const handleLogin = (email: string) => {
        // After AuthPage login/register, simply refetch user which now exists in local/cloud
        getUserProfile().then(profile => {
            if (profile) {
                setUser(profile);
                checkUserFlow(profile);
            }
        });
    };

    const handleAcceptTerms = async () => {
        if (!user) return;
        const updated = { ...user, termsAccepted: true };
        setUser(updated);
        await saveUserProfile(updated);
        setShowTerms(false);
        if (!updated.onboardingCompleted) setShowOnboarding(true);
    };

    const handleCompleteOnboarding = async () => {
        if (!user) return;
        const updated = { ...user, onboardingCompleted: true };
        setUser(updated);
        await saveUserProfile(updated);
        setShowOnboarding(false);
    };

    const handleTrade = async (symbol: string, price: number, quantity: number, type: 'BUY' | 'SELL') => {
        if (!user) return;
        const result = await executeTrade(user, symbol, price, quantity, type);
        if (result.success && result.newProfile) {
            setUser(result.newProfile);
        } else {
            alert(result.message);
        }
    };

    const handleLogout = () => {
        resetAccount();
    };

    // Filter Stocks
    const filteredStocks = stocks.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.symbol.toLowerCase().includes(searchQuery.toLowerCase()));

    // --- RENDER: AUTH PAGE ---
    if (!user) {
        return <AuthPage onLogin={handleLogin} darkMode={darkMode} />;
    }

    // --- RENDER: MAIN APP ---
    return (
        <div className={`flex h-screen font-sans ${darkMode ? 'bg-[#020617] text-white selection:bg-[#00d09c]/40' : 'bg-[#F5F7F8] text-gray-900 selection:bg-[#00d09c]/20'}`}>
            
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col justify-between border-r shadow-2xl z-20 transition-all duration-300 ${isSidebarCollapsed ? 'w-[80px] p-4 items-center' : 'w-[280px] p-6'} ${darkMode ? 'bg-[#0B1121] border-slate-800' : 'bg-white border-gray-100'}`}>
                 <div>
                     <div className={`flex items-center mb-10 ${isSidebarCollapsed ? 'flex-col gap-4 justify-center' : 'justify-between px-2'}`}>
                         <div className="flex items-center gap-3.5">
                            <img src="https://i.postimg.cc/43DWhq20/Tradeo-Bull.png" alt="TradeoBull" className="w-9 h-9 rounded-xl shadow-lg shadow-green-200 dark:shadow-[0_0_20px_rgba(0,208,156,0.3)] bg-white dark:bg-slate-800 p-0.5 object-contain" />
                            {!isSidebarCollapsed && <h1 className="text-xl font-extrabold tracking-tight animate-in fade-in duration-300">TradeoBull</h1>}
                         </div>
                         <button 
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                            className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 transition-colors`}
                            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                             <PanelLeft size={18} />
                         </button>
                     </div>

                     <nav className="space-y-2">
                         <SidebarItem view="EXPLORE" current={currentView} icon={Home} label="Explore" onClick={setCurrentView} collapsed={isSidebarCollapsed} />
                         <SidebarItem view="INVESTMENTS" current={currentView} icon={Briefcase} label="Investments" onClick={setCurrentView} collapsed={isSidebarCollapsed} />
                         <SidebarItem view="ORDERS" current={currentView} icon={List} label="Order History" onClick={setCurrentView} collapsed={isSidebarCollapsed} />
                         <SidebarItem view="LEARN" current={currentView} icon={BookOpen} label="Guide" onClick={setCurrentView} collapsed={isSidebarCollapsed} />
                     </nav>
                 </div>

                 {isSidebarCollapsed ? (
                     <div className="space-y-4 flex flex-col items-center">
                         <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                             {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                         </button>
                         <div 
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-md"
                            onClick={() => setCurrentView('PROFILE')}
                         >
                            {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full" /> : user.email?.[0].toUpperCase()}
                         </div>
                     </div>
                 ) : (
                    <div className="space-y-4">
                        {/* Theme Toggle */}
                        <button 
                            onClick={() => setDarkMode(!darkMode)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${darkMode ? 'bg-slate-800/50 text-white hover:bg-slate-800' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>

                        <div className="px-4 space-y-2">
                            <div className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg border ${isCloudEnabled ? 'bg-green-50 border-green-100 text-green-600 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-400'}`}>
                                {isCloudEnabled ? <Cloud size={14} /> : <CloudOff size={14} />}
                                {isCloudEnabled ? 'Cloud Sync Active' : 'Offline Mode'}
                            </div>
                            <div className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg border ${marketStatus === 'LIVE' ? 'bg-red-50 border-red-100 text-red-600 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' : 'bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20'}`}>
                                <Radio size={14} className={marketStatus === 'LIVE' ? 'animate-pulse' : ''} />
                                {marketStatus === 'LIVE' ? 'Live NSE Feed' : 'Simulated Data'}
                            </div>
                        </div>

                        <div 
                            className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all active:scale-[0.98] border ${darkMode ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
                            onClick={() => setCurrentView('PROFILE')}
                        >
                            {user.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {user.email ? user.email[0].toUpperCase() : 'T'}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{user.name || 'Trader'}</p>
                                <p className={`text-xs truncate font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatCurrency(user.balance)}</p>
                            </div>
                        </div>
                        
                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-500 text-xs font-bold py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <LogOut size={14} /> Sign Out
                        </button>
                    </div>
                 )}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Header */}
                <header className={`border-b px-8 py-5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-[#020617]/80 border-slate-800' : 'bg-white/80 border-gray-100'}`}>
                    <div className="flex items-center gap-4 md:hidden">
                        <img src="https://i.postimg.cc/43DWhq20/Tradeo-Bull.png" alt="TradeoBull" className="w-9 h-9 rounded-lg shadow-md bg-white dark:bg-slate-800 p-0.5 object-contain" />
                    </div>
                    
                    <div id="search-bar" className="flex-1 max-w-2xl mx-auto md:mx-0 relative group">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-slate-500 group-focus-within:text-[#00d09c]' : 'text-gray-400 group-focus-within:text-[#00d09c]'}`} size={20} />
                        <input 
                            type="text"
                            placeholder="Search stocks (e.g. RELIANCE, TCS)..."
                            className={`w-full border-transparent focus:border-[#00d09c] focus:ring-4 focus:ring-[#00d09c]/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium transition-all outline-none ${darkMode ? 'bg-slate-900 text-white placeholder-slate-500 focus:bg-slate-800 border border-slate-800 focus:border-[#00d09c]/50' : 'bg-gray-100/50 text-gray-900 focus:bg-white'}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-6 pl-6">
                         {/* Mobile Dark Toggle */}
                        <button onClick={() => setDarkMode(!darkMode)} className="md:hidden p-2 text-gray-400">
                             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button className={`p-2 rounded-full transition-colors hidden md:block ${darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-[#00d09c]' : 'text-gray-400 hover:bg-gray-50 hover:text-[#00d09c]'}`}>
                            <Bell size={22} />
                        </button>
                        <div 
                            className="w-9 h-9 rounded-full bg-indigo-100 md:hidden flex items-center justify-center text-indigo-600 cursor-pointer"
                            onClick={() => setCurrentView('PROFILE')}
                        >
                            <User size={18} />
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scroll-smooth flex flex-col">
                     <div className="p-4 md:p-10 flex-1">
                        <div className="max-w-7xl mx-auto w-full">
                            {searchQuery ? (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Search Results</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {filteredStocks.map(s => (
                                            <StockListItem key={s.symbol} stock={s} onClick={() => { setSelectedStock(s); setSearchQuery(''); }} layout="grid" />
                                        ))}
                                    </div>
                                    {filteredStocks.length === 0 && (
                                        <div className="text-center py-20">
                                            <p className="text-gray-400 font-medium">No stocks found matching "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {currentView === 'EXPLORE' && <ExploreView stocks={stocks} onSelect={setSelectedStock} indices={indices} />}
                                    {currentView === 'INVESTMENTS' && <InvestmentsView user={user} stocks={stocks} onSelect={setSelectedStock} />}
                                    {currentView === 'ORDERS' && <OrdersView user={user} />}
                                    {currentView === 'LEARN' && <LearnView />}
                                    {currentView === 'PROFILE' && <ProfileView user={user} onViewChange={setCurrentView} resetAccount={handleLogout} />}
                                </>
                            )}
                        </div>
                     </div>
                     {/* Footer placed at the bottom of content */}
                     <Footer onOpenTerms={() => setShowTerms(true)} onOpenPrivacy={() => setShowPrivacy(true)} />
                </div>

                {/* Mobile Bottom Nav */}
                <div className={`md:hidden border-t flex justify-between items-center px-6 py-3 safe-area-pb shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] ${darkMode ? 'bg-[#0B1121] border-slate-800' : 'bg-white border-gray-100'}`}>
                    <NavTab view="EXPLORE" current={currentView} onClick={setCurrentView} icon={Home} label="Explore" />
                    <NavTab view="INVESTMENTS" current={currentView} onClick={setCurrentView} icon={Briefcase} label="Investments" />
                    <NavTab view="ORDERS" current={currentView} onClick={setCurrentView} icon={List} label="Orders" />
                    <NavTab view="LEARN" current={currentView} onClick={setCurrentView} icon={BookOpen} label="Guide" />
                </div>

            </main>

            {/* AI Assistant */}
            <AIChatWidget />

            {/* Overlays */}
            {selectedStock && (
                <StockDetailView 
                    stock={selectedStock} 
                    onBack={() => setSelectedStock(null)} 
                    onTrade={() => setIsTradeModalOpen(true)}
                />
            )}
            
            <TradeModal 
                isOpen={isTradeModalOpen} 
                onClose={() => setIsTradeModalOpen(false)}
                stock={selectedStock}
                userProfile={user}
                onTrade={handleTrade}
            />

            {/* Legal & Onboarding Modals */}
            <CookieBanner onAccept={() => {}} darkMode={darkMode} />
            <TermsModal isOpen={showTerms} onAccept={handleAcceptTerms} darkMode={darkMode} />
            {showOnboarding && <OnboardingTour onComplete={handleCompleteOnboarding} />}
            <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} darkMode={darkMode} />

        </div>
    );
};

export default App;
