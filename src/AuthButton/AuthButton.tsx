import { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

import './AuthButton.css'


export function AuthButton() {

    const [btnTitle, setBtnTitle] = useState("Connect Wallet")
    const [tonConnectUI] = useTonConnectUI()

    /// 组件加载后，该方法会调用一次
    useEffect(() => {
        console.log('AuthButton useEffect');
    })

    tonConnectUI.onStatusChange((walletInfo) => {
        if (walletInfo) {
            setBtnTitle("DisConnect Wallet")
        } else {
            setBtnTitle("Connect Wallet")
        }
        console.log('Connection status:', walletInfo);
    })

    const connectDidClick = async () => {

        console.log("connectDidClick");

        if (tonConnectUI.connected === false) {
            console.log("need to connect");
            tonConnectUI.openModal()
        } else {
            tonConnectUI.disconnect()
        }
    };

    return (
        <>
            <div className='auth-button'>
                <button onClick={connectDidClick}>{btnTitle}</button>
            </div>
        </>
    );
}