import { useSelector } from 'react-redux'
import { Address } from '@project-serum/anchor'

import OrderMintInfo from './orderMintInfo'

import { AppState } from 'model'

const ColumnBid = ({ orderId }: { orderId: Address }) => {
  const { retailer, bidAmount } = useSelector(
    (state: AppState) => state.orders[orderId.toString()],
  )
  const { bidMint } = useSelector(
    (state: AppState) => state.boosters[retailer.toBase58()],
  )

  return <OrderMintInfo amount={bidAmount} mintAddress={bidMint.toBase58()} />
}

export default ColumnBid
