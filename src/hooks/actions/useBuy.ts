import { useCallback, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

import { useSenExchange } from 'hooks/useSenExchange'
import { notifyError, notifySuccess } from 'helper'

type BuyProps = {
  retailer: PublicKey
  bidAmount: BN
  bidPrice: BN
  lockTime: BN
}

export const useBuy = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const buy = useCallback(
    async ({ retailer, bidAmount, bidPrice, lockTime }: BuyProps) => {
      try {
        setLoading(true)
        const { txId } = await senExchange.initializeOrder({
          retailer,
          bidAmount,
          bidPrice,
          lockTime,
        })
        notifySuccess('success', txId)
      } catch (error: any) {
        notifyError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { buy, loading }
}
