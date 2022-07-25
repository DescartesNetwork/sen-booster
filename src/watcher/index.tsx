import { Fragment, FunctionComponent } from 'react'
import { BoostersWatcher } from './boosters.watcher'
import { OrdersWatcher } from './orders.watcher'
import { VoucherPrinterWatcher } from './voucherPrinter.watcher'

export const AppWatcher: FunctionComponent = (props) => {
  return (
    <Fragment>
      <BoostersWatcher />
      <OrdersWatcher />
      <VoucherPrinterWatcher />
      {props.children}
    </Fragment>
  )
}
