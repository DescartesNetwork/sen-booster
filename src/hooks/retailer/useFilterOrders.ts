import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { useMyBoosters } from 'hooks/boosters/useBoostersByOwner'

export const useOrderRequests = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const { myBoosters } = useMyBoosters()

  const orderRequests = useMemo(
    () =>
      Object.keys(orders)
        .map((orderAddress) => ({
          ...orders[orderAddress],
          orderAddress,
        }))
        .filter(({ retailer }) => myBoosters.includes(retailer.toBase58())),
    [myBoosters, orders],
  )

  return { orderRequests }
}
