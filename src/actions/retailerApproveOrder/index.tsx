import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppState } from 'model'
import { useApproveOrder } from 'hooks/actions/useApproveOrder'

type ApproveOrderProps = {
  orderAddress: string
}

const ApproveOrder = ({ orderAddress }: ApproveOrderProps) => {
  const orderData = useSelector((state: AppState) => state.orders[orderAddress])
  const { approveOrder, loading } = useApproveOrder()

  const state = Object.keys(orderData.state)[0]

  return (
    <Button
      type="primary"
      loading={loading}
      disabled={state === 'approved' || state === 'rejected'}
      onClick={() => approveOrder(orderAddress)}
    >
      Approve
    </Button>
  )
}

export default ApproveOrder
