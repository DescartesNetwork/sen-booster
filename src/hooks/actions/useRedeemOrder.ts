import { useCallback, useState } from 'react'
import { Address } from '@project-serum/anchor'

import { useSenExchange } from 'hooks/useSenExchange'

import { notifyError, notifySuccess } from 'helper'

export const useRedeemOrder = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const redeemOrder = useCallback(
    async (orderAddress: Address) => {
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
