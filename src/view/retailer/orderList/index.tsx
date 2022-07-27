import { OrderData } from 'sen-exchange-core'

import { Card, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import OrderTable from 'view/retailer/orderTable'

import { useOrderRequests } from 'hooks/retailer/useFilterOrders'

export type OrderRequest = OrderData & { orderAddress: string }

function OrderList() {
  const { orderRequests } = useOrderRequests()
  const sortOrderRequests = orderRequests.sort(
    (a: OrderRequest, b: OrderRequest) => {
      return Number(b.createAt) - Number(a.createAt)
    },
  )
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Filter />
        </Col>
        <Col span={24}>
          <OrderTable dataSource={sortOrderRequests} />
        </Col>
      </Row>
    </Card>
  )
}

export default OrderList
