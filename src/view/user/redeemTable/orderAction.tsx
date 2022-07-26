import Cancel from 'actions/userCancel'
import Redeem from 'actions/userRedeem'
import { Button, Typography } from 'antd'

import { OrderState } from 'constant'

type RedeemActionProps = {
  orderState: string
  orderAddress: string
}

const OrderAction = ({ orderState, orderAddress }: RedeemActionProps) => {
  if (orderState === OrderState.Open)
    return <Cancel orderAddress={orderAddress} />
  if (orderState === OrderState.Approved)
    return <Redeem orderAddress={orderAddress} />
  return (
    <Button type="text" size="small">
      <Typography.Text strong>Detail</Typography.Text>
    </Button>
  )
}

export default OrderAction
