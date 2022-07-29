import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import BN from 'bn.js'

import { AppState } from 'model'
import { useMintPrice } from 'hooks/useMintPrice'
import { utilsBN } from '@sen-use/web3/dist'
import useMintDecimals from 'shared/hooks/useMintDecimals'

type UseEstimatedReceiveProps = {
  boosterAddress: string
  amount: number
  discount: number
}

export const useEstimatedReceive = ({
  boosterAddress,
  amount,
  discount,
}: UseEstimatedReceiveProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const bidPrice = useMintPrice(bidMint.toBase58())
  const askPrice = useMintPrice(askMint.toBase58())
  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0
  const askDecimal = useMintDecimals(askMint.toBase58()) || 0
  const bidAmount = useMemo(() => {
    const bidPriceDecimal = utilsBN.decimalize(bidPrice, bidDecimal)
    const askPriceDecimal = utilsBN.decimalize(askPrice, askDecimal)
    const amountDecimal = utilsBN.decimalize(amount, askDecimal)
    const valuation = amountDecimal.mul(askPriceDecimal)

    if (!bidPrice) return new BN(0)

    return valuation
      .mul(new BN((discount / 100) * 10 ** 9))
      .div(bidPriceDecimal)
  }, [amount, askDecimal, askPrice, bidDecimal, bidPrice, discount])

  return bidAmount.div(new BN(10 ** 9))
}
