import { Fragment, FunctionComponent } from 'react'
import { BoostersWatcher } from './boosters.watcher'

export const AppWatcher: FunctionComponent = (props) => {
  // const [loading, setLoading] = useState(false)

  // if (loading) return <Fragment />
  return (
    <Fragment>
      <BoostersWatcher />
      {props.children}
    </Fragment>
  )
}
