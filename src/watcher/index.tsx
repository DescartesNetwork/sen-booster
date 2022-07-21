import { Fragment, FunctionComponent } from 'react'
import { BoostersWatcher } from './boosters.watcher'
import { OrdersWatcher } from './orders.watcher'

export const AppWatcher: FunctionComponent = (props) => {
  // const [loading, setLoading] = useState(false)

  // if (loading) return <Fragment />
  return (
    <Fragment>
      <BoostersWatcher />
      <OrdersWatcher />
      {props.children}
    </Fragment>
  )
}
