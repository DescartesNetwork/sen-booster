import { useSelector } from 'react-redux'

import { Col, Row, Space, Typography } from 'antd'
import ApproveOrder from 'actions/retailerApproveOrder'
import RejectOrder from 'actions/retailerRejectOrder'
import SpaceVertical from 'components/spaceVertical'

import { AppState } from 'model'

type ExplainCardProps = {
  orderAddress: string
}

const ExplainCard = ({ orderAddress }: ExplainCardProps) => {
  const orderData = useSelector((state: AppState) => state.orders[orderAddress])
  console.log(orderData)

  return (
    <Row gutter={[8, 8]} align="middle">
      <Col flex="auto">
        <Row gutter={[48, 48]}>
          <Col>
            <SpaceVertical
              label="Market price"
              value={<Typography.Text>1 LP = 6.12 USDC</Typography.Text>}
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
