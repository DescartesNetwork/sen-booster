import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { Card, Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'

import { AppState } from 'model'
import { RedeemDataSource } from 'constant'

const Redeem = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const {
    wallet: { address },
  } = useWallet()

  const dataSource = useMemo(() => {
    const sources: RedeemDataSource[] = []
    for (const orderAddress in orders) {
      const { updateAt, lockTime, state, authority } = orders[orderAddress]
      if (authority.toBase58() === address) {
        console.log('statestate: ', state)
        sources.push({
          lastUpdate: utilsBN.undecimalize(updateAt, 0),
          orderId: orderAddress,
          lockTime: utilsBN.undecimalize(lockTime, 0),
          state: Object.keys(state)[0],
        })
      }
    }
    return sources
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
