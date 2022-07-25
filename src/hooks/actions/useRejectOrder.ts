import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'

export const useRejectOrder = () => {
  const [loading, setLoading] = useState(false)
  const rejectOrder = useCallback(
    async ({ orderAddress }: { orderAddress: string }) => {
      try {
        setLoading(true)
        notifySuccess('success', 'Freeze OKe')
      } catch (error: any) {
        notifyError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { rejectOrder, loading }
}
