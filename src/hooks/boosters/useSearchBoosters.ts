import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'react-use'
import { tokenProvider } from '@sentre/senhub'

import { AppState } from 'model'
import { useValidBooster } from './useValidBooster'

export const useSearchedBoosters = (searchText: string) => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const validBoostersAddress = useValidBooster()
  const [boostersSearched, setBoostersSearched] = useState<string[]>([])

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
  }, [boosters, searchText, validBoostersAddress])
  useDebounce(() => search(), 300, [search])

  return boostersSearched
}
