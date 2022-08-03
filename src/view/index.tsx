import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useUI } from '@sentre/senhub'

import User from './user'
import Retailer from './retailer'
import AddBooster from '../actions/createBooster'

import { AppWatcher } from 'watcher'
import { useAppRouter } from 'hooks/useAppRouter'
import { AppLoader } from 'appLoader'

import BG_DARK from 'static/images/BG_DARK.png'
import BG_LIGHT from 'static/images/BG_LIGHT.png'

import './index.less'

const View = () => {
  const { setBackground } = useUI()
  const { appRoute } = useAppRouter()

  useEffect(() => {
    setBackground({ light: BG_LIGHT, dark: BG_DARK })
  }, [setBackground])

  return (
    <AppLoader>
      <AppWatcher>
        <div
          style={{ maxHeight: 'calc(100vh - 100px)', overflowX: 'auto' }}
          className="scrollbar"
          id="sen-booster-scroll-lazyload"
        >
          <Switch>
            <Route path={`${appRoute}/user`} component={User} />
            <Route path={`${appRoute}/retailer`} component={Retailer} />
            <Route path={`${appRoute}/create-booster`} component={AddBooster} />
            <Route path="*">
              <Redirect to={`${appRoute}/user`} />
            </Route>
          </Switch>
        </div>
      </AppWatcher>
    </AppLoader>
  )
}

export default View
