'use client';

import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Wallet, Shield, AlertTriangle } from 'lucide-react';

export default function CreateWallet() {
  const { updateWallet } = useWallet();

  const handleBack = () => {
    updateWallet({ step: 'landing' });
  };

  const handleContinue = () => {
    updateWallet({ step: 'seed-phrase' });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
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
                <Wallet className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4" style={{fontFamily: "'Nexa Heavy', system-ui, sans-serif"}}>Create Your Wallet</h1>
            <p className="text-gray-400 mb-8" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
              You're about to create a new wallet. This will generate a unique seed phrase that you'll need to keep safe.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-xl border border-blue-800/30">
              <Shield className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-300 mb-1" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>Your seed phrase is your wallet</h3>
                <p className="text-blue-400 text-sm" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                  This 12-word phrase is the only way to recover your wallet. Store it safely offline.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-yellow-900/20 rounded-xl border border-yellow-800/30">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>Never share your seed phrase</h3>
                <p className="text-yellow-400 text-sm" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                  Anyone with your seed phrase can access your funds. Sage will never ask for it.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleContinue}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl"
              style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
            >
              I Understand, Generate My Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
