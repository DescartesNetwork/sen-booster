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
  const [remainingVouchers, setRemainingVouchers] = useState(0)

  useEffect(() => {
    const newVoucherPrinters: VoucherPrinterData[] = []
    let newRemainingVouchers = 0
    for (const address in voucherPrinters) {
      if (voucherPrinters[address].retailer.toBase58() === boosterAddress) {
        newVoucherPrinters.push({ ...voucherPrinters[address] })
        newRemainingVouchers += voucherPrinters[address].total.toNumber()
      }
    }
    setRemainingVouchers(newRemainingVouchers)
    return setVoucherPrintersByBooster(newVoucherPrinters)
  }, [boosterAddress, voucherPrinters])

  return { voucherPrintersByBooster, remainingVouchers }
}
