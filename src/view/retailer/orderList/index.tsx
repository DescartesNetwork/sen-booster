import { useState } from 'react'
import { OrderData } from 'sen-exchange-core'

import { Button, Card, Col, Row } from 'antd'
import FilterOrders from 'components/orderFilters'
import OrderTable from 'view/retailer/orderTable'

import { useOrderRequests } from 'hooks/boosters/useOrderRequest'

export type OrderRequest = OrderData & { orderAddress: string }

const DEFAULT_AMOUNT = 10

function OrderList() {
  const [orders, setOrders] = useState<OrderRequest[]>([])
  const [amountOrders, setAmountOrders] = useState(DEFAULT_AMOUNT)
  const { orderRequests } = useOrderRequests()

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FilterOrders onChange={setOrders} orderList={orderRequests} />
        </Col>
        <Col span={24}>
          <OrderTable dataSource={orders.slice(0, amountOrders)} />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button
            onClick={() => setAmountOrders(amountOrders + DEFAULT_AMOUNT)}
            disabled={amountOrders >= orders.length}
          >
            View more
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default OrderList
