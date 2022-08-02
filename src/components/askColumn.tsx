import { useSelector } from 'react-redux'

import OrderMintInfo from './orderMintInfo'

import { AppState } from 'model'

const AskColumn = ({ orderAddress }: { orderAddress: string }) => {
  const { retailer, askAmount } = useSelector(
    (state: AppState) => state.orders[orderAddress],
  )
  // Isn't check here
  const { askMint } = useSelector(
    (state: AppState) => state.boosters[retailer.toBase58()],
  )

  return <OrderMintInfo amount={askAmount} mintAddress={askMint.toBase58()} />
}

export default AskColumn
