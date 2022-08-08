import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import OrderMintInfo from 'components/orderMintInfo'
import StatusTag from 'components/statusTag'
import RejectOrder from 'actions/retailerRejectOrder'
import ApproveOrder from 'actions/retailerApproveOrder'

import { AppState } from 'model'
import { useProfit } from 'hooks/useProfit'

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
  const { profit } = useProfit(orderAddress)

  return (
    <Row gutter={[8, 8]}>
      <Col flex="auto">
        <Space direction="vertical">
          <OrderMintInfo amount={bidAmount} mintAddress={bidMint.toBase58()} />
          <IonIcon name="arrow-down-outline" />
          <OrderMintInfo amount={askAmount} mintAddress={askMint.toBase58()} />
        </Space>
      </Col>
      <Col>
        <Space align="end" size={12} direction="vertical">
          <Space>
            <RejectOrder orderAddress={orderAddress} />
            <ApproveOrder orderAddress={orderAddress} />
          </Space>
          <StatusTag state={state} />
        </Space>
      </Col>
      <Col span={24}>
        <Typography.Text className="caption" type="secondary">
          Profit:
        </Typography.Text>{' '}
        <Typography.Text
          style={{
            color: profit >= 0 ? '#14E041' : '#F9575E',
          }}
        >
          {util.numeric(profit).format('0,0.[00]%')}
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default ExpandHeader
