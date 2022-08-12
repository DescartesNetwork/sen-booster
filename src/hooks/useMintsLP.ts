import { useCallback, useEffect, useState } from 'react'
import { SenLpTokenProvider, BalansolTokenProvider } from '@sentre/senhub'

export const useMintsLP = () => {
  const [mintsLP, setMintsLP] = useState<string[]>([])

  const fetchMintsLP = useCallback(async () => {
    const senLPTokenProvider = new SenLpTokenProvider()
    const balansolTokenProvider = new BalansolTokenProvider()

    const lpTokens = await senLPTokenProvider.getTokenList()
    const balansolTokens = await balansolTokenProvider.getTokenList()

    const senLp = lpTokens.map(({ address }) => address)
    const balansolLp = balansolTokens.map(({ address }) => address)

    return setMintsLP([...balansolLp, ...senLp])
  }, [])

  useEffect(() => {
    fetchMintsLP()
  }, [fetchMintsLP])

  return { mintsLP }
}
