// import { useState, useEffect } from 'react';
import { TonConnect } from '@tonconnect/sdk';


import './AuthButton.css'


export function AuthButton() {

    // const [modalUniversalLink, setModalUniversalLink] = useState('');

    const connector = new TonConnect()

    const unsubscribe = connector.onStatusChange(walletInfo => {
        console.log(walletInfo);
    });

    // useEffect(() => {
    //     // if (modalUniversalLink) {

    //     // }
    // })

    const connectDidClick = async () => {

        connector.restoreConnection()

        unsubscribe()
    };

    return (
        <>
            <div className='auth-button'>
                <button onClick={connectDidClick}>Connect Wallet</button>
            </div>
        </>
    );
}