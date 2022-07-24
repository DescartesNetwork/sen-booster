import { useCallback, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { IPFS } from '@sen-use/web3'

import { useSenExchange } from 'hooks/useSenExchange'
import { notifyError, notifySuccess } from 'helper'
import { TOKEN } from 'constant'

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
      const ipfs = new IPFS(TOKEN)
      const { digest } = await ipfs.set({ createdAt: Date.now() })
      try {
        setLoading(true)
        const { txId } = await senExchange.initializeOrder({
          retailer,
          bidAmount,
          askAmount,
          lockTimeRange,
          metadata: digest,
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
