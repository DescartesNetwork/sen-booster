import { useSenExchange } from 'hooks/useSenExchange'
import { useCallback, useState } from 'react'

export const useBuy = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const buy = useCallback(async () => {
    try {
      setLoading(true)
      // const { txId } = await senExchange.({
      //   bidMint,
      //   askMint,
      //   bidPrice: new BN(0),
      //   bidTotal: new BN(budget),
      //   startTime: new BN(startTime / 1000),
      //   endTime: new BN(endTime / 1000),
      // })
      window.notify({ type: 'success', description: 'Freeze OKe' })
    } catch (error: any) {
      window.notify({ type: 'error', description: error.message })
    } finally {
      setLoading(false)
    }
  }, [])

  return { buy, loading }
}
