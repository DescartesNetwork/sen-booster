import { Card, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import OrderTable from 'view/retailer/orderTable'
import { useFilterOrder } from 'hooks/retailer/useFilterOrders'

function OrderList() {
  const { myOrders } = useFilterOrder()

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Filter />
        </Col>
        <Col span={24}>
          <OrderTable dataSource={myOrders} />
        </Col>
      </Row>
    </Card>
  )
}

export default OrderList
