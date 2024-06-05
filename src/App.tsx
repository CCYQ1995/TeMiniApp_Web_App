import { useCallback } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
// import WebApp from '@twa-dev/sdk'

import './App.css'
import { Connector } from './Connector';

// import { isDesktop, isMobile, openLink } from './Utils';


function App() {

  const walletsList = Connector.getWallets();

  // const connectDidClick = useCallback(() => {
  //   console.log(walletsList);
  //   Connector.connect

  // }, [walletsList]);

  return (
    <div className='app'>
      <header className='app-header'>
        <span className='app-title'>My App</span>
        {/* <button onClick={connectDidClick}>Connect Wallet</button> */}
        <TonConnectButton></TonConnectButton>
      </header>

      <main>

      </main>

    </div>
  )
}

export default App
