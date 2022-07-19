import { useSenExchange } from 'hooks/useSenExchange'
import { useCallback, useState } from 'react'

export const useThawBooster = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const thawBooster = useCallback(async () => {
    try {
      setLoading(true)
      window.notify({ type: 'success', description: 'Thaw OKe' })
    } catch (error: any) {
      window.notify({ type: 'error', description: error.message })
    } finally {
      setLoading(false)
    }
  }, [senExchange])

  return { thawBooster, loading }
}
