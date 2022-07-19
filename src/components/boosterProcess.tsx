import { BN } from '@project-serum/anchor'
import { Col, Row, Typography } from 'antd'

type BoosterProcessProps = {
  bidReserve: BN
  budget: BN
}

const BoosterProcess = ({ bidReserve, budget }: BoosterProcessProps) => {
  return (
    <Row>
      <Col>
        <Typography.Text>Process</Typography.Text>
        <Typography.Text>Budget</Typography.Text>
      </Col>
      <Col>Process Bar (Thanh Process )</Col>
    </Row>
  )
}

export default BoosterProcess
