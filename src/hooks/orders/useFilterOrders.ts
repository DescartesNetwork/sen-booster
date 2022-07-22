import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'
import { OrderData } from 'sen-exchange-core'

import { AppState } from 'model'
import { OrderState } from 'model/order.controller'

export const useFilterOrder = () => {
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([])
  const orders = useSelector((state: AppState) => state.order)
  // const ordersFilterSet = useSelector((state: AppState) => state.ordersFilter)
  console.log(setFilteredOrders)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const checkIsYourOrder = useCallback(
    (address: string) => orders[address].authority.toBase58() === walletAddress,
    [orders, walletAddress],
  )
  console.log(orders, 'orders')
  const filterListOrders = useCallback(async (pools: OrderState) => pools, [])

  useEffect(() => {
    filterListOrders(orders)
  }, [filterListOrders, orders])

  return { filteredOrders, filterListOrders, checkIsYourOrder }
}
