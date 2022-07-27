import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppState } from 'model'
import { useRejectOrder } from 'hooks/actions/useRejectOrder'

type RejectOrderProps = {
  orderAddress: string
}

const RejectOrder = ({ orderAddress }: RejectOrderProps) => {
  const orderData = useSelector((state: AppState) => state.orders[orderAddress])
  const { rejectOrder, loading } = useRejectOrder()

  const state = Object.keys(orderData.state)[0]

  return (
    <Button
      loading={loading}
      disabled={state === 'approved' || state === 'rejected'}
      onClick={() => rejectOrder({ orderAddress })}
    >
      Reject
    </Button>
  )
}

export default RejectOrder
