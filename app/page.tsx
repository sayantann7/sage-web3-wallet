'use client';

import { useWallet } from './context/WalletContext';
import Landing from './components/Landing';
import CreateWallet from './components/CreateWallet';
import SeedPhrase from './components/SeedPhrase';
import PasswordSetup from './components/PasswordSetup';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import ImportWallet from './components/ImportWallet';
import ImportPassword from './components/ImportPassword';

export default function Home() {
  const { wallet } = useWallet();

  const renderStep = () => {
    switch (wallet.step) {
      case 'landing':
        return <Landing />;
      case 'create-wallet':
        return <CreateWallet />;
      case 'seed-phrase':
        return <SeedPhrase />;
      case 'password':
        return <PasswordSetup />;
      case 'dashboard':
        return <Dashboard />;
      case 'sign-in':
        return <SignIn />;
      case 'import-wallet':
        return <ImportWallet />;
      case 'import-password':
        return <ImportPassword />;
      default:
        return <Landing />;
    }
  };

  return renderStep();
}
