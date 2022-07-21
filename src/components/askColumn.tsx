import { useSelector } from 'react-redux'

import OrderMintInfo from './orderMintInfo'

import { AppState } from 'model'

const AskColumn = ({ orderId }: { orderId: string }) => {
  const orderData = useSelector((state: AppState) => state.order[orderId])
  const booster = useSelector((state: AppState) => state.booster)

  const { retailer, bidAmount } = orderData || {}
  // Pending for newer version to get askAmount directly
  const { askMint } = booster[retailer.toBase58()] || {}

  return <OrderMintInfo amount={bidAmount} mintAddress={askMint.toBase58()} />
}

export default AskColumn
