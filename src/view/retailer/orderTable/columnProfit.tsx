import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { util } from '@sentre/senhub'

import { Typography } from 'antd'

import { useMintPrice } from 'hooks/useMintPrice'
import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'

type ColumnProfitProps = {
  retailerAddress: string
  orderAddress: string
}
const ColumnProfit = ({ retailerAddress, orderAddress }: ColumnProfitProps) => {
  const { askAmount, bidAmount } = useSelector(
    (state: AppState) => state.orders[orderAddress],
  )
  const { askMint, bidMint } = useSelector(
    (state: AppState) => state.boosters[retailerAddress],
  )
  // Get total bid
  const bidDecimals = useMintDecimals(bidMint.toBase58()) || 0
  const askDecimals = useMintDecimals(askMint.toBase58()) || 0
  const bidPrice = useMintPrice(bidMint.toBase58())
  const askPrice = useMintPrice(askMint.toBase58())
  const numBidAmount = Number(utilsBN.undecimalize(bidAmount, bidDecimals))
  const numAskAmount = Number(utilsBN.undecimalize(askAmount, askDecimals))
  const totalBid = numBidAmount * bidPrice
  // Get total ask
  const totalAsk = numAskAmount * askPrice

  // Calculate current discount
  const profit = (totalAsk - totalBid) / totalAsk
  return (
    <Typography.Text
      style={{
        color: profit >= 0 ? '#14E041' : '#F9575E',
      }}
    >
      {util.numeric(profit).format('0,0.[00]%')}
    </Typography.Text>
  )
}

export default ColumnProfit
