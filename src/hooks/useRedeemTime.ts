import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useRedeemTime = () => {
  const orders = useSelector((state: AppState) => state.orders)

  const getRedeemTime = useCallback(
    (orderAddress: string) => {
      const { lockAt, lockTime, state } = orders[orderAddress]
      if (!state.approved) return 0
      if (lockTime.isZero()) return lockAt.toNumber()
      return lockAt.add(lockTime).toNumber()
    },
    [orders],
  )

  return { getRedeemTime }
}
