import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useMintDecimals } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { AppState } from 'model'
import { useMintPrice } from 'hooks/useMintPrice'
import { utilsBN } from '@sen-use/web3/dist'

const ROUNDING_DECIMAL = 10 ** 9

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
  const bidDecimal = useMintDecimals({ mintAddress: bidMint.toBase58() }) || 0
  const askDecimal = useMintDecimals({ mintAddress: askMint.toBase58() }) || 0
  const bidAmount = useMemo(() => {
    const bidPriceDecimal = utilsBN.decimalize(bidPrice, bidDecimal)
    const askPriceDecimal = utilsBN.decimalize(askPrice, askDecimal)
    const amountDecimal = utilsBN.decimalize(amount, askDecimal)
    const valuation = amountDecimal.mul(askPriceDecimal)

    if (bidPriceDecimal.isZero()) return new BN(0)
    return valuation
      .mul(new BN((discount / 100) * ROUNDING_DECIMAL))
      .div(bidPriceDecimal)
  }, [amount, askDecimal, askPrice, bidDecimal, bidPrice, discount])

  return bidAmount.div(new BN(ROUNDING_DECIMAL))
}
