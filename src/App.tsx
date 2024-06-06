import eruda from 'eruda'
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

import './App.css'
import { AuthButton } from './AuthButton/AuthButton'
import WebApp from '@twa-dev/sdk';
import TonWeb from 'tonweb';


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

  const didClickPayAction = async () => {

    console.log("didClickPayAction");
    console.log("WebApp.initDataUnsafe: ", WebApp.initDataUnsafe);
    console.log("WebApp.initDataUnsafe.user: ", WebApp.initDataUnsafe.user);

    if (tonConnectUI.connected === false) {
      console.log("need to connect");
      tonConnectUI.openModal()
      return;
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec,
      messages: [
        {
          address: "0QCp_X-yt1sIGV0tXJPmksGE7DGUEQwbpDioKrA3C1nzIqES", // destination address
          amount: "100000000" //Toncoin in nanotons
        }
      ]
    }

    const getBocHas = async (bocString: string) => {
      const bocCell = TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes(bocString))
      console.log("bocCell: ", bocCell);
      const msgHash = TonWeb.utils.bytesToBase64(await bocCell.hash())
      console.log("msgHash: ", msgHash);
    }

    tonConnectUI.sendTransaction(transaction).then((result) => {
      console.log("sendTransaction result:", result);
      WebApp.showConfirm(result.boc)
      getBocHas(result.boc);
    })

  };


  return (
    <div className='app'>
      <header className='app-header'>
        <span className='app-title'>My App</span>
        <AuthButton />
      </header>

      <main>
        {userFriendlyAddress && (<span>User-friendly address: {userFriendlyAddress}</span>)}
        {rawAddress && (<span>Raw address: {rawAddress}</span>)}
        {wallet && (<button onClick={didClickPayAction}>Send transaction</button>)}
      </main>

    </div>
  )
}

export default App
