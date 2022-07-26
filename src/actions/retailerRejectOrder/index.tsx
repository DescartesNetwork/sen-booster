import { Button } from 'antd'
import { useRejectOrder } from 'hooks/actions/useRejectOrder'

type RejectOrderProps = {
  orderAddress: string
}

const RejectOrder = ({ orderAddress }: RejectOrderProps) => {
  const { rejectOrder, loading } = useRejectOrder()
  return (
    <Button loading={loading} onClick={() => rejectOrder({ orderAddress })}>
      Reject
    </Button>
  )
}

export default RejectOrder
