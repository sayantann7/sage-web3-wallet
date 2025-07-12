'use client';

import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle, X } from 'lucide-react';

export default function ImportPassword() {
  const { wallet, updateWallet } = useWallet();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleBack = () => {
    updateWallet({ step: 'import-wallet' });
  };

  const handleImportWallet = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setIsImporting(true);
    
    // Simulate wallet import delay
    setTimeout(() => {
      // In a real app, you would use the seed phrase and password to restore the wallet
      const mockAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      updateWallet({
        isAuthenticated: true,
        address: mockAddress,
        balance: '0.8924',
        step: 'dashboard',
      });
      
      setIsImporting(false);
    }, 2000);
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Passwords match', met: password === confirmPassword && password.length > 0 },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 m-12">
      <div className="max-w-xl w-full">
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
              Secure Your Wallet
            </h1>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
              Set a password to protect your imported wallet on this device
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-1" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>
                  Wallet Ready to Import
                </h3>
                <p className="text-blue-200 text-sm" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                  Your seed phrase has been validated. Set a password to complete the import process.
                </p>
              </div>
            </div>
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

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Confirm your password"
                  style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>
                Password Requirements
              </h3>
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {req.met ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <X className="w-4 h-4 text-gray-500" />
                    )}
                    <span className={`text-sm ${req.met ? 'text-green-400' : 'text-gray-500'}`} style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleImportWallet}
            disabled={!allRequirementsMet || isImporting}
            className={`w-full px-6 py-4 font-semibold rounded-xl transition-all duration-200 ${
              allRequirementsMet && !isImporting
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
            style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
          >
            {isImporting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Importing Your Wallet...
              </div>
            ) : (
              'Import Wallet'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
