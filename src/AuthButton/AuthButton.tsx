import { useEffect } from 'react';
import { WalletInfoInjectable, isWalletInfoInjectable } from '@tonconnect/ui-react';

import './AuthButton.css'
import { Connector } from '../Tools/Connector';
// import { openLink } from '../Utils';
// import WebApp from '@twa-dev/sdk';


export function AuthButton() {

    const unsubscribe = Connector.onStatusChange(walletInfo => {
        console.log(walletInfo);

    });

    /// 组件加载后，该方法会调用一次
    useEffect(() => {
        console.log('AuthButton useEffect');
    })

    const connectDidClick = async () => {

        console.log("connectDidClick");

        const walletList = await Connector.getWallets()

        const embeddedWallet = walletList.find(isWalletInfoInjectable) as WalletInfoInjectable

        console.log(walletList);
        console.log(embeddedWallet);

        if (embeddedWallet) {
            console.log(embeddedWallet.jsBridgeKey);
            Connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey })
            unsubscribe()
        } else {
            // Should correspond to the wallet that user selects
            const walletConnectionSource = {
                universalLink: 'https://app.tonkeeper.com/ton-connect',
                bridgeUrl: 'https://bridge.tonapi.io/bridge'
            }
            Connector.connect(walletConnectionSource);
            unsubscribe()
        }
    };

    return (
        <>
            <div className='auth-button'>
                <button onClick={connectDidClick}>Connect Wallet</button>
            </div>
        </>
    );
}