import { Col, Row } from 'antd'
import BoosterProcess from 'components/boosterProcess'
import Manage from '../manage'
import BoostPair from './boostPair'

function RetailCard() {
  return (
    <Row>
      <BoostPair />
      <Col>Time and isBoost</Col>
      <Col>
        <BoosterProcess />
      </Col>
      <Col>
        <Manage />
      </Col>
    </Row>
  )
}

export default RetailCard
