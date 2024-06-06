import { useEffect } from 'react';
import { WalletInfoCurrentlyEmbedded, isWalletInfoCurrentlyEmbedded } from '@tonconnect/ui-react';

import './AuthButton.css'
import { Connector } from '../Tools/Connector';
import { openLink } from '../Utils';


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

        const embeddedWallet = walletList.find(isWalletInfoCurrentlyEmbedded) as WalletInfoCurrentlyEmbedded

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

            const universalLink = Connector.connect(walletConnectionSource);
            console.log(universalLink);
            openLink(universalLink)
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