

import React  from "react";
import { useTransactionQuery } from "../generated/loopringExplorer";
import { convertTransactionData, getBlock, getTransactionData } from "../utils/transaction";
import { dataByBlockIdAndIndex } from 'loopring36-block-parser';
export const useTransaction = ({ txId }: { txId: string }) => {
  const [blockId, index] = txId.split('-');
  const [data, setData] = React.useState(undefined as any | undefined)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setLoading(true)
    getTransactionData(Number(blockId), Number(index))
      .then(setData)
  }, [])

  return {
    loading,
    data
  }
}