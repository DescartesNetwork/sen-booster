import { Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'

import { useFilterOrder } from 'hooks/retailer/useFilterOrders'

const Redeem = () => {
  const { myOrders } = useFilterOrder()

  return (
    <Row>
      <Col>
        <OrderFilterSet />
      </Col>
      <Col>
        <RedeemTable dataSource={myOrders} />
      </Col>
    </Row>
  )
}

export default Redeem
