import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'
import { useSenExchange } from 'hooks/useSenExchange'

export const useFreezeBooster = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const freezeBooster = useCallback(
    async ({ boosterAddress }: { boosterAddress: string }) => {
      try {
        setLoading(true)
        const { txId } = await senExchange.freezeRetailer({
          retailer: boosterAddress,
          sendAndConfirm: true,
        })
        notifySuccess('Freezed', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { freezeBooster, loading }
}
