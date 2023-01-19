import { BigNumber } from "ethers"
import { dataByBlockIdAndIndex } from 'loopring36-block-parser';

export const getBlock = (blockId: number) => fetch(`https://api3.loopring.io/api/v3/block/getBlock?id=${blockId}`)
  .then(x => x.json())

export const getAccount = (accountId: number) => fetch(`https://api3.loopring.io/api/v3/account?accountId=${accountId}`)
  .then(x => x.json())

export const getTokens = () => fetch(`https://api3.loopring.io/api/v3/exchange/tokens`)
  .then(x => x.json())

const convertTransactionData_Transfer = async (origin: any) => {
  const fromAddress = (await getAccount(origin.accountFromID)).owner
  const toAddress = (await getAccount(origin.accountToID)).owner
  const tokens = await getTokens()
  const tokenInfo = tokens.find(x => x.tokenId === origin.tokenID)
  if (!tokenInfo) {
    return Promise.reject("Can't find token, maybe an NFT")
  }
  const feeTokenInfo = tokens.find(x => x.tokenId === origin.feeTokenID)
  return {
    transaction: {
      fromAccount: {
        address: fromAddress,
        id: origin.accountFromID,
      },
      toAccount: {
        address: toAddress,
        id: origin.accountToID,
      },
      amount: origin.amount,
      fee: origin.fee,
      token: {
        decimals: tokenInfo.decimals,
        symbol: tokenInfo.symbol,
      },
      feeToken: {
        decimals: feeTokenInfo.decimals,
        symbol: feeTokenInfo.symbol,
      },
      __typename: "Transfer",
      data: origin.txData,
    }
  }
}

