import { Col, Row } from 'antd'
import OrderTable from 'components/orderTable'
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
        <OrderTable dataSource={filteredOrders} />
      </Col>
    </Row>
  )
}

export default Redeem
