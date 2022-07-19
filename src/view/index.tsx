import { Redirect, Route, Switch } from 'react-router-dom'

import User from './user'
import Retailer from './retailer'

import { AppWatcher } from 'watcher'
import { useAppRouter } from 'hooks/useAppRouter'
import AddBooster from '../actions/createBooster'

import './index.less'
import { AppLoader } from 'appLoader'

const View = () => {
  // const { setBackground } = useUI()
  const { appRoute } = useAppRouter()
  // useEffect(() => {
  //   setBackground({ light: , dark: BG_DARK })
  // }, [setBackground])

  return (
    <AppLoader>
      <AppWatcher>
        <Switch>
          <Route path={`${appRoute}/user`} component={User} />
          <Route path={`${appRoute}/retailer`} component={Retailer} />
          <Route path={`${appRoute}/create-booster`} component={AddBooster} />
          <Route path="*">
            <Redirect to={`${appRoute}/user`} />
          </Route>
        </Switch>
      </AppWatcher>
    </AppLoader>
  )
}

export default View
