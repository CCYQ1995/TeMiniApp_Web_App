import eruda from 'eruda'
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

import './App.css'
import { AuthButton } from './AuthButton/AuthButton'
import WebApp from '@twa-dev/sdk';
import TonWeb from 'tonweb';
import { beginCell, toNano } from '@ton/ton';
// import { initUtils } from '@tma.js/sdk';
// import { useUtilsRaw } from '@tma.js/sdk-react';



function App() {

  eruda.init();

  const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: '82636b45d1a5ea381c6a17eb347751871bb8de1aae77cd23c31679d070f398e3' }));
  // const tonweb = new TonWeb();
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

    const body = beginCell()
      .storeUint(0, 32)
      .storeStringTail(`Hello, My Test ${Math.floor(Date.now() / 1000) + 60}`)
      .endCell();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec,
      messages: [
        {
          address: "0QCp_X-yt1sIGV0tXJPmksGE7DGUEQwbpDioKrA3C1nzIqES", // destination address
          amount: toNano("0.01").toString(), //Toncoin in nanotons
          payload: body.toBoc().toString("base64")
        }
      ]
    }

    const getBocHas = async (bocString: string) => {
      const bocCell = tonweb.boc.Cell.oneFromBoc(tonweb.utils.base64ToBytes(bocString))
      console.log("tonweb.boc: ", tonweb.boc);
      console.log("tonweb.boc.BitString: ", tonweb.boc.BitString.toString());
      // console.log("tonweb.boc.BitString: ", tonweb.boc.BitString.toHex());
      console.log("bocCell: ", bocCell);
      console.log("bocCell.hash: ", bocCell.hash());
      const msgHash = tonweb.utils.bytesToBase64(await bocCell.hash())
      console.log("msgHash: ", msgHash);
    }

    tonConnectUI.sendTransaction(transaction).then((result) => {
      console.log("sendTransaction result:", result);
      console.log("sendTransaction result.boc:", result.boc);
      // WebApp.showConfirm(result.boc)
      console.log(typeof (result.boc));
      getBocHas(result.boc);
    })

  };

  const didClickInvitedFriends = async () => {
    // WebApp.openTelegramLink(`https://t.me/share/url?url=${'https://t.me/Xsy89757Bot'}&text=${'Look! Some cool app here!'}`)
    // WebApp.openTelegramLink(`tg://msg_url/url?url=${'https://t.me/Xsy89757Bot'}&text=${'Look! Some cool app here!'}`)
    WebApp.openTelegramLink(`https://t.me/Xsy89757Bot&startapp`)
    // WebApp.openTelegramLink(`tg://resolve?domain=${'Xsy89757Bot'}&startapp`)
    // initUtils().openTelegramLink()
    // initUtils().shareURL('https://t.me/Xsy89757Bot', 'Look! Some cool app here!')
    // const utils = useUtilsRaw()
    // utils.shareURL('https://t.me/Xsy89757Bot', 'Look! Some cool app here!')

    // let utils = new Utils('6.10', '')
    // utils.shareURL('https://t.me/Xsy89757Bot', 'Look! Some cool app here!')
  }

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
        <button onClick={didClickInvitedFriends}>Invite Friends</button>
      </main>

    </div>
  )
}

export default App
