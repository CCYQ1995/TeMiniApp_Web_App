import React, { useCallback } from 'react';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk'

import { Connector } from './Connector';
import { isDesktop, isMobile, openLink } from './Utils';
import './App.css'


function App() {

  const walletsList = Connector.getWallets();

  const connectDidClick = useCallback(() => {
    console.log(walletsList);
  }, [walletsList]);

  return (
    <div className='app'>
      <header>
        <span className='app-title'>My App</span>
        <button onClick={connectDidClick}>Connect Wallet</button>
      </header>
      <main>

      </main>

    </div>
  )
}

export default App
