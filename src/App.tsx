import { useCallback, useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
// import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonWallet, useTonAddress } from '@tonconnect/ui-react'
// import WebApp from '@twa-dev/sdk'



import './App.css'
import { walletsListQuery } from './WalletsList';
import { isDesktop, isMobile, openLink } from './Utils';
import { Connector, addReturnStrategy } from './Connector';

// import { isDesktop, isMobile, openLink } from './Utils';


function App() {

  const [modalUniversalLink, setModalUniversalLink] = useState('');
  const walletsList = useRecoilValueLoadable(walletsListQuery);

  useEffect(() => {
    if (modalUniversalLink) {

    }
  })

  const connectDidClick = useCallback(() => {
    console.log(walletsList);
    if (!(walletsList.state === 'hasValue')) {
      setTimeout(connectDidClick, 200);
    }

    if (!isDesktop() && walletsList.contents.embeddedWallet) {
      // 重新连接？
      Connector.connect({ jsBridgeKey: walletsList.contents.embeddedWallet.jsBridgeKey })
      return;
    }

    const tonkeeperConnectionSource = {
      universalLink: walletsList.contents.walletsList[0].universalLink,
      bridgeUrl: walletsList.contents.walletsList[0].bridgeUrl,
    }

    const universalLink = Connector.connect(tonkeeperConnectionSource)

    if (isMobile()) {
      openLink(addReturnStrategy(universalLink, 'none'), '_blank');
    } else {
      setModalUniversalLink(universalLink)
    }

  }, [walletsList]);

  return (
    <div className='app'>
      <header className='app-header'>
        <span className='app-title'>My App</span>
        <button onClick={connectDidClick}>Connect Wallet</button>
        {/* <TonConnectButton></TonConnectButton> */}
      </header>

      <main>

      </main>

    </div>
  )
}

export default App
