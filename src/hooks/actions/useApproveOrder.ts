import { useCallback, useState } from 'react'
import { PublicKey } from '@solana/web3.js'

import { notifyError, notifySuccess } from 'helper'
import { useSenExchange } from 'hooks/useSenExchange'

export const useApproveOrder = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const approveOrder = useCallback(
    async (orderAddress: string) => {
      try {
        setLoading(true)
        const order = new PublicKey(orderAddress)
        const { txId } = await senExchange.approveOrder({ order })
        notifySuccess(txId, 'Approved')
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { approveOrder, loading }
}
