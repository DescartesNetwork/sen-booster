import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useSenExchange } from 'hooks/useSenExchange'

export const useRejectOrder = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const rejectOrder = useCallback(
    async ({ orderAddress }: { orderAddress: string }) => {
      try {
        setLoading(true)
        const order = new web3.PublicKey(orderAddress)
        const { txId } = await senExchange.rejectOrder({ order })
        notifySuccess('Rejected', txId)
      } catch (error) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { rejectOrder, loading }
}
