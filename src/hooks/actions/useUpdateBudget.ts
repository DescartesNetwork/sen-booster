import { useCallback, useState } from 'react'

export const useUpdateBudget = () => {
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
  }, [])

  return { updateBudget, loading }
}
