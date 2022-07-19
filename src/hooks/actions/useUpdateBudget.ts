import { useSenExchange } from 'hooks/useSenExchange'
import { useCallback, useState } from 'react'

export const useUpdateBudget = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const updateBudget = useCallback(async () => {
    try {
      setLoading(true)
      window.notify({ type: 'success', description: 'Update OKe' })
    } catch (error: any) {
      window.notify({ type: 'error', description: error.message })
    } finally {
      setLoading(false)
    }
  }, [senExchange])

  return { updateBudget, loading }
}
