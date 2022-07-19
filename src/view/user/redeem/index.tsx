import { Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'
import { useFilterOrder } from 'hooks/orders/useFilterOrders'

const Redeem = () => {
  const { filteredOrders } = useFilterOrder()
  return (
    <Row>
      <Col>
        <OrderFilterSet />
      </Col>
      <Col>
        <RedeemTable dataSource={filteredOrders} />
      </Col>
    </Row>
  )
}

export default Redeem
