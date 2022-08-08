import { useState } from 'react'
import { useUI } from '@sentre/senhub'

import { Button, Card, Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import RedeemMobileScreen from '../redeemMobileScreen'

import { OrderRequest } from 'view/retailer/orderList'

const DEFAULT_PAGE_SIZE = 10

const Redeem = () => {
  const [orders, setOrders] = useState<OrderRequest[]>([])
  const [page, setPage] = useState(1)
  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 768

  return (
    <Card bodyStyle={{ padding: '24px 0px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {isMobile ? (
            <RedeemMobileScreen
              dataSource={orders.slice(0, page * DEFAULT_PAGE_SIZE)}
              setOrders={setOrders}
            />
          ) : (
            <RedeemTable
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

export default Redeem
