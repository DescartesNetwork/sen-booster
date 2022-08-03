import { useState } from 'react'
import { OrderData } from 'sen-exchange-core'

import { Button, Card, Col, Row } from 'antd'
import FilterOrders from 'components/filterOrder'
import OrderTable from 'view/retailer/orderTable'

import { useOrderRequests } from 'hooks/boosters/useOrderRequest'

export type OrderRequest = OrderData & { orderAddress: string }

const DEFAULT_PAGE_SIZE = 10

function OrderList() {
  const [orders, setOrders] = useState<OrderRequest[]>([])
  const [page, setPage] = useState(1)
  const { orderRequests } = useOrderRequests()

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FilterOrders onChange={setOrders} orderList={orderRequests} />
        </Col>
        <Col span={24}>
          <OrderTable dataSource={orders.slice(0, page * DEFAULT_PAGE_SIZE)} />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page * DEFAULT_PAGE_SIZE >= orders.length}
          >
            View more
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default OrderList
