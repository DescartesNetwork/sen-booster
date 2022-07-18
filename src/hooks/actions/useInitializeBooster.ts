import { BN } from 'bn.js'
import { useSenExchange } from 'hooks/useSenExchange'
import { useCallback, useState } from 'react'

const DEFAULT_BID_MINT = '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ' // SNTR
const DEFAULT_ASK_MINT = '2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj' // USDC

export const useInitializeBooster = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const initializeBooster = useCallback(async () => {
    try {
      setLoading(true)
      await senExchange.initializeRetailer({
        bidMint: DEFAULT_BID_MINT,
        askMint: DEFAULT_ASK_MINT,
        bidPrice: new BN(0),
        bidTotal: new BN(0),
        startTime: new BN(0),
        endTime: new BN(0),
      })
      window.notify({ type: 'success', description: 'Create OKe' })
    } catch (error: any) {
      window.notify({ type: 'error', description: error.message })
    } finally {
      setLoading(false)
    }
  }, [senExchange])

  return { initializeBooster, loading }
}
