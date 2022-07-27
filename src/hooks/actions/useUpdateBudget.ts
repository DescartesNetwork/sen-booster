import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'
import { useSenExchange } from 'hooks/useSenExchange'

type UpdateBudgetProps = {
  metadata: Uint8Array
  boosterAddress: string
}

export const useUpdateBudget = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const updateBudget = useCallback(
    async ({ metadata, boosterAddress }: UpdateBudgetProps) => {
      try {
        setLoading(true)
        const { txId } = await senExchange.updateRetailerMetaData({
          retailer: boosterAddress,
          metadata,
          sendAndConfirm: true,
        })
        notifySuccess('Updated budget', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { updateBudget, loading }
}
