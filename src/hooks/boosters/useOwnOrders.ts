import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'

import { AppState } from 'model'
import { OrderRequest } from 'view/retailer/orderList'

export const useOwnOrders = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const filteredOrder = useMemo(
    () =>
      Object.keys(orders)
        .map((orderAddress) => ({
          ...orders[orderAddress],
          orderAddress,
        }))
        .filter(({ authority }) => authority.toBase58() === walletAddress),
    [orders, walletAddress],
  )

  const sortedOrderRequests = filteredOrder.sort(
    (a: OrderRequest, b: OrderRequest) => {
      return Number(b.createAt) - Number(a.createAt)
    },
  )

  return { ownOrders: sortedOrderRequests }
}
