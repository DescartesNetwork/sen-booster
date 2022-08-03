import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { useMemo } from 'react'

export const useValidBooster = () => {
  const boosters = useSelector((state: AppState) => state.boosters)

  const filteredBooster = useMemo(() => {
    const boosterAddress = Object.keys(boosters).filter((address) => {
      const { endAt } = boosters[address]
      const now = Date.now()
      const numEndAt = endAt.toNumber() * 1000
      return numEndAt >= now
    })

    return boosterAddress
  }, [boosters])

  return filteredBooster
}
