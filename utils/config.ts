// TODO: remove once env variables are added to vercel.
export const LOOPRING_SUBGRAPH =
  process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT ??
  'https://api.studio.thegraph.com/query/52085/degate-mainnet/v0.0.146';
export const EXPLORER_URL = 'https://etherscan.io/';
export const INFURA_ENDPOINT =
  process.env.NEXT_PUBLIC_INFURA_ENDPOINT ?? 'https://mainneteth.loopring.io';
export const UNISWAP_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
export const LOOPRING_API = 'https://api3.loopring.io/api/v3/';
export const apiEndpointByTxType = {
  transfer: 'user/transactions',
  deposit: 'user/transactions',
  withdraw: 'user/transactions',
  trade: 'user/trades',
  accountUpdate: 'user/transactions',
};
export const loopringApiEndpoints = {
  collection: 'nft/public/collection'
};

export const NFT_DISALLOW_LIST = [];

export enum USER_CONTENT {
  YES = 'yes',
  NO = 'no',
}
