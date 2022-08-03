import { useSelector } from 'react-redux'

import OrderMintInfo from './orderMintInfo'

import { AppState } from 'model'

const BidColumn = ({ orderAddress }: { orderAddress: string }) => {
  const { retailer, bidAmount } = useSelector(
    (state: AppState) => state.orders[orderAddress],
  )
  const { bidMint } = useSelector(
    (state: AppState) => state.boosters[retailer.toBase58()],
  )

  return <OrderMintInfo amount={bidAmount} mintAddress={bidMint.toBase58()} />
}

export default BidColumn
