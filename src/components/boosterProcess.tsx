import { Col, Row, Typography } from 'antd'
import { AppState } from 'model'
import { useSelector } from 'react-redux'

type BoosterProcessProps = {
  boosterAddress: string
}

const BoosterProcess = ({ boosterAddress }: BoosterProcessProps) => {
  const { bidReserve, bidTotal } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )

  console.log(bidReserve, bidTotal)

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
