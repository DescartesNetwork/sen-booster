import { Button } from 'antd'
import { Address } from '@project-serum/anchor'

import { useRedeemOrder } from 'hooks/actions/useRedeemOrder'

type RedeemProps = {
  orderAddress: Address
}
const Redeem = ({ orderAddress }: RedeemProps) => {
  const { redeemOrder, loading } = useRedeemOrder()

  return (
    <Button
      loading={loading}
      onClick={() => redeemOrder(orderAddress)}
      type="primary"
    >
      Redeem
    </Button>
  )
}

export default Redeem
