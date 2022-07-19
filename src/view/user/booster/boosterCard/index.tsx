import { Col, Row } from 'antd'
import BoosterName from 'components/boosterName'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterProcess from '../../../../components/boosterProcess'
import Statistics from './statistics'
import BuyNow from 'actions/userBuyNow'
import { useSelector } from 'react-redux'
import { AppState } from 'model'

type BoosterCardProps = {
  boosterAddr: string
}

const BoosterCard = ({ boosterAddr }: BoosterCardProps) => {
  const { bidMint, askMint, bidTotal, bidReserve } = useSelector(
    (state: AppState) => state.booster[boosterAddr],
  )

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col>
            <BoosterSymbol pair={[bidMint, askMint]} />
            <BoosterName pair={[bidMint, askMint]} />
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
        <BoosterProcess bidReserve={bidReserve} budget={bidTotal} />
      </Col>
    </Row>
  )
}

export default BoosterCard
