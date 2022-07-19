import { useCallback, useState } from 'react'
import { IPFS } from '@sen-use/web3'
import { CID } from 'multiformats/cid'
import BN from 'bn.js'

import { useSenExchange } from 'hooks/useSenExchange'
import { TOKEN } from 'constant'
import { PayRateState } from 'actions/addBooster/payRate'
import { notifyError, notifySuccess } from 'helper'

type UseInitializeBoosterProps = {
  bidMint: string
  askMint: string
  bidPrice?: number
  bidTotal: string
  startTime?: number
  endTime?: number
  payRate: PayRateState
}

export const useInitializeBooster = ({
  bidMint,
  askMint,
  bidPrice = 0,
  bidTotal,
  startTime = 0,
  endTime = 0,
  payRate,
}: UseInitializeBoosterProps) => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const initializeBooster = useCallback(async () => {
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
        bidPrice: new BN(bidPrice),
        bidTotal: new BN(bidTotal),
        startTime: new BN(startTime / 1000),
        endTime: new BN(endTime / 1000),
      })
      return notifySuccess('Add new Booster', txId)
    } catch (error: any) {
      return notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [
    askMint,
    bidMint,
    bidPrice,
    bidTotal,
    endTime,
    payRate,
    senExchange,
    startTime,
  ])

  return { initializeBooster, loading }
}
