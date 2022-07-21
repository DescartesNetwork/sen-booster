import { Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'
import { useFilterOrder } from 'hooks/orders/useFilterOrders'
import { AppState } from 'model'
import { useSelector } from 'react-redux'

const Redeem = () => {
  const { filteredOrders } = useFilterOrder()
  const orders = useSelector((state: AppState) => state.order)
  console.log('orders: ', orders)

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
