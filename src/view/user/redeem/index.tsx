import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@sentre/senhub'
import { OrderData } from 'sen-exchange-core'
import { Address } from '@project-serum/anchor'

import { Card, Col, Row } from 'antd'
import RedeemTable from 'view/user/redeemTable'
import OrderFilterSet from 'components/orderFilterSet'

import { AppState } from 'model'

const Redeem = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const {
    wallet: { address },
  } = useWallet()

  const dataSource = useMemo(() => {
    const sources: (OrderData & { orderId: Address })[] = []
    for (const orderAddress in orders) {
      const { authority } = orders[orderAddress]
      if (authority.toBase58() === address) {
        sources.push({
          orderId: orderAddress,
          ...orders[orderAddress],
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
