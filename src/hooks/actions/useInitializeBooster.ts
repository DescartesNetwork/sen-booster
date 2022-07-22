import { useCallback, useState } from 'react'
import { IPFS, utilsBN } from '@sen-use/web3'
import { useMint } from '@sentre/senhub'
import BN from 'bn.js'

import { useSenExchange } from 'hooks/useSenExchange'
import { TOKEN } from 'constant'
import { PayRateState } from 'actions/createBooster/payRate'
import { notifyError, notifySuccess } from 'helper'

type UseInitializeBoosterProps = {
  payRate: PayRateState
  bidMint: string
  askMint: string
  budget: string
  startTime: number
  endTime: number
}

export const useInitializeBooster = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)
  const { getDecimals } = useMint()

  const initializeBooster = useCallback(
    async ({
      bidMint,
      askMint,
      budget,
      startTime,
      endTime,
      payRate,
    }: UseInitializeBoosterProps) => {
      try {
        setLoading(true)
        const ipfs = new IPFS(TOKEN)
        const { digest } = await ipfs.set(payRate)
        const bidDecimal = await getDecimals(bidMint)
        const askDecimal = await getDecimals(askMint)
        const startAfter = startTime - Date.now()
        const endAfter = endTime - Date.now()

        const { txId } = await senExchange.initializeRetailer({
          bidMint,
          askMint,
          bidTotal: new BN(0),
          askTotal: new BN(0),
          startAfter: new BN(startAfter / 1000),
          endAfter: new BN(endAfter / 1000),
          metadata: digest,
        })
        return notifySuccess('Add new Booster', txId)
      } catch (error: any) {
        return notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [getDecimals, senExchange],
  )

  return { initializeBooster, loading }
}
