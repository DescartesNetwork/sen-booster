import { Button, Row } from 'antd'
import { useRejectOrder } from 'hooks/actions/useRejectOrder'

const RejectOrder = () => {
  const { rejectOrder, loading } = useRejectOrder()
  return (
    <Row>
      <Button onClick={rejectOrder}>Reject</Button>
    </Row>
  )
}

export default RejectOrder
