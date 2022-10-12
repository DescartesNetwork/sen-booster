import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { useGetMintDecimals } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { AppState } from 'model'

export const useTotalLPSold = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const boosters = useSelector((state: AppState) => state.boosters)
  const getDecimals = useGetMintDecimals()

  const getTotalLpSold = useCallback(
    async (boosterAddress: string) => {
      let totalLP = new BN(0)
      const { askMint } = boosters[boosterAddress]
      const askDecimal = await getDecimals({ mintAddress: askMint.toBase58() })

      const ordersByBooster = Object.values(orders).filter(
        ({ retailer }) => retailer.toBase58() === boosterAddress,
      )

      for (const { state, askAmount } of ordersByBooster) {
        if (!state.approved && !state.done) continue
        totalLP = totalLP.add(askAmount)
      }

      return utilsBN.undecimalize(totalLP, askDecimal || 0)
    },
    [boosters, getDecimals, orders],
  )
  return { getTotalLpSold }
}
