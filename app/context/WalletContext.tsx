'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { WalletState } from '../types/wallet';
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import axios from "axios";

interface WalletContextType {
    wallet: WalletState;
    setWallet: (wallet: WalletState) => void;
    updateWallet: (updates: Partial<WalletState>) => void;
    signOut: () => void;
    getBalance: (address: string) => string;
    generateSeedPhrase: () => string;
    createWallet: (seedPhrase: string, password: string) => Promise<void>;
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

    const [index, setIndex] = useState<number>(0);

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
        const seedPhrase = generateMnemonic().toString();
        console.log('Generated Seed Phrase:', seedPhrase);
        return seedPhrase;
    };

    // const getBalance = (address: string): string => {
    //     const solanaRpcUrl = "https://solana-mainnet.g.alchemy.com/v2/T69Q0ccfUTgOBCEL-72mwDvsfFpLfvMn";
    //     const response = axios.post(solanaRpcUrl, {
    //         "jsonrpc": "2.0",
    //         "id": 1,
    //         "method": "getBalance",
    //         "params": [address]
    //     });
    // };

    const createWallet = async (seedPhrase: string, password: string) => {
        console.log('Creating wallet with seed phrase:', seedPhrase);
        const seed = await mnemonicToSeed(seedPhrase);
        const path = `m/44'/501'/${index}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        const address = keypair.publicKey.toBase58();

        console.log('Created Wallet Address:', address);

        updateWallet({
            isAuthenticated: true,
            address: address,
            balance: '1.2547',
            seedPhrase,
            step: 'dashboard',
        });
    };

    const importWallet = async (seedPhrase: string, password: string) => {
        console.log('Importing wallet with seed phrase:', seedPhrase);
        const seed = await mnemonicToSeed(seedPhrase);
        const path = `m/44'/501'/${index}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        const address = keypair.publicKey.toBase58();

        console.log('Imported Wallet Address:', address);

        updateWallet({
            isAuthenticated: true,
            address: address,
            balance: '0.2547',
            seedPhrase,
            step: 'dashboard',
        });
    };

    const signIn = async (password: string): Promise<boolean> => {
        // In a real app, you would verify the password against stored credentials
        // For this demo, we'll simulate a successful sign-in
        const mockAddress = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

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
