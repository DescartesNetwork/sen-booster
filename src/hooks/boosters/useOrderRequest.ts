import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { useOwnBoosters } from 'hooks/boosters/useOwnBoosters'
import { OrderRequest } from 'view/retailer/orderList'

export const useOrderRequests = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const { ownBoosters } = useOwnBoosters()

  const filteredOrderRequests = useMemo(
    () =>
      Object.keys(orders)
        .map((orderAddress) => ({
          ...orders[orderAddress],
          orderAddress,
        }))
        .filter(({ retailer }) => ownBoosters.includes(retailer.toBase58())),
    [ownBoosters, orders],
  )

  const sortedOrderRequests = filteredOrderRequests.sort(
    (a: OrderRequest, b: OrderRequest) => {
      return Number(b.createAt) - Number(a.createAt)
    },
  )

  return { orderRequests: sortedOrderRequests }
}
