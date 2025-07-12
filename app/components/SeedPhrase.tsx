'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { ArrowLeft, Copy, Download, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function SeedPhrase() {
  const { wallet, updateWallet, generateSeedPhrase } = useWallet();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!wallet.seedPhrase) {
      const newSeedPhrase = generateSeedPhrase();
      setSeedPhrase(newSeedPhrase);
      updateWallet({ seedPhrase: newSeedPhrase });
    } else {
      setSeedPhrase(wallet.seedPhrase);
    }
  }, []);

  const handleBack = () => {
    updateWallet({ step: 'create-wallet' });
  };

  const handleContinue = () => {
    if (hasConfirmed) {
      updateWallet({ step: 'password' });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(seedPhrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`Sage Wallet Seed Phrase\n\n${seedPhrase}\n\nKeep this safe and never share it with anyone!`], 
      { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'sage-wallet-seed-phrase.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const seedWords = seedPhrase.split(' ');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 mt-4 mb-12">
      <div className="max-w-3xl w-full">
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
            <h1 className="text-3xl font-bold text-white mb-4" style={{fontFamily: "'Nexa Heavy', system-ui, sans-serif"}}>Your Secret Recovery Phrase</h1>
            <p className="text-gray-400" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
              Write down or store these 12 words in the exact order shown. This is the only way to recover your wallet.
            </p>
          </div>

          <div className="relative mb-8">
            <div className={`transition-all duration-300 ${!isRevealed ? 'blur-sm' : ''}`}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-gray-800 rounded-xl border border-gray-700">
                {seedWords.map((word, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg shadow-sm border border-gray-700">
                    <span className="text-sm text-gray-500 font-mono w-6">{index + 1}.</span>
                    <span className="font-medium text-white" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>{word}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {!isRevealed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsRevealed(true)}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                  style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Click to reveal seed phrase
                </button>
              </div>
            )}
          </div>

          {isRevealed && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
                  style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
                  style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download as File
                </button>
              </div>

              <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-red-300 mb-2" style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}>⚠️ Important Security Notice</h3>
                <ul className="text-red-400 text-sm space-y-1" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                  <li>• Store this phrase in a safe, offline location</li>
                  <li>• Never share it with anyone or enter it on suspicious websites</li>
                  <li>• Consider writing it on paper and storing in a secure location</li>
                  <li>• Losing this phrase means losing access to your wallet forever</li>
                </ul>
              </div>

              <div className="mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasConfirmed}
                    onChange={(e) => setHasConfirmed(e.target.checked)}
                    className="mr-3 h-5 w-5 text-blue-600 rounded border-gray-600 bg-gray-800 focus:ring-blue-500"
                  />
                  <span className="text-gray-300" style={{fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"}}>
                    I have safely stored my seed phrase and understand that I am responsible for keeping it secure
                  </span>
                </label>
              </div>

              <button
                onClick={handleContinue}
                disabled={!hasConfirmed}
                className={`w-full px-6 py-4 font-semibold rounded-xl transition-all duration-200 ${
                  hasConfirmed
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                }`}
                style={{fontFamily: "'Nexa Light', system-ui, sans-serif"}}
              >
                Continue to Password Setup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
