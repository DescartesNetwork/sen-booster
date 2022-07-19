import { Col, Row } from 'antd'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterAvatar from 'components/boosterAvatar'
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
            <BoosterAvatar boosterAddress={boosterAddr} />
            <BoosterSymbol boosterAddress={boosterAddr} />
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
