import { useCallback, useState } from 'react'

import { useSenExchange } from 'hooks/useSenExchange'

import { notifyError, notifySuccess } from 'helper'

export const useRedeemOrder = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const redeemOrder = useCallback(
    async (orderAddress: string) => {
      try {
        setLoading(true)
        const { txId } = await senExchange.claim({
          order: orderAddress,
        })

        notifySuccess('Redeem Booster', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { redeemOrder, loading }
}
