import { Fragment, FunctionComponent } from 'react'

export const AppWatcher: FunctionComponent = (props) => {
  // const [loading, setLoading] = useState(false)

  // if (loading) return <Fragment />
  return <>{props.children}</>
}
