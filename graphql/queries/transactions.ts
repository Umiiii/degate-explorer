import { gql } from '@apollo/client';
import {
  account,
  accountUpdate,
  deposit,
  orderbookTrade,
  signatureVerification,
  token,
  transfer,
  withdrawal,
  batchSpotTrade
} from '../fragments';

export const FETCH_TXS = gql`
  query transactions(
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $where: Transaction_filter
  ) {
    transactions(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
      id
      internalID
      block {
        id
        blockHash
        timestamp
        txHash
      }
      data

      ...OrderbookTradeFragment
      ...DepositFragment
      ...WithdrawalFragment
      ...TransferFragment
      ...AccountUpdateFragment
      ...SignatureVerificationFragment
      ...BatchSpotTradeFragment

    }
  }

  ${account}
  ${token}
  ${orderbookTrade}
  ${deposit}
  ${withdrawal}
  ${transfer}
  ${accountUpdate}
  ${signatureVerification}
  ${batchSpotTrade}
`;

export const FETCH_TX = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      id
      internalID
      block {
        id
        blockHash
        timestamp
        transactionCount
        txHash
      }
      data

      ...OrderbookTradeFragment
      ...DepositFragment
      ...WithdrawalFragment
      ...TransferFragment
      ...AccountUpdateFragment
      ...SignatureVerificationFragment
      ...BatchSpotTradeFragment
    }
  }

  ${account}
  ${token}
  ${orderbookTrade}
  ${deposit}
  ${withdrawal}
  ${transfer}
  ${accountUpdate}
  ${signatureVerification}
  ${batchSpotTrade}
`;

export const FETCH_TX_CONFIRMATION = gql`
  query pendingTransactions(
    $transferWhere: Transfer_filter
    $withdrawalWhere: Withdrawal_filter
    
    $orderBookTradeWhere: OrderbookTrade_filter
    $accountUpdateWhere: AccountUpdate_filter
  ) {
    transfers(where: $transferWhere) {
      id
    }
    withdrawals(where: $withdrawalWhere) {
      id
    }
    orderbookTrades(where: $orderBookTradeWhere) {
      id
    }
    accountUpdates(where: $accountUpdateWhere) {
      id
    }
  }
`;
