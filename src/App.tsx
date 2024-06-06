import { TonConnectButton, useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
// import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
// import WebApp from '@twa-dev/sdk'
import eruda from 'eruda'


import './App.css'
// import { AuthButton } from './AuthButton/AuthButton'


function App() {

  eruda.init();

  const wallet = useTonWallet()
  const userFriendlyAddress = useTonAddress()
  const rawAddress = useTonAddress(false)
  const [tonConnectUI] = useTonConnectUI()

  console.log("wallet: ", wallet);
  console.log("userFriendlyAddress: ", userFriendlyAddress);
  console.log("rawAddress: ", rawAddress);

  tonConnectUI.onStatusChange((walletInfo) => {
    console.log('Connection status:', walletInfo);
  })


  return (
    <div className='app'>
      <header className='app-header'>
        <span className='app-title'>My App</span>
        {/* <AuthButton /> */}
        <TonConnectButton></TonConnectButton>
      </header>

      <main>
        {userFriendlyAddress && (<span>User-friendly address: {userFriendlyAddress}</span>)}
        {rawAddress && (<span>Raw address: {rawAddress}</span>)}
      </main>

    </div>
  )
}

export default App
