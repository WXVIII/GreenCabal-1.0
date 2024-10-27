import React, { createContext, useContext, useState } from 'react';
import { Platform, ConnectedPlatform, DiscountInfo } from '../types/social';

interface User {
  id: string;
  email: string;
  username?: string;
  connectedPlatforms: ConnectedPlatform[];
  discountPoints: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  connectPlatform: (platform: Platform) => Promise<boolean>;
  disconnectPlatform: (platform: Platform) => void;
  addDiscountPoint: () => void;
  getDiscountInfo: () => DiscountInfo;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const POSTS_PER_PERCENT = 20;
const MAX_DISCOUNT = 50;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Partial<User>) => {
    setIsAuthenticated(true);
    setUser({
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      email: userData.email || '',
      username: userData.username,
      connectedPlatforms: [],
      discountPoints: userData.discountPoints || 0
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const connectPlatform = async (platform: Platform): Promise<boolean> => {
    if (!user) return false;

    const newPlatform: ConnectedPlatform = {
      platform,
      username: `${platform}_user`,
      connected: true,
      lastVerified: new Date()
    };

    setUser(prev => {
      if (!prev) return null;
      const updatedPlatforms = [...prev.connectedPlatforms.filter(p => p.platform !== platform), newPlatform];
      return { ...prev, connectedPlatforms: updatedPlatforms };
    });

    return true;
  };

  const disconnectPlatform = (platform: Platform) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        connectedPlatforms: prev.connectedPlatforms.filter(p => p.platform !== platform)
      };
    });
  };

  const addDiscountPoint = () => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        discountPoints: prev.discountPoints + 1
      };
    });
  };

  const getDiscountInfo = (): DiscountInfo => {
    if (!user) return { totalPosts: 0, discountPercentage: 0, postsUntilNextPercent: POSTS_PER_PERCENT };

    const totalPosts = user.discountPoints;
    const discountPercentage = Math.min(Math.floor(totalPosts / POSTS_PER_PERCENT), MAX_DISCOUNT);
    const postsUntilNextPercent = discountPercentage >= MAX_DISCOUNT ? 
      0 : 
      POSTS_PER_PERCENT - (totalPosts % POSTS_PER_PERCENT);

    return {
      totalPosts,
      discountPercentage,
      postsUntilNextPercent
    };
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      connectPlatform, 
      disconnectPlatform,
      addDiscountPoint,
      getDiscountInfo
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