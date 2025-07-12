'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { WalletState } from '../types/wallet';

interface WalletContextType {
  wallet: WalletState;
  setWallet: (wallet: WalletState) => void;
  updateWallet: (updates: Partial<WalletState>) => void;
  signOut: () => void;
  generateSeedPhrase: () => string;
  createWallet: (seedPhrase: string, password: string) => void;
  importWallet: (seedPhrase: string, password: string) => void;
  signIn: (password: string) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    isAuthenticated: false,
    address: null,
    balance: '0.00',
    seedPhrase: null,
    isCreating: false,
    step: 'landing',
  });

  const updateWallet = (updates: Partial<WalletState>) => {
    setWallet(prev => ({ ...prev, ...updates }));
  };

  const signOut = () => {
    setWallet({
      isAuthenticated: false,
      address: null,
      balance: '0.00',
      seedPhrase: null,
      isCreating: false,
      step: 'landing',
    });
  };

  const generateSeedPhrase = (): string => {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
      'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
      'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
      'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'agent', 'agree',
      'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol',
      'alert', 'alien', 'all', 'alley', 'allow', 'almost', 'alone', 'alpha',
      'already', 'also', 'alter', 'always', 'amateur', 'amazing', 'among', 'amount',
      'amused', 'analyst', 'anchor', 'ancient', 'anger', 'angle', 'angry', 'animal',
      'ankle', 'announce', 'annual', 'another', 'answer', 'antenna', 'antique', 'anxiety',
    ];
    
    const seedPhrase = [];
    for (let i = 0; i < 12; i++) {
      seedPhrase.push(words[Math.floor(Math.random() * words.length)]);
    }
    return seedPhrase.join(' ');
  };

  const createWallet = (seedPhrase: string, password: string) => {
    // In a real app, you would use the seed phrase and password to generate a wallet
    // For this demo, we'll generate a mock address
    const mockAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    updateWallet({
      isAuthenticated: true,
      address: mockAddress,
      balance: '1.2547',
      seedPhrase,
      step: 'dashboard',
    });
  };

  const importWallet = (seedPhrase: string, password: string) => {
    // In a real app, you would use the seed phrase and password to restore the wallet
    // For this demo, we'll generate a mock address
    const mockAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    updateWallet({
      isAuthenticated: true,
      address: mockAddress,
      balance: '0.8924',
      seedPhrase,
      step: 'dashboard',
    });
  };

  const signIn = async (password: string): Promise<boolean> => {
    // In a real app, you would verify the password against stored credentials
    // For this demo, we'll simulate a successful sign-in
    const mockAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    updateWallet({
      isAuthenticated: true,
      address: mockAddress,
      balance: '2.4521',
      step: 'dashboard',
    });
    
    return true;
  };

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      setWallet, 
      updateWallet, 
      signOut, 
      generateSeedPhrase, 
      createWallet,
      importWallet,
      signIn
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
