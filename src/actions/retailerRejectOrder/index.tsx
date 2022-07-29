import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppState } from 'model'
import { useRejectOrder } from 'hooks/actions/useRejectOrder'

type RejectOrderProps = {
  orderAddress: string
}

const RejectOrder = ({ orderAddress }: RejectOrderProps) => {
  const state = useSelector(
    (state: AppState) => state.orders[orderAddress].state,
  )
  const { rejectOrder, loading } = useRejectOrder()

  return (
    <Button
      loading={loading}
      disabled={!!state.approved || !!state.rejected}
      onClick={() => rejectOrder({ orderAddress })}
    >
      Reject
    </Button>
  )
}

export default RejectOrder
