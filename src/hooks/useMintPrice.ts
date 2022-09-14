import { useEffect, useState } from 'react'
import { useGetMintPrice } from '@sen-use/app'

/**
 * @param mintAddress
 * @param strict true: if has token unknown => returns 0
 * @returns
 */
export const useMintPrice = (mintAddress: string) => {
  const [mintPrice, setMintPrice] = useState(0)
  const getMintPrice = useGetMintPrice()

  useEffect(() => {
    ;(async () => {
      const price = (await getMintPrice(mintAddress)) || 0
      return setMintPrice(price)
    })()
  }, [getMintPrice, mintAddress])

  return mintPrice
}
