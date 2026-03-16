
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string, metadata: { firstName: string; lastName: string; phone: string }) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  setGuestMode: (isGuest: boolean) => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  session: null,
  isAuthenticated: false,
  isGuest: false,
  isLoading: true,
  login: async () => ({ error: 'Not initialized' }),
  signup: async () => ({ error: 'Not initialized' }),
  logout: async () => {},
  setGuestMode: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const buildUserFromMetadata = (supabaseUser: SupabaseUser): UserProfile => ({
    id: supabaseUser.id,
    firstName: supabaseUser.user_metadata?.first_name || '',
    lastName: supabaseUser.user_metadata?.last_name || '',
    email: supabaseUser.email || '',
    phone: supabaseUser.user_metadata?.phone || '',
  });

  const fetchProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (data) {
        setUser({
          id: supabaseUser.id,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: supabaseUser.email || '',
          phone: data.phone || '',
        });
      } else {
        setUser(buildUserFromMetadata(supabaseUser));
      }
    } catch {
      setUser(buildUserFromMetadata(supabaseUser));
    }
  }, []);

  useEffect(() => {
    // Get initial session first
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchProfile(currentSession.user).then(() => setIsLoading(false));
        setIsGuest(false);
      } else {
        setIsLoading(false);
      }
    });

    // Then set up listener for future changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          // Defer async work to avoid Supabase deadlock
          setTimeout(() => {
            fetchProfile(newSession.user!);
          }, 0);
          setIsGuest(false);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signup = async (email: string, password: string, metadata: { firstName: string; lastName: string; phone: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          phone: metadata.phone,
        },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsGuest(false);
  };

  const setGuestModeHandler = (guestMode: boolean) => {
    setIsGuest(guestMode);
    if (guestMode) {
      setUser(null);
    }
  };

  const isAuthenticated = !!user && !!session;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAuthenticated,
      isGuest,
      isLoading,
      login,
      logout,
      signup,
      setGuestMode: setGuestModeHandler
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
