import { util } from '@sentre/senhub/dist'
import { OrderState } from 'sen-exchange-core'

import { Button } from 'antd'
import Cancel from 'actions/userCancel'
import Redeem from 'actions/userRedeem'

type RedeemActionProps = {
  orderState: OrderState
  orderAddress: string
}

const OrderAction = ({ orderState, orderAddress }: RedeemActionProps) => {
  if (orderState.open) return <Cancel orderAddress={orderAddress} />
  if (orderState.approved) return <Redeem orderAddress={orderAddress} />

  return (
    <Button
      type="text"
      onClick={() => window.open(util.explorer(orderAddress), '_blank')}
    >
      Detail
    </Button>
  )
}

export default OrderAction
