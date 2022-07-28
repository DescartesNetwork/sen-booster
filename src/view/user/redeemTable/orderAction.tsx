import { Address } from '@project-serum/anchor'
import { OrderState } from 'sen-exchange-core'

import Cancel from 'actions/userCancel'
import Redeem from 'actions/userRedeem'
import { Button, Typography } from 'antd'

type RedeemActionProps = {
  orderState: OrderState
  orderAddress: Address
}

const OrderAction = ({ orderState, orderAddress }: RedeemActionProps) => {
  if (orderState.open) return <Cancel orderAddress={orderAddress} />
  if (orderState.approved) return <Redeem orderAddress={orderAddress} />
  return (
    <Button type="text">
      <Typography.Text strong>Detail</Typography.Text>
    </Button>
  )
}

export default OrderAction
