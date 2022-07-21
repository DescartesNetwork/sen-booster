import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'

export const useFreezeBooster = () => {
  const [loading, setLoading] = useState(false)

  const freezeBooster = useCallback(async () => {
    try {
      setLoading(true)
      notifySuccess('success', 'Freeze OKe')
    } catch (error: any) {
      notifyError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { freezeBooster, loading }
}
