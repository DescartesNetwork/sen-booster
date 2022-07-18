import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMint } from '@sentre/senhub'

import { AppState } from 'model'
import { BoosterState } from 'model/booster.controller'

export const useSearchedBoosters = (pools: BoosterState) => {
  const [boostersSearched, setBoostersSearched] = useState<BoosterState>({})
  const searchInput = useSelector(
    (state: AppState) => state.searchPools.searchInput,
  )
  const { tokenProvider } = useMint()

  const search = useCallback(async () => {}, [])

  useEffect(() => {}, [])

  return boostersSearched
}
