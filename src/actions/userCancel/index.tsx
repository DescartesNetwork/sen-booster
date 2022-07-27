import { Address } from '@project-serum/anchor'

import { Button } from 'antd'

import { useCancelOrder } from 'hooks/actions/useCancelOrder'

type CancelProps = {
  orderAddress: Address
}

const Cancel = ({ orderAddress }: CancelProps) => {
  const { cancelOrder } = useCancelOrder(orderAddress)

  return (
    <Button onClick={cancelOrder} type="ghost">
      Cancel
    </Button>
  )
}

export default Cancel
