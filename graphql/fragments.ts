import { gql } from '@apollo/client';

export const account = gql`
  fragment AccountFragment on Account {
    id
    address
  }
`;

export const token = gql`
  fragment TokenFragment on Token {
    id
    name
    symbol
    decimals
    address
  }
`;

export const block = gql`
  fragment BlockFragment on Block {
    id
    timestamp
    txHash
    gasLimit
    gasPrice
    height
    blockHash
    blockSize
    gasPrice
    operatorAccount {
      ...AccountFragment
    }
  }
  ${account}
`;

export const orderbookTrade = gql`
  fragment OrderbookTradeFragment on OrderbookTrade {
    id
    accountA {
      ...AccountFragment
    }
    accountB {
      ...AccountFragment
    }
    tokenA {
      ...TokenFragment
    }
    tokenB {
      ...TokenFragment
    }
    pair {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
    tokenAPrice
    tokenBPrice
    fillSA
    fillSB
    fillBA
    fillBB
    fillAmountBorSA
    fillAmountBorSB
    feeA
    feeB
    __typename
  }
`;

export const deposit = gql`
  fragment DepositFragment on Deposit {
    id
    toAccount {
      ...AccountFragment
    }
    token {
      ...TokenFragment
    }
    amount
    __typename
  }
`;

export const withdrawal = gql`
  fragment WithdrawalFragment on Withdrawal {
    fromAccount {
      ...AccountFragment
    }
    withdrawalToken: token {
      ...TokenFragment
    }
    withdrawalFeeToken: feeToken {
      ...TokenFragment
    }
    amount
    fee
    __typename
  }
`;

export const transfer = gql`
  fragment TransferFragment on Transfer {
    fromAccount {
      ...AccountFragment
    }
    toAccount {
      ...AccountFragment
    }
    token {
      ...TokenFragment
    }
    feeToken {
      ...TokenFragment
    }
    amount
    fee
    __typename
  }
`;

export const accountUpdate = gql`
  fragment AccountUpdateFragment on AccountUpdate {
    user {
      id
      address
      publicKey
    }
    feeToken {
      ...TokenFragment
    }
    fee
    nonce
    __typename
  }
`;

export const signatureVerification = gql`
  fragment SignatureVerificationFragment on SignatureVerification {
    account {
      ...AccountFragment
    }
    verificationData
    __typename
  }
`;
