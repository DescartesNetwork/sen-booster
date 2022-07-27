import { Button } from 'antd'
import { Address } from '@project-serum/anchor'

import { useRedeemOrder } from 'hooks/actions/useRedeemOrder'

type RedeemProps = {
  orderAddress: Address
}
const Redeem = ({ orderAddress }: RedeemProps) => {
  const { redeemOrder } = useRedeemOrder()

  return (
    <Button onClick={() => redeemOrder(orderAddress)} type="ghost">
      Redeem
    </Button>
  )
}

export default Redeem
