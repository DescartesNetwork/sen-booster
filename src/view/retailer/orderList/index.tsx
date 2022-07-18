import { Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import OrderTable from 'components/orderTable'
import { useFilterOrder } from 'hooks/orders/useFilterOrders'

function OrderList() {
  const { filteredOrders } = useFilterOrder()
  return (
    <Row>
      <Col>
        <Filter />
      </Col>
      <Col>
        <OrderTable dataSource={filteredOrders} />
      </Col>
    </Row>
  )
}

export default OrderList
