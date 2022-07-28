import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { VoucherPrinterData } from 'sen-exchange-core'

import { AppState } from 'model'

export const useVoucherPrintersByBooster = (boosterAddress: string) => {
  const voucherPrinters = useSelector(
    (state: AppState) => state.voucherPrinters,
  )
  const [printers, setPrinters] = useState<VoucherPrinterData[]>([])

  useEffect(() => {
    const boosterPrinters: VoucherPrinterData[] = []
    for (const address in voucherPrinters) {
      if (voucherPrinters[address].retailer.toBase58() === boosterAddress)
        boosterPrinters.push({ ...voucherPrinters[address] })
    }
    return setPrinters(boosterPrinters)
  }, [boosterAddress, voucherPrinters])

  return printers
}
