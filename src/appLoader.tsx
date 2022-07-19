import { getAnchorProvider } from '@sen-use/web3'
import { rpc, useWallet } from '@sentre/senhub'
import configs from 'configs'
import { Fragment, useEffect, useState } from 'react'
import SenExchangeProgram from 'sen-exchange-core'

export const AppLoader: React.FC = ({ children }) => {
  const {
    wallet: { address },
  } = useWallet()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const provider = getAnchorProvider(rpc, address, window.sentre.wallet)
    const senExchange = new SenExchangeProgram(
      provider,
      configs.sol.senExchangeProgram,
    )
    window.senBooster = senExchange
    setLoaded(true)
  }, [address])

  if (!loaded) return null
  return <Fragment>{children}</Fragment>
}
