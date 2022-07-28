import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { initOrders, upsetOrder } from 'model/order.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'order'
const FILTER: web3.GetProgramAccountsFilter[] = []

const OrdersWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initOrders(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetOrder({ address: key, data: value })),
    [dispatch],
  )

  return (
    <Watcher
      program={window.senBooster.program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    />
  )
}
export default OrdersWatcher
