import React from 'react';
import Link from 'next/link';
import numeral from 'numeral';
import { GetServerSideProps } from 'next';

import useTransactions from '../hooks/useTransactions';
import client from '../graphql';

import { FETCH_NETWORK_STATS } from '../graphql/queries/home';
import AppLink from '../components/AppLink';
import TransactionTableDetails from '../components/transactionDetail/TransactionTableDetails';
import TableLoader from '../components/TableLoader';

import getTimeFromNow from '../utils/getTimeFromNow';
import Blocks from '../components/Blocks';
import Pairs from '../components/Pairs';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await client.query({ query: FETCH_NETWORK_STATS });

    return {
      props: { networkStats: res.data },
    };
  } catch (error) {
    console.log(error);
    return { props: { networkStats: null } };
  }
};

export default function Home({ networkStats }) {
  const { data: txsData, error: txError, isLoading: txIsLoading } = useTransactions();

  let avgBlockDetails = React.useMemo(() => {
    if (networkStats && networkStats.blocks.length > 0) {
      let avgTransactionCount = 0;
      let blockTime = Date.now();
      let avgTimeBetweenBlocks = 0;
      networkStats.blocks.forEach((block) => {
        avgTransactionCount += parseInt(block.transactionCount);
        avgTimeBetweenBlocks += blockTime - block.timestamp * 1000;
        blockTime = block.timestamp * 1000;
      });
      return {
        transactionCount: avgTransactionCount / networkStats.blocks.length,
        timeBetweenBlocks: `${Math.floor(avgTimeBetweenBlocks / (networkStats.blocks.length * 1000 * 60))} mins`,
      };
    }
    return {
      transactionCount: null,
      timeBetweenBlocks: null,
    };
  }, [networkStats]);

  return (
    <div className="mt-10 w-11/12 m-auto">
      {networkStats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-16">
          <div className="flex flex-col px-8 py-4 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
            <span className=" mb-4">Total Transactions</span>
            <span className="text-3xl flex-1">{numeral(networkStats.proxy.transactionCount).format('0,0')}</span>
          </div>
          <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
            <span className=" mb-4">Total Blocks</span>
            <span className="text-3xl flex-1">{numeral(networkStats.proxy.blockCount).format('0,0')}</span>
          </div>
          <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
            <span className=" mb-4">Total L2 Accounts</span>
            <span className="text-3xl flex-1">
              {networkStats && numeral(networkStats.proxy.userCount).format('0,0')}
            </span>
          </div>
          <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
            <span className=" mb-4">Avg. Block Time</span>
            <span className="text-3xl flex-1">{avgBlockDetails.timeBetweenBlocks}</span>
          </div>
          <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
            <span className=" mb-4">Avg. Txs per Block</span>
            <span className="text-3xl flex-1">
              {avgBlockDetails.transactionCount && numeral(avgBlockDetails.transactionCount).format('0,0')}
            </span>
          </div>
          <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
            <span className=" mb-4">Last Block Submitted</span>
            <span className="text-3xl flex-1">{networkStats && getTimeFromNow(networkStats.blocks[0].timestamp)}</span>
          </div>
        </div>
      )}
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue dark:text-loopring-dark-gray">Latest Blocks</h2>
        <Blocks isPaginated={false} blocksCount={10} />
        <Link href="/blocks">
          <a className="bg-loopring-darkBlue dark:bg-loopring-dark-blue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 lg:self-end">
            View More Blocks
          </a>
        </Link>
      </div>
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue dark:text-loopring-dark-gray">Latest Transactions</h2>
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white break-none">
              <tr>
                <th className="p-2 whitespace-nowrap">Tx ID</th>
                <th className="p-2 whitespace-nowrap">Type</th>
                <th className="p-2 whitespace-nowrap">From</th>
                <th className="p-2 whitespace-nowrap">To</th>
                <th className="p-2 whitespace-nowrap">Amount</th>
                <th className="p-2 whitespace-nowrap">Fee</th>
                <th className="p-2 whitespace-nowrap">Verified At</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {txsData &&
                txsData.transactions.map((tx) => {
                  return (
                    <tr className="border dark:border-loopring-dark-background" key={tx.id}>
                      <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap">
                        <AppLink path="transaction" tx={tx.id}>
                          {tx.id}
                        </AppLink>
                      </td>
                      <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                        {tx.__typename}
                      </td>
                      <TransactionTableDetails
                        type={tx.__typename}
                        tx={tx}
                        cellClassName="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white"
                      />
                      <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                        {getTimeFromNow(tx.block.timestamp)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {txIsLoading && <TableLoader />}
        {txError && (
          <div className="h-4/6 flex items-center justify-center text-red-400 border dark:border-loopring-dark-darkBlue text-xl">
            Couldn't fetch transactions
          </div>
        )}
        <Link href="/transactions">
          <a className="bg-loopring-darkBlue dark:bg-loopring-dark-blue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 mb-6  lg:self-end">
            View More Transactions
          </a>
        </Link>
      </div>
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue dark:text-loopring-dark-gray">Pairs</h2>
        <Pairs isPaginated={false} />
        <Link href="/pairs">
          <a className="bg-loopring-darkBlue dark:bg-loopring-dark-blue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 mb-6  lg:self-end">
            View More Pairs
          </a>
        </Link>
      </div>
    </div>
  );
}
