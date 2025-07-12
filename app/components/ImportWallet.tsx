'use client';

import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Key, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ImportWallet() {
  const { updateWallet } = useWallet();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const handleBack = () => {
    updateWallet({ step: 'sign-in' });
  };

  const handleContinue = () => {
    if (!seedPhrase.trim()) {
      alert('Please enter your seed phrase');
      return;
    }

    const words = seedPhrase.trim().split(/\s+/);
    if (words.length !== 12) {
      alert('Please enter exactly 12 words');
      return;
    }

    if (!hasConfirmed) {
      alert('Please confirm that you are importing your own wallet');
      return;
    }

    // Store the seed phrase and move to password setup
    updateWallet({ 
      seedPhrase: seedPhrase.trim(),
      step: 'import-password' 
    });
  };

  const seedWords = seedPhrase.trim().split(/\s+/).filter(word => word.length > 0);
  const isValidLength = seedWords.length === 12;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 m-12">
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
                <Key className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-white mb-4" style={{fontFamily: "'Nexa Heavy', system-ui, sans-serif"}}>
              Import Your Wallet
            </h1>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
              Enter your 12-word recovery phrase to restore your existing wallet
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-amber-900/20 border border-amber-600/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-400 mb-1" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>
                    Security Warning
                  </h3>
                  <p className="text-amber-200 text-sm" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                    Only import wallets that belong to you. Never enter your seed phrase on suspicious websites.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>
                Recovery Phrase (12 words)
              </label>
              <textarea
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 h-32 resize-none"
                placeholder="Enter your 12-word recovery phrase separated by spaces..."
                style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                  Words entered: {seedWords.length}/12
                </p>
                {seedWords.length > 0 && (
                  <div className="flex items-center">
                    {isValidLength ? (
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>Valid</span>
                      </div>
                    ) : (
                      <span className="text-sm text-red-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                        {seedWords.length < 12 ? 'Need more words' : 'Too many words'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {seedWords.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>
                  Preview:
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }, (_, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg">
                      <span className="text-xs text-gray-400 w-4">{index + 1}.</span>
                      <span className="text-sm text-white font-mono" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                        {seedWords[index] || '___'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-800 rounded-xl p-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasConfirmed}
                  onChange={(e) => setHasConfirmed(e.target.checked)}
                  className="mr-3 mt-1 h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500"
                />
                <span className="text-gray-300 text-sm" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                  I confirm that this is my own wallet and I have the right to import it. I understand that importing someone else's wallet without permission is theft.
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!isValidLength || !hasConfirmed}
            className={`w-full px-6 py-4 font-semibold rounded-xl transition-all duration-200 ${
              isValidLength && hasConfirmed
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
            style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
          >
            Continue to Password Setup
          </button>
        </div>
      </div>
    </div>
  );
}
