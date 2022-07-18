import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAccount, useWallet } from '@sentre/senhub'

import { AppState } from 'model'
import { BoosterState } from 'model/booster.controller'
import { Mode } from 'constant'

export const useFilterBoosters = (type: Mode) => {
  const [filteredBoosters, setFilteredBoosters] = useState<BoosterState>({})
  const pools = useSelector((state: AppState) => state.booster)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const checkIsYourBoosters = useCallback(
    (address: string) => pools[address].authority.toBase58() === walletAddress,
    [pools, walletAddress],
  )

  const filterListBoosters = useCallback(async (pools: BoosterState) => {}, [])

  useEffect(() => {
    filterListBoosters(pools)
  }, [filterListBoosters, pools])

  return { filteredBoosters, filterListBoosters, checkIsYourBoosters }
}
