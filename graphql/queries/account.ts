import { gql } from '@apollo/client';

import { token } from '../fragments';

export const FETCH_ACCOUNTS = gql`
  query accounts($first: Int, $where: Account_filter) {
    accounts(first: $first, where: $where) {
      id
      address
      createdAtTransaction {
        id
        block {
          timestamp
        }
      }

      __typename
    }
  }

  ${token}
`;

export const FETCH_ACCOUNT_BALANCES = gql`
  query accountTokenBalances($where: AccountTokenBalance_filter, $orderDirection: OrderDirection) {
    accountTokenBalances(orderDirection: $orderDirection, orderBy: id, first: 10, where: $where) {
      id
      balance
      token {
        ...TokenFragment
      }
      __typename
    }
  }

  ${token}
`;

