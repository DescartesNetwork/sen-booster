import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { useOwnBoosters } from 'hooks/boosters/useOwnBoosters'

export const useOrderRequests = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const { ownBoosters } = useOwnBoosters()

  const orderRequests = useMemo(
    () =>
      Object.keys(orders)
        .map((orderAddress) => ({
          ...orders[orderAddress],
          orderAddress,
        }))
        .filter(({ retailer }) => ownBoosters.includes(retailer.toBase58())),
    [ownBoosters, orders],
  )

  return { orderRequests }
}
