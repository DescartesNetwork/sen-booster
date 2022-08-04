import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

type useAmountAppliedNFTProps = {
  owner: string
  boosterAddress: string
}

export const useAmountAppliedNFT = ({
  owner,
  boosterAddress,
}: useAmountAppliedNFTProps) => {
  const vouchers = useSelector((state: AppState) => state.vouchers)

  const nftUsedInThisBooster = useMemo(() => {
    let count = 0
    for (const address in vouchers) {
      const { authority, retailer } = vouchers[address]
      if (
        authority.toBase58() === owner &&
        boosterAddress === retailer.toBase58()
      )
        count++
    }
    return count
  }, [boosterAddress, owner, vouchers])

  return { nftUsedInThisBooster }
}