const convertTransactionData_Withdraw = async (origin: any) => {
  const tokens = await getTokens()
  const tokenInfo = tokens.find(x => x.tokenId === origin.tokenID)
  const feeTokenInfo = tokens.find(x => x.tokenId === origin.feeTokenID)
  return {
    transaction: {
      amount: origin.amount,
      fee: origin.fee,
      withdrawalToken: {
        decimals: tokenInfo.decimals,
        symbol: tokenInfo.symbol,
      },
      withdrawalFeeToken: {
        decimals: feeTokenInfo.decimals,
        symbol: feeTokenInfo.symbol,
      },
      __typename: "Withdrawal",
      data: origin.txData,
    }
  }
}
// todo
const convertTransactionData_Swap = async (origin: any) => {
  const tokens = await getTokens()
  // const tokenInfo = tokens.find(x => x.tokenId === origin.tokenID)
  const tokenAInfo = tokens.find(x => x.tokenId === origin.tokenIdA)
  const tokenBInfo = tokens.find(x => x.tokenId === origin.tokenIdB)

  const accountAddress = (await getAccount(origin.accountIdA)).owner
  // const {
  //   block,
  //   account,
  //   tokenA,
  //   tokenB,
  //   data,
  //   fillSA,
  //   fillSB,
  //   tokenAPrice,
  //   tokenBPrice,
  //   pair,
  //   feeA,
  //   feeB,
  //   pool,
  //   __typename,
  // }
  return {
    transaction: {
      account: {
        address: accountAddress,
        id: origin.accountIdA,
      },
      tokenA: {
        decimals: tokenAInfo.decimals,
        symbol: tokenAInfo.symbol,
      },
      tokenB: {
        decimals: tokenBInfo.decimals,
        symbol: tokenBInfo.symbol,
      },
      fillSA: origin.fillSA,
      fillSB: origin.fillSB,

      tokenAPrice: '1', //todo
      tokenBPrice: '1', //todo
      pair: '0x111', //todo
      feeA: origin.feeA,
      feeB: origin.feeB,
      pool: '0x111', //todo
      __typename: "Swap",
      data: origin.txData,
    }
  }
}
const convertTransactionData_Deposit = async (origin: any) => {
  const tokens = await getTokens()
  const tokenInfo = tokens.find(x => x.tokenId === origin.tokenID)
  const toAccountAddress = (await getAccount(origin.toAccountID)).owner
  return {
    transaction: {
      toAccount: {
        address: toAccountAddress,        
        id: origin.toAccountID,
      },
      token: {
        decimals: tokenInfo.decimals,
        symbol: tokenInfo.symbol,
      },
      amount: origin.amount,
      __typename: "Deposit",
      data: origin.txData,
    }
  }
}
const publickeyDecimalToHex128 = (decimalPublicKey: string) => {
  const hex = BigNumber.from(decimalPublicKey).toHexString().slice(2)
  const n = 64 - hex.length
  return '0'.repeat(n) + hex
}
const convertTransactionData_AccountUpdate = async (origin: any) => {
  const tokens = await getTokens()
  const feeTokenInfo = tokens.find(x => x.tokenId === origin.feeTokenID)
  return {
    transaction: {
      user: {
        address: origin.owner,        
        id: origin.accountID,
        publicKey: publickeyDecimalToHex128(origin.publicKeyY)
      },
      feeToken: {
        decimals: feeTokenInfo.decimals,
        symbol: feeTokenInfo.symbol,
      },
      fee: origin.fee,
      __typename: "AccountUpdate",
      data: origin.txData,
    }
  }
}
const convertTransactionData_AmmJoin = async (origin: any) => {
  const tokens = await getTokens()
  const feeTokenInfo = tokens.find(x => x.tokenId === origin.feeTokenID)
  const tokenInfo = tokens.find(x => x.tokenId === origin.tokenID)
  return {
    transaction: {
      account: {
        address: origin.from,        
        id: origin.accountID,
      },
      token: {
        decimals: tokenInfo.decimals,
        symbol: tokenInfo.symbol,
      },
      pool: {
        address: origin.to,
        id: origin.toTokenID
      },
      amount: origin.amount,
      feeToken: {
        decimals: feeTokenInfo.decimals,
        symbol: feeTokenInfo.symbol,
      },
      fee: origin.fee,
      __typename: "Add",
      data: origin.txData,
    }
  }
}
const convertTransactionData_AmmExit = async (origin: any) => {
  const tokens = await getTokens()
  const feeTokenInfo = tokens.find(x => x.tokenId === origin.feeTokenID)
  const tokenInfo = tokens.find(x => x.tokenId === origin.tokenID)

  return {
    transaction: {
      account: {
        address: origin.from,        
        id: origin.accountID,
      },
      token: {
        decimals: tokenInfo.decimals,
        symbol: tokenInfo.symbol,
      },
      pool: {
        address: origin.to,
        id: origin.toTokenID
      },
      amount: origin.amount,
      feeToken: {
        decimals: feeTokenInfo.decimals,
        symbol: feeTokenInfo.symbol,
      },
      fee: origin.fee,
      __typename: "Remove",
      data: origin.txData,
    }
  }
}
const convertTransactionData_AmmUpdate = async (origin: any) => {
  return {
    transaction: {
      __typename: "AmmUpdate",
      data: origin.txData,
    }
  }
}
const convertTransactionData_Pre = (origin: any) => {
  return {
    ...origin,
    txData: origin.txData.slice(2),
  }
}
export const convertTransactionData = async (origin: any) => {
  const nextOrigin = convertTransactionData_Pre(origin)
  if (nextOrigin.type === 'TRANSFER') {
    return convertTransactionData_Transfer(nextOrigin)
  } else if (nextOrigin.type === 'WITHDRAWAL') {
    return convertTransactionData_Withdraw(nextOrigin)
  } else if (nextOrigin.type === 'SWAP') {
    return convertTransactionData_Swap(nextOrigin)
  } else if (nextOrigin.type === 'DEPOSIT') {
    return convertTransactionData_Deposit(nextOrigin)
  } else if (nextOrigin.type === 'ACCOUNT_UPDATE') {
    return convertTransactionData_AccountUpdate(nextOrigin)
  } else if (nextOrigin.type === 'AMM_JOIN') {
    return convertTransactionData_AmmJoin(nextOrigin)
  } else if (nextOrigin.type === 'AMM_EXIT') {
    return convertTransactionData_AmmExit(nextOrigin)
  } else if (nextOrigin.type === 'AMM_UPDATE') {
    return convertTransactionData_AmmUpdate(nextOrigin)
  } else {
    return Promise.reject('unable to handle this type')
  }
}
export const getTransactionData = (blockId: number, index: number) => {
  return Promise.all([
    getBlock(blockId),
    dataByBlockIdAndIndex('mainnet')(blockId, Number(index))
      .then(convertTransactionData)
  ]).then(([blockRaw, data]) => {
    const block = {
      timestamp: blockRaw.createdAt / 1000,
      id: blockRaw.blockId,
      transactionCount: blockRaw.blockSize,
      txHash: blockRaw.txHash,
    }
    return {
      ...data,
      transaction: {
        ...data.transaction,
        block
      }
    }
  })
}