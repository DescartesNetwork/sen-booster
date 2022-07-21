import { useCallback, useState } from 'react'

import { notifyError, notifySuccess } from 'helper'

export const useThawBooster = () => {
  const [loading, setLoading] = useState(false)

  const thawBooster = useCallback(async () => {
    try {
      setLoading(true)
      notifySuccess('success', 'Thaw OKe')
    } catch (error: any) {
      notifyError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { thawBooster, loading }
}
