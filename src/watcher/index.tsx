import { Fragment, FunctionComponent } from 'react'
import { BoostersWatcher } from './boosters.watcher'
import { VoucherPrinterWatcher } from './voucherPrinter.watcher'

export const AppWatcher: FunctionComponent = (props) => {
  // const [loading, setLoading] = useState(false)

  // if (loading) return <Fragment />
  return (
    <Fragment>
      <BoostersWatcher />
      <VoucherPrinterWatcher />
      {props.children}
    </Fragment>
  )
}
