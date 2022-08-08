import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { Mode } from 'constant'
import { AppState } from 'model'

export const useMintFilterOptions = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const boosters = useSelector((state: AppState) => state.boosters)
  const mode = useSelector((state: AppState) => state.settings.mode)
  const walletAddress = useWalletAddress()

  const mintOptions = useMemo(() => {
    let mintItems: Set<string> = new Set()
    for (const { retailer, authority } of Object.values(orders)) {
      if (mode === Mode.User && authority.toBase58() !== walletAddress) continue
      const boosterData = boosters[retailer.toBase58()]
      if (!boosterData) continue
      const { bidMint, askMint } = boosterData
      mintItems.add(bidMint.toBase58())
      mintItems.add(askMint.toBase58())
    }
    return Array.from(mintItems)
  }, [boosters, mode, orders, walletAddress])

  return mintOptions
}
