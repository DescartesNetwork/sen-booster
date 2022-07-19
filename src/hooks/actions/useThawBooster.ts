import { BN } from 'bn.js'
import { useSenExchange } from 'hooks/useSenExchange'
import { useCallback, useState } from 'react'

const DEFAULT_BID_MINT = '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ' // SNTR
const DEFAULT_ASK_MINT = '2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj' // USDC

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
