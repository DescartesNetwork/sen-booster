import { useSelector } from 'react-redux'

import OrderMintInfo from './orderMintInfo'

import { AppState } from 'model'

const ColumnBid = ({ orderId }: { orderId: string }) => {
  const orderData = useSelector((state: AppState) => state.order[orderId])
  const booster = useSelector((state: AppState) => state.booster)

  const { retailer, bidAmount } = orderData || {}
  const { bidMint } = booster[retailer.toBase58()] || {}

  return <OrderMintInfo amount={bidAmount} mintAddress={bidMint.toBase58()} />
}

export default ColumnBid
