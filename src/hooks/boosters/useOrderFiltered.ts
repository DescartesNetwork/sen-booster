import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useOwnOrders } from './useOwnOrders'
import { ALL, SECONDS_PER_DAY } from 'constant'
import { AppState } from 'model'
import { useRedeemTime } from 'hooks/useRedeemTime'

export type FilterParams = {
  token: string
  time: number
  status: string
}

export const useOrderFiltered = (filter: FilterParams) => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const { ownOrders } = useOwnOrders()
  const { getRedeemTime } = useRedeemTime()

  const filteredOrders = useMemo(() => {
    const now = Date.now() / 1000
    const pastTime = now - filter.time * SECONDS_PER_DAY
    const orderRequest = ownOrders.filter((order) => {
      const { retailer, createAt, state, orderAddress } = order
      const { askMint, bidMint } = boosters[retailer.toBase58()]
      const listMintAddress = [askMint.toBase58(), bidMint.toBase58()]

      //Filter Params
      if (filter.status !== ALL) {
        const redeemTime = getRedeemTime(orderAddress) * 1000
        const currentTime = Date.now()
        if (
          filter.status !== 'ready' &&
          (Object.keys(state)[0] !== filter.status ||
            (state.approved && redeemTime <= currentTime))
        )
          return false
        if (
          filter.status === 'ready' &&
          (!state.approved || redeemTime > currentTime)
        )
          return false
      }

      if (createAt.toNumber() < pastTime) return false
      if (filter.token !== ALL && !listMintAddress.includes(filter.token))
        return false

      return true
    })

    return orderRequest
  }, [boosters, filter, getRedeemTime, ownOrders])

  return { filteredOrders }
}
