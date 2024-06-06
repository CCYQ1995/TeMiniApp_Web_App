import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WebApp from '@twa-dev/sdk'
// import { TonConnectUIProvider } from "@tonconnect/ui-react";

WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <TonConnectUIProvider
      manifestUrl="https://ccyq1995.github.io/TeMiniApp_Web_App/manifest.json"
      actionsConfiguration={{ twaReturnUrl: 'https://t.me/Xsy89757Bot' }}
    > */}
    <App />
    {/* </TonConnectUIProvider> */}
  </React.StrictMode>,
)
