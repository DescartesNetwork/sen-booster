import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAnchorProvider } from '@sen-use/web3'
import { PDB, rpc, useWalletAddress } from '@sentre/senhub'
import SenExchangeProgram from 'sen-exchange-core'

import { setMode } from 'model/settings.controller'
import { AppDispatch } from 'model'
import { useAppRouter } from 'hooks/useAppRouter'
import { Mode } from 'constant'
import configs from 'configs'

const {
  manifest: { appId },
  sol: { senExchangeProgram },
} = configs

export const AppLoader: React.FC = ({ children }) => {
  const address = useWalletAddress()
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { pushHistory } = useAppRouter()

  const getCurrentMode = useCallback(async () => {
    const pdb = new PDB(address).createInstance(appId)
    const currentMode: Mode = (await pdb.getItem('mode')) || Mode.User
    dispatch(setMode(currentMode))
    return pushHistory(`/${currentMode}`)
  }, [address, dispatch, pushHistory])

  useEffect(() => {
    if (loaded) return
    const provider = getAnchorProvider(rpc, address, window.sentre.wallet)
    const senExchange = new SenExchangeProgram(provider, senExchangeProgram)
    window.senBooster = senExchange
    getCurrentMode()
    setLoaded(true)
  }, [address, loaded, getCurrentMode])

  if (!loaded) return null
  return <Fragment>{children}</Fragment>
}
