import { useCallback, useState } from 'react'

export const useCancelOrder = () => {
  const [loading, setLoading] = useState(false)

  const cancelOrder = useCallback(async () => {
    try {
      setLoading(true)
      window.notify({ type: 'success', description: 'Freeze OKe' })
    } catch (error: any) {
      window.notify({ type: 'error', description: error.message })
    } finally {
      setLoading(false)
    }
  }, [])

  return { cancelOrder, loading }
}
