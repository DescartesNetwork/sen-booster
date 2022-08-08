import { useState } from 'react'
import { OrderData } from 'sen-exchange-core'
import { useUI } from '@sentre/senhub'

import { Button, Card, Col, Row } from 'antd'
import OrderTable from 'view/retailer/orderTable'
import OrderMobileScreen from '../orderMobileScreen'

export type OrderRequest = OrderData & { orderAddress: string }

const DEFAULT_PAGE_SIZE = 10

function OrderList() {
  const [orders, setOrders] = useState<OrderRequest[]>([])
  const [page, setPage] = useState(1)
  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 768

  return (
    <Card bordered={false} bodyStyle={{ padding: '24px 0px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {isMobile ? (
            <OrderMobileScreen
              dataSource={orders.slice(0, page * DEFAULT_PAGE_SIZE)}
              setOrders={setOrders}
            />
          ) : (
            <OrderTable
              dataSource={orders.slice(0, page * DEFAULT_PAGE_SIZE)}
              setOrders={setOrders}
            />
          )}
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
