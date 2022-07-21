import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'
// import { useFilterOrder } from 'hooks/orders/useFilterOrders'

import { AppState } from 'model'

const Redeem = () => {
  // const { filteredOrders } = useFilterOrder()
  const orders = useSelector((state: AppState) => state.order)

  return (
    <Row>
      <Col>
        <OrderFilterSet />
      </Col>
      <Col>
        <RedeemTable
          dataSource={Object.keys(orders).map((val) => ({
            pubkey: val,
            ...orders[val],
          }))}
        />
      </Col>
    </Row>
  )
}

export default Redeem
