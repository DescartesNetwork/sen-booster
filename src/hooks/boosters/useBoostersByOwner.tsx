import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'

import { AppState } from 'model'

export const useMyBoosters = () => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const myBoosters = useMemo(() => {
    const boosterAddresses = Object.keys(boosters).filter(
      (address) => boosters[address].authority.toBase58() === walletAddress,
    )
    return boosterAddresses
  }, [boosters, walletAddress])

  return { myBoosters }
}
