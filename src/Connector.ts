import { TonConnect } from '@tonconnect/sdk';

// const defaultMetaData = {
//     // manifestUrl: "https://ccyq1995.github.io/TeMiniApp_Web_App/manifest.json"
//     manifestUrl: 'https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt'
// }

// export const Connector = new TonConnect(defaultMetaData)
export const Connector = new TonConnect()

export function addReturnStrategy(url: string, returnStrategy: 'back' | 'none'): string {
	const link = new URL(url);
	link.searchParams.append('ret', returnStrategy);
	return link.toString();
}