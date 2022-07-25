import { Button } from 'antd'
import { useApproveOrder } from 'hooks/actions/useApproveOrder'

const ApproveOrder = ({ orderAddress }: { orderAddress: string }) => {
  const { approveOrder, loading } = useApproveOrder()
  return (
    <Button
      type="primary"
      loading={loading}
      onClick={() => approveOrder(orderAddress)}
    >
      Approve
    </Button>
  )
}

export default ApproveOrder
