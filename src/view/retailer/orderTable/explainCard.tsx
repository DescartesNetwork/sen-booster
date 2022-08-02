import { useSelector } from 'react-redux'

import { Col, Row, Space, Typography } from 'antd'
import ApproveOrder from 'actions/retailerApproveOrder'
import RejectOrder from 'actions/retailerRejectOrder'
import SpaceVertical from 'components/spaceVertical'

import { AppState } from 'model'
import { useMintPrice } from 'hooks/useMintPrice'
import { util } from '@sentre/senhub'

type ExplainCardProps = {
  orderAddress: string
}

const ExplainCard = ({ orderAddress }: ExplainCardProps) => {
  const orderData = useSelector((state: AppState) => state.orders[orderAddress])
  const boosters = useSelector((state: AppState) => state.boosters)
  const retailerAddress = orderData.retailer.toBase58()
  const askMintAddress = boosters[retailerAddress].askMint.toBase58() || ''
  const askPrice = useMintPrice(askMintAddress)

  return (
    <Row gutter={[8, 8]} align="middle">
      <Col flex="auto">
        <Row gutter={[48, 48]}>
          <Col>
            <SpaceVertical
              label="Market price"
              value={
                <Typography.Text>
                  1 LP = {util.numeric(askPrice).format('0,0.[0000]')} USDC
                </Typography.Text>
              }
            />
          </Col>
          <Col>
            <SpaceVertical
              label="Used NFT slot"
              value={<Typography.Text>1</Typography.Text>}
            />
          </Col>
          <Col>
            <SpaceVertical
              label="Total boost rate"
              value={<Typography.Text>110,5%</Typography.Text>}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Space>
          <RejectOrder orderAddress={orderAddress} />
          <ApproveOrder orderAddress={orderAddress} />
        </Space>
      </Col>
    </Row>
  )
}

export default ExplainCard
