import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'react-use'
import { useMint } from '@sentre/senhub'

import { AppState } from 'model'
import { useValidBooster } from './useValidBooster'

export const useSearchedBoosters = (searchText: string) => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const validBoostersAddress = useValidBooster()
  const [boostersSearched, setBoostersSearched] = useState<string[]>([])
  const { tokenProvider } = useMint()

  const search = useCallback(async () => {
    if (!searchText) return setBoostersSearched(validBoostersAddress)
    const mints = await tokenProvider.find(searchText)
    const mapMint = new Map<string, boolean>()
    for (const mint of mints) mapMint.set(mint.address, true)

    const searchedBoosters: string[] = []
    for (const addr of validBoostersAddress) {
      const booster = boosters[addr]
      // Search Bid + Ask Mint
      if (
        mapMint.has(booster.bidMint.toBase58()) ||
        mapMint.has(booster.askMint.toBase58())
      )
        searchedBoosters.push(addr)
      //TODO: Search another thing
    }
    return setBoostersSearched(searchedBoosters)
  }, [boosters, searchText, tokenProvider, validBoostersAddress])
  useDebounce(() => search(), 300, [search])

  return boostersSearched
}
