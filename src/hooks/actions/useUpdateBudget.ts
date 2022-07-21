import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'

export const useUpdateBudget = () => {
  const [loading, setLoading] = useState(false)

  const updateBudget = useCallback(async () => {
    try {
      setLoading(true)
      notifySuccess('success', 'Update OKe')
    } catch (error: any) {
      notifyError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { updateBudget, loading }
}
