import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { Card, Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'

import { AppState } from 'model'
import { RedeemDataSource } from 'constant'

import { useFilterOrder } from 'hooks/retailer/useFilterOrders'

const Redeem = () => {
  const {
    wallet: { address },
  } = useWallet()
  const orders = useSelector((state: AppState) => state.order)
  const dataSource = useMemo(() => {
    const orderList: RedeemDataSource[] = []
    for (const key in orders) {
      if (orders[key].authority.toBase58() === address) {
        orderList.push({
          lastUpdate: utilsBN.undecimalize(orders[key].updateAt, 0),
          orderId: key,
          lockTime: utilsBN.undecimalize(orders[key].lockTime, 0),
          state: Object.keys(orders[key].state)[0],
        })
      }
    }
    return orderList
  }, [address, orders])
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <OrderFilterSet />
        </Col>
        <Col span={24}>
          <RedeemTable dataSource={dataSource} />
        </Col>
      </Row>
    </Card>
  )
}

export default Redeem
