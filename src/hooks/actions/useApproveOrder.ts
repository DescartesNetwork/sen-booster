import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useSenExchange } from 'hooks/useSenExchange'

export const useApproveOrder = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const approveOrder = useCallback(
    async (orderAddress: string) => {
      try {
        setLoading(true)
        const trans = new web3.Transaction()
        const order = new web3.PublicKey(orderAddress)
        const { tx: txApprove } = await senExchange.approveOrder({
          order,
          sendAndConfirm: false,
        })
        trans.add(txApprove)

        const { tx: txCollect } = await senExchange.collectOrder({
          order,
          sendAndConfirm: false,
        })
        trans.add(txCollect)

        const { provider } = senExchange
        const txIds = await provider.sendAndConfirm(trans)
        return notifySuccess('Approved', txIds)
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
