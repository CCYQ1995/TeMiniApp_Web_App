import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebApp from '@twa-dev/sdk'
import { TonConnectButton, TonConnectUIProvider, useTonWallet } from '@tonconnect/ui-react'


function App() {
  const [count, setCount] = useState(0)
  const wallet = useTonWallet();
  return (
    <>
      <TonConnectUIProvider actionsConfiguration={{twaReturnUrl: 'https://t.me/Xsy89757Bot'}}>


        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        wallet && (
          <div>
            <span>Connected wallet: {wallet?.account.address}</span>
            <span>Device: {wallet?.device.appName}</span>
          </div>
        )


        <div className='card'>
          <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)} >
            show WebApp Alert
          </button>

          <TonConnectButton className='wallet-button'/>


        </div>



        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </TonConnectUIProvider>
    </>
  )
}

export default App
