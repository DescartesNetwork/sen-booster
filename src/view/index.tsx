import { Redirect, Route, Switch } from 'react-router-dom'

import User from './user'
import Retailer from './retailer'

import { AppWatcher } from 'components/watcher'
import { useAppRouter } from 'hooks/useAppRouter'

import './index.less'

const View = () => {
  // const { setBackground } = useUI()
  const { appRoute } = useAppRouter()

  // useEffect(() => {
  //   setBackground({ light: , dark: BG_DARK })
  // }, [setBackground])

  return (
    <AppWatcher>
      <Switch>
        <Route path={`${appRoute}/user`} component={User} />
        <Route path={`${appRoute}/retailer`} component={Retailer} />
        <Route path="*">
          <Redirect to={`${appRoute}/user`} />
        </Route>
      </Switch>
    </AppWatcher>
  )
}

export default View
