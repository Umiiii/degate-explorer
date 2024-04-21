import React from 'react';
import { usePendingTransactionsQuery } from '../generated/loopringExplorer';

const useCheckTxConfirmation = (accountID, tokenID, storageID) => {
  const { data, error, loading } = usePendingTransactionsQuery({
    skip: !accountID,
    variables: {
      transferWhere: {
        accountFromID: parseInt(accountID),
        storageID: parseInt(storageID),
        tokenID: parseInt(tokenID),
      },
      withdrawalWhere: {
        fromAccountID: parseInt(accountID),
        storageID: parseInt(storageID),
        tokenID: parseInt(tokenID),
      },
      orderBookTradeWhere: {
        accountIdA: parseInt(accountID),
        storageIdA: parseInt(storageID),
        tokenIDAS: parseInt(tokenID),
      },
      accountUpdateWhere: {
        accountID: parseInt(accountID),
        nonce: parseInt(storageID),
      },
    },
    pollInterval: 60000,
  });

  return {
    data,
    error,
    isLoading: loading,
  };
};

export default useCheckTxConfirmation;
