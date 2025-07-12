'use client';

import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle, X } from 'lucide-react';

export default function PasswordSetup() {
  const { wallet, createWallet, updateWallet } = useWallet();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleBack = () => {
    updateWallet({ step: 'seed-phrase' });
  };

  const handleCreateWallet = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setIsCreating(true);
    
    // Simulate wallet creation delay
    await createWallet(wallet.seedPhrase!, password);

    console.log("wallet address created : ", wallet.address);
    setIsCreating(false);
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
            <h1 className="text-3xl font-bold text-white mb-4" style={{fontFamily: "'Nexa Heavy', system-ui, sans-serif"}}>Set Your Password</h1>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
              This password will be used to access your wallet on this device. Make it strong and memorable.
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
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
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
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
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

            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-3" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>Password Requirements</h3>
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {req.met ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <X className="w-4 h-4 text-gray-500" />
                    )}
                    <span className={`text-sm ${req.met ? 'text-green-400' : 'text-gray-400'}`} style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateWallet}
            disabled={!allRequirementsMet || isCreating}
            className={`w-full px-6 py-4 font-semibold rounded-xl transition-all duration-200 ${
              allRequirementsMet && !isCreating
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            }`}
            style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
          >
            {isCreating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Your Wallet...
              </div>
            ) : (
              'Create Wallet'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
