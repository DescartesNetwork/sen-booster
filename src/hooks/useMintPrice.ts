import { useCallback, useEffect, useState } from 'react'
import { util, tokenProvider } from '@sentre/senhub'

/**
 * @param mintAddress
 * @param strict true: if has token unknown => returns 0
 * @returns
 */
export const useMintPrice = (mintAddress: string, strict?: boolean) => {
  const [mintPrice, setMintPrice] = useState(0)

  const getMintPrice = useCallback(async (mintAddress: string) => {
    try {
      const tokenInfo = await tokenProvider.findByAddress(mintAddress)
      // mint lpt
      if (!tokenInfo) {
        const mintLptPrice = 0
        return setMintPrice(mintLptPrice)
      }
      // token
      const ticket = tokenInfo.extensions?.coingeckoId
      if (!ticket) return setMintPrice(0)
      const cgkData = await util.fetchCGK(ticket)
      return setMintPrice(cgkData.price)
    } catch (error) {
      return 0
    }
  }, [])

  useEffect(() => {
    getMintPrice(mintAddress)
  }, [getMintPrice, mintAddress])

  return mintPrice
}
