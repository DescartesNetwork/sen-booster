import BoostersWatcher from './boosters.watcher'
import OrdersWatcher from './orders.watcher'
import VouchersWatcher from './vouchers.watcher'
import VoucherPrintersWatcher from './voucherPrinter.watcher'

export const AppWatcher: React.FC = (props) => {
  return (
    <BoostersWatcher>
      <OrdersWatcher>
        <VoucherPrintersWatcher>
          <VouchersWatcher>{props.children}</VouchersWatcher>
        </VoucherPrintersWatcher>
      </OrdersWatcher>
    </BoostersWatcher>
  )
}
