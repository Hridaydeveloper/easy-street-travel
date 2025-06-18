
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setGuestMode: (isGuest: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for stored auth data on app start
    const storedUser = localStorage.getItem('user');
    const storedGuestMode = localStorage.getItem('isGuest');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedGuestMode === 'true') {
      setIsGuest(true);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.removeItem('isGuest');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
  };

  const setGuestMode = (guestMode: boolean) => {
    setIsGuest(guestMode);
    if (guestMode) {
      localStorage.setItem('isGuest', 'true');
      setUser(null);
      localStorage.removeItem('user');
    } else {
      localStorage.removeItem('isGuest');
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isGuest,
      login,
      logout,
      setGuestMode
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
