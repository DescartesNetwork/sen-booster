import { useSelector } from 'react-redux'

import { Card, Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'
// import { useFilterOrder } from 'hooks/orders/useFilterOrders'

import { AppState } from 'model'

const Redeem = () => {
  // const { filteredOrders } = useFilterOrder()
  const orders = useSelector((state: AppState) => state.order)

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <OrderFilterSet />
        </Col>
        <Col span={24}>
          <RedeemTable
            dataSource={Object.keys(orders).map((val) => ({
              pubkey: val,
              ...orders[val],
            }))}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Redeem
