import React from 'react';
import { OrderDirection, useBlocksQuery } from '../generated/loopringExplorer';
import TransactionBlock from './ui/Block';
interface BlocksProps {
    blocksCount?: number;
    isPaginated?: boolean;
  }
  
const BlockChain: React.FC<BlocksProps> = ({ blocksCount = 25}) => {
    const TOTAL_COUNT = blocksCount;
        const { data, error, loading, fetchMore } = useBlocksQuery({
        variables: {
          first: TOTAL_COUNT,
          orderDirection: OrderDirection.Desc,
        },
        fetchPolicy: 'cache-and-network',
      });

  return  (     <div className="flex flex-row overflow-x-auto scrollbar-hide">
    {data && data.blocks.map((block) => {
      console.log(block);
      return (
        <div className="mx-4 flex-shrink-0" key={block.id}>
          <TransactionBlock block={block} />
        </div>
      )
    })}
    {data && data.blocks && data.blocks.length === 0 && (
      <div className="text-gray-400 dark:text-white dark:text-loopring-dark-gray text-2xl h-40 flex items-center justify-center w-full border">
        No blocks to show
      </div>
    )}
  </div>)
};

export default BlockChain;
