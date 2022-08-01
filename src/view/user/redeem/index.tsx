import { Card, Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'

import { useOwnOrders } from 'hooks/boosters/useOwnOrders'

const Redeem = () => {
  const { ownOrders } = useOwnOrders()
  return (
    <Card bodyStyle={{ padding: '24px 0px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ padding: '0 24px' }}>
          <OrderFilterSet />
        </Col>
        <Col span={24}>
          <RedeemTable dataSource={ownOrders} />
        </Col>
      </Row>
    </Card>
  )
}

export default Redeem
