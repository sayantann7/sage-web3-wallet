'use client';

import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Lock, Key, Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const { updateWallet } = useWallet();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleBack = () => {
    updateWallet({ step: 'landing' });
  };

  const handleSignIn = async () => {
    if (!password) {
      alert('Please enter your password');
      return;
    }

    setIsSigningIn(true);
    
    // Simulate sign-in delay
    setTimeout(() => {
      // In a real app, you would verify the password and retrieve the wallet
      const mockAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      updateWallet({
        isAuthenticated: true,
        address: mockAddress,
        balance: '2.4521',
        step: 'dashboard',
      });
      
      setIsSigningIn(false);
    }, 1500);
  };

  const handleImportWallet = () => {
    updateWallet({ step: 'import-wallet' });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-blue-400 mb-8 transition-colors"
          style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-white mb-4" style={{fontFamily: "'Nexa Heavy', system-ui, sans-serif"}}>
              Welcome Back
            </h1>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
              Enter your password to access your wallet
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Enter your password"
                  style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}
                  onKeyPress={(e) => e.key === 'Enter' && handleSignIn()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSignIn}
              disabled={!password || isSigningIn}
              className={`w-full px-6 py-4 font-semibold rounded-xl transition-all duration-200 ${
                password && !isSigningIn
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
              style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
            >
              {isSigningIn ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-500 mb-4" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
              Don't have a Sage wallet yet?
            </p>
            <button
              onClick={handleImportWallet}
              className="flex items-center justify-center w-full px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-xl border border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-all duration-200"
              style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
            >
              <Key className="w-5 h-5 mr-2" />
              Import Existing Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
