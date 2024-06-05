import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WebApp from '@twa-dev/sdk'
import { TonConnectUIProvider } from "@tonconnect/ui-react";

WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl="https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt"
      actionsConfiguration={{ twaReturnUrl: 'https://t.me/Xsy89757Bot' }}
    >
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>,
)
