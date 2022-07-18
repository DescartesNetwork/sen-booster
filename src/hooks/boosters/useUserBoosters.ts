import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'model'
import { Mode, UserBoosterCategory } from 'constant'
import { BoosterData } from 'model/booster.controller'

const {
  manifest: { appId },
} = configs

const useUserBoosters = (category: UserBoosterCategory) => {
  const boosters = useSelector((state: AppState) => state.booster)
  // const [loading, setLoading] = useState(false)
  const [boosterList, setBoosterList] = useState<BoosterData[]>([])

  const getBoosters = useCallback(async () => {
    switch (category) {
      case UserBoosterCategory.AllBooster:
        return setBoosterList(Object.values(boosters))
      case UserBoosterCategory.BoostOnly:
        return setBoosterList(Object.values(boosters))
      case UserBoosterCategory.HighBuyBackRate:
        return setBoosterList(Object.values(boosters))
      case UserBoosterCategory.HotBooster:
        return setBoosterList(Object.values(boosters))
    }
  }, [boosters, category])

  useEffect(() => {
    getBoosters()
  }, [getBoosters])

  return { boosterList }
}

export default useUserBoosters
