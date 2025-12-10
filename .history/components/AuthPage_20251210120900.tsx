
import React, { useState } from 'react';
import { ArrowRight, Check, AlertTriangle, Shield, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { loginUser, registerUser } from '../services/userService';

interface AuthPageProps {
  onLogin: (email: string) => void;
  darkMode: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, darkMode }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        setError("Please fill in all fields");
        return;
    }
    setError('');
    setLoading(true);
    
    try {
        if (isSignUp) {
            await registerUser(email, name, password);
            onLogin(email);
        } else {
            await loginUser(email, password);
            onLogin(email);
        }
    } catch (err: any) {
        setError(err.message || "An error occurred");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#00d09c]">
         <div className="absolute inset-0 bg-gradient-to-br from-[#00d09c] to-emerald-800 opacity-90"></div>
         <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
            <div>
                <img src="https://i.postimg.cc/43DWhq20/Tradeo-Bull.png" alt="TradeoBull" className="w-16 h-16 mb-8 drop-shadow-lg" />
                <h1 className="text-5xl font-extrabold leading-tight mb-6">Master the Market <br/> Risk-Free.</h1>
                <p className="text-lg text-emerald-100 max-w-md leading-relaxed">Join thousands of Indian investors learning to trade with virtual currency before deploying real capital.</p>
            </div>
            
            <div className="space-y-4">
                {['Real-time NSE Data', '₹1,00,000 Virtual Capital', 'Safe Cloud Sync', 'Zero Risk Trading'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-emerald-50 font-medium">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Check size={14} strokeWidth={3} /></div>
                        {feat}
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Right Panel - Form */}
      <div className={`flex-1 flex flex-col justify-center p-8 md:p-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="max-w-md w-full mx-auto space-y-8 animate-in slide-in-from-right duration-500">
             <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    {isSignUp ? 'Join TradeoBull to start your journey.' : 'Sign in to access your portfolio.'}
                </p>
             </div>

             {error && (
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                     <AlertTriangle size={18} />
                     {error}
                 </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                    <div>
                        <label className={`block text-xs font-bold uppercase mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border focus:ring-2 focus:ring-[#00d09c] outline-none transition-all font-medium ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                                placeholder="Your Name"
                            />
                        </div>
                    </div>
                )}
                
                <div>
                    <label className={`block text-xs font-bold uppercase mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-11 pr-4 py-3.5 rounded-xl border focus:ring-2 focus:ring-[#00d09c] outline-none transition-all font-medium ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
                
                {/* Real Password Field */}
                <div>
                    <label className={`block text-xs font-bold uppercase mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-11 pr-12 py-3.5 rounded-xl border focus:ring-2 focus:ring-[#00d09c] outline-none transition-all font-medium ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                            placeholder="••••••••"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00d09c] hover:bg-[#00b386] text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (
                        <>
                            {isSignUp ? 'Create Account' : 'Sign In'}
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
             </form>

             <div className="text-center">
                 <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                     {isSignUp ? 'Already have an account?' : "Don't have an account?"} {' '}
                     <button 
                        onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                        className="text-[#00d09c] font-bold hover:underline"
                     >
                         {isSignUp ? 'Sign In' : 'Sign Up'}
                     </button>
                 </p>
             </div>
          </div>
      </div>
    </div>
  );
};

export default AuthPage;
