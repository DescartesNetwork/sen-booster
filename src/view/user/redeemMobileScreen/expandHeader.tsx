import { useSelector } from 'react-redux'

import { Col, Row, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Redeem from 'actions/userRedeem'
import OrderMintInfo from 'components/orderMintInfo'
import StatusTag from 'components/statusTag'

import { AppState } from 'model'

type ExpandHeaderProps = {
  orderAddress: string
}

const ExpandHeader = ({ orderAddress }: ExpandHeaderProps) => {
  const { askAmount, bidAmount, retailer, state } = useSelector(
    (state: AppState) => state.orders[orderAddress],
  )
  const boosterAddress = retailer.toBase58() || ''
  const { askMint, bidMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )

  return (
    <Row gutter={[8, 8]}>
      <Col flex="auto">
        <Space direction="vertical">
          <OrderMintInfo amount={askAmount} mintAddress={askMint.toBase58()} />
          <IonIcon name="arrow-down-outline" />
          <OrderMintInfo amount={bidAmount} mintAddress={bidMint.toBase58()} />
        </Space>
      </Col>
      <Col>
        <Space align="end" size={12} direction="vertical">
          <Redeem orderAddress={orderAddress} />
          <StatusTag state={state} />
        </Space>
      </Col>
    </Row>
  )
}

export default ExpandHeader
