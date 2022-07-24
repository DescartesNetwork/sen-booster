import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { VoucherPrinterData } from 'sen-exchange-core'

import { AppState } from 'model'

export const useVoucherPrintersByBooster = (boosterAddress: string) => {
  const voucherPrinters = useSelector((state: AppState) => state.voucherPrinter)
  const [voucherPrinterByBooster, setVoucherPrinterByBooster] = useState<
    (VoucherPrinterData & { pubKey: string })[]
  >([])

  useEffect(() => {
    const newVoucherPrinters: (VoucherPrinterData & {
      pubKey: string
    })[] = []
    for (const key in voucherPrinters) {
      if (voucherPrinters[key].retailer.toBase58() === boosterAddress) {
        newVoucherPrinters.push({ ...voucherPrinters[key], pubKey: key })
      }
    }
    return setVoucherPrinterByBooster(newVoucherPrinters)
  }, [boosterAddress, voucherPrinters])

  return voucherPrinterByBooster
}
