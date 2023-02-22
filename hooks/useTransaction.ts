

import React  from "react";
import { getTransactionData } from "../utils/transaction";

export const useTransaction = ({ txId }: { txId: string }) => {
  const [blockId, index] = txId.split('-');
  const [data, setData] = React.useState(undefined as any | undefined)
  const [loading, setLoading] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => {
    setLoading(true)
    getTransactionData(Number(blockId), Number(index))
      .then(setData)
      .catch(() => {
        setFailed(true)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    loading,
    data,
    failed
  }
}