import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'

import { AppState } from 'model'
import { Mode } from 'constant'

export const useFilterBoosters = (type: Mode) => {
  const boosters = useSelector((state: AppState) => state.booster)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const myBooster = useMemo(
    () =>
      Object.values(boosters).filter(
        ({ authority }) => authority.toBase58() === walletAddress,
      ),
    [boosters, walletAddress],
  )

  return { myBooster }
}
