import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { VoucherPrinterData } from 'sen-exchange-core'

import { AppState } from 'model'

export const useVoucherPrintersByBooster = (boosterAddress: string) => {
  const voucherPrinters = useSelector(
    (state: AppState) => state.voucherPrinters,
  )
  const [voucherPrintersByBooster, setVoucherPrintersByBooster] = useState<
    VoucherPrinterData[]
  >([])

  useEffect(() => {
    const newVoucherPrinters: VoucherPrinterData[] = []
    for (const address in voucherPrinters) {
      if (voucherPrinters[address].retailer.toBase58() === boosterAddress) {
        newVoucherPrinters.push({ ...voucherPrinters[address] })
      }
    }

    return setVoucherPrintersByBooster(newVoucherPrinters)
  }, [boosterAddress, voucherPrinters])

  return voucherPrintersByBooster
}
