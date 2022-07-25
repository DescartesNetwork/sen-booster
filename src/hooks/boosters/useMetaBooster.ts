import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IPFS } from '@sen-use/web3'

import { AppState } from 'model'
import { MetaBooster, TOKEN } from 'constant'
import { notifyError } from 'helper'

const initialMetaState = {
  budget: '',
  payRate: {},
}

export const useMetaBooster = (boosterAddress: string) => {
  const { metadata } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [metaBooster, setMetaBooster] = useState<MetaBooster>(initialMetaState)

  const getPayRates = useCallback(async () => {
    try {
      const ipfs = new IPFS(TOKEN)
      const metaInfo: MetaBooster = await ipfs.get(metadata)
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
