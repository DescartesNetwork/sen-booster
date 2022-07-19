import { useSenExchange } from 'hooks/useSenExchange'
import { useCallback, useState } from 'react'

export const useCancelOrder = () => {
  const { senExchange } = useSenExchange()
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
  }, [senExchange])

  return { cancelOrder, loading }
}
