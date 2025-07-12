'use client';

import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { Copy, Send, LogOut, Eye, EyeOff, X, CheckCircle, Download } from 'lucide-react';

export default function Dashboard() {
    const { wallet, signOut } = useWallet();
    const [showSendModal, setShowSendModal] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);
    const [sendTo, setSendTo] = useState('');
    const [sendAmount, setSendAmount] = useState('');
    const [copied, setCopied] = useState(false);
    const [addressCopied, setAddressCopied] = useState(false);
    const [showAddress, setShowAddress] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(wallet.address!);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCopyAddress = async () => {
        try {
            await navigator.clipboard.writeText(wallet.address!);
            setAddressCopied(true);
            setTimeout(() => setAddressCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleSend = () => {
        if (!sendTo || !sendAmount) {
            alert('Please fill in all fields');
            return;
        }

        // In a real app, this would initiate a transaction
        alert(`Sending ${sendAmount} ETH to ${sendTo}`);
        setShowSendModal(false);
        setSendTo('');
        setSendAmount('');
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="bg-gray-900 shadow-sm border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg"></div>
                        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Nexa Heavy', system-ui, sans-serif" }}>Sage Wallet</h1>
                    </div>
                    <button
                        onClick={signOut}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-red-400 transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8 border border-blue-700">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-blue-100 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Total Balance</p>
                            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Nexa Heavy', system-ui, sans-serif" }}>{wallet.balance} ETH</h2>
                            <p className="text-blue-200 mt-2" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>≈ $2,547.83 USD</p>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-100 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Your Address</p>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowAddress(!showAddress)}
                                    className="text-white hover:text-blue-200 transition-colors"
                                >
                                    {showAddress ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <span className="font-mono text-sm" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                                    {showAddress ? wallet.address : formatAddress(wallet.address!)}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="text-white hover:text-blue-200 transition-colors"
                                >
                                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setShowSendModal(true)}
                            className="flex items-center px-6 py-3  bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all duration-200 border border-white-600"
                            style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Send
                        </button>

                        <button
                            onClick={() => setShowReceiveModal(true)}
                            className="flex items-center px-6 py-3  bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all duration-200 border border-white-600"
                            style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Receive
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}>Recent Transactions</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                                <div>
                                    <p className="font-medium text-white" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Received</p>
                                    <p className="text-sm text-gray-400" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>From 0x1234...5678</p>
                                </div>
                                <span className="text-green-400 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>+0.5 ETH</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                                <div>
                                    <p className="font-medium text-white" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Sent</p>
                                    <p className="text-sm text-gray-400" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>To 0x9876...4321</p>
                                </div>
                                <span className="text-red-400 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>-0.2 ETH</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                                <div>
                                    <p className="font-medium text-white" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Received</p>
                                    <p className="text-sm text-gray-400" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>From 0xabcd...efgh</p>
                                </div>
                                <span className="text-green-400 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>+1.0 ETH</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}>Portfolio</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                                        <span className="text-white text-xs font-bold" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>ETH</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Ethereum</p>
                                        <p className="text-sm text-gray-400" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>ETH</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-white" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>{wallet.balance} ETH</p>
                                    <p className="text-sm text-green-400" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>+5.2%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Send Modal */}
            {showSendModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Nexa Heavy', system-ui, sans-serif" }}>Send Ethereum</h2>
                            <button
                                onClick={() => setShowSendModal(false)}
                                className="text-gray-400 hover:text-gray-300"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}>
                                    Recipient Address
                                </label>
                                <input
                                    type="text"
                                    value={sendTo}
                                    onChange={(e) => setSendTo(e.target.value)}
                                    placeholder="0x..."
                                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}>
                                    Amount (ETH)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={sendAmount}
                                    onChange={(e) => setSendAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                                />
                                <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                                    Available: {wallet.balance} ETH
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowSendModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
                                style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSend}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
                                style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Receive Modal */}
            {showReceiveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Nexa Heavy', system-ui, sans-serif" }}>Receive Ethereum</h2>
                            <button
                                onClick={() => setShowReceiveModal(false)}
                                className="text-gray-400 hover:text-gray-300"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-gray-400 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                                Scan the QR code or copy your address to receive ETH
                            </p>
                            
                            {/* QR Code */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-white p-4 rounded-xl">
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${wallet.address}`}
                                        alt="Wallet Address QR Code"
                                        className="w-[150px] h-[150px]"
                                    />
                                </div>
                            </div>

                            {/* Address Display */}
                            <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
                                <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}>
                                    Your Wallet Address
                                </label>
                                <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                                    <span className="text-white text-sm font-mono break-all mr-2" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
                                        {wallet.address}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCopyAddress}
                                className={`w-full px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
                                    addressCopied 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900'
                                }`}
                                style={{ fontFamily: "'Nexa Light', system-ui, sans-serif" }}
                            >
                                {addressCopied ? (
                                    <>
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Address Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-5 h-5 mr-2" />
                                        Copy Address
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
