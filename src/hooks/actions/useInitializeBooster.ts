import { useCallback, useState } from 'react'
import { IPFS } from '@sen-use/web3'
import { CID } from 'multiformats/cid'
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
        const cid = await ipfs.set(payRate)
        const {
          multihash: { digest },
        } = CID.parse(cid)

        console.log(digest, 'pay rate buffer')

        const { txId } = await senExchange.initializeRetailer({
          bidMint,
          askMint,
          bidPrice: new BN(0),
          bidTotal: new BN(budget),
          startTime: new BN(startTime / 1000),
          endTime: new BN(endTime / 1000),
        })
        return notifySuccess('Add new Booster', txId)
      } catch (error: any) {
        return notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { initializeBooster, loading }
}
