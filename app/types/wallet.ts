export interface WalletState {
  isAuthenticated: boolean;
  address: string | null;
  balance: string;
  seedPhrase: string | null;
  isCreating: boolean;
  step: 'landing' | 'create-wallet' | 'seed-phrase' | 'password' | 'dashboard' | 'sign-in' | 'import-wallet' | 'import-password';
}

export interface Transaction {
  to: string;
  amount: string;
}
