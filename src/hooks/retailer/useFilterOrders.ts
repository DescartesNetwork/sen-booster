import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'

import { AppState } from 'model'

export const useFilterOrder = () => {
  const orders = useSelector((state: AppState) => state.order)
  const boosters = useSelector((state: AppState) => state.booster)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const myBooster = useMemo(() => {
    const boosterAddresses: string[] = []
    for (const boosterAddress in boosters) {
      const { authority } = boosters[boosterAddress]
      if (authority.toBase58() === walletAddress)
        boosterAddresses.push(boosterAddress)
    }
    return boosterAddresses
  }, [boosters, walletAddress])

  const myOrders = useMemo(
    () =>
      Object.keys(orders)
        .map((orderAddress) => ({
          ...orders[orderAddress],
          orderAddress,
        }))
        .filter(({ retailer }) => myBooster.includes(retailer.toBase58())),
    [myBooster, orders],
  )

  return { myOrders }
}
