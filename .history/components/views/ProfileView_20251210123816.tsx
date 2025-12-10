import React, { useState } from 'react';
import { UserProfile, View } from '../../types';
import { Settings, ShieldCheck, RefreshCw, ChevronRight, Save, Camera, MapPin, ChevronLeft, Bell, Lock, UserX, Download } from 'lucide-react';
import { formatCurrency } from '../../utils';
import { saveUserProfile } from '../../services/userService';

interface ProfileViewProps {
    user: UserProfile;
    onViewChange: (v: View) => void;
    resetAccount: () => void;
}

type SubView = 'MAIN' | 'SETTINGS' | 'PRIVACY';

const ProfileView: React.FC<ProfileViewProps> = ({ user, onViewChange, resetAccount }) => {
    const [subView, setSubView] = useState<SubView>('MAIN');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || 'Trader',
        location: user.location || 'Hyderabad, India',
        avatar: user.avatar || '',
        bio: user.bio || 'Investing enthusiast.'
    });

    const handleSave = async () => {
        const updatedUser = { ...user, ...formData };
        await saveUserProfile(updatedUser);
        setIsEditing(false);
        // Force reload to reflect changes in parent (In real app, update context)
        window.location.reload(); 
    };

    const handleDownloadData = () => {
        try {
            const dataStr = JSON.stringify(user, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            // Sanitize filename
            const filename = `TradeoBull_Data_${(user.name || 'User').replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.json`;
            link.download = filename;
            
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download data.");
        }
    };

    // --- Sub Views ---

    if (subView === 'SETTINGS') {
        return (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-10 duration-300">
                <button onClick={() => setSubView('MAIN')} className="flex items-center gap-2 text-gray-500 hover:text-[#00d09c] font-bold text-sm mb-4">
                    <ChevronLeft size={18} /> Back to Profile
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h1>
                
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 space-y-6">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><Bell size={18}/> Notifications</h3>
                        <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-slate-800">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Price Alerts</span>
                            <div className="w-10 h-6 bg-[#00d09c] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Daily Market Summary</span>
                            <div className="w-10 h-6 bg-gray-200 dark:bg-slate-700 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><Lock size={18}/> Security</h3>
                        <button className="w-full text-left py-3 text-sm text-blue-500 font-bold hover:underline">Change Password</button>
                        <button className="w-full text-left py-3 text-sm text-blue-500 font-bold hover:underline">Enable Two-Factor Authentication</button>
                    </div>
                </div>
            </div>
        );
    }

    if (subView === 'PRIVACY') {
        return (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-10 duration-300">
                <button onClick={() => setSubView('MAIN')} className="flex items-center gap-2 text-gray-500 hover:text-[#00d09c] font-bold text-sm mb-4">
                    <ChevronLeft size={18} /> Back to Profile
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Data</h1>
                
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                        Your trading data is stored securely. We do not sell your personal information to third parties.
                    </div>
                    
                    <button 
                        onClick={handleDownloadData}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="flex items-center gap-3 font-bold text-gray-700 dark:text-gray-200"><Download size={18}/> Download My Data</span>
                        <ChevronRight size={18} className="text-gray-400"/>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group">
                        <span className="flex items-center gap-3 font-bold text-red-600 dark:text-red-400"><UserX size={18}/> Delete Account</span>
                        <ChevronRight size={18} className="text-red-300 group-hover:text-red-500"/>
                    </button>
                </div>
            </div>
        );
    }

    // --- Main Profile View ---

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 pb-20">
            {/* Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#00d09c] to-[#009c74]"></div>
                
                <div className="relative z-10 pt-16 px-8 pb-8 text-center md:text-left md:flex md:items-end md:gap-6">
                    <div className="relative mx-auto md:mx-0">
                        <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-900 p-1 shadow-xl">
                             {formData.avatar ? (
                                <img src={formData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                             ) : (
                                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-4xl font-bold text-slate-400">
                                    {user.email ? user.email[0].toUpperCase() : 'T'}
                                </div>
                             )}
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-1 right-1 bg-[#00d09c] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                                <Camera size={16} />
                            </button>
                        )}
                    </div>
                    
                    <div className="flex-1 mt-4 md:mt-0 mb-2">
                        {isEditing ? (
                            <div className="space-y-3">
                                <input 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="text-2xl font-bold bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-1 w-full dark:text-white"
                                />
                                <input 
                                    value={formData.location} 
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                    className="text-sm font-medium bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-1 w-full dark:text-gray-300"
                                />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{formData.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center justify-center md:justify-start gap-1.5 mt-1">
                                    <MapPin size={14} /> {formData.location}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="mt-6 md:mt-0">
                        {isEditing ? (
                            <button onClick={handleSave} className="bg-[#00d09c] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-200 dark:shadow-none flex items-center gap-2 hover:bg-[#00b386]">
                                <Save size={18} /> Save
                            </button>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700">
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-2 tracking-wide">Net Worth</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{formatCurrency(user.balance + user.portfolio.reduce((acc, i) => acc + (i.averagePrice * i.quantity), 0))}</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-2 tracking-wide">Total Trades</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{user.transactions.length}</p>
                </div>
            </div>

            {/* Menu */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div 
                    onClick={() => setSubView('SETTINGS')}
                    className="p-5 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400"><Settings size={20} /></div>
                        <span className="font-bold text-gray-700 dark:text-gray-200">Account Settings</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 dark:text-slate-600" />
                </div>
                <div 
                    onClick={() => setSubView('PRIVACY')}
                    className="p-5 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400"><ShieldCheck size={20} /></div>
                        <span className="font-bold text-gray-700 dark:text-gray-200">Privacy & Security</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 dark:text-slate-600" />
                </div>
                <div className="p-5 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/10 cursor-pointer group transition-colors" onClick={resetAccount}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors"><RefreshCw size={20} /></div>
                        <span className="font-bold text-red-600">Reset Account</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;