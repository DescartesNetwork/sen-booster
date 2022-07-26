import { useSelector } from 'react-redux'

import OrderMintInfo from './orderMintInfo'

import { AppState } from 'model'

const AskColumn = ({ orderId }: { orderId: string }) => {
  const { retailer, bidAmount } = useSelector(
    (state: AppState) => state.orders[orderId],
  )
  // Isn't check here
  const { askMint } = useSelector(
    (state: AppState) => state.boosters[retailer.toBase58()],
  )

  return <OrderMintInfo amount={bidAmount} mintAddress={askMint.toBase58()} />
}

export default AskColumn
