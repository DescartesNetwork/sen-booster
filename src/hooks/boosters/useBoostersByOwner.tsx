import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'

import { AppState } from 'model'

export const useBoostersByOwner = () => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const myBoosters = useMemo(() => {
    const boosterAddresses: string[] = []
    for (const boosterAddress in boosters) {
      const { authority } = boosters[boosterAddress]
      if (authority.toBase58() === walletAddress)
        boosterAddresses.push(boosterAddress)
    }
    return boosterAddresses
  }, [boosters, walletAddress])

  return { myBoosters }
}
