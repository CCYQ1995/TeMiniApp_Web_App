import { useEffect } from 'react';
import { isWalletInfoCurrentlyEmbedded, isWalletInfoCurrentlyInjected, isWalletInfoInjectable, isWalletInfoRemote } from '@tonconnect/sdk'

import './AuthButton.css'
import { Connector } from '../Tools/Connector';
// import { openLink } from '../Utils';
// import WebApp from '@twa-dev/sdk';


export function AuthButton() {

    /// 组件加载后，该方法会调用一次
    useEffect(() => {
        console.log('AuthButton useEffect');
    })

    const connectDidClick = async () => {

        console.log("connectDidClick");

        const walletList = await Connector.getWallets()

        const currentlyInjectedWalletInfos = walletList.filter(isWalletInfoCurrentlyInjected)
        const embeddedWalletInfo = walletList.find(isWalletInfoCurrentlyEmbedded);

        const injectableConnectionWalletInfos = walletList.filter(isWalletInfoInjectable)
        const remoteConnectionWalletInfos = walletList.filter(isWalletInfoRemote)

        const embeddedWallet = walletList.find(isWalletInfoCurrentlyInjected)

        console.log(walletList);
        console.log(embeddedWallet);

        console.log('currentlyInjectedWalletInfos:', currentlyInjectedWalletInfos);
        console.log('embeddedWalletInfo:', embeddedWalletInfo);
        console.log('injectableConnectionWalletInfos:', injectableConnectionWalletInfos);
        console.log('remoteConnectionWalletInfos:', remoteConnectionWalletInfos)

        if (embeddedWallet) {
            console.log(embeddedWallet.jsBridgeKey);
            Connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey })
        } else {
            // Should correspond to the wallet that user selects
            // const walletConnectionSource = {
            //     universalLink: "https://t.me/wallet?attach=wallet",
            //     bridgeUrl: "https://bridge.ton.space/bridge"
            // }
            // console.log(walletConnectionSource);
            // Connector.connect(walletConnectionSource);

            Connector.connect({ jsBridgeKey: 'tonkeeper' });
        }

        Connector.onStatusChange(walletInfo => {
            console.log('Connection status:', walletInfo);
        });

    };

    return (
        <>
            <div className='auth-button'>
                <button onClick={connectDidClick}>Connect Wallet</button>
            </div>
        </>
    );
}