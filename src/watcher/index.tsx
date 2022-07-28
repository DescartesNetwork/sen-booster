import { Fragment, FunctionComponent } from 'react'

import BoostersWatcher from './boosters.watcher'
import OrdersWatcher from './orders.watcher'
import VouchersWatcher from './vouchers.watcher'
import VoucherPrintersWatcher from './voucherPrinter.watcher'

export const AppWatcher: FunctionComponent = (props) => {
  return (
    <Fragment>
      <BoostersWatcher />
      <OrdersWatcher />
      <VoucherPrintersWatcher />
      <VouchersWatcher />
      {props.children}
    </Fragment>
  )
}
