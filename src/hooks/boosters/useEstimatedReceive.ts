import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMint, util } from '@sentre/senhub'

import { AppState } from 'model'
import { notifyError } from 'helper'

type UseEstimatedReceiveProps = {
  boosterAddress: string
  amount: number
  buyBack: number
}

export const useEstimatedReceive = ({
  boosterAddress,
  amount,
  buyBack,
}: UseEstimatedReceiveProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const [estimatedReceive, setEstimatedReceive] = useState(0)
  const { tokenProvider } = useMint()

  const estimateReceive = useCallback(async () => {
    try {
      const bidMintInfo = await tokenProvider.findByAddress(bidMint.toBase58())
      const bidTicket = bidMintInfo?.extensions?.coingeckoId
      const { price: bidPrice } = await util.fetchCGK(bidTicket)
      const askMintInfo = await tokenProvider.findByAddress(askMint.toBase58())
      const askTicket = askMintInfo?.extensions?.coingeckoId
      const { price: askPrice } = await util.fetchCGK(askTicket)
      let receiveAmount = 0

      if (bidPrice || askPrice)
        receiveAmount = (amount * askPrice * buyBack) / (bidPrice * 100)

      setEstimatedReceive(receiveAmount)
    } catch (error: any) {
      return notifyError(error)
    }
  }, [amount, askMint, bidMint, buyBack, tokenProvider])

  useEffect(() => {
    estimateReceive()
  }, [estimateReceive])

  return estimatedReceive
}
