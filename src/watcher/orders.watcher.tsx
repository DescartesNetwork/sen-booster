import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getOrders } from 'model/order.controller'

export const OrdersWatcher = () => {
  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {
    dispatch(getOrders())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <Fragment />
}
