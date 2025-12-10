
import { UserProfile, Transaction } from '../types';
import { INITIAL_BALANCE } from '../constants';
import { supabase } from './supabaseClient';

const STORAGE_KEY = 'tradeobull_user_v3';

const DEFAULT_USER: UserProfile = {
  id: '',
  email: '', 
  balance: INITIAL_BALANCE,
  startBalance: INITIAL_BALANCE,
  portfolio: [],
  transactions: [],
  watchlist: [],
  termsAccepted: false,
  onboardingCompleted: false
};

const getCurrentUserId = () => {
    return localStorage.getItem('tradeobull_user_email');
};

// --- STRICT REAL AUTH FUNCTIONS ---

export const loginUser = async (email: string, password?: string): Promise<UserProfile> => {
    if (!supabase) throw new Error("Database not connected");
    if (!password) throw new Error("Password is required for secure login");

    // 1. Supabase Auth Login (Verifies Email & Password)
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (authError) {
        throw new Error(authError.message);
    }

    if (!authData.user) {
        throw new Error("Login failed. Please try again.");
    }

    // 2. Load profile data from 'profiles' table
    // We use the Email as the ID for consistency with previous data structure
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', email)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
        console.error("Profile Load Error:", error);
    }

    // Prepare profile object
    let profile: UserProfile = { ...DEFAULT_USER, id: email, email: email };
    
    if (data && data.data) {
        profile = { ...profile, ...data.data };
    } else {
        // Edge case: User in Auth but not in Profiles (shouldn't happen with new register flow)
        // Auto-create simplified profile
        await saveUserProfile(profile); 
    }

    // Update Local Storage
    localStorage.setItem('tradeobull_user_email', email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

    return profile;
};

export const registerUser = async (email: string, name: string, password?: string): Promise<UserProfile> => {
    if (!supabase) throw new Error("Database not connected");
    if (!password) throw new Error("Password is required for registration");

    // 1. Check if profile already exists (Prevent duplicate IDs in profiles table)
    const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', email)
        .single();

    if (existingProfile) {
        throw new Error("Account already exists. Please Sign In.");
    }

    // 2. Supabase Auth Sign Up (Creates User in Auth System)
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: name }
        }
    });

    if (authError) {
        throw new Error(authError.message);
    }

    // 3. Create New Profile in 'profiles' table
    const newProfile: UserProfile = { 
        ...DEFAULT_USER, 
        id: email, 
        email: email, 
        name: name || 'Trader' 
    };

    // Insert into Supabase 'profiles' table
    const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
            id: email, 
            data: newProfile,
            updated_at: new Date().toISOString()
        }]);

    if (profileError) {
        console.error("Profile Creation Error:", profileError);
        // Note: We don't rollback Auth here for simplicity, user can just login next time and profile will be auto-created by login fallback if needed
        throw new Error("Failed to initialize profile data. Please contact support.");
    }

    // Success - Update Local
    localStorage.setItem('tradeobull_user_email', email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));

    return newProfile;
};

// --- EXISTING FUNCTIONS ---

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const userId = getCurrentUserId();
  
  if (!userId) return null; // STRICT: No ID = No Profile

  let profile = { ...DEFAULT_USER, id: userId, email: userId };

  // 1. Fallback to LocalStorage first (Instant Load)
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure the stored profile matches the current user ID
      if(parsed.email === userId) {
         profile = { ...DEFAULT_USER, ...parsed };
      }
    } catch(e) {
      // ignore corrupt local data
    }
  }

  // 2. Sync from Cloud in background
  if (supabase) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data && data.data) {
         profile = { ...profile, ...data.data };
         // Update local storage to match latest cloud
         localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      }
    } catch (e) {
      console.warn("Cloud fetch failed, using local state.", e);
    }
  }

  return profile;
};

export const saveUserProfile = async (profile: UserProfile) => {
  if (!profile.email) {
      console.error("Cannot save profile without Email ID");
      return;
  }

  // 1. Save Local
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

  // 2. Sync to Cloud
  if (supabase) {
    // console.log("Saving Transaction History for:", profile.email);
    
    try {
        const { error } = await supabase
        .from('profiles')
        .upsert({ 
            id: profile.email, 
            data: profile,
            updated_at: new Date().toISOString()
        });
        
        if (error) {
            console.error("Supabase Save Error:", error.message);
        } else {
            // console.log("Supabase Data Synced Successfully");
        }
    } catch (err) {
        console.error("Supabase Exception:", err);
    }
  }
};

export const executeTrade = async (
  currentProfile: UserProfile,
  symbol: string,
  price: number,
  quantity: number,
  type: 'BUY' | 'SELL'
): Promise<{ success: boolean; message: string; newProfile?: UserProfile }> => {
  
  const profile = JSON.parse(JSON.stringify(currentProfile)) as UserProfile;
  const totalCost = price * quantity;

  if (type === 'BUY') {
    if (profile.balance < totalCost) {
      return { success: false, message: 'Insufficient funds' };
    }

    profile.balance -= totalCost;
    const existingItem = profile.portfolio.find(p => p.symbol === symbol);
    if (existingItem) {
      const totalValue = (existingItem.averagePrice * existingItem.quantity) + totalCost;
      const totalQty = existingItem.quantity + quantity;
      existingItem.averagePrice = totalValue / totalQty;
      existingItem.quantity = totalQty;
    } else {
      profile.portfolio.push({ symbol, quantity, averagePrice: price });
    }
  } else {
    const existingItem = profile.portfolio.find(p => p.symbol === symbol);
    if (!existingItem || existingItem.quantity < quantity) {
      return { success: false, message: 'Insufficient holdings' };
    }

    profile.balance += totalCost;
    existingItem.quantity -= quantity;
    if (existingItem.quantity === 0) {
      profile.portfolio = profile.portfolio.filter(p => p.symbol !== symbol);
    }
  }

  const transaction: Transaction = {
    id: Date.now().toString(),
    symbol,
    type,
    quantity,
    price,
    total: totalCost,
    date: new Date().toISOString(),
    status: 'SUCCESS'
  };
  profile.transactions.unshift(transaction);

  await saveUserProfile(profile);
  return { success: true, message: 'Trade executed successfully', newProfile: profile };
};

export const resetAccount = async () => {
    if (supabase) {
        await supabase.auth.signOut();
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('tradeobull_user_email');
    window.location.reload();
};
