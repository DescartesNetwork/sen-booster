import { Col, Row } from 'antd'
import BoosterName from 'components/boosterName'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterProcess from '../../../../components/boosterProcess'
import Statistics from './statistics'
import BuyNow from 'actions/userBuyNow'

type BoosterCardProps = {
  boosterAddr: string
}

const BoosterCard = ({ boosterAddr }: BoosterCardProps) => {
  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col>
            <BoosterSymbol boosterAddress={boosterAddr} />
            <BoosterName boosterAddress={boosterAddr} />
          </Col>
          <Col flex="auto">
            <BuyNow boosterAddr={boosterAddr} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Statistics />
      </Col>
      <Col span={24}>
        <BoosterProcess boosterAddress={boosterAddr} />
      </Col>
    </Row>
  )
}

export default BoosterCard
