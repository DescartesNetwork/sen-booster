import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

type useAmountAppliedNFTProps = {
  orderAddress: string
}

export const useAmountAppliedNFT = ({
  orderAddress,
}: useAmountAppliedNFTProps) => {
  const vouchers = useSelector((state: AppState) => state.vouchers)
  const orderData = useSelector((state: AppState) => state.orders[orderAddress])
  const owner = orderData.authority.toBase58()
  const retailerAddress = orderData.retailer.toBase58()

  const nftUsedInThisBooster = useMemo(() => {
    let count = 0
    for (const address in vouchers) {
      const { authority, retailer } = vouchers[address]
      if (
        authority.toBase58() === owner &&
        retailerAddress === retailer.toBase58()
      )
        count++
    }
    return count
  }, [retailerAddress, owner, vouchers])

  return { nftUsedInThisBooster }
}
