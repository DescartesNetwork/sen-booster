import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  AccountProvider,
  MintProvider,
} from '@sentre/senhub'

import View from 'view'

import model from 'model'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider appId={appId} style={{ paddingBottom: 24 }}>
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
