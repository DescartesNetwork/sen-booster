import { useCallback, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

import { useSenExchange } from 'hooks/useSenExchange'

import { notifyError, notifySuccess } from 'helper'

type BuyProps = {
  retailer: PublicKey
  bidAmount: BN
  askAmount: BN
  lockTimeRange: BN
}

export const useBuy = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const buy = useCallback(
    async ({ retailer, bidAmount, askAmount, lockTimeRange }: BuyProps) => {
      try {
        setLoading(true)
        const { txId } = await senExchange.initializeOrder({
          retailer,
          bidAmount,
          askAmount,
          lockTime: lockTimeRange,
        })
        notifySuccess('success', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { buy, loading }
}
