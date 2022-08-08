import { useCallback, useState } from 'react'

import { useSenExchange } from 'hooks/useSenExchange'

import { notifyError, notifySuccess } from 'helper'

export const useRevokeOrder = () => {
  const [loading, setLoading] = useState(false)
  const { senExchange } = useSenExchange()

  const revokeOrder = useCallback(
    async (orderAddress: string) => {
      try {
        setLoading(true)
        const { txId } = await senExchange.revoke({
          order: orderAddress,
        })

        notifySuccess('Revoked', txId)
      } catch (error) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { revokeOrder, loading }
}
