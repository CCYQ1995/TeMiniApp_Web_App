import { isWalletInfoInjectable } from "@tonconnect/ui-react";
import { Connector } from './Connector';
import { selector } from "recoil";


export const walletsListQuery = selector({
    key: 'walletsList',
    get: async () => { 
        const walletsList = await Connector.getWallets();
        const embeddedWallet = walletsList.filter(isWalletInfoInjectable).find((wallet) => wallet.embedded)
        return {
            walletsList,
            embeddedWallet
        };
    }, 
});