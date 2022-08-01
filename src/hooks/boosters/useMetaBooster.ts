import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

import { notifyError } from 'helper'
import { Ipfs, BoosterMetadata } from 'senUse/ipfs'

export const useMetaBooster = (boosterAddress: string) => {
  const { metadata } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const [metaBooster, setMetaBooster] = useState<BoosterMetadata>({
    budget: '',
    payRate: {},
  })

  const fetchMetaData = useCallback(async () => {
    try {
      const metaInfo = await Ipfs.methods.booster.get(metadata)
      return setMetaBooster(metaInfo)
    } catch (error) {
      return notifyError(error)
    }
  }, [metadata])

  useEffect(() => {
    fetchMetaData()
  }, [fetchMetaData])

  return metaBooster
}
