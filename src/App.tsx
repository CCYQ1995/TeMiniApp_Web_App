// import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
// import WebApp from '@twa-dev/sdk'



import './App.css'
import { AuthButton } from './AuthButton/AuthButton'


function App() {

  return (
    <div className='app'>
      <header className='app-header'>
        <span className='app-title'>My App</span>
        <AuthButton />
        {/* <TonConnectButton></TonConnectButton> */}
      </header>

      <main>

      </main>

    </div>
  )
}

export default App
