import { Redirect, Route, Switch } from 'react-router-dom'

import User from './user'
import Retailer from './retailer'

import { AppWatcher } from 'watcher'
import { useAppRouter } from 'hooks/useAppRouter'

import './index.less'
import AddBooster from './retailer/addBooster'
import { MintProvider } from '@sentre/senhub/dist'

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
        <Route path={`${appRoute}/add-booster`} component={AddBooster} />
        <Route path="*">
          <Redirect to={`${appRoute}/user`} />
        </Route>
      </Switch>
    </AppWatcher>
  )
}

export default View
