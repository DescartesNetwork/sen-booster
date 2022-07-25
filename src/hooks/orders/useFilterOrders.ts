import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useFilterOrder = () => {
  const orders = useSelector((state: AppState) => state.order)

  const myOrders = useMemo(
    () =>
      Object.keys(orders).map((orderAddress) => ({
        ...orders[orderAddress],
        orderAddress,
      })),
    [orders],
  )

  return { myOrders }
}
