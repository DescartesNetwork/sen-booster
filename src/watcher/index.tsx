import { Fragment, useMemo } from 'react'
import BoostersWatcher from './boosters.watcher'
import OrdersWatcher from './orders.watcher'
import VouchersWatcher from './vouchers.watcher'
import VoucherPrintersWatcher from './voucherPrinter.watcher'
import { useWatcherLoading } from './watcher'

import Loading from 'components/loading'

export const AppWatcher: React.FC = ({ children }) => {
  const [loadingInfo] = useWatcherLoading()

  const loading = useMemo(
    () =>
      !Object.values(loadingInfo).length ||
      Object.values(loadingInfo).includes(true),
    [loadingInfo],
  )

  return (
    <Fragment>
      <BoostersWatcher />
      <OrdersWatcher />
      <VoucherPrintersWatcher />
      <VouchersWatcher />
      {loading ? <Loading /> : children}
    </Fragment>
  )
}
