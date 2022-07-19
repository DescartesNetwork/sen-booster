import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  AccountProvider,
  MintProvider,
} from '@sentre/senhub'

import './static/styles/dark.less'
import './static/styles/light.less'
import './static/styles/index.less'

import View from 'view'

import model from 'model'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

console.log('app ID: ', appId)

export const Page = () => {
  return (
    <UIProvider appId={appId} antd={{ prefixCls: appId }}>
      <WalletProvider>
        <AccountProvider>
          <MintProvider>
            <Provider store={model}>
              <View />
            </Provider>
          </MintProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}

export * from 'static.app'
