import { useState } from 'react'

import { Button, Card, Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import FilterOrders from 'components/orderFilters'

import { useOwnOrders } from 'hooks/boosters/useOwnOrders'
import { OrderRequest } from 'view/retailer/orderList'

const DEFAULT_AMOUNT = 10

const Redeem = () => {
  const [orders, setOrders] = useState<OrderRequest[]>([])
  const [amountOrders, setAmountOrders] = useState(DEFAULT_AMOUNT)
  const { ownOrders } = useOwnOrders()

  return (
    <Card bodyStyle={{ padding: '24px 0px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ paddingRight: 24, paddingLeft: 24 }}>
          <FilterOrders orderList={ownOrders} onChange={setOrders} />
        </Col>
        <Col span={24}>
          <RedeemTable dataSource={orders.slice(0, amountOrders)} />
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

export default Redeem
