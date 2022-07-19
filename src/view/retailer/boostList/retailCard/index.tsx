import { Col, Row } from 'antd'
import BoosterProcess from 'components/boosterProcess'
import Manage from '../manage'
import BoostPair from './boostPair'

type RetailCardProps = {
  boosterAddr: string
}
const RetailCard = ({ boosterAddr }: RetailCardProps) => {
  return (
    <Row>
      <BoostPair boosterAddr={boosterAddr} />
      <Col>Time and isBoost</Col>
      <Col>
        <BoosterProcess boosterAddress={boosterAddr} />
      </Col>
      <Col>
        <Manage boosterAddr={boosterAddr} />
      </Col>
    </Row>
  )
}

export default RetailCard
