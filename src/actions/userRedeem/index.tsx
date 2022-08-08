import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { useRedeemOrder } from 'hooks/actions/useRedeemOrder'
import { AppState } from 'model'
import { useRedeemTime } from 'hooks/useRedeemTime'

type RedeemProps = {
  orderAddress: string
}
const Redeem = ({ orderAddress }: RedeemProps) => {
  const state = useSelector(
    (state: AppState) => state.orders[orderAddress].state,
  )
  const { redeemOrder, loading } = useRedeemOrder()
  const { getRedeemTime } = useRedeemTime()
  const redemptionTime = getRedeemTime(orderAddress)

  return (
    <Button
      loading={loading}
      onClick={() => redeemOrder(orderAddress)}
      type="primary"
      disabled={!state.approved || redemptionTime * 1000 > Date.now()}
      size="small"
    >
      Redeem
    </Button>
  )
}

export default Redeem
