import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals } from '@sentre/senhub'

import { AppState } from 'model'
import { useMintPrice } from './useMintPrice'

export const useProfit = (orderAddress: string) => {
  const { askAmount, bidAmount, retailer } = useSelector(
    (state: AppState) => state.orders[orderAddress],
  )
  const { askMint, bidMint } = useSelector(
    (state: AppState) => state.boosters[retailer.toBase58()],
  )
  // Get total bid
  const bidDecimals = useMintDecimals({ mintAddress: bidMint.toBase58() }) || 0
  const askDecimals = useMintDecimals({ mintAddress: askMint.toBase58() }) || 0
  const bidPrice = useMintPrice(bidMint.toBase58())
  const askPrice = useMintPrice(askMint.toBase58())
  const numBidAmount = Number(utilsBN.undecimalize(bidAmount, bidDecimals))
  const numAskAmount = Number(utilsBN.undecimalize(askAmount, askDecimals))
  const totalBid = numBidAmount * bidPrice
  // Get total ask
  const totalAsk = numAskAmount * askPrice

  // Calculate current discount
  const profit = totalAsk ? (totalAsk - totalBid) / totalAsk : 0

  return { profit }
}
