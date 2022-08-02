import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { BoosterFilter } from 'view/user/booster/searchAndFilter/filterBooster'
import { UserBoosterCategory } from 'constant'
import { AppState } from 'model'

export const useFilterUserBooster = (filter: BoosterFilter) => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const printers = useSelector((state: AppState) => state.voucherPrinters)
  const [filteredBoosters, setFilteredBoosters] = useState<string[]>([])

  const mapBoost = useMemo(() => {
    const mapBoost = new Map<string, boolean>()
    for (const addr in printers) {
      const printer = printers[addr]
      mapBoost.set(printer.retailer.toBase58(), true)
    }
    return mapBoost
  }, [printers])

  const filterBoosters = useCallback(() => {
    const filteredBoosters: string[] = []
    for (const addr in boosters) {
      const booster = boosters[addr]
      if (!booster) continue
      //TODO: filter
      switch (filter.category) {
        case UserBoosterCategory.AllBooster:
          filteredBoosters.push(addr)
          break
        case UserBoosterCategory.HotBooster:
          //TODO: Filter HotBooster
          if (!booster.bidTotal.sub(booster.bidReserve).isZero()) {
            filteredBoosters.push(addr)
          }
          break
        case UserBoosterCategory.HighBuyBackRate:
          //TODO: Filter HighBuyBackRate
          break

        case UserBoosterCategory.BoostOnly:
          if (mapBoost.has(addr)) {
            filteredBoosters.push(addr)
          }
          break
        default:
          break
      }
    }
    return setFilteredBoosters(filteredBoosters)
  }, [boosters, filter.category, mapBoost])

  useEffect(() => {
    filterBoosters()
  }, [filterBoosters])

  return filteredBoosters
}
