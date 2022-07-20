import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'

import { AppState } from 'model'
import { BoosterState } from 'model/booster.controller'
import { Mode } from 'constant'

export const useFilterBoosters = (type: Mode) => {
  const [filteredBoosters, setFilteredBoosters] = useState<BoosterState>({})
  const boosters = useSelector((state: AppState) => state.booster)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  console.log(setFilteredBoosters)

  const checkIsYourBoosters = useCallback(
    (address: string) =>
      boosters[address].authority.toBase58() === walletAddress,
    [boosters, walletAddress],
  )

  const filterListBoosters = useCallback(async (pools: BoosterState) => {}, [])

  useEffect(() => {
    filterListBoosters(boosters)
  }, [filterListBoosters, boosters])

  return { filteredBoosters, filterListBoosters, checkIsYourBoosters }
}
