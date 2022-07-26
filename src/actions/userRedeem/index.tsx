import { Button } from 'antd'

import { useRedeemOrder } from 'hooks/actions/useRedeemOrder'

type RedeemProps = {
  orderAddress: string
}
const Redeem = ({ orderAddress }: RedeemProps) => {
  const { redeemOrder } = useRedeemOrder()

  return (
    <Button onClick={redeemOrder} type="ghost">
      Redeem
    </Button>
  )
}

export default Redeem
