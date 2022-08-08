import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useOwnOrders } from './useOwnOrders'
import { ALL, SECONDS_PER_DAY } from 'constant'
import { AppState } from 'model'

export type FilterParams = {
  token: string
  time: number
  status: string
}

export const useOrderFiltered = (filter: FilterParams) => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const { ownOrders } = useOwnOrders()

  const filteredOrders = useMemo(() => {
    const now = Date.now() / 1000
    const pastTime = now - filter.time * SECONDS_PER_DAY
    const orderRequest = ownOrders.filter((order) => {
      const { retailer, createAt, state } = order
      const { askMint, bidMint } = boosters[retailer.toBase58()]
      const listMintAddress = [askMint.toBase58(), bidMint.toBase58()]
      //Filter Params
      if (filter.status !== ALL && Object.keys(state)[0] !== filter.status)
        return false
      if (createAt.toNumber() < pastTime) return false
      if (filter.token !== ALL && !listMintAddress.includes(filter.token))
        return false

      return true
    })

    return orderRequest
  }, [boosters, filter, ownOrders])

  return { filteredOrders }
}
