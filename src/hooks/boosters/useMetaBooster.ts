import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { MetaBooster } from 'constant'
import { notifyError } from 'helper'
import { Ipfs } from 'senUse/ipfs'

const initialMetaState = {
  budget: '',
  payRate: {},
}

export const useMetaBooster = (boosterAddress: string) => {
  const { metadata } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const [metaBooster, setMetaBooster] = useState<MetaBooster>(initialMetaState)

  const getPayRates = useCallback(async () => {
    try {
      const metaInfo = await Ipfs.methods.booster.get(metadata)
      if (Object.keys(metaInfo).length) setMetaBooster(metaInfo)
    } catch (error: any) {
      return notifyError(error)
    }
  }, [metadata])

  useEffect(() => {
    getPayRates()
  }, [getPayRates])

  return metaBooster
}
