import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'
import { useSenExchange } from 'hooks/useSenExchange'

export const useThawBooster = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const thawBooster = useCallback(
    async ({ boosterAddress }: { boosterAddress: string }) => {
      try {
        setLoading(true)
        const { txId } = await senExchange.thawRetailer({
          retailer: boosterAddress,
          sendAndConfirm: true,
        })
        notifySuccess('Thawed', txId)
      } catch (error: any) {
        notifyError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { thawBooster, loading }
}
