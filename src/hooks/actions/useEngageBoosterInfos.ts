import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { web3 } from '@project-serum/anchor'
import { useWallet } from '@sentre/senhub'

import { AppState } from 'model'

export const useEngageBoosterInfos = (boosterAddress: web3.PublicKey) => {
  const orders = useSelector((state: AppState) => state.orders)
  const [loading, setLoading] = useState(false)
  // const [yourBought, setYourBought] = useState(0)
  // const [totalValuePaid, setTotalValuePair] = useState(0)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const calcEngagementInfos = useCallback(async () => {
    try {
      setLoading(true)
      const yourSuccessOrders = []
      // let newYourBought = 0
      for (const key in orders) {
        if (
          orders[key].authority.toBase58() === walletAddress &&
          orders[key].retailer.equals(boosterAddress)
          // orders[key].state ===
        ) {
          // newYourBought += orders[key].bidAmount +
          yourSuccessOrders.push(orders[key])
        }
      }
    } catch (error: any) {
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    calcEngagementInfos()
  }, [calcEngagementInfos])

  return { calcEngagementInfos, loading }
}
