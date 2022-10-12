import { useMemo } from 'react'
import { rpc, useWalletAddress } from '@sentre/senhub'
import { getAnchorProvider } from '@sen-use/web3'
import SenExchangeProgram from 'sen-exchange-core'

import configs from 'configs'

export const useSenExchange = () => {
  const address = useWalletAddress()

  return useMemo(() => {
    const provider = getAnchorProvider(rpc, address, window.sentre.solana)
    const senExchange = new SenExchangeProgram(
      provider,
      configs.sol.senExchangeProgram,
    )
    return { provider, senExchange }
  }, [address])
}
