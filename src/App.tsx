import React, { useEffect } from 'react';
import './App.css'
import { TonConnectButton, useTonWallet, useTonAddress } from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk'


export const Address = () => {
  const userAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  return (
    userAddress && (
      <div>
        <span>User-Friendly address: {userAddress}</span>
        <span>Raw address: {rawAddress}</span>
      </div>
    )
  );
}

export const Wallet = () => {
  const wallet = useTonWallet();
  return (
    wallet && (
      <div>
        <span>Connected wallet: {wallet?.account.address}</span>
        <span>Device: {wallet?.device.appName}</span>
      </div>
    )
  );
}

function App() {



  return (
    <>
      <TonConnectButton className='ton-connect-class' />

      <Address />

      <Wallet></Wallet>

      <button onClick={() => WebApp.showAlert(`Hello World!}`)} >
        show WebApp Alert
      </button>

      <button onClick={() => { }}>
        Connected Wallet
      </button>


    </>
  )
}

export default App
