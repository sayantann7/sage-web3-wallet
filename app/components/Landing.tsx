'use client';

import { useWallet } from '../context/WalletContext';
import { Wallet, Shield, Zap } from 'lucide-react';

export default function Landing() {
  const { updateWallet } = useWallet();

  const handleCreateWallet = () => {
    updateWallet({ step: 'create-wallet' });
  };

  const handleSignIn = () => {
    updateWallet({ step: 'sign-in' });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg">
              <Wallet className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4" style={{fontFamily: "'Nexa Heavy', system-ui, sans-serif"}}>
            Sage <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Wallet</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
            Your secure gateway to the decentralized world. Store, send, and manage your digital assets with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <Shield className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>Secure</h3>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>Your private keys are encrypted and stored locally. We never have access to your funds.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <Zap className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>Fast</h3>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>Lightning-fast transactions with minimal fees across multiple blockchain networks.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <Wallet className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>Simple</h3>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>Intuitive interface designed for both beginners and experienced crypto users.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleCreateWallet}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
          >
            Create New Wallet
          </button>
          <button
            onClick={handleSignIn}
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-gray-300 font-semibold rounded-xl border-2 border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 shadow-md hover:shadow-lg"
            style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
