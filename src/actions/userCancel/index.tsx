import { Button } from 'antd'

import { useCancelOrder } from 'hooks/actions/useCancelOrder'

type CancelProps = {
  orderAddress: string
}

const Cancel = ({ orderAddress }: CancelProps) => {
  const { cancelOrder } = useCancelOrder()

  return (
    <Button onClick={cancelOrder} type="ghost">
      Cancel
    </Button>
  )
}

export default Cancel
