import { useSelector } from 'react-redux'
import { Address } from '@project-serum/anchor'

import OrderMintInfo from './orderMintInfo'

import { AppState } from 'model'

const AskColumn = ({ orderId }: { orderId: Address }) => {
  const { retailer, bidAmount } = useSelector(
    (state: AppState) => state.orders[orderId.toString()],
  )
  // Isn't check here
  const { askMint } = useSelector(
    (state: AppState) => state.boosters[retailer.toBase58()],
  )

  return <OrderMintInfo amount={bidAmount} mintAddress={askMint.toBase58()} />
}

export default AskColumn
