import { OrderData } from 'sen-exchange-core'

import { Card, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import OrderTable from 'view/retailer/orderTable'

import { useOrderRequests } from 'hooks/boosters/useOrderRequest'

export type OrderRequest = OrderData & { orderAddress: string }

function OrderList() {
  const { orderRequests } = useOrderRequests()
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Filter />
        </Col>
        <Col span={24}>
          <OrderTable dataSource={orderRequests} />
        </Col>
      </Row>
    </Card>
  )
}

export default OrderList
