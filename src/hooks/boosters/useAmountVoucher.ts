import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

const useAmountVoucher = () => {
  const voucherPrinters = useSelector(
    (state: AppState) => state.voucherPrinters,
  )
  const getAmountVoucher = useCallback(
    (boosterAddress: string) => {
      let count = 0
      for (const { retailer } of Object.values(voucherPrinters))
        if (retailer.toBase58() === boosterAddress) count++

      return count
    },
    [voucherPrinters],
  )

  return { getAmountVoucher }
}

export default useAmountVoucher
