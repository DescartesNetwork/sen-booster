import { Button, Row } from 'antd'
import { useApproveOrder } from 'hooks/actions/useApproveOrder'

const ApproveOrder = () => {
  const { approveOrder, loading } = useApproveOrder()
  return (
    <Row>
      <Button onClick={approveOrder}>Approve</Button>
    </Row>
  )
}

export default ApproveOrder
