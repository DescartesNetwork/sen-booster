import { Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import OrderTable from 'view/retailer/orderTable'
import { useFilterOrder } from 'hooks/orders/useFilterOrders'

function OrderList() {
  const { filteredOrders } = useFilterOrder()

  console.log(filteredOrders, 'pools')
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
