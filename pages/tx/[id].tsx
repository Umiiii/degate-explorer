import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Deposit from '../../components/transactionDetail/Deposit';
import Withdrawal from '../../components/transactionDetail/Withdrawal';
import Transfer from '../../components/transactionDetail/Transfer';
import AccountUpdate from '../../components/transactionDetail/AccountUpdate';
import SignatureVerification from '../../components/transactionDetail/SignatureVerification';
import OrderbookTrade from '../../components/transactionDetail/OrderbookTrade';
import PendingTx from '../../components/transactionDetail/PendingTx';
import NoTransactionFound from '../../components/transactionDetail/NoTransactionFound';
import { useTransactionQuery } from '../../generated/loopringExplorer';
import { useTransaction } from '../../hooks/useTransaction';




const TransactionRaw: React.FC<{ txId: string, data, loading }> = ({ txId, data, loading }) => {
  const { __typename, block } = (data && data.transaction) || {};
  const renderTransactionDetails = (type) => {
    switch (type) {
      case 'OrderbookTrade':
        return <OrderbookTrade transaction={data.transaction} />;
      case 'Deposit':
        return <Deposit transaction={data.transaction} />;
      case 'Withdrawal':
        return <Withdrawal transaction={data.transaction} />;
      case 'Transfer':
        return <Transfer transaction={data.transaction} />;
      case 'AccountUpdate':
        return <AccountUpdate transaction={data.transaction} />;
      case 'SignatureVerification':
        return <SignatureVerification transaction={data.transaction} />;
      default:
        return type;
    }
  };

  const transactionCount = block ? block.transactionCount - 1 : null;
  const txInBlock = txId && parseInt((txId as string).split('-')[1]);
  if (loading) {
    return <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
    }}>
      <img width="80px" src="/loading-line.gif" />
    </div>
  } else {
    return (
      <div className="bg-white dark:bg-loopring-dark-background rounded p-4">
        <h1 className="text-3xl mb-5 flex items-center">
          Transaction #{txId}
          {txInBlock > 0 && (
            <Link href={block ? `/tx/${block.id}-${txInBlock - 1}` : ''}>
              <a className="text-sm bg-loopring-lightBlue px-2 text-white relative h-5 rounded ml-2">‹</a>
            </Link>
          )}
          {transactionCount && txInBlock < transactionCount && (
            <Link href={block ? `/tx/${block.id}-${txInBlock + 1}` : ''}>
              <a className="text-sm bg-loopring-lightBlue px-2 text-white relative h-5 rounded ml-2">›</a>
            </Link>
          )}
        </h1>
        <div className="border dark:border-loopring-dark-darkBlue rounded w-full mb-10 overflow-auto">
          {data && data.transaction && (
            <table className="w-full table-auto table-fixed">
              <tbody>{renderTransactionDetails(__typename)}</tbody>
            </table>
          )}
        </div>
        {data && !loading && !data.transaction && <NoTransactionFound />}
      </div>
    );
  }
};

const TransactionBySubgraph: React.FC<{ txId: string }> = ({txId}) => {
  const { data, loading } = useTransactionQuery({
    variables: {
      id: txId,
    },
  });
  return <TransactionRaw data={data} loading={loading} txId={txId}/>
}
export const Transaction: React.FC<{ txId: string }> = ({ txId }) => {
  const {data, loading, failed} = useTransaction({txId})
  const useLegacy = failed || localStorage.getItem('apiUsingLoopring') === 'false'
  return useLegacy
    ? <TransactionBySubgraph txId={txId}/>
    : <TransactionRaw data={data} loading={loading} txId={txId}/> 
}

const TransactionPage: React.FC<{}> = () => {
  const router = useRouter();
  const txId = router.query.id as string;

  if (!txId) {
    return null;
  }

  const txIdSplit = txId.split('-');

  return txId.startsWith('0x') || txIdSplit.length > 2 ? <PendingTx txId={txId} /> : <Transaction txId={txId} />;
};

export default TransactionPage;
