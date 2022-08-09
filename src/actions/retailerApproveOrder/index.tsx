import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppState } from 'model'
import { useApproveOrder } from 'hooks/actions/useApproveOrder'

type ApproveOrderProps = {
  orderAddress: string
}

const ApproveOrder = ({ orderAddress }: ApproveOrderProps) => {
  const state = useSelector(
    (state: AppState) => state.orders[orderAddress].state,
  )
  const { approveOrder, loading } = useApproveOrder()

  return (
    <Button
      type="primary"
      loading={loading}
      disabled={!state.open}
      onClick={() => approveOrder(orderAddress)}
      size="small"
    >
      Approve
    </Button>
  )
}

export default ApproveOrder
