import { Col, Row } from 'antd'
import BoosterName from 'components/boosterName'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterProcess from '../../../../components/boosterProcess'
import Statistics from './statistics'
import BuyNow from 'actions/userBuyNow'

const BoosterCard = () => {
  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col>
            <BoosterSymbol />
            <BoosterName />
          </Col>
          <Col flex="auto">
            <BuyNow />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Statistics />
      </Col>
      <Col span={24}>
        <BoosterProcess />
      </Col>
    </Row>
  )
}

export default BoosterCard
